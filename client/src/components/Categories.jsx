import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { gql } from "@apollo/client";

import Hat from "../assets/hats.png";
import Jacket from "../assets/jackets.png";
import Men from "../assets/men.png";
import Women from "../assets/women.png";
import Sneakers from "../assets/sneakers.png";

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

const ProductsByCategory = () => {
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
      <div>
        <img src={Hat} alt="Hat" onClick={() => handleCategoryClick("hat")} />
        <img
          src={Jacket}
          alt="Jacket"
          onClick={() => handleCategoryClick("jacket")}
        />
        <img src={Men} alt="Men" onClick={() => handleCategoryClick("men")} />
        <img
          src={Women}
          alt="Women"
          onClick={() => handleCategoryClick("women")}
        />
        <img
          src={Sneakers}
          alt="Sneakers"
          onClick={() => handleCategoryClick("sneakers")}
        />
      </div>
      {data.products.map((product) => (
        <div key={product._id}>
          <h3>{product.name}</h3>
          <p>Category: {product.category.name}</p>
        </div>
      ))}
    </div>
  );
};

export default ProductsByCategory;
