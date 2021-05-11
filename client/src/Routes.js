import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './pages/home';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import Signin from './pages/signin';
import Signup from './pages/signup';

const Routes = () => {
  return (
    <Router>
      <NavBar />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/users/signup" exact component={Signup} />
        <Route path="/users/signin" exact component={Signin} />
      </Switch>
      <Footer />
    </Router>
  );
};

export default Routes;
