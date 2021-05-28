import React, { useContext, useState } from 'react';
import CartItemCard from '../../components/card/CartItemCard';
import PageTitle from '../../components/PageTitle';
import StripeCheckout from '../../components/StripeCheckout';
import { CartContext } from './cartContext';
import {
  ArrowRight,
  BillDetails,
  Cancel,
  CartList,
  CartStyles,
  ContinueShopping,
  CouponApplied,
  CouponCode,
  EmptyCart,
  EmptyCartIcon,
  OrderSummary,
  RupeeIcon,
} from './cartStyles';
import { UserContext } from '../user-account/userContext';

const Cart = () => {
  const { cart } = useContext(CartContext);
  const { user } = useContext(UserContext);
  const [code, setCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [shipping, setShipping] = useState(30);
  const [isCouponApplied, setIsCouponApplied] = useState(false);

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
        ? (setShipping(0), setDiscount(0), setIsCouponApplied(true))
        : (setDiscount(couponCodes[code]),
          setShipping(30),
          setIsCouponApplied(true));
    }
  };

  const removeCoupon = () => {
    setIsCouponApplied(false);
    setDiscount(0);
    setShipping(30);
  };

  const totalCost = subtotal() + shipping - discount;

  // send only necessary details as props in to the stripe checkout
  const order = {
    products: cart.map((item) => ({
      name: item.name,
      price: item.price,
      quantity: item.quantity,
      total: item.total,
      id: item._id,
      category: { id: item.category._id, name: item.category.name },
    })),
    discount,
    shipping,
    subtotal: subtotal(),
    total: totalCost,
  };

  const customer = {
    token: user.token,
    name: user.data.name,
    email: user.data.email,
    id: user.data.id,
  };

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
              {!isCouponApplied ? (
                <div>
                  <input
                    type="text"
                    name="coupon-code"
                    id="coupon-code"
                    placeholder="Enter code here"
                    onChange={handleChange}
                    value={code}
                    autoComplete="true"
                  />
                  <button type="submit" onClick={applyDiscount}>
                    Apply
                  </button>
                </div>
              ) : (
                <CouponApplied>
                  <div>
                    <div>
                      <RupeeIcon />
                    </div>
                    <p>
                      You saved ₹{couponCodes[code]}
                      <span>Coupon Applied</span>
                    </p>
                  </div>
                  <div>
                    <Cancel onClick={removeCoupon} />
                  </div>
                </CouponApplied>
              )}
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
            {user ? (
              <StripeCheckout customer={customer} order={order} />
            ) : (
              <button>Checkout</button>
            )}
          </OrderSummary>
        </CartStyles>
      )}
    </main>
  );
};

export default Cart;
