import React, { Fragment } from 'react'; // Fragment doesn''t show up in DOM, just necessary to enclose jsx if not using a div or other element
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { useEffect } from 'react';
import './App.css';

import Landing from './components/layout/Landing';
import Navbar from './components/layout/Navbar';
import Alert from './components/layout/Alert';

import setAuthToken from './utils/setAuthToken';
// redux
import store from './store';
import { Provider } from 'react-redux';
import { loadUser } from './actions/auth';
import getStorageProvider from './utils/getStorageProvider';
import Routes from './components/routing/Routes';

const storage = getStorageProvider();
setAuthToken(storage.token);

const App = () => {
  useEffect(() => {
    // same as localStorage.getItem('token')
    store.dispatch(loadUser());
  }, []); //[] = run only once

  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar />
          <Route exact path="/" component={Landing} />
          <Route component={Routes} />
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
