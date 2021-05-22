import React, { useContext } from 'react';
import CartItemCard from '../../components/card/CartItemCard';
import PageTitle from '../../components/PageTitle';
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
  const { cart } = useContext(CartContext);

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
        description={`${cart ? cart.length : 0} items in basket`}
      />
      {cart.length === 0 ? (
        ShowEmptyCart
      ) : (
        <CartStyles>
          <CartList>
            {cart.map((product) => (
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
