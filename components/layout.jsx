import Link from 'next/link';
import styles from '../styles/Layout.module.css';

export default function Layout({ title, children }) {
    return (
        <main className={styles.container}>
            <header><Link href="/">{title}</Link></header>
            {children}
            <footer></footer>
        </main>
    );
}