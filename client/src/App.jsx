import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import { useQuery, gql } from "@apollo/client";

import { UPDATE_USER } from "./utils/actions";
import Header from "./components/Header";
import Carousel from "./components/Carousel";

import Auth from "./pages/Auth";
import Landing from "./pages/Landing";
import Product from "./pages/Product";

import { useStoreContext } from "./utils/store";

const AUTHENTICATE = gql`
  query {
    authenticate {
      _id
      email
    }
  }
`;

function App() {
  const [state, dispatch] = useStoreContext();

  const { loading, error, data: userData } = useQuery(AUTHENTICATE);

  useEffect(() => {
    if (userData) {
      console.log(userData.authenticate);
      dispatch({
        type: UPDATE_USER,
        user: userData.authenticate,
      });
    }
  }, [userData]);

  return loading ? (
    <h3 className="d-flex justify-content-center align-items-center vh-100">
      Loading...
    </h3>
  ) : (
    <>
      <Header />

      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/products" element={<Product />} />
        <Route path="/register" element={<Auth isLogin={false} />} />
        <Route path="/login" element={<Auth isLogin={true} />} />

        {/* <Route path="*" element={<NotFound />} /> */}
      </Routes>
    </>
  );
}

export default App;
