import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import { useQuery, gql } from "@apollo/client";

import { UPDATE_USER } from "./utils/actions";
import Header from "./components/Header";

import Auth from "./pages/Auth";
import Landing from "./pages/Landing";
import Products from "./pages/Products";
import ProductViews from "./pages/ProductView";
import OrderProcessed from "./pages/OrderProcessed";
import ProductViews from "./pages/ProductView";

import { useStoreContext } from "./utils/store";
import OrderHistory from "./pages/OrderHistory";

import { QUERY_AUTHENTICATE } from "../src/utils/queries";

function App() {
  const [state, dispatch] = useStoreContext();

  const { loading, error, data: userData } = useQuery(QUERY_AUTHENTICATE);

  useEffect(() => {
    if (userData) {
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
        <Route path="/products" element={<Products />} />
        <Route path="/productViews" element={<ProductViews />} />

        <Route path="/register" element={<Auth isLogin={false} />} />
        <Route path="/login" element={<Auth isLogin={true} />} />
        <Route path="/order-history" element={<OrderHistory />} />
        <Route path="/success" element={<OrderProcessed />} />

        {/* <Route path="*" element={<NotFound />} /> */}
      </Routes>
    </>
  );
}

export default App;
