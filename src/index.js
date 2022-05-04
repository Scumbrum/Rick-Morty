import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './View/App';
import {ApolloProvider, ApolloClient, InMemoryCache} from "@apollo/client"
import { sendMessage } from './logic/utils';

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

