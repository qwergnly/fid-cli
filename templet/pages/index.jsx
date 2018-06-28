"use strict";
import React from 'react';
import ReactDOM from "react-dom";
import Layout from "components/layout/index";
import {
  Route,
  HashRouter,
  IndexRoute,
  Switch
}
from 'react-router-dom';
import Demo from "./mod/demo";
import "./index.styl";
ReactDOM.render(<HashRouter >
  <Layout >
    <Route exact="exact" path="/" component={ Demo }/>
  </Layout>
</HashRouter>, document.getElementById("container"));
