export interface ITeamSite {
  id: string;
  name: string;
  url: string;
}

export interface IMyTeamSitesProps {
  sites: ITeamSite[];
}
