import styles from './Footer.module.css';

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <p>
                The Jenkins logo is licensed under{' '}
                <a href="https://creativecommons.org/licenses/by-sa/3.0/" target="_blank" rel="noopener noreferrer">CC BY-SA 3.0</a>
                . Attribution to{' '}
                <a href="https://jenkins.io/" target="_blank" rel="noopener noreferrer">Jenkins</a>.
            </p>
            <p>
                Built with{' '}
                <a href="https://prettier.io/" target="_blank" rel="noopener noreferrer">Prettier</a>,{' '}
                <a href="https://github.com/mharbison72/prettier-plugin-groovy" target="_blank" rel="noopener noreferrer">prettier-plugin-groovy</a>,{' '}
                <a href="https://github.com/suren-atoyan/monaco-react" target="_blank" rel="noopener noreferrer">@monaco-editor/react</a>,{' '}
                <a href="https://vitejs.dev/" target="_blank" rel="noopener noreferrer">Vite</a>, and{' '}
                <a href="https://vercel.com/" target="_blank" rel="noopener noreferrer">Vercel</a>.
            </p>
        </footer>
    );
};

export default Footer;
