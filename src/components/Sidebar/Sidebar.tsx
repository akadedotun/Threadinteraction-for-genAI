import styles from './Sidebar.module.css';

const recentChats = [
  'Competency prep — Barclays',
  'CV bullet points review',
  'Mock interview: case study',
  'LinkedIn headline rewrite',
];

export default function Sidebar() {
  return (
    <aside className={styles.sidebar}>
      <div className={styles.header}>
        <div className={styles.logo}>
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="14" cy="14" r="9" stroke="#6c63ff" strokeWidth="2" fill="none"/>
            <circle cx="14" cy="14" r="3" fill="#6c63ff"/>
            <circle cx="14" cy="5" r="2" fill="#22c9a0"/>
            <line x1="14" y1="7" x2="14" y2="11" stroke="#6c63ff" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
          <span className={styles.appName}>Orbit</span>
        </div>
        <button className={styles.newChat}>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <line x1="7" y1="2" x2="7" y2="12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
            <line x1="2" y1="7" x2="12" y2="7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
          </svg>
          New chat
        </button>
      </div>

      <nav className={styles.nav}>
        <div className={styles.section}>
          <span className={styles.sectionLabel}>Projects</span>
          <ul className={styles.projectList}>
            <li className={`${styles.project} ${styles.projectActive}`}>
              <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                <path d="M1.5 3.5C1.5 2.95 1.95 2.5 2.5 2.5H5L6.5 4H10.5C11.05 4 11.5 4.45 11.5 5V10C11.5 10.55 11.05 11 10.5 11H2.5C1.95 11 1.5 10.55 1.5 10V3.5Z" stroke="currentColor" strokeWidth="1.2" fill="none"/>
              </svg>
              <span>Jobs</span>
              <span className={styles.activeDot} />
            </li>
            <li className={styles.project}>
              <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                <path d="M1.5 3.5C1.5 2.95 1.95 2.5 2.5 2.5H5L6.5 4H10.5C11.05 4 11.5 4.45 11.5 5V10C11.5 10.55 11.05 11 10.5 11H2.5C1.95 11 1.5 10.55 1.5 10V3.5Z" stroke="currentColor" strokeWidth="1.2" fill="none"/>
              </svg>
              <span>Design research</span>
            </li>
            <li className={styles.project}>
              <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                <path d="M1.5 3.5C1.5 2.95 1.95 2.5 2.5 2.5H5L6.5 4H10.5C11.05 4 11.5 4.45 11.5 5V10C11.5 10.55 11.05 11 10.5 11H2.5C1.95 11 1.5 10.55 1.5 10V3.5Z" stroke="currentColor" strokeWidth="1.2" fill="none"/>
              </svg>
              <span>Side builds</span>
            </li>
          </ul>
        </div>

        <div className={styles.section}>
          <span className={styles.sectionLabel}>Recent</span>
          <ul className={styles.recentList}>
            {recentChats.map((chat, i) => (
              <li key={i} className={styles.recentItem}>
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M2 2h8v6.5a.5.5 0 01-.5.5h-7a.5.5 0 01-.5-.5V2z" stroke="currentColor" strokeWidth="1.2" fill="none"/>
                  <line x1="4" y1="5" x2="8" y2="5" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/>
                  <line x1="4" y1="7" x2="6.5" y2="7" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/>
                </svg>
                <span className={styles.recentText}>{chat}</span>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      <div className={styles.userFooter}>
        <div className={styles.avatar}>AY</div>
        <div className={styles.userInfo}>
          <span className={styles.userName}>Alex Y.</span>
          <span className={styles.userPlan}>Orbit Pro</span>
        </div>
        <button className={styles.settingsBtn} title="Settings">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <circle cx="7" cy="7" r="2.5" stroke="currentColor" strokeWidth="1.4"/>
            <path d="M7 1v1.5M7 11.5V13M13 7h-1.5M2.5 7H1M10.95 3.05l-1.06 1.06M4.11 9.89l-1.06 1.06M10.95 10.95l-1.06-1.06M4.11 4.11L3.05 3.05" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
          </svg>
        </button>
      </div>
    </aside>
  );
}
