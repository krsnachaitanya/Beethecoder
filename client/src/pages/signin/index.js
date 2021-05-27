/* eslint-disable react/no-unknown-property */
import React, { useContext, useState } from 'react';
import { Redirect } from 'react-router-dom';
import Alert from '../../components/alert';
import {
  ForgotPassword,
  Form,
  FormInput,
  FormWrapper,
  SubmitButton,
  SubmitContainter,
} from '../../components/form/FormStyles';
import PageTitle from '../../components/PageTitle';
import { signin } from '../../utils/auth';
import { UserContext } from '../user-account/userContext';

const Signin = () => {
  const { user, authenticate } = useContext(UserContext);
  const [values, setValues] = useState({
    email: '',
    password: '',
    status: '',
    message: '',
    loading: false,
    didRedirect: false,
  });
  const [showAlert, setShowAlert] = useState(false);

  const { email, password, status, message, didRedirect } = values;

  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  const onSubmit = async (event) => {
    try {
      event.preventDefault();
      setValues({
        ...values,
        loading: true,
        status: 'Loading...',
        message: 'Please wait...',
      });
      const data = await signin({ email, password });
      if (data.status !== 'success') {
        setValues({
          ...values,
          status: data.status,
          message: data.message,
          loading: false,
        });
        setShowAlert(true);
      } else {
        authenticate(data);
      }
    } catch (err) {
      setValues({
        ...values,
        status: 'Signed in failed!',
        message: 'Please try again.',
      });
      setShowAlert(true);
    }
  };

  const performRedirect = () => {
    if (didRedirect) {
      if (user && user.data.role === 'admin') {
        return <Redirect to="/admin/dashboard" />;
      } else {
        return <Redirect to="/dashboard" />;
      }
    }
    if (user) {
      return <Redirect to="/" />;
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
        title="Sign In"
        description="Welcome back! Sign in to your account."
      />
      <Form>
        <input type="hidden" name="remember" defaultValue="true" />
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
        <SubmitContainter>
          <SubmitButton
            disabled={email === '' || password === ''}
            onClick={onSubmit}
            type="submit"
          >
            Sign In
          </SubmitButton>
          <ForgotPassword href="#">Forgot Password?</ForgotPassword>
        </SubmitContainter>
      </Form>
      {performRedirect()}
    </FormWrapper>
  );
};

export default Signin;
