import { Link } from "react-router-dom";
import { useStoreContext } from "../../utils/store";
import { ADD_TO_CART, UPDATE_CART_QUANTITY } from "../../utils/actions";

function ProductItem(item) {
  const [state, dispatch] = useStoreContext();

  const {
    imageUrl,
    name,
    _id,
    price,
    quantity
  } = item;

  const addToCart = () => {
    console.log('Add to cart!')
    console.log(state.cart)
    const itemInCart = state.cart.find((cartItem) => cartItem._id === _id)
    if (itemInCart) {
      dispatch({
        type: UPDATE_CART_QUANTITY,
        _id: _id,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1
      });
    } else {
      dispatch({
        type: ADD_TO_CART,
        product: { ...item, purchaseQuantity: 1 }
      });
    }
  }

  return (
    <div className="group relative">
      <div>
        <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
          <img
            src={imageUrl}
            alt={name}
            className="h-full w-full object-cover object-center lg:h-full lg:w-full"
          />
        </div>

        <div className="mt-4 flex justify-between">
          <div>
            <h3 className="text-sm text-gray-700">
              {/* <a href={product.href}> */}
              {/* <span aria-hidden="true" className="absolute inset-0" /> */}
              {name}
              {/* </a> */}
            </h3>
          </div>
          <p className="text-sm font-medium text-gray-900">{price}</p>
          <p className="text-sm font-medium text-gray-900">{quantity}</p>
        </div>
      </div>
      <button onClick={addToCart}>Add to cart</button>
    </div>
  );
}

export default ProductItem;
