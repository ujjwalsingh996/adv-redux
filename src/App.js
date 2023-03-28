import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { uiActions } from "./store/ui-slice";
import React from "react";
import Notification from "./components/UI/Notification";

function App() {
  
  const dispatch = useDispatch();

  const showCart = useSelector((state) => state.ui.cartIsVisible);
  const cart = useSelector((state) => state.cart);


  const notification = useSelector(state => state.ui.notification);
  console.log(notification)

  useEffect(() => {
    const sendCartData = async () => {
      dispatch(
        uiActions.showNotification({
          status: "pending",
          title: "Sending",
          message: "Sending Cart Data!",
        })
      );
      const response = await fetch(
        "https://react-http-242c6-default-rtdb.firebaseio.com/cart.json",
        {
          method: "PUT",
          body: JSON.stringify(cart),
        }
      );

      if (!response.ok) {
        throw new Error("Sending cart data failed.");
      }
      dispatch(
        uiActions.showNotification({
          status: "success",
          title: "Success!",
          message: "Sent Cart Data SuccessFully!",
        })
      );
    };


    sendCartData().catch((err) => {
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "Error",
          message: "Sending Cart Data Failed!",
        })
      );
    });
  }, [cart, dispatch]);

  return (
    <React.Fragment>
      {notification && (
        <Notification
          status={notification.status}
          title={notification.title}
          message={notification.message}
        />
      )}
      <Layout>
        {showCart && <Cart />}
        <Products />
      </Layout>
    </React.Fragment>
  );
}

export default App;
