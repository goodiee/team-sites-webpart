import * as React from 'react';
import styles from './MyTeamSites.module.scss';
import { IMyTeamSitesProps, ITeamSite } from './IMyTeamSitesProps';

const getHeaderColorFromName = (name: string): string => {
  const colors = ['#e81123', '#0078d4', '#107c10', '#ff8c00', '#5c2d91', '#605e5c', '#2b88d8', '#e3008c', '#00b294'];
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return colors[Math.abs(hash % colors.length)];
};

const getIconColorFromName = (name: string): string => {
  const iconColors = ['#ff4b4b', '#ffb900', '#00cc6a', '#0099ff', '#b146c2', '#00cccc', '#ff7c6b', '#c19c00'];
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return iconColors[Math.abs((hash + 3) % iconColors.length)]; 
};

export default class MyTeamSites extends React.Component<IMyTeamSitesProps, {}> {
  public render(): React.ReactElement<IMyTeamSitesProps> {
    const { sites } = this.props;
    const filteredSites = sites.filter(site => site.name !== 'CARD');

    return (
      <section className={styles.myTeamSites}>
        <h2>Your Team Sites {filteredSites.length > 0 && `${filteredSites.length}`}</h2>

        <div className={styles.siteGrid}>
          {filteredSites.map((site: ITeamSite) => {
            const initials = site.name
              .split(' ')
              .map(word => word[0])
              .slice(0, 2)
              .join('')
              .toUpperCase();

            const headerColor = getHeaderColorFromName(site.name);
            const iconColor = getIconColorFromName(site.name);

            return (
              <a
                key={site.id}
                href={site.url}
                target="_blank"
                rel="noreferrer"
                className={styles.siteCard}
              >
                <div className={styles.cardHeader} style={{ backgroundColor: headerColor }}>
                  <div className={styles.siteIcon} style={{ backgroundColor: iconColor }}>
                    {initials}
                  </div>
                  <div className={styles.star}>★</div>
                </div>
                <div className={styles.siteName}>{site.name}</div>
                <div className={styles.siteLabel}>Group</div>
              </a>
            );
          })}
        </div>
      </section>
    );
  }
}
