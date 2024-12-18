import styles from './Header.module.css';

const Header = ({ value, onChange }) => {
    const { indent } = value;

    return <div className={styles.Header}>
        <span>Jenkinsfile.format(indent&nbsp;=&nbsp;</span>
        <input type='button' value='2' disabled={indent === 2} onClick={() => {
            onChange({ indent: 2 })
        }} />
        <span>&nbsp;/&nbsp;</span>
        <input type='button' value='4' disabled={indent === 4} onClick={() => {
            onChange({ indent: 4 })
        }} />
        <span>)</span>
    </div>;
};

export default Header;