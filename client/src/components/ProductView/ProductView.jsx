
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import Cart from "../Cart";
import { useStoreContext } from "../../utils/store";

import {
  REMOVE_FROM_CART,
  UPDATE_CART_QUANTITY,
  ADD_TO_CART,
  UPDATE_PRODUCTS,

} from "../../utils/actions";
import { QUERY_PRODUCTS } from "../../utils/queries";

function ProductView() {

  const [state, dispatch] = useStoreContext();
  const { id } = useParams();
  const [currentProduct, setCurrentProduct] = useState({});
  const { loading, data } = useQuery(QUERY_PRODUCTS);

  const item = {
    _id: currentProduct._id,
    name: currentProduct.name,
    imageUrl: currentProduct.imageUrl,
    price: currentProduct.price,
    quantity: currentProduct.quantity
  }

  useEffect(() => {
    // already in global store
    if (state.products.length) {
      setCurrentProduct(state.products.find((product) => product._id === id));
    }
    // retrieved from server
    else if (data) {
      dispatch({
        type: UPDATE_PRODUCTS,
        products: data.products,
      });
    }
  }, [state.products, data, loading, dispatch, id]);

  const addToCart = () => {
    const itemInCart = state.cart.find((cartItem) => cartItem._id === id);
    if (itemInCart) {
      dispatch({
        type: UPDATE_CART_QUANTITY,
        _id: id,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1,
      });
    } else {
      dispatch({
        type: ADD_TO_CART,
        product: { ...item, purchaseQuantity: 1 },
      });
    }
  };

  return (
    <>
      <div className="bg-white">
        <div className="pt-6">
          <nav aria-label="Breadcrumb">
            <ol
              role="list"
              className="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8"
            >
              <li key={currentProduct._id}>
                <div className="flex items-center">
                  <a
                    className="mr-2 text-sm font-medium text-gray-900"
                  >
                    {currentProduct.name}
                  </a>
                  <svg
                    width={16}
                    height={20}
                    viewBox="0 0 16 20"
                    fill="currentColor"
                    aria-hidden="true"
                    className="h-5 w-4 text-gray-300"
                  >
                    <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                  </svg>
                </div>
              </li>
              <li className="text-sm">
                <a
                  aria-current="page"
                  className="font-medium text-gray-500 hover:text-gray-600"
                >
                  {currentProduct.name}
                </a>
              </li>
            </ol>
          </nav>
          {/* Image gallery */}
          <div className="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16">
            {/* Left column for the image */}
            <div className="lg:col-span-1 lg:pr-8">
              <div className="flex justify-center mb-6">
                <img
                  src={currentProduct.imageUrl}
                  alt={currentProduct.name}
                  className="object-cover h-full w-full object-center rounded-lg"
                />
              </div>
            </div>
            {/* Product information */}
            <div className="lg:col-span-2 lg:border-gray-200 lg:pb-16 lg:pt-6">
              <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                {currentProduct.name}
              </h1>
              <p className="text-3xl tracking-tight text-gray-900">
                ${currentProduct.price}
              </p>
              <h3>Quantity: {currentProduct.quantity}</h3>
              <button
                // type="submit"
                onClick={addToCart}
                className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-black px-8 py-3 text-base font-medium text-white hover:bg-gray focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Add to cart
              </button>
              {/* Additional product details */}
              <div>
                <h3 className="sr-only">Description</h3>
                <div className="space-y-6 mt-10">
                  <p className="text-base text-gray-900">{currentProduct.description}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Cart />
    </>
  );
}
export default ProductView;
