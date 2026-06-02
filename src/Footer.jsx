import styles from './Footer.module.css';

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <p>
                The Jenkins logo is licensed under{' '}
                <a href="https://creativecommons.org/licenses/by-sa/3.0/" target="_blank" rel="noopener">CC BY-SA 3.0</a>
                . Attribution to{' '}
                <a href="https://jenkins.io/" target="_blank" rel="noopener">Jenkins</a>.
            </p>
        </footer>
    );
};

export default Footer;
