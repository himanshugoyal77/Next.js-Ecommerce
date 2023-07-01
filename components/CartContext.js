import React, { createContext, useEffect, useState } from "react";

export const CartContext = createContext({});

function CartContextProvider({ children }) {
  const ls = typeof window !== "undefined" ? window.localStorage : null;
  const [cartProducts, setCartProducts] = useState([]);

  useEffect(() => {
    if (cartProducts?.length > 0) {
      ls?.setItem("cart", JSON.stringify(cartProducts));
    }
  }, [cartProducts]);

  useEffect(() => {
    if (ls && ls.getItem("cart")) {
      setCartProducts(JSON.parse(ls.getItem("cart")));
    }
  }, []);

  function addProductToCart(productId) {
    setCartProducts((prev) => [...prev, productId]);
  }

  function renoveProductFromCart(productId) {
    setCartProducts((prev) => {
      const ind = prev.indexOf(productId);
      if (ind !== -1) {
        return prev.filter((val, index) => ind !== index);
      } else {
        return prev;
      }
    });
  }
  return (
    <CartContext.Provider
      value={{
        cartProducts,
        setCartProducts,
        addProductToCart,
        renoveProductFromCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export default CartContextProvider;
