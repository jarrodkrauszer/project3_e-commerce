import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { gql } from "@apollo/client";
import { NavLink } from "react-router-dom";
import { useStoreContext } from "../../utils/store";
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
          <div className="w-full p-1 md:p-2 hover:opacity-75">
            <NavLink
              to="/products"
              onClick={() => handleClick(navigation[0]._id)}
            >
              <img
                alt={"Mens Clothing"}
                className="block h-full w-full rounded-lg object-cover object-center hover:opacity-75 transition-opacity duration-300"
                src={`/images/men.png`}
              />
            </NavLink>
          </div>
          <div className="w-full h-100 p-1 md:p-2 hover:opacity-75">
            <NavLink
              to="/products"
              onClick={() => handleClick(navigation[1]._id)}
            >
              <img
                alt="Women"
                className="block h-full w-full rounded-lg object-cover object-center hover:opacity-75 transition-opacity duration-300"
                src={`/images/womens.png`}
              />
            </NavLink>
          </div>
        </div>
        <div className="flex w-1/2 flex-wrap">
          <div className="w-full p-1 md:p-2 hover:opacity-75">
            <NavLink
              to="/products"
              onClick={() => handleClick(navigation[3]._id)}
            >
              <img
                alt="Jackets"
                className="block h-full w-full rounded-lg object-cover object-center hover:opacity-75 transition-opacity duration-300"
                src={`/images/jackets.png`}
              />
            </NavLink>
          </div>
          <div className="w-1/2 p-1 md:p-2 hover:opacity-75">
            <NavLink
              to="/products"
              onClick={() => handleClick(navigation[2]._id)}
              className="relative block h-full w-full rounded-lg overflow-hidden hover:opacity-75 transition-opacity duration-300"
            >
              <img
                alt="Hats"
                className="block h-full w-full rounded-lg object-cover object-center "
                src={`/images/hats.png`}
              />
            </NavLink>
          </div>
          <div className="w-1/2 p-1 md:p-2 hover:opacity-75">
            <NavLink
              to="/products"
              onClick={() => handleClick(navigation[4]._id)}
            >
              <img
                alt="Sneakers"
                className="block h-full w-full rounded-lg object-cover object-center hover:opacity-75 transition-opacity duration-300"
                src={`/images/sneakers.png`}
              />
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Category;
