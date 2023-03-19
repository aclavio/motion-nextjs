import Image from "next/image"
import styles from './snapshot.module.css';

export default function Snapshot(props) {
  return (
    <a href={props.path} className={styles.card} >
      {
        props.header && <header>{props.header}</header>
      }
      <Image src={props.path} width={props.width} height={props.height} alt="snapshot" />
      <p>{new Date(props.time).toLocaleString()}</p>
    </a>
  )
}