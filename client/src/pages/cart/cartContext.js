import React, { useState } from 'react';

export const CartContext = React.createContext();

export const CartProvider = (props) => {
  const loadCart = () =>
    typeof window !== 'undefined' && localStorage.getItem('cart')
      ? JSON.parse(localStorage.getItem('cart'))
      : [];

  const [cart, setCart] = useState(loadCart());

  const updateCart = (item) => {
    if (cart.length >= 1) {
      const isItemInCart = cart.find(
        (curProduct) => curProduct._id === item._id
      );

      const updatedCart = isItemInCart
        ? cart.map((curProduct) =>
            // update quantity if the item is present
            curProduct._id === item._id ? { ...item } : curProduct
          )
        : // Add item if it is not present
          [...cart, { ...item }];

      // check for zero quantity items and filter them
      const filteredCart = updatedCart.filter((item) => item.quantity >= 1);

      setCart([...filteredCart]);

      localStorage.setItem('cart', JSON.stringify(filteredCart));
      return;
    }
    setCart([{ ...item }]);
    localStorage.setItem('cart', JSON.stringify([{ ...item }]));
  };

  return (
    <CartContext.Provider value={{ cart, updateCart }}>
      {props.children}
    </CartContext.Provider>
  );
};
