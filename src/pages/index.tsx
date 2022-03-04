// cada arquivo dentro de pages o next cria uma rota para ele
// so precisa usar export default para os arquivos dentro de pages

import { GetStaticProps } from 'next';
import Head from 'next/head';

import { stripe } from '../services/stripe';
import { SubscribeButton } from '../components/SusbcribeButton';

import styles from './home.module.scss';

interface HomeProps {
  product: {
    priceId: string;
    amount: number;
  }
}

export default function Home({ product }: HomeProps) {
  /**
   * Ao executar uma chamada API dentro de um componente, ela eh executada no browser, ou seja, apos o componente ser renderizado em 
   * tela, o que causa um layout shift
  */

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
            <span>for {product.amount} month</span>
          </p>
          <SubscribeButton priceId={product.priceId} />
        </section>

        <img src="/images/avatar.svg" alt="Girl coding" />
      </main>
    </>
  )
}

/**
 * Uma chamada API utilizando SSR sera executada no next(servidor node), dessa forma a resposta so eh enviada para o browser apos a
 * chamada ser concluida, ou seja, se ela demorar 2 segundos o usuario ficara 2 segundos sem ver nada na tela
 * O SSR so pode ser utilizado dentro de um arquivo da pasta pages, ou seja, caso um componente precise dessa informacao ela precisa
 * ser repassada como prop
*/

/**
 * Assim que se usa o SSR, a funcao precisa ser escrita dessa forma
 * Tudo o que eh retornado dentro de props pode ser acessado nas props dos componentes desse arquivo
*/
// export const getServerSideProps: GetServerSideProps = async () => {
//   // Todo codigo dentro dessa funcao eh executada no next(servidor node)
//   const price = await stripe.prices.retrieve('price_1KZ3swJgPt2vNe7OJfOJwRJw');

//   const product = {
//     priceId: price.id,
//     amount: new Intl.NumberFormat('en-US', {
//       style: 'currency',
//       currency: 'USD'
//     }).format(price.unit_amount / 100) // price eh retornado em centavos
//   };

//   return {
//     props: {
//       product
//     }
//   };
// }

/**
 * O SSG funciona igual o SSR, porem o next salva um HTML estatico do que foi retornado para o browser com tudo o que foi executado
 * utilizando SSG e em todas as proximas chamadas para essa pagina o que eh executado utilizando SSG, nao sera executado novamente,
 * pois ja esta salvo no HTML estatico, ou seja, essa eh uma forma mais performatica, porem so pode ser usada com conteudos que devem
 * ser iguais para todos, exemplo um post de um blog 
*/

// Assim que se usa o SSG
export const getStaticProps: GetStaticProps = async () => {
  const price = await stripe.prices.retrieve('price_1KZ3swJgPt2vNe7OJfOJwRJw');

  const product = {
    priceId: price.id,
    amount: new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price.unit_amount / 100)
  }

  return {
    props: {
      product
    },
    // o tempo em segundos entre a geracao de um novo HTML estatico, ou seja, a cada 24 horas tudo que eh executado utilizando SSG eh
    // executado novamente
    revalidate: 60 * 60 * 24 // 24 horas
  }
}

// Client-side rendering:
// - pior opcao visando SEO(por exemplo se fizer chamdas API)
// - deve ser utilizado com dados que podem ser carregados conforme o usuario utiliza a pagina ou que nao precisam ser renderizados
// juntamente com a pagina, exemplo: comentarios de um blog
// Server-side rendering:
// - "trava" toda a pagina ate as requisicoes serem completadas
// - pode ser utilizado com dados dinamicos ou dados que devem ser renderizados juntamente com a pagina
// - melhor opcao para SEO
// Static Site Generation:
// - mais performatica que o SSR
// - so pode ser utilizado com dados estaticos/que devem ser iguais para todos os usuarios ou dados que devem ser renderizados
// juntamente com a pagina, exemplo: posts de um blog
// - melhor opcao para SEO