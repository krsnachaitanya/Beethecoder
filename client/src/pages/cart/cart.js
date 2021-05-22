const loadCart = () => {
  if (typeof window !== 'undefined') {
    if (localStorage.getItem('cart')) {
      return JSON.parse(localStorage.getItem('cart'));
    }
  }
};

const updateLocalCart = (item) => {
  console.log(item);
  const cart = loadCart();
  if (cart) {
    const isItemInCart = cart.find((curProduct) => curProduct._id === item._id);

    const updatedCart = isItemInCart
      ? cart.map((curProduct) =>
          // update quantity if the item is present
          curProduct._id === item._id ? { ...item } : curProduct
        )
      : // Add item if it is not present
        [...cart, { ...item }];

    // check for zero quantity items and filter them
    const filteredCart = updatedCart.filter((item) => item.quantity >= 1);

    localStorage.setItem('cart', JSON.stringify(filteredCart));
    return;
  }
  localStorage.setItem('cart', JSON.stringify([{ ...item }]));
};

export { loadCart, updateLocalCart };
