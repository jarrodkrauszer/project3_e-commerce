import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { gql } from "@apollo/client";
import { NavLink } from "react-router-dom";
import { useStoreContext } from "../../utils/store";

import Hat from "../../assets/hats.png";
import Jacket from "../../assets/jackets.png";
import Men from "../../assets/men.png";
import Women from "../../assets/womens.png";
import Sneakers from "../../assets/sneakers.png";

import {
  QUERY_PRODUCTS,
  QUERY_ALL_PRODUCTS,
  QUERY_CATEGORIES,
} from "../../utils/queries";

import { UPDATE_CURRENT_CATEGORY } from "../../utils/actions";

import "./category.scss";

function Category() {
  const [category, setCategory] = useState(null);
  const { data: categoryData } = useQuery(QUERY_CATEGORIES);
  const { loading, error, data } = useQuery(QUERY_PRODUCTS, {
    variables: { category },
  });
  const navigation = categoryData?.categories || [];
  const [state, dispatch] = useStoreContext();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const handleClick = (id) => {
    // console.error(navigation[0]);
    dispatch({
      type: UPDATE_CURRENT_CATEGORY,
      currentCategory: id,
    });
  };

  return (
    <div className="container mx-auto px-5 py-2 lg:px-32 lg:pt-24">
      <div className="-m-1 flex flex-wrap md:-m-2">
        <div className="flex w-1/2 flex-wrap">
          <div className="w-full p-1 md:p-2">
            <NavLink
              to="/products"
              onClick={() => handleClick(navigation[0]._id)}
            >
              <img
                alt={"Mens Clothing"}
                className="block h-full w-full rounded-lg object-cover object-center hover:opacity-75 transition-opacity duration-300"
                src={Men}
              />
            </NavLink>
          </div>
          <div className="w-full h-100 p-1 md:p-2">
            <NavLink
              to="/products"
              onClick={() => handleClick(navigation[1]._id)}
            >
              <img
                alt="Women"
                className="block h-full w-full rounded-lg object-cover object-center hover:opacity-75 transition-opacity duration-300"
                src={Women}
              />
            </NavLink>
          </div>
        </div>
        <div className="flex w-1/2 flex-wrap">
          <div className="w-full p-1 md:p-2">
            <NavLink
              to="/products"
              onClick={() => handleClick(navigation[3]._id)}
            >
              <img
                alt="Jackets"
                className="block h-full w-full rounded-lg object-cover object-center hover:opacity-75 transition-opacity duration-300"
                src={Jacket}
              />
            </NavLink>
          </div>
          <div className="w-1/2 p-1 md:p-2">
            <NavLink
              to="/products"
              onClick={() => handleClick(navigation[2]._id)}
              className="relative block h-full w-full rounded-lg overflow-hidden hover:opacity-75 transition-opacity duration-300"
            >
              <img
                alt="Hats"
                className="block h-full w-full rounded-lg object-cover object-center "
                src={Hat}
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <p className="category-text text-white  font-bold bg-black rounded-lg p-3">
                  Hats
                </p>
              </div>
            </NavLink>
          </div>
          <div className="w-1/2 p-1 md:p-2">
            <NavLink
              to="/products"
              onClick={() => handleClick(navigation[4]._id)}
            >
              <img
                alt="Sneakers"
                className="block h-full w-full rounded-lg object-cover object-center hover:opacity-75 transition-opacity duration-300"
                src={Sneakers}
              />
            </NavLink>
          </div>
        </div>
      </div>
    </div>
    // <div className="flex flex-col items-center py-3 bg-white category-cont">
    //   <div className="flex-container category-container ">
    //     <div className="flex-container w-80">
    //       <NavLink
    //         to="/products"
    //         onClick={() => handleClick(navigation[2]._id)}
    //       >
    //         <img
    //           src="https://i.ibb.co/ZYW3VTp/brown-brim.png"
    //           alt="Hat"
    //           className="object-fill w-full h-full px-1 transition duration-300 ease-in-out hover:brightness-75 responsive-image"
    //         />
    //       </NavLink>
    //       <NavLink
    //         to="/products"
    //         onClick={() => handleClick(navigation[3]._id)}
    //       >
    //         <img
    //           src="https://i.ibb.co/s96FpdP/brown-shearling.png"
    //           alt="Jacket"
    //           className="object-fill w-full h-10 mt-1.5 px-1 transition duration-300 ease-in-out hover:brightness-75 responsive-image"
    //         />
    //       </NavLink>
    //     </div>

    //     <NavLink to="/products" onClick={() => handleClick(navigation[0]._id)}>
    //       <div className="flex-container w-full h-full">
    //         <img
    //           src={Men}
    //           alt="Men"
    //           className="object-fill w-full h-full px-1 w-full transition duration-300 ease-in-out hover:brightness-75 responsive-image"
    //         />
    //       </div>
    //     </NavLink>
    //   </div>

    //   <div className="flex-container category-container ">
    //     <NavLink to="/products" onClick={() => handleClick(navigation[1]._id)}>
    //       <div className="flex-container w-full h-full">
    //         <img
    //           src={Women}
    //           alt="Women"
    //           className="object-fill w-full h-full px-1 transition duration-300 ease-in-out hover:brightness-75 responsive-image"
    //         />
    //       </div>
    //     </NavLink>

    //     <NavLink to="/products" onClick={() => handleClick(navigation[4]._id)}>
    //       <div className="flex-container">
    //         <img
    //           src={Sneakers}
    //           className="object-fill w-full h-full px-1 transition duration-300 ease-in-out hover:brightness-75 responsive-image"
    //           alt="Sneakers"
    //         />
    //       </div>
    //     </NavLink>
    //   </div>
    // </div>
  );
}

export default Category;
