import React, { useContext, useEffect, useState } from 'react';
import CartItemCard from '../../components/card/CartItemCard';
import PageTitle from '../../components/PageTitle';
import { loadCart } from '../../utils/cart';
import { CartContext } from './cartContext';
import {
  ArrowRight,
  CartList,
  CartStyles,
  ContinueShopping,
  EmptyCart,
  EmptyCartIcon,
  OrderSummary,
} from './cartStyles';

const Cart = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useContext(CartContext);

  useEffect(() => {
    setProducts(loadCart());
  }, []);

  const ShowEmptyCart = (
    <EmptyCart>
      <EmptyCartIcon />
      <h3>Your cart is empty!</h3>
      <p>Looks like you haven&apos;t made your choice yet.</p>
      <ContinueShopping to="/">
        Continue Shopping
        <ArrowRight />
      </ContinueShopping>
    </EmptyCart>
  );
  return (
    <main>
      <PageTitle
        title="Shopping Cart"
        description={`${
          products ? products.length : 0
        } items in basket. cart is ${cart.length}`}
      />
      {products.length === 0 ? (
        ShowEmptyCart
      ) : (
        <CartStyles>
          <CartList>
            {products.map((product) => (
              <CartItemCard key={product._id} product={product} />
            ))}
          </CartList>
          <OrderSummary>
            <button>Checkout</button>
          </OrderSummary>
        </CartStyles>
      )}
    </main>
  );
};

export default Cart;
