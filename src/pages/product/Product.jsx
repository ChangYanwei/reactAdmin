import React, { Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import ProductHome from "./childPages/ProductHome";
import ProductAddUpdate from "./childPages/ProductAddUpdate";
import ProductDetail from "./childPages/ProductDetail";

export default class Product extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route path="/product" exact component={ProductHome} />
          <Route path="/product/addupdate" component={ProductAddUpdate} />
          <Route path="/product/detail" component={ProductDetail} />
          <Redirect to="/product" />
        </Switch>
      </div>
    );
  }
}
