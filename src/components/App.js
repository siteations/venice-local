import React, { Component } from 'react';
import Frame from './FrontFrame.js';
import {grey900} from 'material-ui/styles/colors';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import injectTapEventPlugin from 'react-tap-event-plugin';

import Preloader from './Preloader.js';

injectTapEventPlugin();


const muiTheme = getMuiTheme({
  palette: {
    primary1Color: '#352c1a',
    primary2Color: grey900,
    primary3Color: '#d8d0ba',
    accent1Color:'#d8d0ba',
    accent2Color:'#f4f2ec',
    accent3Color:'#d8d0ba',
  },
});


class App extends Component {
	constructor(props){
		super(props);
		this.state= {}
		this.localAction=this.localAction.bind(this);
	}

	localAction (e){
		let thing = e.target.attributes.value.value;
		this.props.setThing(thing);
	}


	render(){

		console.log('app props', this.props.location.pathname);

		return (
		    <MuiThemeProvider muiTheme={muiTheme} >
				<div className="container-fluid ">
					<Frame />
					<Preloader />
				</div>
				</MuiThemeProvider>
		)
	}
}

//export default connect(mapStateToProps, mapDispatchToProps)(App);

export default App;
