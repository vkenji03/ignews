/*
  funciona de forma parecida com o _app porem esse componente eh renderizado apenas uma vez na aplicacao
  eh igual o index.html de uma aplicacao react
*/
import Document, { Html, Head, Main, NextScript } from 'next/document';

export default class MyDocument extends Document {
  render() {
    return(
      <Html>
        <Head>
          <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700;900&display=swap" rel="stylesheet" />
          <link rel="shortcut icon" href="/favicon.png" type="image/png" />
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