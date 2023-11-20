import { useEffect } from "react";
import { useStoreContext } from "../../utils/store";
import { UPDATE_PRODUCTS } from "../../utils/actions";
import { useQuery } from "@apollo/client";
import { QUERY_PRODUCTS, QUERY_ALL_PRODUCTS } from "../../utils/queries";

import { ADD_TO_CART, UPDATE_CART_QUANTITY } from "../../utils/actions";

import ProductItem from "../ProductItem/ProductItem";

function ProductList() {
  const [state, dispatch] = useStoreContext();

  const { loading, data } = useQuery(QUERY_PRODUCTS);

  const altLegendStyle = {
    color: "black",
    fontSize: "48px",
    // background: "white",
    fontFamily: "Raleway",
    fontWeight: "bold",
  };

  useEffect(() => {
    if (data) {
      dispatch({
        type: UPDATE_PRODUCTS,
        products: data.products,
      });
    }
  }, [data, loading, dispatch]);

  function getCategoryName() {
    const category = state.categories.find((category) => {
      return category._id === state.currentCategory;
    });

    if (!category) return "Product Page";

    return category.name;
  }

  function filterProducts() {
    if (!state.currentCategory) {
      return state.products;
    }

    return state.products.filter(
      (product) => product.category._id === state.currentCategory
    );
  }

  return (
    <div className="bg-white">
      <div className="category-name-container">
        <h1 style={altLegendStyle} className="category-name">
          {getCategoryName()}
        </h1>
      </div>
      <div className="mx-auto max-w-2xl px-4 pb-10 sm:px-6 sm:py-12 lg:max-w-7xl lg:px-8">
        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {filterProducts().map((product) => (
            <ProductItem
              key={product._id}
              _id={product._id}
              imageUrl={product.imageUrl}
              name={product.name}
              price={product.price}
              quantity={product.quantity}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProductList;
