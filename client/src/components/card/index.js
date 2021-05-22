import React, { useState } from 'react';

import {
  AddToCart,
  CardContent,
  CardStyles,
  Delete,
  Minus,
  Plus,
  Price,
  Quantity,
} from './CardStyles';
import CardImage from './CardImage';
import { api } from '../../backend';
import { updateCart } from '../../utils/cart';

const Card = ({ product }) => {
  const [quantity, setQuantity] = useState(0);

  const addToCart = () => {
    setQuantity(quantity + 1);
    updateCart({
      ...product,
      quantity: quantity + 1,
      total: product.price * (quantity + 1),
    });
  };

  const removeFromCart = () => {
    setQuantity(quantity - 1);
    updateCart({
      ...product,
      quantity: quantity - 1,
      total: product.price * (quantity - 1),
    });
  };

  return (
    <CardStyles>
      <CardImage
        src={`${api}/products/${product._id}/photo`}
        alt={product.name}
      />
      <CardContent>
        <p>{product.name}</p>
        <Price>₹{product.price}.00</Price>
      </CardContent>
      {quantity < 1 ? (
        <AddToCart onClick={addToCart}>Add to Cart</AddToCart>
      ) : (
        <Quantity>
          <p>Quantity:</p>
          {quantity <= 1 ? (
            <Delete onClick={removeFromCart} />
          ) : (
            <Minus onClick={removeFromCart} />
          )}
          <p>{quantity}</p>
          <Plus onClick={addToCart} />
        </Quantity>
      )}
    </CardStyles>
  );
};

export default Card;
