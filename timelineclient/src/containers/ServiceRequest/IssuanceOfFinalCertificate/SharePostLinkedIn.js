import React, { useState } from 'react';
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image'

import AxiosHandler from "../../../shared/AxiosHandler/AxiosHandler";
import { Link } from 'react-router-dom'
import ConfigUrls from '../../../shared/config'

const SHARE_CERTIFICATE_LINKEDIN = new ConfigUrls().api.getShareCertificateLinkedIn


function SharePostLinkedIn(props){

    function sharePostLinkedIn(){

        console.log("--->sharePostLinkedIn")
        AxiosHandler.AxiosPostHandler({
            url:SHARE_CERTIFICATE_LINKEDIN,
            data: {
                "sapId": props.sapId,
                "productType": props.productType
            },
            successCallBack:(success) => {

                console.debug('=====> LinkedIn: ')

                const newWindow = window.location.replace(success.data.return_url, '_self', 'noopener,noreferrer')
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
                Share Certificate on LinkedIn, Please click on Share Certificate.
                <Link onClick={sharePostLinkedIn} >
                    <Image 
                        src="/timeline/images/linkedIn/share-button.png" 
                        className="ml-3"
                        style={{height: '40px'}} 
                        alt="Share On LinkedIn"
                    />
                </Link>
            </Form.Label>
            <Col sm="4">
            </Col>
        </Form.Group>
    )
}



export default SharePostLinkedIn