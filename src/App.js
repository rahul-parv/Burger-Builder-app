import React, { Component } from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';

import Layout from './hoc/Layout/Layout';
import Callback from './containers/Auth/Auth0/callback';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Logout from './containers/Auth/Logout/Logout';
import asyncComponent from './hoc/asyncComponent/asyncComponent';
import Auth0 from './containers/Auth/Auth0/Auth0';

const asyncCheckout = asyncComponent(() => {
  return import('./containers/Checkout/Checkout');
});

const asyncOrders = asyncComponent(() => {
  return import('./containers/Orders/Orders');
});

const asyncAuth = asyncComponent(() => {
  return import('./containers/Auth/Auth');
});

class App extends Component {

  state = {
    isAuthenticated: false
  }

  componentDidMount() {
    const auth = new Auth0();
    this.setState({isAuthenticated: auth.isAuthenticated()});
  }

  render() {
    let routes = (
      <Switch>
        <Route path="/callback" component={Callback} />
        <Route path="/auth" component={asyncAuth} />
        <Route path="/burger-builder" exact component={BurgerBuilder} />
        <Route path="/" exact component={BurgerBuilder} />
        <Redirect to="/" />
      </Switch>
    )
    if (this.state.isAuthenticated) {
      routes = (
        <Switch>
          <Route path="/callback" component={Callback} />
          <Route path="/checkout" component={asyncCheckout} />
          <Route path="/orders" component={asyncOrders} />
          <Route path="/logout" component={Logout} />
          <Route path="/auth" component={asyncAuth} />
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
