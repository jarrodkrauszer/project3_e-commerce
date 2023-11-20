import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
// import Cart from '../components/Cart';
import { useStoreContext } from "../../utils/store";
import {
  REMOVE_FROM_CART,
  UPDATE_CART_QUANTITY,
  ADD_TO_CART,
  UPDATE_PRODUCTS,
} from "../../utils/actions";
import { pluralize } from "../../utils/helpers";
import { QUERY_PRODUCTS } from "../utils/queries";

import "./product.scss";

// function ProductItem(item) {
//   const [state, dispatch] = useStoreContext();

//   const { imageUrl, name, _id, price, quantity } = item;

//   const addToCart = () => {
//     console.log("Add to cart!");
//     console.log(state.cart);
//     const itemInCart = state.cart.find((cartItem) => cartItem._id === _id);
//     if (itemInCart) {
//       dispatch({
//         type: UPDATE_CART_QUANTITY,
//         _id: _id,
//         purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1,
//       });
//     } else {
//       dispatch({
//         type: ADD_TO_CART,
//         product: { ...item, purchaseQuantity: 1 },
//       });
//     }
//   };

function Detail() {
  const [state, dispatch] = useStoreContext();
  const { id } = useParams();

  const [currentProduct, setCurrentProduct] = useState({});

  const { loading, data } = useQuery(QUERY_PRODUCTS);

  const { products, cart } = state;

  useEffect(() => {
    // already in global store
    if (products.length) {
      setCurrentProduct(products.find((product) => product._id === id));
    }
    // retrieved from server
    else if (data) {
      dispatch({
        type: UPDATE_PRODUCTS,
        products: data.products,
      });

      data.products.forEach((product) => {
        idbPromise("products", "put", product);
      });
    }
    // get cache from idb
    else if (!loading) {
      idbPromise("products", "get").then((indexedProducts) => {
        dispatch({
          type: UPDATE_PRODUCTS,
          products: indexedProducts,
        });
      });
    }
  }, [products, data, loading, dispatch, id]);

  const addToCart = () => {
    const itemInCart = cart.find((cartItem) => cartItem._id === id);
    if (itemInCart) {
      dispatch({
        type: UPDATE_CART_QUANTITY,
        _id: id,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1,
      });
      idbPromise("cart", "put", {
        ...itemInCart,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1,
      });
    } else {
      dispatch({
        type: ADD_TO_CART,
        product: { ...currentProduct, purchaseQuantity: 1 },
      });
      idbPromise("cart", "put", { ...currentProduct, purchaseQuantity: 1 });
    }
  };

  const removeFromCart = () => {
    dispatch({
      type: REMOVE_FROM_CART,
      _id: currentProduct._id,
    });

    idbPromise("cart", "delete", { ...currentProduct });
  };

  return (
    <>
      <div className="product-container">
        <div className="group relative">
          <div>
            <Link to={`/product/${_id}`}>
              <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                <img
                  src={imageUrl}
                  alt={name}
                  className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                />
              </div>
            </Link>

            <div className="mt-4 flex justify-between">
              <div>
                <h3 className="text-md font-medium text-gray-700">
                  {/* <a href={product.href}> */}
                  {/* <span aria-hidden="true" className="absolute inset-0" /> */}
                  {name}
                  {/* </a> */}
                </h3>
              </div>
              <p className="text-md font-medium text-gray-900">${price}</p>
            </div>
            <div className="quantity">
              <p className="text-md font-medium text-gray-900">
                {quantity} {pluralize("item", quantity)} in stock
              </p>
            </div>
          </div>
        </div>
        <div className="add-to-cart-container">
          <button className="add-to-cart-btn" onClick={addToCart}>
            Add to cart
          </button>
        </div>
      </div>
    </>
  );
}

export default ProductItem;
