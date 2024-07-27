import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Card, Button, CardHeader, CardContent , CardActions ,FormLabel } from "@material-ui/core";
import PageContent from '../../components/PageContent/PageContent';

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
            <PageContent
            id="servicerequest"
            title="Service Request"
            loaded={true}
            error={false}
            loadingMessage="Loading..."
            errorMessage={"false"}
       >
            <Card style={{maxWidth : "80%"}}>
                <CardHeader
                style={{textAlign : "center"}}
                title="Service Request Summary"
                />
                    <CardContent>
                    <Row>
                        <Col>
                            <Form
                             style={{padding: "5%"}}
                            > 
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
                            </Form>
                            
                        </Col>
                    </Row>
                    </CardContent>
                    <CardActions
                     style={{  marginLeft: "40%"}}>
                                <Form.Group>
                                    <div style={{
                                        textAlign: "center"                                    
                                    }}>
                                    <Button variant="contained" color="primary" onClick={this.handleClickOk}>
                                    OK
                                    </Button>
                                   
                                    </div>
                                </Form.Group>
                                {this.state.clickOK === true ?
                                    <Redirect to='serviceRequest' />
                                    : null
                                }
                    </CardActions>
                </Card>
                </PageContent>
        );
    }
}

export default SRCreated