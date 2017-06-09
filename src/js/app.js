import React from 'react';
import { render } from 'react-dom';
import { combineReducers,createStore } from 'redux';
import { Provider } from 'react-redux';
import Show from './show.jsx';
import Blog from './blog';

import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'
import createBrowserHistory from 'history/createBrowserHistory'
const newHistory = createBrowserHistory();

render((
<Router history={newHistory}  basename='/app2'>
    <div>
<Route exact path="/" component={Blog}/>
<Route path="/show/:id" component={Show}/>
    </div>
</Router>
),document.getElementById('app')
);



// import Counter from './components/Counter'
// import counter from './reducers/index'
// import { addCount } from './actions'
// const store = createStore(counter)
// const rootEl = document.getElementById('app')
// console.log(store.getState())
// const ren = ()=>render(
//   <Counter
//     value={store.getState().value}
//     onIncrement={() => store.dispatch(addCount(3))}
//     onDecrement={() => store.dispatch({ type: 'DECREMENT' })}
//   />,
//   rootEl
// )
// ren()
// store.subscribe(ren)

// import todoApp from './reducers'
// import App from './containers/App'

// let store = createStore(todoApp)

// let rootElement = document.getElementById('app')
// render(
//   (<Provider store={store}>
//     <App />
//   </Provider>),
//   rootElement
// )