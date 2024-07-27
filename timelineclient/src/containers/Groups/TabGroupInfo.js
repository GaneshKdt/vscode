import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import   './Group.css';
import axios from 'axios';
import ConfigUrls from '../../shared/config';
import ListGroup from 'react-bootstrap/ListGroup';
import {Link} from 'react-router-dom';
import InputGroup from 'react-bootstrap/InputGroup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import FormControl from 'react-bootstrap/FormControl';
import profilePic from '../Home/Assets/Default-Logo/admin.png';
import { Image } from 'react-bootstrap';

const api = new ConfigUrls().api;

class TabGroupInfo extends Component{
	constructor(props) {
		super(props)

		// Sets up our initial state

		this.state = {
            group : this.props.group,
            groupMembers : [],
            groupMembersOnLoad : [],
            sortMembers : "",
            errors:null,
        }

    }   
    loadGroupMembers = () =>{
        console.log("inside groups-----member-----22222222-------this.state.group.timeBoundId",this.state.group.timeBoundId.trim())
        axios.defaults.headers.post['Content-Type'] = 'application/json';
        axios.post(api.getGroupsMemberForStudent,
            JSON.stringify({
                "userId": this.state.group.sapid,
                "timeBoundId" : parseInt(this.state.group.timeBoundId),
            })
        ).then(response => {
            console.log("group member response-----------"+JSON.stringify(response.data.groupsMemberForStudent))
            this.setState({
                groupMembers : response.data.groupsMemberForStudent,
                groupMembersOnLoad : response.data.groupsMemberForStudent,
            })

        }).catch(error =>{
            console.log(error);
            this.setState({
                errors : error,
            })
        });
    }
    componentDidMount(){
        console.log("inside groups-----member------1111-------",this.state)
        if(this.state.group){
			this.loadGroupMembers();
        }
    }
    searchHandler = (e) =>{
        e.preventDefault();
        console.log("e.target.value" + e.target.value)
        if(e.target.value == ""){
            this.setState({
                groupMembers : this.state.groupMembersOnLoad,
            })
        }else{
            axios.defaults.headers.post['Content-Type'] = false;
            axios.post(api.getMemberBySearch,
            {
                "keyword" : e.target.value,
                "userId": this.state.group.sapid,
                "timeBoundId" : parseInt(this.state.group.timeBoundId),
            }
            ).then(response =>{
                console.log("inside res of search-------"+JSON.stringify(response.data.groupsMemberForStudent));
                this.setState({
                    groupMembers : response.data.groupsMemberForStudent,
                })
            }).catch(error =>{
                console.log(error);
                this.setState({
                    errors : error,
                })
            })
        }
    }

    handleDropdownChange = (e) => {
        console.log("inside ddl change------------" +e.target.value)
            this.setState({
                [e.target.name] : e.target.value
            })
            axios.defaults.headers.post['Content-Type'] = false;
            axios.post(api.getMemberBySearch,
            {
                "sortMembers" : e.target.value,
                "userId": this.state.group.sapid,
                "timeBoundId" : parseInt(this.state.group.timeBoundId),
            }
            ).then(response =>{
                console.log("inside res of search-------"+JSON.stringify(response.data.groupsMemberForStudent));
                this.setState({
                    groupMembers : response.data.groupsMemberForStudent,
                })
            }).catch(error =>{
                console.log(error);
                this.setState({
                    errors : error,
                })
            })
    }
	
    render(){
        return(
			<Row>
              <Col >
                    <Card >
						<Card.Body>
						{this.state.group !== null ? 
							<div>
                            <h6>Group Name</h6>
                                <p>{this.state.group.groupName}</p>
                            <h6>Created By</h6>
                                <p>{this.state.group.createdBy}</p>
                            <hr />
                            <h6>Members ({this.state.groupMembers.length})</h6>
                                <Card className="mb-2">
                                    <Card.Body>
                                        <Row>
                                            <Col>
                                                <InputGroup >
                                                    <InputGroup.Prepend>
                                                        <InputGroup.Text id="inputGroupPrepend"><FontAwesomeIcon icon="search"/></InputGroup.Text>
                                                    </InputGroup.Prepend>
                                                    <FormControl type="text" placeholder="Search"  onKeyUp={this.searchHandler}  className=" mr-sm-2"/>
                                                </InputGroup>
                                            </Col>
                                            <Col>
                                                <FormControl as="select" name="sortMembers" value={this.state.sortMembers} onChange={this.handleDropdownChange} >
                                                    <option value="">Select Sort</option>
                                                    <option value="asceFname">First Name A-Z</option>
                                                    <option value="descFname">First Name Z-A</option>
                                                    <option value="asceLname">Last Name A-Z</option>
                                                    <option value="descLname">Last Name Z-A</option>
                                                </FormControl>
                                            </Col>
                                        </Row>
                                    </Card.Body>
                                </Card>
                                <ListGroup style={{maxHeight: 'calc(100vh - 210px)', overflowY: 'auto'}}>
                                    {this.state.groupMembers.length > 0 ?
                                        this.state.groupMembers.map(member =>
                                            <ListGroup.Item>
                                                <Row>
                                                    {/* <Col > */}
                                                        {member.imageUrl ?
                                                            <div className=" circular-portrait circular-portrait-groups ml-2" lg={2} sm={3}> 
                                                                <Image src={member.imageUrl} alt="Student Photo" />
                                                            </div>  
                                                        :
                                                            <div className=" circular-portrait circular-portrait-groups ml-2" lg={2} sm={3}> 
                                                                <Image variant="top" src={profilePic} className="pro_pic" />
                                                            </div>
                                                        }
                                                      
                                                    
                                                        <div className="mt-4 ml-2" lg={5} sm={5}>
                                                        <Link to={{
                                                            pathname: '/timeline/studentProfile',
                                                            state: {
                                                                    userId : member.sapid,
                                                                }
                                                            }}>
                                                            {member.firstName} {member.lastName}
                                                        </Link>
                                                        </div>    
                                                </Row>
                                            </ListGroup.Item>
                                        )
                                : <ListGroup.Item><Row>No matching data</Row></ListGroup.Item>}
                             </ListGroup>
                            <hr />
                        </div>
						
                    : null}
                    {this.state.errors ? 
                        <><Row>Error in getting data. Please try again.</Row></>
                    : null}
					</Card.Body>
				</Card>
			      
              </Col>
			</Row>
    )
    }



}

export default TabGroupInfo