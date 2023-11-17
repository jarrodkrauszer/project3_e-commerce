import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { gql } from "@apollo/client";

import Hat from "../../assets/hats.png";
import Jacket from "../../assets/jackets.png";
import Men from "../../assets/men.png";
import Women from "../../assets/womens.png";
import Sneakers from "../../assets/sneakers.png";

import { QUERY_PRODUCTS, QUERY_ALL_PRODUCTS } from '../../utils/queries';

import './category.scss'


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
    <div>
      <h2>Products by Category: {category}</h2>
      <div className="category-container">
        <div>
          <img src={Hat} alt="Hat" onClick={() => handleCategoryClick("hat")} />
        </div>
        <div>
          <img
            src={Jacket}
            alt="Jacket"
            onClick={() => handleCategoryClick("jacket")}
          />
        </div>
        <div>
          <img src={Men} alt="Men" onClick={() => handleCategoryClick("men")} />
        </div>
        <div>
          <img
            src={Women}
            alt="Women"
            onClick={() => handleCategoryClick("women")}
          />
        </div>
        <div>
          <img
            src={Sneakers}
            alt="Sneakers"
            onClick={() => handleCategoryClick("sneakers")}
          />
        </div>
      </div>
    </div>
  );
};

export default Category;
