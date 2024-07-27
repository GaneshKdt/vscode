import React, { Component } from 'react';
import { 
  // BrowserRouter, 
  Redirect, 
  Route, 
  // Switch 
} from 'react-router-dom'
import Header from './components/Header'
/* import AppLozicChat from './components/AppLozicChat/AppLozicChat' */
import {connect} from 'react-redux';
import LeftSideRootNavigationDrawer from './components/LeftSideRootNavigationDrawer/LeftSideRootNavigationDrawer'
// import ChangePassword from './containers/UserProfileForms/ChangePassword'
import StickyElement from './components/StickyElement/StickyElement'
import Breadcrumbs from './components/Breadcrumbs/Breadcrumbs'
import { Container } from 'react-bootstrap'
import './ResponsiveContentForChat.css'
import AxiosHandler from './shared/AxiosHandler/AxiosHandler';
import ChatButton from './components/ChatButton/ChatButton';

class StudentRouter extends Component {
  state = {
      studentData: {},
      isLoaded: false,
  }

 

  sample=(key)=>{
    this.setState({keyword:key})
  }

  render() {

    const { component: Component, ...props } = this.props
    //Redirect to login if no sapid in sesison.
    //commented in test

    if(props.path == "/timeline/login"){
      return (
        <div className="App">
          <div className="wrapper">
            <div id="content">
              <Route 
                {...props} 
                render={props => (
                  <Component {...props} />
                )} 
              />
            </div>  
          </div>  
        </div>
      );
    }

    if(!this.props.data.sapid){
      return (  
        <Route 
          {...props} 
          render={props => (
              <Redirect to='/timeline/login' />
            )
          } />
      )
    }
    
    // Set sapid in AxiosHandler
    AxiosHandler.sapid = this.props.data.sapid

    // console.log("inside router--------------",this.props.path)
    var isHeaderRequired = true;
    var isSideBarRequired = true;

    if(this.props.path && this.props.path === "/timeline/sessionFeedback"){
      isHeaderRequired = false;
      isSideBarRequired = false;
    }
    if(this.props.path&&this.props.path==="/timeline/LOUForm"){
      isHeaderRequired = false;
      isSideBarRequired = false;
    }
    // //Post Login Checks Start ----
    //   if(this.props.data.changedPassword != 'Y'){
    //     return (
    //       <div className="App">
    //         <div className="wrapper">
    //           <Header sample={this.sample}/>
    //           <div 
    //             id="content" 
    //             className={"w-100 h-100"}>
    //             <Container>
    //                 <Row style={{
    //                         'display': 'flex',
    //                         'alignItems': 'center',
    //                     }}>
    //                     <Col style={{
    //                     }} className="mx-auto" md={{ span: 10, offset: 1 }} sm={{ span: 12, offset: 0 }} xs={{ span: 12, offset: 0 }}>
    //                         <Card>
    //                             <Card.Header><h4>Please change your password before continuing</h4></Card.Header>
    //                             <Card.Body>
    //                               <ChangePassword/>
    //                             </Card.Body>
    //                         </Card>
    //                     </Col>
    //                 </Row>
    //             </Container>
    //           </div>
    //         </div>
    //       </div>
    //     )
    //   }
    // //Post login checks end ------

    //if sidebar is required by this component
      return (
        <>
        <div className="App">
          <div className="wrapper">
            {/* header and sidebar condition added for session feedback form */}
          {isHeaderRequired ? 
            <Header sample={this.sample}/>
            : null}
            <Container fluid style={{display: 'flex', alignItems: 'flex-start'}}>
            {isSideBarRequired ? 

              <StickyElement id="side-bar-parent" style={{zIndex: '1020'}}>
                <LeftSideRootNavigationDrawer />
              </StickyElement>
               : null} 
              
              <div 
                id={ "content" }
              >
                
                <Container>
                  <Breadcrumbs />
                </Container>
              {/* If any conditional rendering is done */}
              {
                (this.props.render == undefined || this.props.render == null) ? 
                (
                  <Route 
                    {...props} 

                    render={props => (
                      <Component {...props} newKey={this.state.keyword}/>
                    )} 
                  />
                ) : 
                (
                  <Route 
                    {...props}
                  />
                )
              }
              
              </div>
            </Container>
           </div>
          {/*this.props.disableChat ? null : (<AppLozicChat parent={ this } />)*/}
          <ChatButton liveagent={window.liveagent} sapid={this.props.data.sapid} city={this.props.data.city} emailId={this.props.data.emailId} 
            firstName={this.props.data.firstName} lastName={this.props.data.lastName} mobile={this.props.data.mobile}
            dispatch={this.props.dispatch}/>
          {/* <QuickBlox sapid={this.props.data.sapid} firstName={this.props.data.firstName} lastName={this.props.data.lastName}/> */}
          {/* {<SalesforceChat liveagent={window.liveagent} sapid={props.data.sapid} city={props.data.city} emailId={props.data.emailId} 
            firstName={props.data.firstName} lastName={props.data.lastName} mobile={props.data.mobile}
            dispatch={props.dispatch}/>} */}
          
          
        </div>
        </>
      )
    }
}

const mapStateToProps = state => {
    return {
        sapId: state.sapid,
        data: state
    }
}

export default connect(mapStateToProps)(StudentRouter)