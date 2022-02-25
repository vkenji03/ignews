/*
  funciona de forma parecida com o _app porem esse componente eh renderizado apenas uma vez na aplicacao
  eh igual o index.html de uma aplicacao react
*/
import Document, { Html, Head, Main, NextScript } from 'next/document';

// o next ainda nao suporta esse componente escrito na forma de funcao
export default class MyDocument extends Document {
  render() {
    return(
      <Html>
        <Head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700;900&display=swap" rel="stylesheet" />

          <title>ig.news</title>
        </Head>
        <body>
          {/* todo conteudo da aplicacao eh renderizado dentro de Main */}
          <Main />
          {/* vai importar os arquivos JS */}
          <NextScript />
        </body>
      </Html>
    );
  };
}