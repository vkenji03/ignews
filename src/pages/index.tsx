// cada arquivo dentro de pages o next cria uma rota para ele
// so pode usar export default quando utiliza o next

import Head from 'next/head';

// utilizar o CSS modules do next
import styles from '../styles/home.module.scss';

export default function Home() {
  return (
    <>
      {/*
        Tudo o que coloca dentro do componente Head eh adicionado dentro da tag head no HTML que eh renderizado para o usuario
        Precisa fazer isso pois _document so eh renderizado uma vez, entao caso o title esteja dentro desse arquivo todas as paginas
        terao o mesmo title
      */}
      <Head>
        <title>Inicio | ig.news</title>
      </Head>
      {/* utilizar o CSS modules do next */}
      <h1 className={styles.title}>
        Hello <span>World</span>
      </h1>
    </>
  )
}
