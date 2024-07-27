import React, { Component } from 'react';
import axios from 'axios';
import woman4 from '../assets/images/people/110/woman-4.jpg'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
// import cover from '../assets/images/cover/preview.jpg';
import cover from '../assets/images/cover/cover_image_in_Profile/cover_03.png';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import Timeline from './Wall';
import ProfilePage from './ProfilePage';
import {connect} from 'react-redux';
import Image from 'react-bootstrap/Image';
import {analyticsManager} from '../../../shared/Analytics';
import ImagePicker from 'react-image-picker'
import 'react-image-picker/dist/index.css'
import img1 from '../assets/images/cover/cover_image_in_Profile/cover_01.png'
import img2 from '../assets/images/cover/cover_image_in_Profile/cover_02.png'
import img3 from '../assets/images/cover/cover_image_in_Profile/cover_03.png'
import img4 from '../assets/images/cover/cover_image_in_Profile/cover_04.png'
import Modal from 'react-bootstrap/Modal'

const imageList = [img1, img2, img3, img4]

class PublicProfile extends Component{ 
    constructor(props){
        super(props);
        this.cover = React.createRef();
    }
    state ={
        studentData : this.props.student,
        openFileDialog : false,
        coverImg : cover,
        image: null
    }
    componentDidMount(){
        // console.log("inside component mount******************")
        // console.log("std-----------"+JSON.stringify(this.state.studentData))
        // console.log("image url-----------"+this.props.imageUrl);
        
    }
    setCover = () =>{
        this.setState({
            openFileDialog : true
        })
        // this.refs.cover.click();

    }
    handleFileChange = (evt) =>{
        // console.log(JSON.stringify(this.state.image))
        if(this.state.image){
            this.setState({
                // coverImg : URL.createObjectURL({imageURL})
                coverImg : imageList[this.state.image.value],
                openFileDialog : false
            })
        }
        
    }
    onPick(image) {
        this.setState({
            image : image,
        })
      }
    handleClose = () =>{
        this.setState({
            openFileDialog : false
        })
    }
    
    render(){
        return(
                <Container fluid>
                    <Row >
                        <Col>
                            <Row >
                                <Col md={12}>
                                    <Card style={{marginBottom:"2%"}}>
                                        <Image responsive="true" alt="" src={this.state.coverImg} />
                                        <div responsive="true" style={{textAlign: 'end',zIndex:"1", margin:'1%'}}>
                                            <Button variant="secondary" onClick={this.setCover}>Edit Cover</Button>
                                        </div>
                                        <Card.Body>
                                            
                                            <div style={{height: 'fit-content',width: 'fit-content',zIndex: '1',marginTop: '-16%'}}>
                                                <Image responsive="true" alt="" className="rounded-circle img-thumbnail profileNamepic" height="150px" width="150px" src={this.props.imageUrl} /> 
                                            </div>
                                           
                                                
                                            {/* <input accept="image/*" id="icon-button-file" type="file"  ref="cover" style={{display : 'none'}} onChange={this.handleFileChange}/> */}
                                            <Modal size="lg" centered show={this.state.openFileDialog} onHide={this.handleClose}>
                                                <Modal.Header closeButton>
                                                    <Modal.Title>Select a Cover</Modal.Title>
                                                </Modal.Header>
                                                <Modal.Body>
                                                    <div style={{marginLeft:'8%'}}>
                                                        <ImagePicker 
                                                        images={imageList.map((image, i) => ({src: image, value: i}))}
                                                        onPick={this.onPick.bind(this)}
                                                        />
                                                    </div>
                                                </Modal.Body>
                                                <Modal.Footer>
                                                <Button  variant="secondary" onClick={this.handleFileChange}>OK</Button>
                                                <Button variant="secondary" onClick={this.handleClose}>
                                                    Close
                                                </Button>
                                                </Modal.Footer>
                                            </Modal>
                                            
                                                    {/* Cuurently commenting the edit cover image, needed for future use */}
                                                
                                                    {/* <Tabs defaultActiveKey="Profile" id="uncontrolled-tab-example" style={{marginLeft: '23%',marginBottom: '1px'}}> */}
                                                    {/* Commenting timeline for the time being, needed for future functionality */}
                                                        {/* <Tab eventKey="Wall" title="Wall" style={{marginBottom: '2%'}}>
                                                            <Card style={{fontSize: '12px !impotant'}} >
                                                                <Timeline studentData={this.state.studentData} imageUrl={this.props.imageUrl}/>
                                                            </Card>
                            
                                
                                                        </Tab> */}
                                                        {/* <Tab eventKey="Profile" title="Profile"> */}
                                                            <Card style={{fontSize: '12px !impotant'}} >
                                                                <ProfilePage studentData={this.state.studentData} />
                                                            </Card>
                            
                                
                                                        {/* </Tab> */}
                                                    {/* following commented block needed for future functionality */}
                                                        {/* <Tab eventKey="More" title="More">
                                                            <Card style={{fontSize: '12px !impotant'}} >
                                                            </Card>
                            
                                
                                                        </Tab> */}
                                                    {/* </Tabs> */}   
                                        </Card.Body>
                                    </Card>
                                </Col>    
                            </Row>
                        </Col>
                    </Row>
                </Container>
        )
    }
}
const mapStateToProps = state => {
    //if the state json contains values as 'null' string, change to ''
    // console.log(" inside if in public--------------")
    Object.keys(state).map(keyState => 
            {
                if(state[keyState] === 'null'){
                    state[keyState] = '';
                }
            }
            
    )
	return {
        student: state,
        imageUrl : state.imageUrl
	}
}

export default connect(mapStateToProps)(analyticsManager(PublicProfile))