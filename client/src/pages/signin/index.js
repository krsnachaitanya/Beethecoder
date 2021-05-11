/* eslint-disable react/no-unknown-property */
import React, { useState } from 'react';
import {
  ForgotPassword,
  Form,
  FormInput,
  FormWrapper,
  SubmitContainter,
} from '../../components/FormStyles';
import PageTitle from '../../components/PageTitle';

const Signin = () => {
  const [values, setValues] = useState({
    email: '',
    password: '',
    error: '',
    success: false,
  });

  // const { email, password, error, success } = values;

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  return (
    <FormWrapper>
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
          />
        </FormInput>
        <SubmitContainter>
          <button type="submit">Sign In</button>
          <ForgotPassword href="#">Forgot Password?</ForgotPassword>
        </SubmitContainter>
      </Form>
    </FormWrapper>
  );
};

export default Signin;
