import React, { useState } from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';
import Alert from '../../../components/alert';
import DashboardMenu from '../../../components/DashboardMenu';
import {
  Form,
  FormInput,
  SubmitButton,
  SubmitContainter,
} from '../../../components/FormStyles.js';
import { isAuthenticated } from '../../../utils/auth';
import categoryMenu from './categoryMenu';
import { createCategoryAPI } from '../../../utils/admin/adminapicall';

const DashboardWrapper = styled.div`
  ${tw`flex justify-center p-8 m-8 bg-gray-600 rounded-md`}
`;

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

    const data = await createCategoryAPI(isAuthenticated().token, {
      name,
    });

    setName('');

    if (data.status) {
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
          showAlert={showAlert}
          handleAlert={() => setShowAlert(false)}
        />
      )}
      <DashboardMenu title="Create new category" menu={categoryMenu} />
      <DashboardWrapper>
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
            <SubmitButton
              onClick={onSubmit}
              disabled={name === ''}
              type="submit"
            >
              Submit
            </SubmitButton>
          </SubmitContainter>
        </Form>
      </DashboardWrapper>
    </main>
  );
};

export default createCategory;
