// src/components/Login.js
import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import useAuthentication from '../hooks/useAuthentication';



// Initial values for the form fields
const initialValues = {
  username: '',
  password: ''
};

// Define the validation schema using Yup
const validationSchema = Yup.object().shape({
  username: Yup.string().required('Required'),
  password: Yup.string().min(8, 'Must be at least   8 characters').required('Required')
});

const Login = () => {
  // Call the useAuthentication hook 
  const { login } = useAuthentication();

  // Define the submit handler 
  const onSubmit = async (values, { setSubmitting, setErrors }) => {
    try {
      await login(values.username, values.password);
    } catch (error) {
      setErrors({ submit: error.message });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ isSubmitting, errors }) => (
          <Form>
            <label htmlFor="username">Username</label>
            <Field id="username" name="username" type="text" autoComplete="current-username" />
            <ErrorMessage name="username" component="div" />

            <label htmlFor="password">Password</label>
            <Field id="password" name="password" type="password" autoComplete="current-password" />
            <ErrorMessage name="password" component="div" />


            {errors.submit && <div>{errors.submit}</div>}

            <button type="submit" disabled={isSubmitting}>
              Login
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Login;
