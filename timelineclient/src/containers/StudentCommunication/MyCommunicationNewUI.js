import React, { Component } from 'react';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import RenderInboxCard from './InboxCardComponent';
import ListGroup from 'react-bootstrap/ListGroup';


class MyCommunicationNew extends Component{
    state = {
        responseData : this.props.responseData
    }
    render(){
        var flag;
        return(
            <>
            <Row>
                <Col>
                    <Card>
                        <Card.Body className="headerForInbox">
                            Inbox
                        </Card.Body>
                    </Card>
                </Col>
                
            </Row>
            <br/>
            <Row>
                <Col lg={{order :12}} sm={{order :7}} >
                    
                    {this.state.responseData ? 
                        <>
                            {this.state.responseData.length > 0?
                                <ListGroup style={{maxHeight: 'calc(100vh - 210px)', overflowY: 'auto'}}>
                                    {this.state.responseData.map(item =>{
                                                // flag = true;
                                                return(
                                                    <RenderInboxCard item={item} />
                                                )
                                        })
                                    }
                                </ListGroup>
                                
                            :<Card>
                                <Card.Body>No Messages to Display</Card.Body>
                            </Card>}
                        </>
                    :null
                    }
                    
                    
                </Col>
            </Row>
                
        </>
        )
    }
}
export default MyCommunicationNew