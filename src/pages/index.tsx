// cada arquivo dentro de pages o next cria uma rota para ele
// so precisa usar export default para os arquivos dentro de pages

import Head from 'next/head';

import { SubscribeButton } from '../components/SusbcribeButton';

import styles from './home.module.scss';

export default function Home() {
  return (
    <>
      {/*
        Tudo o que coloca dentro do componente Head eh adicionado dentro da tag head no HTML que eh renderizado para o usuario
        Precisa fazer isso pois _document so eh renderizado uma vez, entao caso o title esteja dentro desse arquivo todas as paginas
        terao o mesmo title
      */}
      <Head>
        <title>Home | ig.news</title>
      </Head>
      
      <main className={styles.contentContainer}>
        <section className={styles.hero}>
          <span>👏 Hey, welcome</span>
          <h1>News about the <span>React</span> world.</h1>
          <p>
            Get acess to all the publications <br />
            <span>for $9.99 month</span>
          </p>
          <SubscribeButton />
        </section>

        <img src="/images/avatar.svg" alt="Girl coding" />
      </main>
    </>
  )
}
