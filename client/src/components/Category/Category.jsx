import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { gql } from "@apollo/client";

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

  return (
    <div className="flex flex-col items-center py-3 bg-gray-700">
      <div className="flex-container category-container ">
        <div className="flex-container">
          <div>
            <img
              src={Hat}
              alt="Hat"
              className="object-contain w-full h-full px-1 transition duration-300 ease-in-out hover:brightness-75 "
              onClick={() => handleCategoryClick("hat")}
            />
          </div>
          <div>
            <img
              src={Jacket}
              alt="Jacket"
              className="px-1 transition duration-300 ease-in-out hover:brightness-75 "
              onClick={() => handleCategoryClick("jacket")}
            />
          </div>
        </div>

        <div className="flex-container w-full h-full">
          <img
            src={Men}
            alt="Men"
            className="px-1 w-full transition duration-300 ease-in-out hover:brightness-75 "
            onClick={() => handleCategoryClick("men")}
          />
        </div>
      </div>
      <div className="flex-container category-container ">
        <div className="flex-container w-full h-full">
          <img
            src={Women}
            alt="Women"
            className=" px-1 transition duration-300 ease-in-out hover:brightness-75 "
            onClick={() => handleCategoryClick("women")}
          />
        </div>

        <div className="flex-container">
          <img
            src={Sneakers}
            className="px-1 transition duration-300 ease-in-out hover:brightness-75 "
            alt="Sneakers"
            onClick={() => handleCategoryClick("sneakers")}
          />
        </div>
      </div>
    </div>
  );
};

export default Category;
