import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {ApolloProvider, ApolloClient, InMemoryCache, ApolloConsumer} from "@apollo/client"
import { getAllCharacters} from './queries/apollo';

const root = ReactDOM.createRoot(document.getElementById('root'));

const cache = new InMemoryCache(
  {
    typePolicies: {
      Characters: {
        keyFields: ["results"],
        fields: {
          resuls: {
            keyArgs:false,
            merge(existing = [], incoming) {
              return [...existing, ...incoming];
            },
          }
        }
      }
    }
  }
)


const client = new ApolloClient({
  uri: "https://rickandmortyapi.com/graphql",
  cache: cache
})


root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App/>
    </ApolloProvider>
  </React.StrictMode>
);

