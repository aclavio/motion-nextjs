import Head from 'next/head';
import styles from '../../../../styles/Gallery.module.css';
import Snapshot from '../../../../components/snapshot';
import Layout from '../../../../components/layout';
import Link from 'next/link';
import { DateTime } from 'luxon';
import { getSortedSnapshotPathsByDay } from '../../../../lib/snapshots';


export async function getServerSideProps(context) {
  const { year, month, day } = context.query;
  const curr = DateTime.local(parseInt(year), parseInt(month), parseInt(day));
  const nextDay = curr.plus({ days: 1 });
  const prevDay = curr.minus({ days: 1 });

  return {
    props: {
      sorted: await getSortedSnapshotPathsByDay(year, month, day),
      curr: {
        year,
        month,
        day,
        local: curr.toLocaleString(DateTime.DATE_FULL)
      },
      next: {
        year: nextDay.year,
        month: nextDay.month,
        day: nextDay.day
      },
      prev: {
        year: prevDay.year,
        month: prevDay.month,
        day: prevDay.day
      }
    }
  };
}

export default function Gallery(props) {

  return (
    <Layout title="Cat Cam - Gallery">
      <Head>
        <title>Cat Cam - Gallery</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <nav className={styles.navigation}>
        <Link href={`/gallery/${props.prev.year}/${props.prev.month}/${props.prev.day}`}>← Prev</Link>
        <span>{props.curr.local}</span>
        <Link href={`/gallery/${props.next.year}/${props.next.month}/${props.next.day}`}>Next →</Link>
      </nav>

      <div className={styles.grid}>
        {
          props.sorted &&
            props.sorted.length > 0 ?
            props.sorted.map(snap => (
              <Snapshot key={snap.name} name={snap.name} path={snap.path} time={snap.time} width={400} height={300} />
            )) :
            <div className={styles.empty}>No snapshots found</div>
        }
      </div>
    </Layout>
  )
}