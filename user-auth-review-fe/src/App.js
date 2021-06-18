import React from 'react';
import './App.css';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Registration from './pages/Registration';
import PrivateRoute from './components/PrivateRoute';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';

function App() {
  return (
    <Router>
      <Switch>
        <PrivateRoute exact path='/dashboard' component={Dashboard} />
        <Route exact path='/registration' component={Registration} />
        <Route exact path='/' component={Login} />
      </Switch>
    </Router>
  );
}

export default App;
