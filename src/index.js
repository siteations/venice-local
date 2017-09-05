import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import store from './store';

import './style/stylesheets/normalize.css';
import './style/stylesheets/bootstrap.css';
import './style/stylesheets/font-awesome.css';
import './style/stylesheets/footer.css';
//import './style/stylesheets/styleScreen.css';
import './style/stylesheets/style.css';


//----------------components to come---------------

import App from './components/App';
import Alternate from './components/Alternate';

//console.log(window, window.innerWidth);


render(
   <Provider store={store}>
     <Router>
       <div>
       {window.innerWidth >= 1024 &&
  			<Route path="/" component={App} />
  			}
  			{window.innerWidth < 1024 &&
  			<Route path="/" component={Alternate} />
  			}
	     </div>
     </Router>
   </Provider>,
    document.getElementById('root'),
 );
