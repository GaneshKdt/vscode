import React, { Component } from 'react';
import axios from 'axios';
import '../SelectSR/SelectSR.css';
import Dropdown from 'react-bootstrap/Dropdown'
import ChangeInDOB from '../ChangeInDOB/ChangeInDOB'
import { Redirect } from 'react-router-dom'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import {analyticsManager} from '../../../shared/Analytics'

class SRCreated extends Component{
    state = {
       clickOK : false,
    }
    handleClickOk = () => {
        this.setState({
            clickOK : true,
        });
    }
    render(){
        return(
            <Card style={{maxWidth : "80%"}}>
                    <Card.Header className="cardHeader">Service Request Summary </Card.Header>
                    {/* <Card.Text>Dear Student, You have chosen below Service Request. Please fill in required information below before proceeding for Payment. </Card.Text> */}
                    <Card.Body>
                    <Row>
                        <Col>
                            <Form className="forFormInSR"> 

                                    { this.props.location.state.error ?
                                    <Form.Row as={Row}>
                                        <p>{this.props.location.state.error}</p>
                                    </Form.Row>
                                    :  
                                    <>
                                        <Form.Group as={Row}>
                                            <Form.Row>
                                                Service Request Type  : &nbsp;&nbsp;  { this.props.location.state.reqType ?
                                                            <p>{this.props.location.state.reqType} created successfully. </p>
                                                    : null
                                                    }
                                            </Form.Row>
                                        </Form.Group>
                                        <Form.Group as={Row}>
                                            <Form.Row>
                                                Service Request Description: &nbsp;&nbsp; { this.props.location.state.description ?
                                                    <p>{this.props.location.state.description}</p>
                                                    : null
                                                }
                                            </Form.Row>
                                            { this.props.location.state.error ?
                                            <Form.Row as={Row}>
                                                    <p>{this.props.location.state.error}</p>
                                            </Form.Row>
                                            : null}
                                        </Form.Group>
                                        <Form.Group as={Row} controlId="dob">
                                            <Form.Row>
                                                <p>Please quote Service request number
                                                { this.props.location.state.id ?
                                                    <b>   {this.props.location.state.id}  </b>
                                                    : null
                                                }
                                                for any future communications with Institute.</p>
                                            </Form.Row>
                                        </Form.Group>
                                    </>
                                    }
                               
                            </Form>
                            
                        </Col>
                    </Row>
                    </Card.Body>
                    <Card.Footer>
                                <Form.Group>
                                    <div className="forButtons">
                                        <Button variant="primary" id="submit" onClick={this.handleClickOk}>OK</Button>
                                    </div>
                                </Form.Group>
                                {this.state.clickOK === true ?
                                    <Redirect to='/timeline/selectSR' />
                                    : null
                                }
                    </Card.Footer>
                </Card>
            // original code
            // <div className="sz-main-content-wrapper">
            // <div className="sz-main-content menu-closed">
            //         <div className="sz-main-content-inner">
              				
							
            //   				<div className="sz-content-wrapper examsPage">
            //   						<div className="sz-content">
								
			// 							<h2 className="red text-capitalize">Service Request Summary</h2>
			// 							<div className="clearfix"></div>
		    //           					<div className="panel-content-wrapper">
										
            //                                 <fieldset>
            //                                     <div className="panel-body">
            //                                         <div className="col-md-12 column">
                                                        
            //                                             <div className="form-group">
            //                                                 <label path="serviceRequestType" >Service Request Type:</label>
            //                                                 { this.props.location.state.reqType ?
            //                                                         <p>{this.props.location.state.reqType} created successfully. </p>
            //                                                 : null
            //                                                 }
                                                            
                                                        // </div>
                                                        
                                                        // <div className="form-group">
                                                            // <label path="serviceRequestType" >Service Request Description:</label>
                                                            // {/* <c:choose>
                                                            //     <c:when test="${sr.descriptionList ne null}">
                                                            //     <p>${sr.descriptionList}</p>
                                                            //     </c:when>
                                                            //     <c:otherwise>
                                                            //     <p>${sr.description}</p>
                                                            //     </c:otherwise>
                                                            // </c:choose> */}
                    //                                         { this.props.location.state.description ?
                    //                                             <p>{this.props.location.state.description}</p>
                    //                                             : null
                    //                                         }
                                                            
                                                            
                    //                                     </div>
                                                        
                    //                                     <div className="form-group">
                    //                                         <p>Please quote Service request number 
                    //                                         {/* <c:choose>
                    //                                             <c:when test="${sr.srIdList ne null}">
                    //                                             <b>${sr.srIdList}</b>
                    //                                             </c:when>
                    //                                             <c:otherwise>
                    //                                             <b>${sr.id}</b>
                    //                                             </c:otherwise>
                    //                                         </c:choose> */}
                    //                                         { this.props.location.state.id ?
                    //                                             <b>   {this.props.location.state.id}  </b>
                    //                                             : null
                    //                                         }
                    //                                         for any future communications with Institute.</p>
                    //                                     </div>
                                                            
                    //                                     <div className="form-group">
                    //                                         <label className="control-label" ></label>
                    //                                         <div className="controls">
                    //                                             <button id="submit" name="submit"
                    //                                                 className="btn btn-large btn-primary" onClick={this.handleClickOk}>OK</button>
                    //                                             {/* <!-- <button id="cancel" name="cancel" className="btn btn-danger" */}
                    //                                                 {/* formaction="home" formnovalidate="formnovalidate">Cancel</button> --> */}
                    //                                                 {this.state.clickOK === true ?
                    //                                                     <Redirect to='/selectSR' />
                    //                                                     : null
                    //                                                 }
                    //                                         </div>
                    //                                     </div>
                    //                                 </div>
                    //                             </div>
                    //                         </fieldset>
					// 					{/* </form> */}
					// 					</div>
              		// 				</div>
              		// 			</div>
  					// 		</div>
            		// 	</div>
        			// </div>
        );
    }
}

export default analyticsManager(SRCreated)