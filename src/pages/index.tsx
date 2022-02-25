// cada arquivo dentro de pages o next cria uma rota para ele
// so pode usar export default quando utiliza o next

// utilizar o CSS modules do next
import styles from '../styles/home.module.scss';

export default function Home() {
  return (
    // utilizar o CSS modules do next
    <h1 className={styles.title}>
      Hello <span>World</span>
    </h1>
  )
}
