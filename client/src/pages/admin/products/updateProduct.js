import React, { useEffect, useState } from 'react';
import { Redirect, useParams } from 'react-router-dom';
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
import {
  getAllDocs,
  getDoc,
  updateDoc,
} from '../../../utils/admin/adminapicall';
import { isAuthenticated } from '../../../utils/auth';

const updateProduct = () => {
  // id param
  const { productSlug } = useParams();
  const productId = productSlug.split('-').pop();
  // state
  const [values, setValues] = useState({
    product: {},
    categories: [],
    formData: '',
  });
  const [status, setStatus] = useState('');
  const [message, setMessage] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [didRedirect, setDidRedirect] = useState(false);

  const { name, description, price, stock, category } = values.product;
  const { formData, categories } = values;
  // preload product and categories data
  const preload = async (id) => {
    try {
      const categories = getAllDocs({
        token: isAuthenticated().token,
        query: '/categories',
      });
      const product = getDoc({
        token: isAuthenticated().token,
        link: '/products',
        id,
      });
      const response = await Promise.all([categories, product]);
      if (response[0].status !== 'success') throw new Error(categories.message);
      if (response[1].status !== 'success') throw new Error(product.message);
      setValues({
        ...values,
        categories: response[0].data.documents,
        product: response[1].data.documents,
        formData: new FormData(),
      });
    } catch (error) {
      setStatus('error');
      setMessage(error.message);
      setShowAlert(true);
    }
  };

  useEffect(() => {
    preload(productId);
  }, []);

  const handleChange = (name) => (event) => {
    const value = name === 'photo' ? event.target.files[0] : event.target.value;
    formData.set(name, value);
    setValues({ ...values, product: { ...values.product, [name]: value } });
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    setStatus('Sending data...');
    setMessage('Please wait...');
    try {
      const response = await updateDoc({
        token: isAuthenticated().token,
        link: '/products',
        data: formData,
        id: productId,
      });

      if (response.status !== 'success') throw new Error(response.message);
      setStatus(response.status);
      setMessage(
        `Product: '${response.data.product.name}' updated successfully.`
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
      setTimeout(() => setDidRedirect(true), 800);
    } catch (error) {
      setStatus('error');
      setMessage(error.message);
      setShowAlert(true);
    }
  };

  const performRedirect = () => {
    if (didRedirect) return <Redirect to="/admin/products" />;
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
      <DashboardMenu title="Update Product" />
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
        {performRedirect()}
      </Wrapper>
    </main>
  );
};

export default updateProduct;
