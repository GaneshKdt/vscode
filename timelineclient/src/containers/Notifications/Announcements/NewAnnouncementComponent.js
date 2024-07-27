import React, { Component } from 'react';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import RenderCard from './AnnouncementCardComponent';
import ListGroup from 'react-bootstrap/ListGroup';


class NewAnnouncementComponent extends Component {
    state = {
        announcementData : this.props.data,
        category: 'All',
        categoriesArray:['All','Exams','Academics','General','Activity']
        
    }
    componentDidMount(){
        this.setState({
            announcementData : this.props.data,
        }, () =>{console.log("inside announcement NEW---------------" )} )
    }
    handleRadioChange = (evt) => {
        this.setState({
            category : evt.target.id
        } , () =>{console.log("inside -----------------------1111111", this.state.announcementData)})
    }
    
    
    render(){
        var flag;
        return(
            <>
            <Row>
                <Col>
                    <Card>
                        <Card.Body className="notificationHeader">
                            Notifications
                        </Card.Body>
                    </Card>
                </Col>
                
            </Row>
            <br/>
            <Row>
                <Col lg={3} md = {4} sm={4} className="text-left">
                    <Card>
                        <Card.Body >
                            Filter by
                            <hr/>
                            {this.state.categoriesArray.map(category =>
                                 <Form>
                                    <Form.Check
                                        custom
                                        type="radio"
                                        label={category}
                                        id={category} 
                                        name="category"
                                        onChange={this.handleRadioChange}
                                        checked={this.state.category === category}
                                    />
                                 </Form>
                            ) }  
                        </Card.Body>
                    </Card>
                </Col>
                <Col lg={{order :8}} sm={{order :7}} >
                    {/* <Card className="mb-2" style={{padding:'10px'}}><b>{this.state.category}</b></Card> */}
                    <ListGroup.Item><b>{this.state.category}</b></ListGroup.Item>
                    
                    {this.state.category !== 'All' ? 
                        <ListGroup className="scrollForAnnouncement">
                            {this.state.announcementData.map(item =>{
                                    if(item.category === this.state.category){
                                        flag = true;
                                        return(
                                            <RenderCard item={item} />
                                        )
                                    }
                                })
                            }
                        </ListGroup>
                    :null
                    }
                    {this.state.category === 'All' ? 
                        <ListGroup style={{maxHeight: 'calc(100vh - 210px)', overflowY: 'auto'}}>
                            {this.state.announcementData.map(item =>{
                                    flag = true;
                                    return(
                                        <RenderCard item={item} />
                                    )}
                                )
                            }
                        </ListGroup>
                    :null
                    }   
                    {!flag ? 
                        <ListGroup.Item>No Notifications</ListGroup.Item>
                    :null
                    }
                    
                </Col>
            </Row>
                
        </>
        )
    }
}

export default NewAnnouncementComponent