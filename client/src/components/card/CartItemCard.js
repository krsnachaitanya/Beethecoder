import React, { useContext, useState } from 'react';

import {
  CartItemStyles,
  Delete,
  Minus,
  Name,
  Plus,
  Price,
  Quantity,
} from './CardStyles';
import CardImage from './CardImage';
import { api } from '../../backend';
import { updateCart } from '../../utils/cart';
import { CartContext } from '../../pages/cart/cartContext';

const CartItemCard = ({ product }) => {
  const [cartItem, setCartItem] = useState({ ...product });
  const [cart, setCart] = useContext(CartContext);

  const addToCart = () => {
    const updatedItem = {
      ...cartItem,
      quantity: cartItem.quantity + 1,
      total: product.price * (cartItem.quantity + 1),
    };
    setCartItem({ ...updatedItem });
    updateCart({ ...updatedItem });
  };

  const removeFromCart = () => {
    const updatedItem = {
      ...cartItem,
      quantity: cartItem.quantity - 1,
      total: product.price * (cartItem.quantity - 1),
    };
    setCartItem({ ...updatedItem });
    updateCart({ ...updatedItem });
  };

  return (
    cartItem.quantity >= 1 && (
      <CartItemStyles>
        <CardImage
          src={`${api}/products/${cartItem._id}/photo`}
          alt={cartItem.name}
          cartItem={true}
        />
        <Name>
          {cartItem.name} <span>₹{cartItem.price}.00 / item</span>
        </Name>
        <Quantity cartItem>
          {cartItem.quantity <= 1 ? (
            <Delete onClick={removeFromCart} />
          ) : (
            <Minus onClick={removeFromCart} />
          )}
          <p>{cartItem.quantity}</p>
          <Plus onClick={addToCart} />
        </Quantity>
        <Price cartItem>₹{cartItem.total}.00</Price>
      </CartItemStyles>
    )
  );
};

export default CartItemCard;
