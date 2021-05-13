import React, { useState } from 'react';
import Alert from '../../../components/alert';
import DashboardMenu from '../../../components/DashboardMenu';
import {
  CancelLink,
  Form,
  FormInput,
  SubmitButton,
  SubmitContainter,
  Wrapper,
} from '../../../components/form/FormStyles';
import productMenu from './productMenu';

const CreateProduct = () => {
  const [values, setValues] = useState({
    name: '',
    description: '',
    price: '',
    stock: '',
  });
  const [status, setStatus] = useState('');
  const [message, setMessage] = useState('');
  const [showAlert, setShowAlert] = useState(false);

  const { name, description, price, stock } = values;

  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  const onSubmit = (event) => {
    event.preventDefault();
  };
  return (
    <main>
      {showAlert && (
        <Alert
          status={status}
          message={message}
          handleAlert={() => setShowAlert(false)}
        />
      )}
      <DashboardMenu title="Create Product" menu={productMenu} />
      <Wrapper>
        <Form action="#" method="POST">
          <input type="hidden" name="remember" defaultValue="true" />
          <FormInput>
            <label htmlFor="name">Product Name</label>
            <input
              id="name"
              name="name"
              type="text"
              required
              placeholder="Product Name"
              onChange={handleChange}
              value={name}
            />
          </FormInput>
          <FormInput>
            <label htmlFor="image">Product Image</label>
            <input
              id="image"
              name="image"
              type="file"
              placeholder="Add an image"
              accept="image"
              onChange={handleChange}
            />
          </FormInput>
          <FormInput>
            <label htmlFor="collection">Collection</label>
            <input
              id="collection"
              name="collection"
              type="text"
              required
              placeholder="Collection"
              onChange={handleChange}
              value={name}
            />
          </FormInput>
          <FormInput>
            <label htmlFor="description">Description</label>
            <input
              id="description"
              name="description"
              type="text"
              required
              placeholder="Description"
              onChange={handleChange}
              value={name}
            />
          </FormInput>
          <FormInput>
            <label htmlFor="price">Price</label>
            <input
              id="price"
              name="price"
              type="number"
              required
              placeholder="price"
              onChange={handleChange}
              value={name}
            />
          </FormInput>
          <FormInput>
            <label htmlFor="stock">Stock</label>
            <input
              id="stock"
              name="stock"
              type="number"
              required
              placeholder="stock"
              onChange={handleChange}
              value={name}
            />
          </FormInput>
          <SubmitContainter>
            <CancelLink to="/admin/products">Go back</CancelLink>
            <SubmitButton
              onClick={onSubmit}
              disabled={values.name === ''}
              type="submit"
            >
              Submit
            </SubmitButton>
          </SubmitContainter>
        </Form>
      </Wrapper>
    </main>
  );
};

export default CreateProduct;
