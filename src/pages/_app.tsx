/*
  Esse componente funciona igual o App no react, ou seja todo componente dentro de pages sera renderizado dentro desse componente
  Alem disso sempre q o usuario acessar uma outra pagina da aplicacao(outra rota) esse componente _app sera re-renderizado
  Se quisermos usar algo que apareca em todas as paginas, por exemplo um context, ele deve ser adicionado aqui
*/

import { AppProps } from 'next/app';

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

export default MyApp
