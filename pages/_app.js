import Layout from '../components/layout'
import '../styles/globals.css'

function MyApp({ Component, pageProps, ...appProps }) {
  if (['/'].includes(appProps.router.pathname))
      return <Component {...pageProps} />;
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}

export default MyApp
