import React, { Fragment } from 'react'; // Fragment doesn''t show up in DOM, just necessary to enclose jsx if not using a div or other element
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import { useEffect } from 'react';
import './App.css';

import Landing from './components/layout/Landing';
import Navbar from './components/layout/Navbar';
import Alert from './components/layout/Alert';
import Dashboard from './components/dashboard/Dashboard';

import setAuthToken from './utils/setAuthToken';
// redux
import store from './store';
import { Provider } from 'react-redux';
import { loadUser } from './actions/auth';
import getStorageProvider from './utils/getStorageProvider';
import PrivateRoute from './components/routing/PrivateRoute';
import EditProfile from './components/profile-forms/EditProfile';
import AddExperience from './components/profile-forms/AddExperience';

const storage = getStorageProvider();

if (storage.token) {
  // same as localStorage.getItem('token')
  setAuthToken(storage.token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []); //[] = run only once

  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar />
          <Route exact path="/" component={Landing} />
          <section className="container">
            <Alert />
            <Switch>
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
              <PrivateRoute exact path="/dashboard" component={Dashboard} />
              <PrivateRoute
                exact
                path="/edit-profile"
                component={EditProfile}
              />
              <PrivateRoute
                exact
                path="/add-experience"
                component={AddExperience}
              />
            </Switch>
          </section>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
