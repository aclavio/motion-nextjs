import Head from 'next/head';
import Link from 'next/link';
import { DateTime } from 'luxon';
import Layout from '../components/layout';
import styles from '../styles/Home.module.css';

export async function getServerSideProps(context) {
  const today = DateTime.local()
  let motionUrl = process.env.MOTION_URL;

  return {
    props: {
      motionUrl,
      year: today.year,
      month: today.month,
      day: today.day
    }
  };
}

export default function Home(props) {
  return (
    <Layout title="Cat Cam - Live">
      <Head>
        <title>Cat Cam - Live</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <nav className={styles.navigation}>
        <Link href={`/gallery/${props.year}/${props.month}/${props.day}`}>Go to Gallery</Link>
      </nav>

      <div className={styles.camera}>
        <img src={props.motionUrl}></img>
      </div>
    </Layout>
  )
}
