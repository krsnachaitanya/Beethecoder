import React, { useContext, useState } from 'react';
import CartItemCard from '../../components/card/CartItemCard';
import PageTitle from '../../components/PageTitle';
import { CartContext } from './cartContext';
import {
  ArrowRight,
  BillDetails,
  CartList,
  CartStyles,
  ContinueShopping,
  CouponCode,
  EmptyCart,
  EmptyCartIcon,
  OrderSummary,
} from './cartStyles';

const Cart = () => {
  const { cart } = useContext(CartContext);
  const [code, setCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [shipping, setShipping] = useState(30);

  const couponCodes = {
    bogo: 100,
    save150: 150,
    greatDeal: 10,
    freeShipping: 30,
  };

  const subtotal = () =>
    cart.reduce((acc, curr) => {
      return acc + curr.total;
    }, 0);

  const handleChange = (event) => {
    setCode(event.target.value);
    setDiscount(0);
  };

  const applyDiscount = (event) => {
    event.preventDefault();
    if (couponCodes[code]) {
      code === 'freeShipping'
        ? (setShipping(0), setDiscount(0))
        : (setDiscount(couponCodes[code]), setShipping(30));
    }
  };

  const totalCost = subtotal() + shipping - discount;

  return (
    <main>
      <PageTitle
        title="Shopping Cart"
        description={`${cart ? cart.length : 0} items in basket`}
      />
      {cart.length === 0 ? (
        <EmptyCart>
          <EmptyCartIcon />
          <h3>Your cart is empty!</h3>
          <p>Looks like you haven&apos;t made your choice yet.</p>
          <ContinueShopping to="/">
            Continue Shopping
            <ArrowRight />
          </ContinueShopping>
        </EmptyCart>
      ) : (
        <CartStyles>
          <CartList>
            {cart.map((product) => (
              <CartItemCard key={product._id} product={product} />
            ))}
          </CartList>
          <OrderSummary>
            <h3>Order Summary</h3>
            <CouponCode>
              <label htmlFor="coupon-code">Coupon Code</label>
              <div>
                <input
                  type="text"
                  name="coupon-code"
                  id="coupon-code"
                  placeholder="Enter code here"
                  onChange={handleChange}
                  value={code}
                />
                <button type="submit" onClick={applyDiscount}>
                  Apply
                </button>
              </div>
            </CouponCode>
            <BillDetails>
              <p>
                Subtotal: <span>₹{subtotal()}.00</span>
              </p>
              <p>
                Shipping: <span>₹{shipping}.00</span>
              </p>
              <p>
                Discount: <span>₹{discount}.00</span>
              </p>
              <p>
                Total Cost: <span>₹{totalCost}.00</span>
              </p>
            </BillDetails>
            <button>Checkout</button>
          </OrderSummary>
        </CartStyles>
      )}
    </main>
  );
};

export default Cart;
