import React, { useState } from 'react';

import Alert from '../../../components/alert';
import {
  Form,
  FormInput,
  SubmitButton,
  CancelLink,
  SubmitContainter,
  Wrapper,
} from '../../../components/form/FormStyles.js';
import { isAuthenticated } from '../../../utils/auth';
import { createDoc } from '../../../utils/admin/adminapicall';
import DashboardMenu from '../../../components/DashboardMenu';
import categoryMenu from './categoryMenu';

const createCategory = () => {
  const [name, setName] = useState('');
  const [status, setStatus] = useState('');
  const [message, setMessage] = useState('');
  const [showAlert, setShowAlert] = useState(false);

  const handleChange = (event) => {
    setName(event.target.value);
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    setStatus('');
    setMessage('');

    const data = await createDoc({
      token: isAuthenticated().token,
      link: '/categories',
      json: true,
      data: {
        name,
      },
    });

    if (data.status === 'success') {
      setName('');
      setStatus(data.status);
      setMessage('Category created successfully.');
      setShowAlert(true);
    } else {
      setStatus(data.status);
      setMessage(data.message);
      setShowAlert(true);
    }
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
      <DashboardMenu title="Create New Category" menu={categoryMenu} />
      <Wrapper>
        <Form action="#" method="POST">
          <input type="hidden" name="remember" defaultValue="true" />
          <FormInput>
            <label htmlFor="name">Category Name</label>
            <input
              id="name"
              name="name"
              type="name"
              required
              placeholder="Category Name"
              onChange={handleChange}
              value={name}
            />
          </FormInput>
          <SubmitContainter>
            <CancelLink to="/admin/categories">Go back</CancelLink>
            <SubmitButton
              onClick={onSubmit}
              disabled={name === ''}
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

export default createCategory;
