import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {ApolloProvider, ApolloClient, InMemoryCache, ApolloConsumer} from "@apollo/client"
import { STATE } from './config';
import { sendMessage } from './utils';

sendMessage()

const root = ReactDOM.createRoot(document.getElementById('root'))

const cache = new InMemoryCache(
  {
    typePolicies: {
      Caracter: {
        keyFields: ["id"]
      }
    }
  }
)

const client = new ApolloClient({
  uri: "https://rickandmortyapi.com/graphql",
  cache: cache
})

root.render(
    <ApolloProvider client={client}>
      <App/>
    </ApolloProvider>
);

