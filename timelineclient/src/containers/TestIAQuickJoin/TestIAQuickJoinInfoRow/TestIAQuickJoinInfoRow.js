import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import { Button } from 'react-bootstrap';
import Moment from 'react-moment';
import {   Link } from 'react-router-dom';
import ListGroup from 'react-bootstrap/ListGroup';
import DueIcon from '@material-ui/icons/QueryBuilder';
import SubjectIcon from '@material-ui/icons/Subject';
import axios from 'axios'
//import { Pages } from '../../shared/config';
import { Pages } from '../../../shared/config';

class TestIAQuickJoinInfoRow extends Component {

    state ={
        test : this.props.test,
        sapId : this.props.sapId,
        studentData : this.props.studentData,
        testsToBeShownInQuickJoin : this.props.testsToBeShownInQuickJoin,
    }
     



    render(){
        return(
            <Card lg={7} sm={7} style={{margin:"10px"}}>
                        <Row>
                            <Col lg={7} sm={7} className="ml-4 mt-2">
                                <div> 
                                <svg data-name="\u7EC4 1 \u62F7\u8D1D" width="28" height="28" style={{marginRight:"2%"}}>
                                    <path data-name="\u5F62\u72B6 2" d="M14 0A14 14 0 1 1 0 14 14 14 0 0 1 14 0zm6.662 21.994H7.338a1.332 1.332 0 0 1-1.332-1.332V7.338a1.332 1.332 0 0 1 1.332-1.332h13.324a1.332 1.332 0 0 1 1.332 1.332v13.324a1.332 1.332 0 0 1-1.332 1.332zM8 20.993h8.983V19.01H8v1.983zm9.962-13.009l-3.983 4.053-2.022-1.937-.95 1.2 1.836 1.9.723.795h.723L18.995 9.1zM20 16H8v1.983h12V16z" fill="#3366cc" fill-rule="evenodd"></path>
                                </svg>
                                <b>
                                { this.state.test.testName }</b></div> 
                                <div className="testTextUnderHeader" style={{marginLeft:"33px"}}> <DueIcon className="iconForDueTest"/>&nbsp;
                                
                                    Join: <Moment format="MMM D, hh:mm a \(\I\S\T\)" withTitle>{this.state.test.startDate}</Moment> to <Moment format="MMM D, hh:mm a \(\I\S\T\)" withTitle>{this.state.test.endDate}</Moment> 
                                  &nbsp;
                                    <span style={{borderLeft: "1px solid rgb(171, 174, 186)"}}> &nbsp; <SubjectIcon className="iconForDueTest"/>&nbsp;{this.state.test.subject}</span>
                                </div>   
                            </Col>
                            <Col lg={4} md = {4} sm={4} className="text-right" style={{marginLeft: 'auto',marginRight: 'auto'}}>
                                 <>
                                                    <Link to={{
                                                        pathname: '/timeline/startIATestQuickJoin',
                                                        state: {
                                                            sapId : this.state.sapId,
                                                            studentData : this.state.studentData,
                                                            testId : this.state.test.id,
                                                            testName: this.state.test.testName,
                                                            testsToBeShownInQuickJoin: this.state.testsToBeShownInQuickJoin, 
                                                            }
                                                        }}>
                                                        <Button variant="primary" style={{fontSize: "12px",marginTop:'10px'}} size="sm">Take Test</Button>                                                     
                                                    </Link> 
                                                     
                                                       </>
                                  
                            </Col>
                        </Row>
                
                </Card>
        )
        
    }
}
export default withRouter(TestIAQuickJoinInfoRow)