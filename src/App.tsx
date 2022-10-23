import { FC } from 'react';
import Routes from './Pages/routes';
import GlobalStyle from './GlobalStyle';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
  from,
} from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import { BASE_URL } from './consts/general';

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.map(({ message }) => {
      alert(`Graphql error ${message}`);
      return false;
    });
  }
});

const link = from([
  errorLink,
  new HttpLink({ uri: BASE_URL }),
]);

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: link,
});

const App: FC = () => <ApolloProvider client={client}>
  <GlobalStyle />
  <Routes />
</ApolloProvider>

export default App;
