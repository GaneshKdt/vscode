import React, { Component } from 'react';
 

import Spinner from 'react-bootstrap/Spinner';

import './LoadingSpinner.css';


class LoadingSpinner extends Component {
  
    
     
    
      componentDidMount(){
            console.log('In LoadingSpinner componentDidMount()...');
      }
    
    
  render() { 
    
      return (
        <div className="loadingSpinner">
          <div className ={this.props && this.props.noSpace ? "pb-1" : "loadingSpinnerParent mt-5"}>
            <div className = {this.props && this.props.noSpace ? "" : "loadingSpinnerChild"}>
              <Spinner animation="border" variant="secondary">
                <span className="sr-only">Loading...</span>
              </Spinner>
            </div>
          </div>
          {
            this.props && this.props.loadingText ? 
              <label>
                { this.props.loadingText }
              </label>: null
          }
        </div>
      );
    
  }
}

export default LoadingSpinner;