export interface ITeamSite {
  id: string;
  name: string;
  url: string;
  members: {
    id: string;
    displayName: string;
    email: string;
  }[];
}

export interface IMyTeamSitesProps {
  sites: ITeamSite[];
}
