import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import useAuthentication from '../hooks/useAuthentication';
import styled from 'styled-components';

// Initial values for the form fields
const initialValues = {
 username: '',
 email: '',
 password: ''
};

// Define the validation schema 
const validationSchema = Yup.object().shape({
 username: Yup.string().required('Required'),
 email: Yup.string().email('Invalid email').required('Required'),
 password: Yup.string().min(8, 'Must be at least 8 characters').required('Required')
});

const StyledContainer = styled.div`
 display: flex;
 flex-direction: column;
 align-items: center;
 justify-content: center;
 margin-top: -200px;
 background-repeat: no-repeat; 
 min-height: 100vh; /* Ensure container takes at least full viewport height */
 overflow-y: auto; /* Allow vertical scrolling if content overflows */
`;

const StyledHeader = styled.h1`
  text-align: center;
  color: black;
  z-index: 2;
  margin-top: 90px; /* Adjust the margin top as needed */
`;


const LeftBackground = styled.div`
 position: absolute;
 left: 0;
 top: 0;
 width: 33%; 
 height: 100%;
 background-image: url('https://i.pinimg.com/564x/7e/47/54/7e47549906a0a081dc2dba0478f12bff.jpg'); 
 background-size: cover;
`;

const MiddleBackground = styled.div`
 position: absolute;
 left: 33%; /* Position in the middle */
 top: 0;
 width: 35%; 
 height: 100%;
 background-image: url('https://i.pinimg.com/564x/c3/1a/09/c31a09e192f7c6921cac5dbafc1cb8f4.jpg'); /
 background-size: cover;
`;

const RightBackground = styled.div`
 position: absolute;
 right: 0;
 top: 0;
 width: 33%; 
 height: 100%;
 background-image: url('https://i.pinimg.com/564x/1f/c0/65/1fc065fbd0b55428cad995a9861ed24c.jpg'); 
 background-size: cover;
`;

const StyledForm = styled(Form)`
 position: relative;
 z-index: 0; /* Ensure form appears below the header */
 display: flex;
 flex-direction: column;
 width: 280px; 
 padding: 20px;
 border-radius: 10px;
`;

const StyledLabel = styled.label`
 margin-bottom: 3px;
 font-size: 18px;
 color: black;
 width: 80px;
 border-radius: 8px; /* Add border radius */
 padding: 5px 10px; /* Add initial padding */
 white-space: nowrap; /* Ensure label doesn't break into multiple lines */
`;

const StyledInput = styled(Field)`
 padding: 10px;
 margin-bottom: 10px; /* Reduce margin */
 border: 1px solid #ccc;
 border-radius: 8px; /* Adjust border radius */
 font-size: 15px; /* Adjust font size */
 padding-left: 3px; 
`;

const StyledButton = styled.button`
  padding: 10px 30px;
  background-color: #dFcd21; 
  color: black;
  font-size: 16px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  margin-top: 5px;
  transition: background-color 0.2s ease; /* Smooth transition for background color */

  &:disabled {
    background-color: #dFC111;
    cursor: not-allowed;
  }

  &:hover {
    background-color: #e65; 
  }
`;




const Register = () => {
 // Call the useAuthentication hook 
 const { register } = useAuthentication();

 // Define the submit handler for the form
 const onSubmit = async (values, { setSubmitting, setErrors }) => {
    try {
      await register(values.username, values.email, values.password);
    } catch (error) {
      setErrors({ submit: error.message });
    } finally {
      setSubmitting(false);
    }
 };

 return (
    <StyledContainer>
      <LeftBackground />
      <MiddleBackground />
      <RightBackground />
      <StyledHeader>Chit Chat Sign Up</StyledHeader>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ isSubmitting, errors }) => (
          <StyledForm>
            <StyledLabel htmlFor="username">Username</StyledLabel>
            <StyledInput id="username" name="username" type="text" autoComplete="current-username"/>
            <ErrorMessage name="username" component="div" />

            <StyledLabel htmlFor="email">Email Address</StyledLabel>
            <StyledInput id="email" name="email" type="email" autoComplete="current-email" />
            <ErrorMessage name="email" component="div" />

            <StyledLabel htmlFor="password">Password</StyledLabel>
            <StyledInput id="password" name="password" type="password" autoComplete="current-password" />
            <ErrorMessage name="password" component="div" />

            {errors.submit && <div>{errors.submit}</div>}

            <StyledButton type="submit" disabled={isSubmitting}>
              Register
            </StyledButton>
          </StyledForm>
        )}
      </Formik>
    </StyledContainer>
 );
};

export default Register;
