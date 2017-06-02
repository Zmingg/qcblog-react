import React from 'react';
import ReactDOM from 'react-dom';
import Show from './show.jsx';
import Blog from './blog.jsx';
import Clock from './clock.jsx';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'
import createBrowserHistory from 'history/createBrowserHistory'
const newHistory = createBrowserHistory();

ReactDOM.render((
<Router history={newHistory}>
    <div>
<Route exact path="/" component={Blog}/>
<Route path="/show/:id" component={Show}/>
    </div>
</Router>
),document.getElementById('app')
);

