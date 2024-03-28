import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import useAuthentication from '../hooks/useAuthentication';
import styled from 'styled-components';

// Initial values for the form fields
const initialValues = {
 username: '',
 password: ''
};

// Define the validation schema using Yup
const validationSchema = Yup.object().shape({
 username: Yup.string().required('Required'),
 password: Yup.string().min(8, 'Must be at least 8 characters').required('Required')
});

const StyledHeader = styled.h1`
 text-align: center;
 color: white;
 z-index: 2; 
 font-size: 24px; 
`;


const StyledContainer = styled.div`
 position: relative;
 display: flex;
 flex-direction: column;
 align-items: center;
 justify-content: flex-start; 
 background-image: url('https://i.pinimg.com/564x/63/2e/45/632e45ba5c4fc3596d5bda046880a54a.jpg');
 background-repeat: no-repeat; 
 min-height: 100vh; /* Ensure container takes at least full viewport height */
 overflow-y: auto; /* Allow vertical scrolling if content overflows */
`;


const LeftBackground = styled.div`
 position: absolute;
 left: 0;
 top: 0;
 width: 33%; 
 height: 100%;
 background-image: url('https://i.pinimg.com/564x/b2/cc/6e/b2cc6ec9a2c1961d0c85a7706dd1a85d.jpg'); 
 background-size: cover;
`;

const MiddleBackground = styled.div`
 position: absolute;
 left: 33%; /* Position in the middle */
 top: 0;
 width: 35%; 
 height: 100%;
 background-image: url('https://i.pinimg.com/564x/63/2e/45/632e45ba5c4fc3596d5bda046880a54a.jpg'); /* Specify middle image URL */
 background-size: cover;
`;

const RightBackground = styled.div`
 position: absolute;
 right: 0;
 top: 0;
 width: 33%; 
 height: 100%;
 background-image: url('https://i.pinimg.com/564x/b2/cc/6e/b2cc6ec9a2c1961d0c85a7706dd1a85d.jpg'); /* Specify right image URL */
 background-size: cover;
`;

const StyledForm = styled(Form)`
 position: relative;
 z-index: 0; /* Ensure form appears below the header */
 display: flex;
 flex-direction: column;
 width: 280px; 
 margin: 120px auto 20px; /* Adjust margin to move form higher up */
 padding: 20px;
 border-radius: 10px;
`;


const StyledLabel = styled.label`
 margin-bottom: 3px;
 font-size: 16px;
 color: white;
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
 font-size: 14px; /* Adjust font size */
 color: rgba(0, 0, 0, 0.7); /* Set text color with opacity */
 padding-left: 4px; /* Manually set padding to 40px */
`;

const StyledButton = styled.button`
 padding: 10px 30px;
 background-color: #54D92f; 
 color: black;
 border: none;
 border-radius: 4px;
 cursor: pointer;
 &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
 }
`;

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
    <StyledContainer>
      <LeftBackground />
      <MiddleBackground />
      <RightBackground />
      <StyledHeader>Login</StyledHeader>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ isSubmitting, errors }) => (
          <StyledForm>
            <StyledLabel htmlFor="username">Username</StyledLabel>
            <StyledInput id="username" name="username" type="text" autoComplete="current-username" />
            <ErrorMessage name="username" component="div" />

            <StyledLabel htmlFor="password">Password</StyledLabel>
            <StyledInput id="password" name="password" type="password" autoComplete="current-password" />
            <ErrorMessage name="password" component="div" />

            {errors.submit && <div>{errors.submit}</div>}

            <StyledButton type="submit" disabled={isSubmitting}>
              Login
            </StyledButton>
          </StyledForm>
        )}
      </Formik>
    </StyledContainer>
 );
};

export default Login;
