import '../styles/globals.scss'
import type { AppProps } from 'next/app'
import '../lang/i18n';

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
