import React, { Fragment } from 'react'; // Fragment doesn''t show up in DOM, just necessary to enclose jsx if not using a div or other element
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import './App.css';

import Landing from './components/layout/Landing';
import Navbar from './components/layout/Navbar';

// redux
import { Provider } from 'react-redux';
import store from './store';

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar />
          <Route exact path="/" component={Landing} />
          <section className="container">
            <Switch>
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
            </Switch>
          </section>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
