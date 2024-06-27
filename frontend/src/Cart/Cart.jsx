import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const Cart = () => {
  const [cart, setCart] = useState();
  const [spinner, setSpinner] = useState(true);
  useEffect(() => {
    async function getCartitems() {
      try {
        let response = await axios.get("http://localhost:35000/cart/getItems");
        setSpinner(false);
        setCart(response);
      } catch (error) {
        toast.error(error.message);
      }
    }
    getCartitems();
  }, []);
  return <div></div>;
};

export default Cart;
