// cada arquivo dentro de pages o next cria uma rota para ele
// so precisa usar export default para os arquivos dentro de pages

import { GetServerSideProps } from 'next';
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
export const getServerSideProps: GetServerSideProps = async () => {
  // Todo codigo dentro dessa funcao eh executada no next(servidor node)
  const price = await stripe.prices.retrieve('price_1KZ3swJgPt2vNe7OJfOJwRJw');

  const product = {
    priceId: price.id,
    amount: new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price.unit_amount / 100) // price eh retornado em centavos
  };

  return {
    props: {
      product
    }
  };
}