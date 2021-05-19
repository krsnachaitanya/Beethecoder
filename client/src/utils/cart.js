export const addItemToCart = (item) => {
  if (typeof window !== 'undefined') {
    if (localStorage.getItem('cart')) {
      const cart = JSON.parse(localStorage.getItem('cart'));
      const isItemInCart = cart.find(
        (curProduct) => curProduct._id === item._id
      );
      const updatedCart = isItemInCart
        ? cart.map((curProduct) =>
            curProduct._id === item._id
              ? { ...curProduct, quantity: item.quantity }
              : curProduct
          )
        : [...cart, { ...item }];
      localStorage.setItem('cart', JSON.stringify(updatedCart));
    }
    localStorage.setItem('cart', JSON.stringify([{ ...item }]));
  }
};

export const removeItemFromCart = (item) => {
  if (typeof window !== 'undefined') {
    if (localStorage.getItem('cart')) {
      const cart = JSON.parse(localStorage.getItem('cart'));

      const removeItems = cart.map((curProduct) =>
        curProduct._id === item._id
          ? { ...curProduct, quantity: item.quantity }
          : curProduct
      );
      const updatedCart = removeItems.filter((item) => item.quantity !== 0);

      localStorage.setItem('cart', JSON.stringify(updatedCart));
    }
  }
};
