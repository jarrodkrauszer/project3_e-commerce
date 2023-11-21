import { useStoreContext } from "../../utils/store";
import { REMOVE_FROM_CART, UPDATE_CART_QUANTITY } from "../../utils/actions";

const CartItem = ({ item }) => {
  const [, dispatch] = useStoreContext();

  const removeFromCart = (item) => {
    dispatch({
      type: REMOVE_FROM_CART,
      _id: item._id,
    });
  };

  const onChange = (e) => {
    const value = e.target.value;
    if (value === "0") {
      dispatch({
        type: REMOVE_FROM_CART,
        _id: item._id,
      });
    } else {
      dispatch({
        type: UPDATE_CART_QUANTITY,
        _id: item._id,
        purchaseQuantity: parseInt(value),
      });
    }
  };

  const altLegendStyle = {
    color: "black",
    fontSize: "16px",
    fontFamily: "Raleway",
    fontWeight: "bold",
  };

  const inputStyle = {
    ...altLegendStyle,
    marginLeft: "30px",
  };

  return (
    <div className="flex-row">
      <div>
        <img src={`/images/${item.image}`} alt="" />
      </div>
      <div>
        <div style={altLegendStyle}>
          {item.name}, ${item.price}
        </div>
        <div>
          <span style={altLegendStyle}>Qty: </span>
          <input
            type="number"
            placeholder="-1"
            style={altLegendStyle}
            value={item.purchaseQuantity}
            onChange={onChange}
            className="hover:cursor-pointer bg-gray-300 rounded-lg"
          />
          <span
            role="img"
            aria-label="trash"
            onClick={() => removeFromCart(item)}
            className="hover:cursor-pointer"
          >
            🗑️
          </span>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
