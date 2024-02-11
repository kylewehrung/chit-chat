// src/components/Register.js
import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import useAuthentication from '../hooks/useAuthentication';

// Define the initial values for the form fields
const initialValues = {
  username: '',
  email: '',
  password: ''
};

// Define the validation schema using Yup
const validationSchema = Yup.object().shape({
  username: Yup.string().required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().min(8, 'Must be at least   8 characters').required('Required')
});

const Register = () => {
  // Call the useAuthentication hook at the top level of the component
  const { register } = useAuthentication();

  // Define the submit handler for the form
  const onSubmit = async (values, { setSubmitting, setErrors }) => {
    try {
      await register(values.username, values.email, values.password);
      // Handle successful registration, e.g., navigate to homepage
    } catch (error) {
      // Set Formik errors based on the error message
      setErrors({ submit: error.message });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <h1>Register</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ isSubmitting, errors }) => (
          <Form>
            <label htmlFor="username">Username</label>
            <Field id="username" name="username" type="text" />
            <ErrorMessage name="username" component="div" />

            <label htmlFor="email">Email Address</label>
            <Field id="email" name="email" type="email" />
            <ErrorMessage name="email" component="div" />

            <label htmlFor="password">Password</label>
            <Field id="password" name="password" type="password" />
            <ErrorMessage name="password" component="div" />

            {errors.submit && <div>{errors.submit}</div>}

            <button type="submit" disabled={isSubmitting}>
              Register
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Register;
