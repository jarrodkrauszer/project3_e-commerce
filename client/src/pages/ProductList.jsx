import { useEffect } from 'react';
import { useStoreContext } from '../utils/store';
import { UPDATE_PRODUCTS } from '../utils/actions';
import { useQuery } from '@apollo/client';
import { QUERY_PRODUCTS, QUERY_ALL_PRODUCTS } from '../utils/queries';

import { ADD_TO_CART, UPDATE_CART_QUANTITY } from '../utils/actions';

import ProductItem from '../components/ProductItem/ProductItem';


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
  )
}

export default ProductList;
