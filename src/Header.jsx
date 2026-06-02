import styles from './Header.module.css';

const Header = ({ value, onChange, onFormat }) => {
    const { indent } = value;

    return <div className={styles.Header}>
        <img src="/logo.png" alt="Jenkins" className={styles.logo} />
        Jenkinsfile.
        <button className={styles.formatBtn} onClick={onFormat}>Format</button>
        (
        <span>indent&nbsp;=&nbsp;</span>
        <button className={styles.indentBtn} disabled={indent === 2} onClick={() => {
            onChange({ indent: 2 })
        }}>2 Spaces</button>
        <span>&nbsp;/&nbsp;</span>
        <button className={styles.indentBtn} disabled={indent === 4} onClick={() => {
            onChange({ indent: 4 })
        }}>4 Spaces</button>
        )
    </div>;
};

export default Header;