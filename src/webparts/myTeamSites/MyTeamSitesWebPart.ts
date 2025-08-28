import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Providers, SharePointProvider } from '@microsoft/mgt-spfx';
import MyTeamSites from './components/MyTeamSites';

interface IGroup {
  id: string;
  displayName: string;
}

interface IMember {
  id: string;
  displayName: string;
  email: string;
}

interface ITeamSite {
  id: string;
  name: string;
  url: string;
  members: IMember[];
}

export default class MyTeamSitesWebPart extends BaseClientSideWebPart<{}> {
  private element: React.ReactElement | null = null;

  public async onInit(): Promise<void> {
    await super.onInit();
    Providers.globalProvider = new SharePointProvider(this.context);
  }

  public render(): void {
    const graphClient = Providers.globalProvider.graph.client;

    graphClient
      .api('/me/memberOf')
      .select('displayName,id')
      .get()
      .then(async (res: { value: IGroup[] }) => {
        const groups = res.value;
        console.log("Fetched groups:", groups);

        const sitePromises = groups.map(async (group: IGroup) => {
          try {
            const site = await graphClient.api(`/groups/${group.id}/sites/root`).get();
            const membersResponse = await graphClient.api(`/groups/${group.id}/members`).get();

            const members = membersResponse.value.map((member: { id: string, displayName: string, mail: string }) => ({
              id: member.id,
              displayName: member.displayName,
              email: member.mail
            }));

            return {
              id: group.id,
              name: group.displayName,
              url: site.webUrl,
              members: members
            };
          } catch (error) {
            console.warn(`Could not load site or members for group ${group.displayName}`, error);
            return null;
          }
        });

        const siteResults = await Promise.all(sitePromises);
        const sites: ITeamSite[] = siteResults.filter((site) => site !== null) as ITeamSite[];

        this.element = React.createElement(MyTeamSites, { sites });

        ReactDom.render(this.element, this.domElement);
      })
      .catch((error) => {
        console.error("Failed to load team sites or members", error);
        const fallbackElement = React.createElement(MyTeamSites, { sites: [] });
        ReactDom.render(fallbackElement, this.domElement);
      });
  }

  public onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }
}
