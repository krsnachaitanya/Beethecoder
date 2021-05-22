import React, { useContext, useState } from 'react';

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
import { CartContext } from '../../pages/cart/cartContext';

const Card = ({ product }) => {
  const { updateCart, cart } = useContext(CartContext);
  const isInCart = (product) =>
    cart.find((curItem) => curItem._id === product._id && curItem);
  const cartItem = isInCart(product);

  const [quantity, setQuantity] = useState(cartItem?.quantity || 0);

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
