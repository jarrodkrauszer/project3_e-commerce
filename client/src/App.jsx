import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import { useQuery, gql } from "@apollo/client";

import Header from "./components/Header";
import Carousel from "./components/Carousel";

import Auth from "./pages/Auth";

// import { useStore } from './store'

// const AUTHENTICATE = gql`
//   query {
//     authenticate {
//       _id
//       email
//       hobbies {
//         _id
//         name
//       }
//     }
//   }
// `;

function App() {
  // const { setState } = useStore()

  // const { loading, error, data: userData } = useQuery(AUTHENTICATE)

  // useEffect(() => {
  //   if (userData) {
  //     setState(oldState => ({
  //       ...oldState,
  //       user: userData.authenticate
  //     }))
  //   }
  // }, [userData])

  const loading = false;

  return loading ? (
    <h3 className="d-flex justify-content-center align-items-center vh-100">
      Loading...
    </h3>
  ) : (
    <>
      <Header />
      {/* <Carousel /> */}


      <Routes>
        {/* <Route path="/" element={<Landing />} /> */}
        <Route path="/register" element={<Auth isLogin={false} />} />
        <Route path="/login" element={<Auth isLogin={true} />} />

        {/* <Route path="*" element={<NotFound />} /> */}
      </Routes>

    </>
  );
}

export default App;
