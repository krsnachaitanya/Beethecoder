import React, { useContext, useEffect, useState } from 'react';
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
import { getAllDocs } from '../../../utils/admin/adminapicall';
import productMenu from './productMenu';
import { createDoc } from '../../../utils/admin/adminapicall';
import { UserContext } from '../../user-account/userContext';

const CreateProduct = () => {
  const { user } = useContext(UserContext);
  const [values, setValues] = useState({
    name: '',
    description: '',
    price: '',
    stock: '',
    photo: '',
    category: '',
    categories: [],
    formData: '',
  });
  const [status, setStatus] = useState('');
  const [message, setMessage] = useState('');
  const [showAlert, setShowAlert] = useState(false);

  const {
    name,
    description,
    price,
    stock,
    category,
    categories,
    formData,
  } = values;

  const preload = async () => {
    try {
      const data = await getAllDocs({
        token: user.token,
        query: '/categories',
      });
      if (data.status !== 'success') throw new Error(data.message);
      setValues({
        ...values,
        categories: data.data.documents,
        formData: new FormData(),
      });
    } catch (error) {
      setStatus('error');
      setMessage(error.message);
      setShowAlert(true);
    }
  };

  useEffect(() => {
    preload();
  }, []);

  const handleChange = (name) => (event) => {
    const value = name === 'photo' ? event.target.files[0] : event.target.value;
    formData.set(name, value);
    setValues({ ...values, [name]: value });
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    setStatus('Sending data...');
    setMessage('Please wait...');
    try {
      const response = await createDoc({
        token: user.token,
        link: '/products',
        data: formData,
      });

      if (response.status !== 'success') throw new Error(response.message);
      setStatus(response.status);
      setMessage(
        `Product: '${response.data.product.name}' created successfully.`
      );
      setShowAlert(true);
      setValues({
        ...values,
        name: '',
        description: '',
        price: '',
        photo: '',
        category: '',
        stock: '',
      });
    } catch (error) {
      setStatus('error');
      setMessage(error.message);
      setShowAlert(true);
    }
  };
  // todo: Create custom input type file component.
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
              onChange={handleChange('name')}
              value={name}
            />
          </FormInput>
          <FormInput>
            <label htmlFor="photo">Product Image</label>
            <input
              id="photo"
              name="photo"
              type="file"
              placeholder="Add an image"
              accept="image"
              onChange={handleChange('photo')}
            />
          </FormInput>
          <FormInput>
            <label htmlFor="category">Category</label>
            <select
              id="category"
              name="category"
              type="text"
              required
              placeholder="category"
              onChange={handleChange('category')}
              value={category}
            >
              <option>Select Category</option>
              {categories &&
                categories.map((category, i) => (
                  <option key={i} value={category._id}>
                    {category.name}
                  </option>
                ))}
            </select>
          </FormInput>
          <FormInput>
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              type="text"
              required
              placeholder="Description"
              onChange={handleChange('description')}
              value={description}
            ></textarea>
          </FormInput>
          <FormInput>
            <label htmlFor="price">Price</label>
            <input
              id="price"
              name="price"
              type="number"
              required
              placeholder="Price"
              onChange={handleChange('price')}
              value={price}
            />
          </FormInput>
          <FormInput>
            <label htmlFor="stock">Stock</label>
            <input
              id="stock"
              name="stock"
              type="number"
              required
              placeholder="Stock"
              onChange={handleChange('stock')}
              value={stock}
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
