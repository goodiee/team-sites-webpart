import * as React from 'react';
import styles from './MyTeamSites.module.scss';
import { IMyTeamSitesProps, ITeamSite } from './IMyTeamSitesProps';

export default class MyTeamSites extends React.Component<IMyTeamSitesProps, {}> {
  public render(): React.ReactElement<IMyTeamSitesProps> {
    const { sites } = this.props;

    const filteredSites = sites.filter(site => site.name !== 'CARD');

    return (
      <section className={styles.myTeamSites}>
        <h2>
          Your Team Sites
          {filteredSites.length > 0 && ` (${filteredSites.length})`}
        </h2>

        {filteredSites.length > 0 ? (
          <div className={styles.siteGrid}>
            {filteredSites.map((site: ITeamSite) => (
              <div key={site.id} className={styles.siteCard}>
                <a
                  href={site.url}
                  target="_blank"
                  rel="noreferrer"
                  className={styles.siteLink}
                >
                  {site.name}
                </a>

                {site.members && site.members.length > 0 && (
                  <div className={styles.memberSection}>
                    <h4 className={styles.memberTitle}>Members</h4>
                    <ul className={styles.memberList}>
                      {site.members.map((member) => (
                        <li key={member.id} className={styles.memberItem}>
                          {member.displayName} ({member.email})
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p className={styles.emptyMessage}>
            You are not a member of any Microsoft 365 groups that include SharePoint team sites.
          </p>
        )}
      </section>
    );
  }
}
