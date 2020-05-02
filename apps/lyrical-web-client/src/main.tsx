import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from '@apollo/react-hooks';
import ApolloClient from 'apollo-boost';
import { BrowserRouter } from 'react-router-dom';
import App from './app/app';
const client = new ApolloClient({
  uri: 'http://localhost:3333/graphql'
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ApolloProvider>
  ,
  document.getElementById('root')
);
