import { TopNav } from '@/components/navigations'
import { client } from '@/graphql/apolloClient'
import '@/styles/globals.css'
import { ApolloClient, ApolloProvider } from '@apollo/client'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
    <div>
       <TopNav  />
    <Component {...pageProps} />
    </div>
    </ApolloProvider>
  ) 
}
