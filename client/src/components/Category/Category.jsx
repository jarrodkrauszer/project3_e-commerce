import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { gql } from "@apollo/client";
import { NavLink } from "react-router-dom";

import Hat from "../../assets/hats.png";
import Jacket from "../../assets/jackets.png";
import Men from "../../assets/men.png";
import Women from "../../assets/womens.png";
import Sneakers from "../../assets/sneakers.png";

import { QUERY_PRODUCTS, QUERY_ALL_PRODUCTS } from "../../utils/queries";

import "./category.scss";

const Category = () => {
  const [category, setCategory] = useState(null);
  const { loading, error, data } = useQuery(QUERY_PRODUCTS, {
    variables: { category },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const handleCategoryClick = (category) => {
    setCategory(category);
  };

  const handleClick = (id) => {
    console.log(id)
    dispatch({
      type: UPDATE_CURRENT_CATEGORY,
      currentCategory: id,
    });
  };

  return (
    <div className="flex flex-col items-center py-3 bg-white category-cont">
      <div className="flex-container category-container ">
        <div className="flex-container">
          <NavLink to="/products" onClick={() => handleCategoryClick("Hats")}>
            <img
              src={Hat}
              alt="Hat"
              className="object-contain w-full h-full px-1 transition duration-300 ease-in-out hover:brightness-75 responsive-image"
            />
          </NavLink>
          <NavLink to="/products" onClick={() => handleCategoryClick("jacket")}>
            <img
              src={Jacket}
              alt="Jacket"
              className="mt-1.5 px-1 transition duration-300 ease-in-out hover:brightness-75 responsive-image"
            />
          </NavLink>
        </div>

        <NavLink
          to="/products"
          onClick={() => handleClick("6557daeb5835043afd4692b8")}
        >
          <div className="flex-container w-full h-full">
            <img
              src={Men}
              alt="Men"
              className="px-1 w-full transition duration-300 ease-in-out hover:brightness-75 responsive-image"
            />
          </div>
        </NavLink>
      </div>

      <div className="flex-container category-container ">
        <NavLink to="/products" onClick={() => handleCategoryClick("women")}>
          <div className="flex-container w-full h-full">
            <img
              src={Women}
              alt="Women"
              className=" px-1 transition duration-300 ease-in-out hover:brightness-75 responsive-image"
            />
          </div>
        </NavLink>

        <NavLink to="/products" onClick={() => handleCategoryClick("sneakers")}>
          <div className="flex-container">
            <img
              src={Sneakers}
              className="px-1 transition duration-300 ease-in-out hover:brightness-75 responsive-image"
              alt="Sneakers"
            />
          </div>
        </NavLink>
      </div>
    </div>
  );
};

export default Category;
