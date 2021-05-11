import React, { useState } from 'react';
import Alert from '../../components/alert';
import {
  Form,
  FormInput,
  FormWrapper,
  SubmitButton,
  SubmitContainter,
} from '../../components/FormStyles';
import PageTitle from '../../components/PageTitle';
import { signup } from '../../utils/auth';

const Signup = () => {
  const [values, setValues] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    status: '',
    message: '',
  });
  const [showAlert, setShowAlert] = useState(false);

  const { name, email, password, confirmPassword, status, message } = values;

  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  const onSubmit = async (event) => {
    try {
      event.preventDefault();
      const data = await signup({ name, email, password, confirmPassword });
      if (data.status !== 'success') {
        setValues({
          ...values,
          status: data.status,
          message: data.message,
        });
        setShowAlert(true);
      } else {
        setValues({
          name: '',
          email: '',
          password: '',
          confirmPassword: '',
          status: 'success',
          message: 'New Account is created successfully.',
        });
        setShowAlert(true);
      }
    } catch (err) {
      setValues({
        ...values,
        status: 'error',
        message: 'Please try again.',
      });
      setShowAlert(true);
    }
  };

  return (
    <FormWrapper>
      {showAlert && (
        <Alert
          status={status}
          message={message}
          showAlert={showAlert}
          handleAlert={() => setShowAlert(false)}
        />
      )}

      <PageTitle
        title="Sign Up"
        description="Please fill the form to sign up."
      />
      <Form action="#" method="POST">
        <input type="hidden" name="remember" defaultValue="true" />
        <FormInput>
          <label htmlFor="name">Name</label>
          <input
            autoComplete="true"
            id="name"
            name="name"
            type="name"
            required
            placeholder="Name"
            onChange={handleChange('name')}
            value={name}
          />
        </FormInput>
        <FormInput>
          <label htmlFor="email-address">Email address</label>
          <input
            autoComplete="true"
            id="email-address"
            name="email"
            type="email"
            required
            placeholder="Email address"
            onChange={handleChange('email')}
            value={email}
          />
        </FormInput>
        <FormInput>
          <label htmlFor="password">Password</label>
          <input
            autoComplete="true"
            id="password"
            name="password"
            type="password"
            required
            placeholder="Password"
            onChange={handleChange('password')}
            value={password}
          />
        </FormInput>
        <FormInput>
          <label htmlFor="confirm-password">Confirm Password</label>
          <input
            autoComplete="true"
            id="confirm-password"
            name="confirm-password"
            type="password"
            required
            placeholder="Confirm Password"
            onChange={handleChange('confirmPassword')}
            value={confirmPassword}
          />
        </FormInput>
        <SubmitContainter>
          <SubmitButton
            onClick={onSubmit}
            disabled={email === ''}
            type="submit"
          >
            Sign up
          </SubmitButton>
        </SubmitContainter>
      </Form>
    </FormWrapper>
  );
};

export default Signup;
