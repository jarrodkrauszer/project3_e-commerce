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

const QUERY_PRODUCTS = gql`
  query Products($category: ID, $name: String) {
    products(category: $category, name: $name) {
      _id
      name
      category {
        _id
        name
      }
    }
  }
`;

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
      <div className="category-container mx-10 h-80">
        <div className="flex-container">
          <div>
            <img
              src={Hat}
              alt="Hat"
              className="object-contain w-full h-full px-1 transition duration-300 ease-in-out hover:brightness-75"
              onClick={() => handleCategoryClick("hat")}
            />
          </div>
          <div>
            <img
              src={Jacket}
              alt="Jacket"
              className="w-full h-full px-1 transition duration-300 ease-in-out hover:brightness-75"
              onClick={() => handleCategoryClick("jacket")}
            />
          </div>
        </div>

        <div className="flex-container">
          <img
            src={Men}
            alt="Men"
            className="w-full h-full px-1 transition duration-300 ease-in-out hover:brightness-75"
            onClick={() => handleCategoryClick("men")}
          />
        </div>
      </div>
      <div className="category-container mx-10">
        <div className="flex-container">
          <img
            src={Women}
            alt="Women"
            className="w-full h-full px-1 transition duration-300 ease-in-out hover:brightness-75"
            onClick={() => handleCategoryClick("women")}
          />
        </div>

        {/* New Row for the last two items */}
        <div className="flex-container">
          <img
            src={Sneakers}
            className="w-full h-full px-1 transition duration-300 ease-in-out hover:brightness-75 hover:scale-105"
            alt="Sneakers"
            onClick={() => handleCategoryClick("sneakers")}
          />
        </div>
      </div>
    </div>
  );
};

export default Category;
