// cada arquivo dentro de pages o next cria uma rota para ele
// so precisa usar export default para os arquivos dentro de pages

import Head from 'next/head';

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
      <h1>
        Hello <span>World</span>
      </h1>
    </>
  )
}
