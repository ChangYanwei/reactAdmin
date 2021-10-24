import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import memoryUtil from "./utils/memoryUtil";
import storageUtil from "./utils/storageUtil";
import Login from "./pages/login/Login";
import Admin from "./pages/admin/Admin";

export default class App extends Component {
  render() {
    const user = storageUtil.getUser();
    memoryUtil.user = user;
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/" component={Admin} />
        </Switch>
      </BrowserRouter>
    );
  }
}
