import { Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { QUERY_USER } from "../utils/queries";
function OrderHistory() {
  const { data } = useQuery(QUERY_USER);
  let user;
  if (data) {
    user = data.user;
  }
  return (
    <>
      {user && (
        <div className="flex-column justify-center">
          {" "}
          {/* Add flex and justify-center classes */}
          <h2 className="text-center font-bold text-4xl py-8">
            {user.firstName}'s Order History
          </h2>
          {user.orders.map((order) => (
            <div
              key={order._id}
              className="my-2 mx-8 inline-block w-auto border-2 rounded-lg border-black bg-gray-100 p-3"
            >
              <h3 className="text-center font-bold text-bold">
                {new Date(parseInt(order.purchaseDate)).toDateString()}
              </h3>
              <div className="flex flex-wrap">
                {order.products.map(({ _id, imageUrl, name, price }, index) => (
                  <div key={index} className="flex-shrink-0  p-2">
                    <Link to={`/products/${_id}`} className="block">
                      <img
                        alt={name}
                        src={imageUrl}
                        className="max-w-full h-auto"
                      />
                      <p className="text-center">{name}</p>
                    </Link>
                    <div className="text-center">
                      <span>${price}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
export default OrderHistory;
