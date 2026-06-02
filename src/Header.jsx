import styles from './Header.module.css';

const Header = ({ value, onChange, onFormat }) => {
    const { indent } = value;

    return <header className={styles.Header}>
        <img src="/logo.png" alt="Jenkinsfile Formatter Logo" className={styles.logo} width="32" height="32" />
        <h1 className={styles.title}>Jenkinsfile.</h1>
        <button className={styles.formatBtn} onClick={onFormat} aria-label="Format Jenkinsfile code">Format</button>
        <span className={styles.indentGroup}>(<span>indent&nbsp;=&nbsp;</span>
            <button className={styles.indentBtn} disabled={indent === 2} onClick={() => {
                onChange({ indent: 2 })
            }} aria-label="Use 2 spaces indentation">2 Spaces</button>
            <span>&nbsp;/&nbsp;</span>
            <button className={styles.indentBtn} disabled={indent === 4} onClick={() => {
                onChange({ indent: 4 })
            }} aria-label="Use 4 spaces indentation">4 Spaces</button>
            )</span>
        <a
            className={styles.githubBadge}
            href="https://github.com/dongfg/jenkinsfileformatter"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="View source code on GitHub"
        >
            <svg height="16" viewBox="0 0 16 16" width="16" fill="currentColor" aria-hidden="true">
                <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
            </svg>
            Star on GitHub
        </a>
    </header>;
};

export default Header;