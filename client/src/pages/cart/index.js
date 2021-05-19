import React, { useEffect, useState } from 'react';
import PageTitle from '../../components/PageTitle';
import { loadCart } from '../../utils/cart';
import {
  ArrowRight,
  ContinueShopping,
  EmptyCart,
  EmptyCartIcon,
} from './cartStyles';

const Cart = () => {
  const [products, setProducts] = useState([]);

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
        description={`${products ? products.length : 0} items in basket`}
      />
      {!products && ShowEmptyCart}

      {/* 
        // todo: create all these components with these names
        products && (
        <ProductsList>
          <ProductHeading>
            <th scope="col">Product Details</th>
            <th scope="col">Quantity</th>
            <th scope="col">Price</th>
            <th scope="col">Total</th>
          </ProductHeading>
          <ProductsBody>
            {products.map((product) => (
              <ProductRow key={product._id}>
                <ProductDetails>
                  <p>{product.name}</p>
                  <img src={product.image} alt={product.name} />
                </ProductDetails>
                <Quantity>{product.quantity}</Quantity>
                <Price>₹{product.price}</Price>
                <Price>₹{product.price}</Price>
              </ProductRow>
            ))}
          </ProductsBody>
        </ProductsList>
      ) */}
    </main>
  );
};

export default Cart;
