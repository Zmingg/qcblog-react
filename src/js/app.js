import React from 'react';
import { render } from 'react-dom';
import { combineReducers,createStore,applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import Show from './containers/Show';
import Blog from './containers/Blog';
import Index from './components/Index';
import 'font-awesome-webpack';
import 'babel-polyfill'
import { ConnectedRouter, routerReducer, routerMiddleware, push } from 'react-router-redux'
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'
import createBrowserHistory from 'history/createBrowserHistory'
const newHistory = createBrowserHistory();

import { getHotBlogs,requestFetch } from './actions'
import App from './reducers'
import thunkMiddleware from 'redux-thunk'

const hismiddleware = routerMiddleware(newHistory)
let createStoreWithMiddleware = applyMiddleware(thunkMiddleware,hismiddleware)(createStore)

const store = createStoreWithMiddleware(App);

const style = require('../scss/app.scss')

const Root = ({ store }) => (
  <Provider store={store}>
    <ConnectedRouter history={newHistory}>
    <div className={style.app}>
    <Index>
      <Route exact path="/app2" component={Blog} />
      <Route path="/app2/show/:id" component={Show} /> 
    </Index>
    </div>
    </ConnectedRouter>
  </Provider>
);

render(<Root store={store}/>,document.getElementById('app'))