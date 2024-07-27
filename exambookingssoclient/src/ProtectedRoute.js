import React from 'react';
import { connect } from "react-redux";
import { Route } from 'react-router-dom';
import Header from "./components/Header/Header";
import Logout from "./containers/Logout";
import { AppConfig, URL } from './shared/config';

let base = AppConfig.APP_BASE

function ProtectedRoute(props){
	if(props.logout) {
		setTimeout(
			function(){ 
				window.location.assign(URL.logout) 
			}, 
			1000
		)
		return <Logout />
	}
	return (
		<>
			<Header />
			<Route 
				{...props} 
				path={`${base}${props.path}`}
			/>
		</>
	)
}

const mapStateToProps = state => {
	return {
		sapid: state.sapid,
		state: state,
		text : state.text,
		logout : state.logout
	}
}

export default connect(mapStateToProps)(ProtectedRoute)
