/*
  Esse componente funciona igual o App no react, ou seja todo componente dentro de pages sera renderizado dentro desse componente
  Alem disso sempre q o usuario acessar uma outra pagina da aplicacao(outra rota) esse componente _app sera re-renderizado
  Se quisermos usar algo que apareca em todas as paginas, por exemplo um context, ele deve ser adicionado aqui
*/

import { AppProps } from 'next/app';
import { Header } from '../components/Header';
import { SessionProvider as NextAuthProvider } from 'next-auth/react';

import '../styles/global.scss';

function MyApp({
  Component,
  // ao dar um reload na pagina, ou fechar e abrir, as informacoes da sessao ativa do usuario chegam por pageProps.session
  pageProps: { session, ...pageProps }
}: AppProps) {
  return (
    <NextAuthProvider session={session}>
      {/* como o header vai estar em todas as paginas ele eh utilizado aqui */}
      <Header />
      {/* o componente de page sera renderizado aqui */}
      <Component {...pageProps} />
    </NextAuthProvider>
  )
}

export default MyApp
