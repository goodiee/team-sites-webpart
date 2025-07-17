import * as React from 'react';
import styles from './MyTeamSites.module.scss';
import { IMyTeamSitesProps, ITeamSite } from './IMyTeamSitesProps';

export default class MyTeamSites extends React.Component<IMyTeamSitesProps, {}> {
  public render(): React.ReactElement<IMyTeamSitesProps> {
    const { sites } = this.props;

    return (
      <section className={styles.myTeamSites}>
        <h2>Your Team Sites</h2>
        {sites && sites.length > 0 ? (
          <ul className={styles.siteList}>
            {sites.map((site: ITeamSite) => (
              <li key={site.id}>
                <a href={site.url} target="_blank" rel="noreferrer">
                  {site.name}
                </a>
              </li>
            ))}
          </ul>
        ) : (
          <p>You are not a member of any team sites.</p>
        )}
      </section>
    );
  }
}
