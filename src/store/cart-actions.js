import { uiActions } from "./ui-slice";
import { cartActions } from "./cart-slice";


export const fetchCartData = () => {
    return async (dispatch) => {
        const fetchData = async() => {
           const response = await fetch("https://react-http-242c6-default-rtdb.firebaseio.com/cart.json");

           if(!response.ok){
            throw new Error("Could not fetch cart data!")
           }
            const data = await response.json();
            return data;
        }

        try {
            const cartData = await fetchData();
            dispatch(cartActions.replaceCart(cartData))

        } catch (err) {
            dispatch(
                uiActions.showNotification({
                  status: "error",
                  title: "Error",
                  message: "Fetching Cart Data Failed!",
                })
              );

        }
    }
}
export const sendCartData = (cart) => {
    return async (dispatch) => {
      dispatch(
        uiActions.showNotification({
          status: "pending",
          title: "Sending",
          message: "Sending Cart Data!",
        })
      );
  
      const sendRequest = async () => {
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
      };
      try {
          await sendRequest();
          dispatch(
              uiActions.showNotification({
                status: "success",
                title: "Success!",
                message: "Sent Cart Data SuccessFully!",
              })
            );
      } catch (err) {
          dispatch(
              uiActions.showNotification({
                status: "error",
                title: "Error",
                message: "Sending Cart Data Failed!",
              })
            );
      }   
      
  
      
    };
  };