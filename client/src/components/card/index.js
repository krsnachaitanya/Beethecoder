import React, { useState } from 'react';

import {
  AddToCart,
  CardContent,
  CardStyles,
  Minus,
  Name,
  Plus,
  Price,
  Quantity,
} from './CardStyles';
import CardImage from './CardImage';
import { api } from '../../backend';
import { addItemToCart, removeItemFromCart } from '../../utils/cart';

const Card = ({ product }) => {
  const [quantity, setQuantity] = useState(0);

  const addToCart = () => {
    setQuantity(quantity + 1);
    addItemToCart({ ...product, quantity: quantity + 1 });
  };

  const removeFromCart = () => {
    setQuantity(quantity - 1);
    removeItemFromCart({ ...product, quantity: quantity - 1 });
  };

  return (
    <CardStyles>
      <CardImage
        src={`${api}/products/${product._id}/photo`}
        alt={product.name}
      />
      <CardContent>
        <Name>{product.name}</Name>
        <Price>₹{product.price}.00</Price>
      </CardContent>
      {quantity < 1 ? (
        <AddToCart onClick={addToCart}>Add to Cart</AddToCart>
      ) : (
        <Quantity>
          <p>Quantity:</p>
          <Minus onClick={removeFromCart} />
          <p>{quantity}</p>
          <Plus onClick={addToCart} />
        </Quantity>
      )}
    </CardStyles>
  );
};

export default Card;
