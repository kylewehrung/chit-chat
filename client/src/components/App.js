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

  return (
    <Router> 
      <Switch>
        <Route path={`${backendUrl}/api/register`} component={Register} />
        <Route path={`${backendUrl}/api/login`} component={Login} />
        <Route path="/home_page" component={HomePage} />
        <Redirect to={`${backendUrl}/api/login`} />
      </Switch>
    </Router>
  );
}

export default App;
