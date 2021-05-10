import React from 'react';
import { Form, FormInput, FormWrapper } from '../../components/FormStyles';

const Signup = () => {
  return (
    <FormWrapper>
      <div>
        <h2>Create your account</h2>

        <Form action="#" method="POST">
          <input type="hidden" name="remember" defaultValue="true" />
          <div>
            <FormInput>
              <label htmlFor="name">Name</label>
              <input
                id="name"
                name="name"
                type="name"
                required
                placeholder="Name"
              />
            </FormInput>
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
          <button type="submit">Sign up</button>
        </Form>
      </div>
    </FormWrapper>
  );
};

export default Signup;
