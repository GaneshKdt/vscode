import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom'
import ConfigUrls from './shared/config'

const urls = new ConfigUrls().urls;

class Logout extends Component {

    componentWillMount(){
        this.props.dispatch({
            type:'USER_LOGOUT',
            data:""
        });
        this.setState({
            loggedOut: true
        })
    }
    
    render() {
        if(this.state.loggedOut){
            window.location.assign(urls.baseUrl + "logout")
            return null
        }else{

        }
    }
}

const mapStateToProps = state => {
	return {
		sapId: null,
		data: null
	}
}

export default withRouter(connect(mapStateToProps)(Logout));