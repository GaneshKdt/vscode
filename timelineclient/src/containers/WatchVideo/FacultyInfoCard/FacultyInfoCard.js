import React, { Component } from 'react';
import { Route } from 'react-router-dom'
 
import axios from 'axios'

import Card from 'react-bootstrap/Card';
import Media from 'react-bootstrap/Media';

import './FacultyInfoCard.css';
import 'material-design-icons/iconfont/material-icons.css';
import {   Redirect } from 'react-router-dom';
import LoadingSpinner from '../../../shared/LoadingSpinner/LoadingSpinner';
import ConfigUrls from '../../../shared/config'

const urls = new ConfigUrls().urls;

class FacultyInfoCard extends Component {
    state = {
        error: null,
        isLoaded: false
      };
    
    
      componentDidMount(){
            console.log('In FacultyInfoCard componentDidMount()...');
            axios.defaults.headers.post['Content-Type'] = 'application/json';
            axios.post(urls.apiUrl_web_studentPortal + "/getFacultyDetails", 
            JSON.stringify({
                "userId": this.props.facultyId
            })
            ).then( response => {
              console.log("Got reponse data : ");
              console.log(response.data);
             this.setState({
                data: response.data,
                isLoaded: true
                })
            }).catch(function(error){
              console.log(error);
            })
      }
    
    
  render() { 
    if(!this.state.isLoaded)
    {
      return <div >
        <LoadingSpinner />
      </div>;
    }else{
        return  this.state.data.facultyId == null 
        ? <div> <h6 className="text-muted" ><i class="material-icons">error_outline</i> Content Not Available </h6> </div>
        : <div className="">
            	<Card className=" mb-2">
				<Card.Header className="">
					<Media className="">
            <img className="mr-3 rounded-circle" 
              src={
                this.state.data.profilePicFilePath != null
                ? this.state.data.profilePicFilePath
                : "data:image/png;base64,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"
              }
              alt="image" style={{width: '50px', height: '50px'}} />
						<Media.Body className="">
						<a href="/"><h5>Professor {this.state.data.firstName+" "+this.state.data.lastName} </h5> </a>
						<span className="text-muted">Professor</span>
						</Media.Body>
					</Media>
				</Card.Header>
				<Card.Body className="">
					<p style={{fontWeight: '400'}}>
                    
                    {
                        this.state.data.facultyDescription != null
                        ? ( <div  dangerouslySetInnerHTML={{__html: this.state.data.facultyDescription}} />)
                        : "NGASCE Facutly"
                    }
                    </p>
                    
					
				</Card.Body>
			</Card>
        </div>
    
    }
  }
}

export default FacultyInfoCard;