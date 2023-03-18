import Head from 'next/head';
import styles from '../styles/Home.module.css';
import Link from 'next/link';
import { DateTime } from 'luxon';

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
    <div className={styles.container}>
      <Head>
        <title>Cat Cam - Live</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className={styles.title}>
          Cat Cam
        </h1>

        <h2 className={styles.description}>
          <Link href={`/gallery/${props.year}/${props.month}/${props.day}`}>Gallery</Link>
        </h2>

        <div className={styles.card}>
          <img width={960} height={720} src={props.motionUrl}></img>
        </div>
      </main>

      <style jsx>{`
        main {
          padding: 5rem 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
        footer {
          width: 100%;
          height: 100px;
          border-top: 1px solid #eaeaea;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        footer img {
          margin-left: 0.5rem;
        }
        footer a {
          display: flex;
          justify-content: center;
          align-items: center;
          text-decoration: none;
          color: inherit;
        }
        code {
          background: #fafafa;
          border-radius: 5px;
          padding: 0.75rem;
          font-size: 1.1rem;
          font-family: Menlo, Monaco, Lucida Console, Liberation Mono,
            DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace;
        }
      `}</style>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }
        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  )
}
