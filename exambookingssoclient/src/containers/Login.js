import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import FullScreenLoading from '../components/FullScreenLoading';
import AxiosHandler from '../shared/AxiosHandler/AxiosHandler';
import { API, Pages } from '../shared/config';

const queryString = require('query-string')
class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sapId : "",
            password : "app@ngasce20",
            isLoaded : false
        }
    }

    componentWillMount(){
        // //End previous session.
        this.props.dispatch({
            type:'USER_LOGOUT',
            data:""
        });
    }

    handleSubmit = (sapid) => {
        AxiosHandler.AxiosPostHandler({
            url : API.authenticate, 
            data : {
                userId: sapid,
                password: this.state.password
            }, 
            successCallBack : response => {
                var student = response.data;
                this.props.dispatch({
                    type: 'Authenticated',
                    data: student
                });
                let goTo = Pages.home
                switch(this.state.redirectToPage) {
                    case 'examBooking' : 
                        goTo = Pages.examBookingHome
                        break;
                    case 'support' : 
                        goTo = Pages.contactUs
                        break;
                    case 'hallticket' : 
                        goTo = Pages.hallticket
                        break;
                    case 'serviceRequest' : 
                        goTo = Pages.serviceRequest
                        break;
                    case 'results' : 
                        goTo = Pages.examResults
                        break;
                    case 'eLearn' :
                        goTo = Pages.eLearn
                        break;
                    case 'assessments' :
                        goTo = Pages.upcomingExams
                        break;
                }
                this.props.history.push({pathname: goTo})
            },
            failureCallBack :  (error) => {
                // window.location.assign(URL.apiUrl_web_studentPortal)
            }
        })
	}

    componentDidMount(){
        let sapid = queryString.parse(this.props.location.search).sapid;
        let page = queryString.parse(this.props.location.search).key;

        window.history.replaceState({}, document.title, window.location.pathname);
        
        this.setState({
            redirectToPage : page
        }, 
        () => {
            this.handleSubmit(sapid);
        })
    }
    
    render() {
        return <FullScreenLoading />
    }
}

export default withRouter(connect()(Login)) 

//http://localhost:3000/ssoservices/mbax/login?sapid=77519923029&key=serviceRequest
//https://studentzone-ngasce.nmims.edu/ssoservices/mbax/login?sapid=77819990180&key=eLearn
