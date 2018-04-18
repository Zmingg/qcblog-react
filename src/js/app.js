import React from 'react';
import { render } from 'react-dom';
import { combineReducers, createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import Show from './containers/Show';
import Blog from './containers/Blog';
import Index from './containers/Index';
import 'font-awesome-webpack';
import 'babel-polyfill'
import { ConnectedRouter, routerReducer, routerMiddleware, push } from 'react-router-redux'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import createBrowserHistory from 'history/createBrowserHistory'
const newHistory = createBrowserHistory();

import { getHotBlogs,requestFetch } from './actions'
import App from './reducers'
import thunkMiddleware from 'redux-thunk'
import Test from "./containers/Test";

const hismiddleware = routerMiddleware(newHistory)
let createStoreWithMiddleware = applyMiddleware(thunkMiddleware,hismiddleware)(createStore)

const store = createStoreWithMiddleware(App);

const style = require('../scss/app.scss')
const unsubscribe = store.subscribe(async () =>
    console.log(await store.getState())
)

const Root = ({ store }) => (
  <Provider store={store}>
    {/*<ConnectedRouter history={newHistory}>*/}
    {/*<div className={style.app}>*/}
    {/*<Index>*/}
    <Router history={newHistory}>
      <Index>
        <Route exact path="/" component={Blog} />
        <Route path="/show/:id" component={Show} />
          <Route path="/test" component={Test}/>
      </Index>
    </Router>
    {/*</Index>*/}
    {/*</div>*/}
    {/*</ConnectedRouter>*/}
  </Provider>
);


render(<Root store={store}/>,document.getElementById('app'))
