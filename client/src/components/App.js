import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import useAuthentication from '../hooks/useAuthentication';
import Register from './Register';
import Login from './Login'; 
import HomePage from './HomePage'; 

function App() {
  const { loading, error } = useAuthentication();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const backendUrl = process.env.REACT_APP_BACKEND_URL;
  console.log(backendUrl)

  let registerPath = '/api/register';
  let loginPath = '/api/login';

  if (backendUrl) {
    registerPath = `${backendUrl}${registerPath}`;
    loginPath = `${backendUrl}${loginPath}`;
  }

  return (
    <Router> 
      <Switch>
        <Route path={registerPath} component={Register} />
        <Route path={loginPath} component={Login} />
        <Route path="/home_page" component={HomePage} />
        <Redirect to={loginPath} />
      </Switch>
    </Router>
  );
}

export default App;
