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
import { CartContext } from '../../pages/cart/cartContext';

const CartItemCard = ({ product }) => {
  const [quantity, setQuantity] = useState(product.quantity);
  const { updateCart } = useContext(CartContext);

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
    product.quantity >= 1 && (
      <CartItemStyles>
        <CardImage
          src={`${api}/products/${product._id}/photo`}
          alt={product.name}
          cartItem={true}
        />
        <Name>
          {product.name} <span>₹{product.price}.00 / item</span>
        </Name>
        <Quantity cartItem>
          {product.quantity <= 1 ? (
            <Delete onClick={removeFromCart} />
          ) : (
            <Minus onClick={removeFromCart} />
          )}
          <p>{product.quantity}</p>
          <Plus onClick={addToCart} />
        </Quantity>
        <Price cartItem>₹{product.total}.00</Price>
      </CartItemStyles>
    )
  );
};

export default CartItemCard;
