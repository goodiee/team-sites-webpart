import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Providers, SharePointProvider } from '@microsoft/mgt-spfx';
import MyTeamSites from './components/MyTeamSites';
import { IMyTeamSitesProps, ITeamSite } from './components/IMyTeamSitesProps';

export default class MyTeamSitesWebPart extends BaseClientSideWebPart<{}> {

  public async onInit(): Promise<void> {
    await super.onInit();
    Providers.globalProvider = new SharePointProvider(this.context);
  }

  public render(): void {
    const graphClient = Providers.globalProvider.graph.client;

    graphClient
      .api('/me/memberOf')
      .select('displayName,webUrl,id,groupTypes')
      .filter("groupTypes/any(c:c eq 'Unified')")
      .get()
      .then((res: any) => {
        const sites: ITeamSite[] = res.value
          .filter((group: any) => group.webUrl)
          .map((group: any) => ({
            id: group.id,
            name: group.displayName,
            url: group.webUrl
          }));

        const element: React.ReactElement<IMyTeamSitesProps> = React.createElement(MyTeamSites, { sites });
        ReactDom.render(element, this.domElement);
      })
      .catch((error) => {
        console.error("Failed to load team sites", error);
      });
  }
}
