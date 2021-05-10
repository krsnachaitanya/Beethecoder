import React from 'react';
import { Form, FormInput, FormWrapper } from '../../components/FormStyles';

const Signin = () => {
  return (
    <FormWrapper>
      <div>
        <h2>Sign in to your account</h2>

        <Form action="#" method="POST">
          <input type="hidden" name="remember" defaultValue="true" />
          <div>
            <FormInput>
              <label htmlFor="email-address">Email address</label>
              <input
                id="email-address"
                name="email"
                type="email"
                required
                placeholder="Email address"
              />
            </FormInput>
            <FormInput>
              <label htmlFor="password">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                required
                placeholder="Password"
              />
            </FormInput>
          </div>

          <a href="#">Forgot your password?</a>

          <button type="submit">Sign in</button>
        </Form>
      </div>
    </FormWrapper>
  );
};

export default Signin;
