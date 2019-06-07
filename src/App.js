import React, { Component } from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';

import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import Orders from './containers/Orders/Orders';

class App extends Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <Layout>
            <Switch>
              <Route path="/burger-builder" component={BurgerBuilder} />
              <Route path="/checkout" component={Checkout} />
              <Route path="/orders" component={Orders} />
              <Redirect from="/" to="/burger-builder" exact/>
              <Route render={() => <h1 style={{textAlign: 'center'}}>No page found..!</h1>} />
            </Switch>
          </Layout>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
