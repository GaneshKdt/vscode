import React from 'react';
import { Row, Col } from 'react-bootstrap'
import 'react-confirm-alert/src/react-confirm-alert.css';
import PageContent from '../../components/PageContent/PageContent';
// import EscalationMatrix from './EscalationMatrix';
import AskQuestion from './AskQuestion';
import VisitUs from './VisitUs';
import ReachUs from './ReachUs';

const cityArray = ['Mumbai','Delhi','Bangalore','Hyderabad','Pune','Ahmedabad','Kolkata']

export default function ContactUs(){
    
    return(
        <PageContent
            id = 'contact-us'
            title = 'Support'
            loaded = { true }
            error = { false }
            loadingMessage = 'Loading...'
            errorMessage = { `Oops. Something wen't Wrong` }
        >
            <Row>          
                <Col className = 'mt-3' md={4} sm={12}>
                    <AskQuestion/>
                </Col>
                    
                <Col className = 'mt-3' md={4} sm={12}>
                    <ReachUs />
                </Col>

                <Col className = 'mt-3' md={4} sm={12} >
                    <VisitUs cityArray = { cityArray } />
                </Col>
            </Row>
            {/* <Row>
                <Col className = 'mt-3'>
                    <EscalationMatrix cityArray = { cityArray } />
                </Col>
            </Row> */}
        </PageContent>
    )
}