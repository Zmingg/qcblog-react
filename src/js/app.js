import React from 'react';
import ReactDOM from 'react-dom';
import Show from './show.jsx';
import Blog from './blog.jsx';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

ReactDOM.render((
<Router>
    <div>
<Route exact path="/" component={Blog}/>
<Route path="/show" component={Show}/>
    </div>
</Router>
),document.getElementById('app')
);




