import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import store from './store';

import './style/stylesheets/normalize.css';
import './style/stylesheets/bootstrap.css';
import './style/stylesheets/font-awesome.css';
import './style/stylesheets/footer.css';
import './style/stylesheets/style.css';
// import './style/bootstrap/jquery.min.js';
// import './style/bootstrap/bootstrap.min.js';
//--------------------AXIOS & d3 & other libraries--------------------

import axios from 'axios';


//----------------components to come---------------

import App from './components/App';

console.log(window, window.outerWidth);


render(
   <Provider store={store}>
     <Router>
       <div>
       {window.outerWidth > 1199 &&
  			<Route path="/" component={App} />
  			}
  			{window.outerWidth < 1199 &&
  			<p className="text-center" style={{margin: '20px'}}>create a page to show when device with is less than 1200 (rotate or enlarge to view)</p>
  			}
	     </div>
     </Router>
   </Provider>,
    document.getElementById('root'),
 );
