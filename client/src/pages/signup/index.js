import React, { useContext, useState } from 'react';
import { Redirect } from 'react-router-dom';
import Alert from '../../components/alert';
import {
  Form,
  FormInput,
  FormWrapper,
  SubmitButton,
  SubmitContainter,
} from '../../components/form/FormStyles';
import PageTitle from '../../components/PageTitle';
import { signup } from '../../utils/auth';
import { UserContext } from '../user-account/userContext';

const Signup = () => {
  const { authenticate, user } = useContext(UserContext);
  const [values, setValues] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    status: '',
    message: '',
    didRedirect: false,
  });
  const [showAlert, setShowAlert] = useState(false);

  const {
    name,
    email,
    password,
    confirmPassword,
    status,
    message,
    didRedirect,
  } = values;

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
        authenticate(data);
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

  const performRedirect = () => {
    if (didRedirect) {
      if (user && user.data.role === 'admin') {
        return <Redirect to="/admin/dashboard" />;
      } else {
        return <Redirect to="/" />;
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
      {performRedirect()}
    </FormWrapper>
  );
};

export default Signup;
