import { Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { QUERY_USER } from "../utils/queries";
import "../styles/orderHistory.scss";

function OrderHistory() {
  const { data } = useQuery(QUERY_USER);
  let user;
  if (data) {
    user = data.user;
  }

  return (
    <>
      <div>
        {user ? (
          <div className="">
            <h2 className=" font-bold text-4xl text-center py-8">
              {user.firstName}'s Order History
            </h2>
            {user.orders.map((order) => (
              <div key={order._id} className="font-bold">
                <h3>
                  {new Date(parseInt(order.purchaseDate)).toLocaleDateString()}
                </h3>
                <div className="flex-row">
                  {order.products.map(
                    ({ _id, imageUrl, name, price }, index) => (
                      <div key={index} className="px-1 py-1">
                        <Link to={`/products/${_id}`}>
                          <img alt={name} src={imageUrl} />
                          <p>{name}</p>
                        </Link>
                        <div>
                          <span>${price}</span>
                        </div>
                      </div>
                    )
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : null}
      </div>
    </>
  );
}

export default OrderHistory;
