import React, { useState } from 'react';

import {
  CartItemStyles,
  Delete,
  Minus,
  Details,
  Plus,
  Price,
  Quantity,
} from './CardStyles';
import CardImage from './CardImage';
import { api } from '../../backend';
import { addItemToCart, removeItemFromCart } from '../../utils/cart';

const CartItemCard = ({ product }) => {
  const [cartItem, setCartItem] = useState({ ...product });

  const addToCart = () => {
    const updatedItem = {
      ...cartItem,
      quantity: cartItem.quantity + 1,
      total: product.price * (cartItem.quantity + 1),
    };
    setCartItem({ ...updatedItem });
    addItemToCart({ ...updatedItem });
  };

  const removeFromCart = () => {
    const updatedItem = {
      ...cartItem,
      quantity: cartItem.quantity - 1,
      total: product.price * (cartItem.quantity - 1),
    };
    setCartItem({ ...updatedItem });
    removeItemFromCart({ ...updatedItem });
  };

  return (
    <CartItemStyles>
      <CardImage
        src={`${api}/products/${cartItem._id}/photo`}
        alt={cartItem.name}
        cartItem={true}
      />
      <Details>
        <p>
          {cartItem.name} <span>₹{cartItem.price}.00 / item</span>
        </p>
      </Details>
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
  );
};

export default CartItemCard;
