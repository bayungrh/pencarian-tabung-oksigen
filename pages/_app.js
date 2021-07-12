import 'semantic-ui-css/semantic.min.css'
import './index.css'
import Head from 'next/head';
import dotenv from 'dotenv';
dotenv.config();

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Pencarian Tabung Oksigen</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta property="description" content="Pencarian Informasi Pembelian/Penyewaan/Isi ulang Tabung Oksigen" />
        <meta property="og:title" content="Info Tabung Oksigen" key="Info Tabung Oksigen" />
        <meta property="og:description" content="Pencarian Tabung Oksigen" />
        <link rel="icon" href="/oksigen.png" sizes="16x16" type="image/png"></link>
        <link href="https://fonts.googleapis.com/css?family=Poppins:400,400italic,600,600italic,700,700italic,900,900italic%7CSource+Sans+Pro:400,400italic,700,700italic" rel="stylesheet" type="text/css" />
      </Head>
      <Component {...pageProps} />
    </>
  )
}

export default MyApp;