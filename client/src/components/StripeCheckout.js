import React, { useEffect, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { api } from '../backend';
import { createDoc } from '../utils/admin/adminapicall';

const stripePromise = loadStripe(
  'pk_test_51IvRaJSHZ6NpgVqR1cO067Uc2d0ybQa6H67vJ6kgsycbPbYiiNzcFz08YC8WFzvByET3zNtcByWb7VbfghUlT0dN00v1J6lJZP'
);

const Message = ({ message }) => (
  <section>
    <p>{message}</p>
  </section>
);

const StripeCheckout = ({ order, customer }) => {
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Check to see if this is a redirect back from Checkout
    const query = new URLSearchParams(window.location.search);
    if (query.get('success')) {
      setMessage('Order placed! You will receive an email confirmation.');
    }
    if (query.get('canceled')) {
      setMessage(
        "Order canceled -- continue to shop around and checkout when you're ready."
      );
    }
  }, []);

  const handleClick = async () => {
    const stripe = await stripePromise;
    const response = await fetch(`${api}/checkout/stripe`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${customer.token}`,
      },
      body: JSON.stringify({ order, customer }),
    });
    const session = await response.json();

    if (session.id) {
      const createOrder = await createDoc({
        data: { ...order, sessionId: session.id, customer: customer.id },
        token: customer.token,
        json: true,
        link: '/orders',
      });
      if (createOrder.status !== 'success')
        throw new Error(createOrder.message);
      localStorage.setItem(
        'recentOrder',
        JSON.stringify({ ...createOrder.data.order })
      );
    }

    // When the customer clicks on the button, redirect them to Checkout.
    const result = await stripe.redirectToCheckout({
      sessionId: session.id,
    });
    if (result.error) {
      // If `redirectToCheckout` fails due to a browser or network
      // error, display the localized error message to your customer
      // using `result.error.message`.
    }
  };

  return message ? (
    <Message message={message} />
  ) : (
    <button
      type="button"
      id="checkout-button"
      role="link"
      onClick={handleClick}
    >
      Pay With Stripe
    </button>
  );
};

export default StripeCheckout;
