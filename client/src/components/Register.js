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
 height: 100vh;
 background-image: url('https://i.etsystatic.com/7869041/r/il/e367c6/4871628960/il_1588xN.4871628960_n54h.jpg');
 background-size: cover;
 background-position: center;
`;

const StyledHeader = styled.h1`
 text-align: center;
`;

const StyledForm = styled(Form)`
 display: flex;
 flex-direction: column;
 width: 300px;
 margin: 0 auto;
`;

const BackgroundContainer = styled.div`
 background-color: rgba(255, 255, 255, 0.8); // Light opaque white
 padding: 20px;
 border-radius: 10px;
`;

const StyledLabel = styled.label`
 margin-bottom: 10px;
 font-size: 16px;
 color: #333;
`;

const StyledInput = styled(Field)`
 padding: 10px;
 margin-bottom: 20px;
 border: 1px solid #ccc;
 border-radius: 12px; 
`;

const StyledButton = styled.button`
 padding: 10px 20px;
 background-color: #f4D92f; // Light gold color
 color: black;
 border: none;
 border-radius: 4px;
 cursor: pointer;
 &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
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
      <StyledHeader>Chit Chat</StyledHeader>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ isSubmitting, errors }) => (
          <BackgroundContainer> 
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
          </BackgroundContainer>
        )}
      </Formik>
    </StyledContainer>
 );
};

export default Register;
