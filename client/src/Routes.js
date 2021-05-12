import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './pages/home';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import Signin from './pages/signin';
import Signup from './pages/signup';
import Dashboard from './pages/dashboard';
import AdminDashboard from './pages/admin/dashboard';

import ProtectedRoute from './utils/auth/ProtectedRoute';
import Categories from './pages/admin/categories';
import createCategory from './pages/admin/categories/createCategory';

const Routes = () => {
  return (
    <Router>
      <NavBar />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/users/signup" exact component={Signup} />
        <Route path="/users/signin" exact component={Signin} />
        <ProtectedRoute
          path="/dashboard"
          restrictTo="user"
          exact
          component={Dashboard}
        />
        <ProtectedRoute
          path="/admin/dashboard"
          exact
          component={AdminDashboard}
        />
        <ProtectedRoute path="/admin/categories" exact component={Categories} />
        <ProtectedRoute
          path="/create-category"
          exact
          component={createCategory}
        />
      </Switch>
      <Footer />
    </Router>
  );
};

export default Routes;
