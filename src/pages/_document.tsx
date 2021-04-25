/**
 * _document -> é o arquivo onde pode ser configurado o formato do html usado na aplicação
 *  => ele fica por volta de toda a aplicação e é carregado apenas 1 vez
 * colocar as fontes por exemplo neste arquivo é uma boa pratica para aplicar em tudo
 */

import Document, {Html, Head, Main, NextScript} from 'next/document'

export default class MyDocument extends Document {
  render() {
    return (

      <Html>
        <Head>
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link href="https://fonts.googleapis.com/css2?family=Inter&family=Lexend:wght@500;600&display=swap" rel="stylesheet" />

          <link rel="shortcut icon" href="/favicon.png" type="image/png"/>
        </Head>

        <body>
          <Main />
          <NextScript />
        </body>
      </Html>

    )
  }
}