import * as React from 'react';
import styles from './MyTeamSites.module.scss';
import { IMyTeamSitesProps, ITeamSite } from './IMyTeamSitesProps';

export default class MyTeamSites extends React.Component<IMyTeamSitesProps, {}> {
  public render(): React.ReactElement<IMyTeamSitesProps> {
    const { sites } = this.props;

    return (
      <section className={styles.myTeamSites}>
        <h2>
          Your Team Sites
          {sites && sites.length > 0 && ` (${sites.length})`}
        </h2>
        {sites && sites.length > 0 ? (
          <ul className={styles.siteList}>
            {sites.map((site: ITeamSite) => (
              <li key={site.id} className={styles.siteItem}>
                <a
                  href={site.url}
                  target="_blank"
                  rel="noreferrer"
                  className={styles.siteLink}
                >
                  {site.name}
                </a>
                {site.members && site.members.length > 0 && (
                  <ul className={styles.memberList}>
                    {site.members.map((member) => (
                      <li key={member.id} className={styles.memberItem}>
                        {member.displayName} ({member.email})
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <p className={styles.emptyMessage}>
            You are not a member of any Microsoft 365 groups that include SharePoint team sites.
          </p>
        )}
      </section>
    );
  }
}
