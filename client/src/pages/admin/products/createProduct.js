import React, { useEffect, useState } from 'react';
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
import { isAuthenticated } from '../../../utils/auth';
import productMenu from './productMenu';

const CreateProduct = () => {
  const [values, setValues] = useState({
    name: '',
    description: '',
    price: '',
    stock: '',
    image: '',
    category: '',
    categories: [],
    loading: false,
    createdProduct: '',
    didRedirect: false,
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
    image,
    category,
    categories,
    loading,
    createdProduct,
    didRedirect,
    formData,
  } = values;

  const preload = async () => {
    try {
      const data = await getAllDocs({
        token: isAuthenticated().token,
        query: '/categories',
      });
      if (data.status !== 'success') {
        setStatus(data.status);
        setMessage(data.message);
        setShowAlert(true);
      } else {
        setValues({
          ...values,
          categories: data.data.documents,
          formData: new FormData(),
        });
      }
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
    const value = name === 'image' ? event.target.file[0] : event.target.value;
    formData.set(name, value);
    setValues({ ...values, [name]: value });
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
              onChange={handleChange('name')}
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
              onChange={handleChange('image')}
              value={image}
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
