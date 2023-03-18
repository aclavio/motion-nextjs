import Image from "next/image"
import styles from '../styles/Home.module.css';

export default function Snapshot(props) {
  return (
    <a href={props.path} className={styles.card} >
      <Image src={props.path} width={props.width} height={props.height} />
      <p>{new Date(props.time).toLocaleString()}</p>
    </a>
  )
}