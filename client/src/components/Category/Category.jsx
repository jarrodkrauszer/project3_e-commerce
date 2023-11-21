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

  const altLegendStyle = {
    color: "white",

    fontFamily: "Raleway",
  };

  return (
    <div className="container mx-auto px-5 py-2 lg:px-32 lg:pt-24">
      <div className="-m-1 flex flex-wrap md:-m-2">
        <div className="flex w-1/2 flex-wrap">
          <div className="relative w-full m-1 md:m-2 group bg-black hover: rounded-lg transition-all duration-1000">
            <NavLink
              to="/products"
              onClick={() => handleClick(navigation[0]._id)}
            >
              <img
                alt={"Mens Clothing"}
                className="block h-full w-full rounded-lg object-cover object-center group-hover:opacity-60 transition-opacity duration-300"
                src={`/images/men.png`}
              />
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <p
                  style={altLegendStyle}
                  className="font-Raleway text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold mt-20"
                >
                  Menswear
                </p>
              </div>
            </NavLink>
          </div>

          <div className="relative w-full m-1 md:m-2 group bg-black rounded-lg hover:transition-all duration-1000">
            <NavLink
              to="/products"
              onClick={() => handleClick(navigation[1]._id)}
            >
              <img
                alt="Women"
                className="block h-full w-full rounded-lg object-cover object-center group-hover:opacity-75 transition-opacity duration-300"
                src={`/images/womens.png`}
              />
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <p
                  style={altLegendStyle}
                  className="font-Raleway text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold mt-20"
                >
                  Womenswear
                </p>
              </div>
            </NavLink>
          </div>
        </div>
        <div className="flex w-1/2 flex-wrap">
          <div className="relative w-full m-1 md:m-2 group bg-black rounded-lg hover:transition-all duration-1000">
            <NavLink
              to="/products"
              onClick={() => handleClick(navigation[3]._id)}
            >
              <img
                alt="Jackets"
                className="block h-full w-full rounded-lg object-cover object-center group-hover:opacity-75 transition-opacity duration-300"
                src={`/images/jackets.png`}
              />
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <p
                  style={altLegendStyle}
                  className="font-Raleway text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold mt-20"
                >
                  Jackets
                </p>
              </div>
            </NavLink>
          </div>
          <div className="flex w-full">
            <div className="relative w-1/2 m-1 md:m-2 group bg-black rounded-lg hover:transition-all duration-1000">
              <NavLink
                to="/products"
                onClick={() => handleClick(navigation[2]._id)}
              >
                <img
                  alt="Hats"
                  className="block h-full w-full rounded-lg object-cover object-center group-hover:opacity-75 transition-opacity duration-300"
                  src={`/images/hats.png`}
                />
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <p
                    style={altLegendStyle}
                    className="font-Raleway text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold mt-20"
                  >
                    Hats
                  </p>
                </div>
              </NavLink>
            </div>
            <div className="relative w-1/2 m-1 md:m-2 group bg-black rounded-lg hover:transition-all duration-1000">
              <NavLink
                to="/products"
                onClick={() => handleClick(navigation[4]._id)}
              >
                <img
                  alt="Sneakers"
                  className="block h-full w-full rounded-lg object-cover object-center group-hover:opacity-75 transition-opacity duration-300"
                  src={`/images/sneakers.png`}
                />
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <p
                    style={altLegendStyle}
                    className="font-Raleway text-base sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold mt-20"
                  >
                    Sneakers
                  </p>
                </div>
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Category;
