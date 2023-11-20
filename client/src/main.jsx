import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./index.scss";
import { StoreProvider } from "../src/utils/store.jsx";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
} from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import ProductViews from "./pages/ProductView.jsx";

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message, locations, path }) => {
      console.error(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      );
    });
  }

  if (networkError) {
    console.error(`[Network error]: ${networkError}`);
  }
});

const httpLink = new HttpLink({
  uri: "/graphql",
});

const client = new ApolloClient({
  link: errorLink.concat(httpLink),
  cache: new InMemoryCache(),
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>
      <StoreProvider>
        <ApolloProvider client={client}>
          <Switch>
            <Route path="/product/:id">
              <ProductViews product={productData} />
            </Route>
          </Switch>
          <App />
        </ApolloProvider>
      </StoreProvider>
    </Router>
  </React.StrictMode>
);
