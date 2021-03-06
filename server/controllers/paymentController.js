const stripe = require('stripe')(process.env.STRIPE_SK);
const catchAsync = require('../utils/catchAsync');

exports.stripePayment = catchAsync(async (req, res, next) => {
  const { customer, order } = req.body;

  const stripeCustomer = await stripe.customers.create({
    email: customer.email,
    name: customer.name,
    metadata: { id: customer.id, token: customer.token },
  });

  // console.log(stripeCustomer);

  const session = await stripe.checkout.sessions.create({
    customer: stripeCustomer.id,
    payment_method_types: ['card'],
    line_items: [
      {
        price_data: {
          currency: 'inr',
          product_data: {
            name: 'Bee the coder tshirt',
          },
          unit_amount: order.total * 100,
        },
        quantity: 1,
      },
    ],
    mode: 'payment',
    shipping_address_collection: {
      allowed_countries: ['IN'],
    },
    success_url: `http://localhost:3000/order/status?paid=true`,
    cancel_url: `http://localhost:3000/order/status?paid=false`,
  });
  // console.log(session);
  res.json({ id: session.id });
});

exports.getPaymentStatus = catchAsync(async (req, res, next) => {
  const session = await stripe.checkout.sessions.retrieve(req.params.id);
  const payment = await stripe.paymentIntents.retrieve(session.payment_intent);
  res.json({ paymentStatus: payment.status });
});
