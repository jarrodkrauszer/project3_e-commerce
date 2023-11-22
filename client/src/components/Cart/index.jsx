import { useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { useLazyQuery } from "@apollo/client";
import { QUERY_CHECKOUT } from "../../utils/queries";
import CartItem from "../CartItem";
import { useStoreContext } from "../../utils/store";
import { TOGGLE_CART, ADD_MULTIPLE_TO_CART } from "../../utils/actions";
import "./cart.scss";

const stripePromise = loadStripe(
  "pk_test_51OEFppCi7NAPCymNLiurx9wEzEDpzd5qGWePZtkExXNSHoL4fWn6kjBcosOuoTSIFy9mHiV8Mf3tjk63HUnYIytD009R1QwhX3"
);

const Cart = () => {
  const [state, dispatch] = useStoreContext();
  const [getCheckout, { data }] = useLazyQuery(QUERY_CHECKOUT);

  useEffect(() => {
    if (data) {
      stripePromise.then((res) => {
        res.redirectToCheckout({ sessionId: data.checkout.session });
      });
    }
  }, [data]);

  useEffect(() => {
    async function getCart() {
      const cart = state.cart;
      dispatch({ type: ADD_MULTIPLE_TO_CART, products: [...cart] });
    }

    if (!state.cart.length) {
      getCart();
    }
  }, [state.cart.length, dispatch]);

  function toggleCart() {
    dispatch({ type: TOGGLE_CART });
  }

  function calculateTotal() {
    let sum = 0;
    state.cart.forEach((item) => {
      sum += item.price * item.purchaseQuantity;
    });
    return sum.toFixed(2);
  }

  function submitCheckout() {
    localStorage.setItem("cart", JSON.stringify(state.cart));

    getCheckout({
      variables: {
        products: [...state.cart],
      },
    });
  }

  if (!state.cartOpen) {
    return (
      <div className="cart-closed" onClick={toggleCart}>
        <span role="img" aria-label="trash">
          🛒
        </span>
      </div>
    );
  }

  const altLegendStyleTitle = {
    color: "black",
    fontSize: "22px",
    fontFamily: "Raleway",
    fontWeight: "bold",
  };

  const altLegendStyleBody = {
    color: "black",
    fontSize: "16px",
    fontFamily: "Raleway",
  };

  return (
    <div className="cart">
      <div
        className="close text-xl mr-2 px-2 rounded-full bg-black text-white font-bold"
        onClick={toggleCart}
      >
        X
      </div>
      <h2 style={altLegendStyleTitle}>Shopping Cart</h2>
      {state.cart.length ? (
        <div>
          {state.cart.map((item) => (
            <CartItem key={item._id} item={item} />
          ))}

          <div className="flex-row space-between ">
            <strong
              style={altLegendStyleBody}
              className="font-extrabold italic"
            >
              Total: ${calculateTotal()}
            </strong>

            {state.user ? (
              <button
                className="ml-20 text-white bg-black rounded-lg py-1 px-2"
                onClick={submitCheckout}
              >
                Checkout
              </button>
            ) : (
              <span className="italiz"> (log in to check out)</span>
            )}
          </div>
        </div>
      ) : (
        <h3>
          <span role="img" aria-label="shocked">
            😱
          </span>
          You have not added anything to your cart yet!
        </h3>
      )}
    </div>
  );
};

export default Cart;
