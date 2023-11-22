import { useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_ORDER, UPDATE_PRODUCT } from '../utils/mutations';
import { useStoreContext } from '../utils/store'

function OrderProcessed() {
  // const [state, dispatch] = useStoreContext();
  const [addOrder] = useMutation(ADD_ORDER);
  const [updateProduct] = useMutation(UPDATE_PRODUCT)

  useEffect(() => {
    async function saveOrder() {
      const cart = JSON.parse(localStorage.getItem('cart')) || [];
      console.log(cart)
      const products = cart.map((item) => ({
        id: item._id,
        purchaseQuantity: item.purchaseQuantity
      }))
      localStorage.clear()


      if (products.length) {
        const { data } = await addOrder({ variables: { products } })
      }

      setTimeout(() => {
        window.location.assign('/');
      }, 2000);
    }

    saveOrder();
  }, [addOrder]);

  return (
    <div>
      <div style={{ height: 560, clear: "both", paddingTop: 120, textAlign: "center" }}>
        <h1>Success!</h1>
        <h2>Thank you for your purchase!</h2>
        <h2>You will now be redirected to the home page</h2>
      </div>
    </div>
  );
}

export default OrderProcessed;
