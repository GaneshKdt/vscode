import React, { Component } from 'react';

import Spinner from 'react-bootstrap/Spinner';

import './WarningMessage.css';


class WarningMessage extends Component {
  state = {
      message : this.props.message,
      isLoaded : false
  }
    
     
    
      componentDidMount(){
        console.log('In WarningMessage componentDidMount()...');
        this.setState({
            isLoaded: true
        })
      }
    
    
  render() { 
    
      return <div className ="text-left text-muted">
         {
             this.state.isLoaded == true 
             ? <div className ="">
                <h5> <span> <i className="material-icons">warning</i> </span> {this.state.message}  </h5>
                </div>
           : <div></div> 
         }
         
      </div>;
    
  }
}

export default WarningMessage;