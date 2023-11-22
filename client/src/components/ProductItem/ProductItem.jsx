import { Link } from "react-router-dom";
import { useStoreContext } from "../../utils/store";
import { ADD_TO_CART, UPDATE_CART_QUANTITY } from "../../utils/actions";
import { pluralize } from "../../utils/helpers";

import "./product.scss";

function ProductItem(item) {
  const [state, dispatch] = useStoreContext();

  const { imageUrl, name, _id, price, quantity } = item;

  const addToCart = () => {
    const itemInCart = state.cart.find((cartItem) => cartItem._id === _id);
    if (itemInCart) {
      dispatch({
        type: UPDATE_CART_QUANTITY,
        _id: _id,
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
      <div className="product-container">
        <div className="group relative">
          <div>
            <Link to={`/products/${_id}`}>
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
