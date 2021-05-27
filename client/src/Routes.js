import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './pages/home';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import Signin from './pages/signin';
import Signup from './pages/signup';
import AdminDashboard from './pages/admin/dashboard';
import ProtectedRoute from './utils/auth/ProtectedRoute';
import Categories from './pages/admin/categories';
import createCategory from './pages/admin/categories/createCategory';
import updateCategory from './pages/admin/categories/updateCategory';
import Products from './pages/admin/products';
import CreateProduct from './pages/admin/products/createProduct';
import updateProduct from './pages/admin/products/updateProduct';
import Cart from './pages/cart';
import Profile from './pages/user-account';

const Routes = () => {
  return (
    <Router>
      <NavBar />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/users/signup" exact component={Signup} />
        <Route path="/users/signin" exact component={Signin} />
        <ProtectedRoute
          path="/myaccount"
          restrictTo="user"
          exact
          component={Profile}
        />
        <ProtectedRoute path="/cart" restrictTo="user" exact component={Cart} />
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
        <ProtectedRoute
          path="/update-category/:categorySlug"
          exact
          component={updateCategory}
        />
        <ProtectedRoute path="/admin/products" exact component={Products} />
        <ProtectedRoute
          path="/create-product"
          exact
          component={CreateProduct}
        />
        <ProtectedRoute
          path="/update-product/:productSlug"
          exact
          component={updateProduct}
        />
      </Switch>
      <Footer />
    </Router>
  );
};

export default Routes;
