import React, { useState } from 'react';
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image'

import AxiosHandler from "../../../shared/AxiosHandler/AxiosHandler";
import { Link } from 'react-router-dom'
import ConfigUrls from '../../../shared/config'

const ADD_CREDENTIAL_LINKED_IN = new ConfigUrls().api.addCredentialLinkedIn


function AddToProfileLinkedIn(props){
    console.log("--->addToProfileLinkedIn"+props.productType);
    function addToProfileLinkedIn(){

       
        AxiosHandler.AxiosPostHandler({
            url:ADD_CREDENTIAL_LINKED_IN,
            data: {
                "sapId": props.sapId,
                "productType": props.productType
            },
            successCallBack:(success) => {
                console.log('=====> LinkedIn')
                console.log(success.data.return_url)
              
                    const newWindow = window.location.replace(success.data.return_url, '_blank', 'noopener,noreferrer')
                    if (newWindow) newWindow.opener = null
                
            },
            failureCallBack:(failure)=>{
                console.log(failure)
            }
        })
    }
    

    return(
        <Form.Group as={Row}>
            <Form.Label column sm="12">
                Add Credentials on LinkedIn, Please click on Add to Profile.
                <Link onClick={addToProfileLinkedIn} >
                    <Image
                        src="/timeline/images/linkedIn/linkedInAddToProfile.png" 
                        className="ml-3"
                        style={{height: '40px'}} 
                        alt="Add to LinkedIn Profile"  
                    />
                </Link>
            </Form.Label>
            <Col sm="4">
            </Col>
        </Form.Group>
    )
}



export default AddToProfileLinkedIn