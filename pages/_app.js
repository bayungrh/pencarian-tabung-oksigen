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
        <meta property="og:title" content="Pencarian Tabung Oksigen" key="Pencarian Tabung Oksigen" />
        <meta property="og:description" content="Pencarian Informasi Pembelian/Penyewaan atau Isi Ulang Tabung Oksigen" />
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="og:image" content="https://info-tabung-oksigen.vercel.app/screenshot-thumb.png" />
        <meta property="og:image:type" content="image/jpeg" />
        <meta property="og:image:width" content="1280" />
        <meta property="og:image:height" content="800" />
        <meta property="og:url" content="https://info-tabung-oksigen.vercel.app" />
        <link rel="icon" href="/oksigen.png" sizes="16x16" type="image/png" />
        <link rel="apple-touch-icon" href="/oksigen.png" />
        <link href="https://fonts.googleapis.com/css?family=Poppins:400,400italic,600,600italic,700,700italic,900,900italic%7CSource+Sans+Pro:400,400italic,700,700italic" rel="stylesheet" type="text/css" />
      </Head>
      <Component {...pageProps} />
    </>
  )
}

export default MyApp;