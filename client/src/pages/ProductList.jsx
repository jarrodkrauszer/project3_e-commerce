import { useEffect } from 'react';
import { useStoreContext } from '../utils/store';
import { UPDATE_PRODUCTS } from '../utils/actions';
import { useQuery } from '@apollo/client';
import { QUERY_PRODUCTS, QUERY_ALL_PRODUCTS } from '../utils/queries';

import { ADD_TO_CART, UPDATE_CART_QUANTITY } from '../utils/actions';


function ProductList() {
  const [state, dispatch] = useStoreContext();

  const { loading, data } = useQuery(QUERY_PRODUCTS);

  useEffect(() => {
    if (data) {
      dispatch({
        type: UPDATE_PRODUCTS,
        products: data.products,
      });
    }
  }, [data, loading, dispatch]);

  const addToCart = () => {
    console.log('Add Cart')
    const itemInCart = state.cart.find((cartItem) => cartItem._id === _id)
    if (itemInCart) {
      dispatch({
        type: UPDATE_CART_QUANTITY,
        _id: _id,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1
      });
    } else {
      // dispatch({
      //   type: ADD_TO_CART,
      //   product: { ...item, purchaseQuantity: 1 }
      // });
    }
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
      <h1>Product Page</h1>
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">

        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {filterProducts().map((product) => (
            <div key={product._id} className="group relative">
              <div>
                <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                  />
                </div>
                <div className="mt-4 flex justify-between">
                  <div>
                    <h3 className="text-sm text-gray-700">
                      {/* <a href={product.href}> */}
                      <span aria-hidden="true" className="absolute inset-0" />
                      {product.name}
                      {/* </a> */}
                    </h3>
                  </div>
                  <p className="text-sm font-medium text-gray-900">{product.price}</p>
                </div>
              </div>
              <button className="add-to-cart-btn" onClick={addToCart}>Add to cart</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ProductList;
