import React from "react";
import { AppContext } from "../../contexts/AppContext";

export const useCart = () => {
  const { cartItems, setCartItems } = React.useContext(AppContext);

  const totalPrice = cartItems.reduce(
    (sum, obj) => Number(obj.price.match(/\d+/g).join("")) + sum,
    0
  );

  return { totalPrice, cartItems, setCartItems };
};
