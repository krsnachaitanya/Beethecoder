import React, { useContext, useEffect, useState } from 'react';
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
import { getDoc, updateDoc } from '../../../utils/admin/adminapicall';
import { UserContext } from '../../user-account/userContext';

const updateCategory = () => {
  const { user } = useContext(UserContext);
  // id param
  const { categorySlug } = useParams();
  const categoryId = categorySlug.split('-').pop();
  // state
  const [category, setCategory] = useState({
    name: '',
  });
  const [status, setStatus] = useState('');
  const [message, setMessage] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [didRedirect, setDidRedirect] = useState(false);

  // preload categories data
  const preload = async (id) => {
    try {
      const response = await getDoc({
        token: user.token,
        link: '/categories',
        id,
      });

      if (response.status !== 'success') throw new Error(category.message);

      setCategory({ name: response.data.documents.name });
    } catch (error) {
      setStatus('error');
      setMessage(error.message);
      setShowAlert(true);
    }
  };

  useEffect(() => {
    preload(categoryId);
  }, []);

  const handleChange = (event) => {
    setCategory({ name: event.target.value });
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    setStatus('Sending data...');
    setMessage('Please wait...');
    try {
      const response = await updateDoc({
        token: user.token,
        link: '/categories',
        data: category,
        json: true,
        id: categoryId,
      });

      if (response.status !== 'success') throw new Error(response.message);
      setStatus(response.status);
      setMessage(
        `Category name '${response.data.documents.name}' updated successfully.`
      );
      setShowAlert(true);
      setCategory('');
      setTimeout(() => setDidRedirect(true), 500);
    } catch (error) {
      setStatus('error');
      setMessage(error.message);
      setShowAlert(true);
    }
  };

  const performRedirect = () => {
    if (didRedirect) return <Redirect to="/admin/categories" />;
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
      <DashboardMenu title="Update Category" />
      <Wrapper>
        <Form action="#" method="POST">
          <input type="hidden" name="remember" defaultValue="true" />
          <FormInput>
            <label htmlFor="name">Category Name</label>
            <input
              id="name"
              name="name"
              type="text"
              required
              placeholder="Category Name"
              onChange={handleChange}
              value={category.name}
            />
          </FormInput>
          <SubmitContainter>
            <CancelLink to="/admin/products">Go back</CancelLink>
            <SubmitButton
              onClick={onSubmit}
              disabled={category === ''}
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

export default updateCategory;
