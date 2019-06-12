import React, { Component } from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';

import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Callback from './containers/Auth/Callback';
import asyncComponent from './hoc/asyncComponent/asyncComponent';
import Auth0 from './shared/Auth';
const auth = new Auth0();

const asyncCheckout = new asyncComponent(() => {
  return import('./containers/Checkout/Checkout');
});
const asyncOrders = new asyncComponent(() => {
  return import('./containers/Orders/Orders');
});

class App extends Component {
  render() {
    let routes = (
      <Switch>
        <Route path="/callback" component={Callback} />
        <Route path="/burger-builder" exact component={BurgerBuilder} />
        <Route path="/" exact component={BurgerBuilder} />
        <Redirect to="/" />
      </Switch>
    )
    if (auth.isAuthenticated()) {
      routes = (
        <Switch>
          <Route path="/checkout" component={asyncCheckout} />
          <Route path="/orders" component={asyncOrders} />
          <Route path="/burger-builder" exact component={BurgerBuilder} />
          <Route path="/" exact component={BurgerBuilder} />
          <Redirect to="/" />
        </Switch>
      )
    }
    return (
      <div>
        <BrowserRouter>
          <Layout>
            {routes}
          </Layout>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
