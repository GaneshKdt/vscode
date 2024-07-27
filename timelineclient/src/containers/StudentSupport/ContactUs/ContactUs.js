import React, { Component } from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Collapse from 'react-bootstrap/Collapse';
import IconButton from '@material-ui/core/IconButton';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import EditIcon from '@material-ui/icons/Edit';
import {connect} from 'react-redux';
import Table from 'react-bootstrap/Table'
import { Link } from 'react-router-dom'
import './ContactUs.css'
import {analyticsManager} from '../../../shared/Analytics'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import ConfigUrls from '../../../shared/config';
import AxiosHandler from '../../../shared/AxiosHandler/AxiosHandler';
//import LeftSideBar from '../../../components/LeftSideRootNavigationDrawer/LeftSideRootNavigationDrawer';




const urls = new ConfigUrls().urls;
const myTicketSSOUrl = new ConfigUrls().api.myTicketSSOUrl;
const getCurrentCourseCoordinator = new ConfigUrls().api.getCurrentCourseCoordinator;
const WX_MASTERKEYS = ["111","151","160"];
const PDDM_MASTERKEYS = ["142","143","144","145","146","147","148","149"];
class ContactUs extends Component{

  constructor(props) {
    super(props);
  }
    state={
        studentData : this.props.student,
        coordinatorNameResponse: "",
        purpose : null,
        category : null,
        subject : "",
        description : "",
        localContactCity : null,
        locateCentreCity : null,
        levelOne : false,
        levelTwo : false,
        levelThree : false,
        levelFour   :false,
        levelOneCity : null,
        levelTwoCity : null,
        levelThreeCity : 'Mumbai',
        cityArray : ['Mumbai','Delhi','Bangalore','Hyderabad','Pune','Ahmedabad','Kolkata','Chandigarh', 'Indore','Lucknow'],
        levelOneDetails:{
            'Mumbai' : {'name' :'Vaishali Solanki','email' : 'vaishali.solanki@nmims.edu' ,'contact' : '+91 22 4235 5606'},
            'Delhi' : {'name' :'Jasmeet Kaur','email' : 'ac_newdelhi@nmims.edu' ,'contact' : '+91 11 4505 3868'},
            'Bangalore' : {'name' :'Poornima K. P.','email' : 'ac_bangalore@nmims.edu' ,'contact' : '+91 80 4085 5513'},
            'Hyderabad' : {'name' :'Afifa Ismath','email' : 'ac_hyderabad@nmims.edu' ,'contact' : '+91 40 2701 5536'},
            'Pune' : {'name' :'Meghana Patange','email' : 'ac_pune@nmims.edu' ,'contact' : '+91 20 2551 1688'},
            'Ahmedabad' : {'name' :'Ketaki Amin','email' : 'ac_ahmedabad@nmims.edu' ,'contact' : '+91 79 4039 3329'},
            'Kolkata' : {'name' :'Sirshendu Sen','email' : 'ac_kolkata@nmims.edu' ,'contact' : '+91 33 4061 4565'},
            'Lucknow' : {'name':'Arun Mishra','email': 'Arun.Mishra@nmims.edu','contact': '0522- 4361555'},
        },

        levelTwoDetails:{
            'Mumbai' : {'name' :'Anurag Nath','email' : 'Anurag.nath@nmims.edu' ,'contact' : '022 35476592'},
            'Delhi' : {'name' :'Gyanesh Kumar | Manoj Kumar Dwivedi','email' : 'kumar@nmims.edu | Manoj.dwivedi@nmims.edu' ,'contact' : '+91 22 42332243 | 022 42332240'},
            'Bangalore' : {'name' :'Dinkar Chandhock','email' : 'dinkar.chandhock@nmims.edu' ,'contact' : '+91 98 4543 0502'},
            'Hyderabad' : {'name' :'Mohammed Faheem','email' : 'Mohammed.Faheem@nmims.edu' ,'contact' : '+91 40 2701 5536'},
            'Pune' : {'name' :'Nikhil Bhosle','email' : 'Nikhil.bhosale@nmims.edu' ,'contact' : '+91 20 3017 2244'},
            'Ahmedabad' : {'name' :'Deepak Asarsa','email' : 'Deepak.asarsa@nmims.edu' ,'contact' : '+91 79 4039 3328'},
            'Kolkata' : {'name' :'Pranay Kumar','email' : 'Pranay.kumar@nmims.edu' ,'contact' : '+91 33 4061 4562'},
            'Chandigarh' : {'name' :'Bharat Sharma','email' : 'bharat.sharma@nmims.edu' ,'contact' : '+91 84 2402 7204'},
            'Indore' : {'name' :'Nikhil Toshniwal','email' : 'nikhil.toshniwal@nmims.edu' ,'contact' : '+91 91 0999 8662'},
            'Lucknow' : {'name':'Arun Mishra','email': 'Arun.Mishra@nmims.edu','contact': '0522- 4361555'},
        },

        levelThreeDetails:{
            'Mumbai' : {'email' : 'Headservices@nmims.edu' ,'contact' : '+91 22 423 55529'}
        },

        centreAddressList : {
            'Mumbai' : 'NGA SCE, 2nd Floor, NMIMS New Building, Opp Mithibai College, V.L.Mehta Road, Vile Parle West, Mumbai - 400056 Maharashtra',
            'Delhi' : 'Upper Ground Floor, KP - 1, Pitampura, Next to Hotel City Park, New Delhi - 110034 New Delhi',
            'Bangalore' : '11, Kaveri Regent Coronet, 80 Feet Road, 7th Main, 3rd Block, Next to Raheja Residency, Koramanagla, Bangalore - 560034 Karnataka',
            'Hyderabad' : '12-13-95, Street No. 3, Beside Big Bazar,  Taranaka , Hyderabad - 500018 Andhra Pradesh',
            'Pune' : '365/6, Aaj Ka Anand Building, 2nd Floor, Opposite SSPS School, Narveer Tanaji Wadi, Shivajinagar, Pune -411005 Maharashtra',
            'Ahmedabad' : 'B-3, Ground Floor, "Safal Profitaire", Corporate Road, Near Prahladnagar Garden, Prahladnagar, Ahmedabad -380 007 Gujarat',
            'Kolkata' : 'Unit # 505, Merlin Infinite, DN-51, Salt Lake City, Sector V, Kolkata-700091 West Bengal',
            'Chandigarh' : 'Plot No.5, Education City, Opp. Botanical Garden, Adjacent to Govt. School, Sarangpur, Chandigarh (U.T.) 160014',
            'Indore' :  'Ground Floor, Off. Super Corridor, Bada Bangarda, Near Gandhi Nagar, Indore, Madhya Pradesh - 453112',
            'Lucknow' : 'Bhavya Corporate Tower, office no.205-206, 2nd floor, Plot No. TC-24V, Vibhuti Khand, Gomti Nagar, Lucknow, Uttar Pradesh – 226010',
        },
        responseData : null 

       

    }

    //fetching currentTimeBound's course Coordinator
    componentDidMount(){
      // to check whether currentTimeBound is active or not
      if(this.props.currentTimeboundId != -1)
      {
             AxiosHandler.AxiosPostHandler({
            url: getCurrentCourseCoordinator,
            data: {
              "timeboundId":this.props.currentTimeboundId,
            },
            successCallBack: (response) => {
            //console.log("coordinatorResponse : ", response.data);

            this.setState({
            coordinatorNameResponse: response.data,
            displayForm: "flex",
          });
           },
            failureCallBack: (error) => {
            this.setState({
            loaded: true,
            error: true,
            errorMessage: "Error in Loading  details!",
            displayForm: "none",
           });
          },
        });
      }
  }

    handleDropdownChange = (evt) => {
        // console.log("inside ddl change------------" +evt.target.value)
            this.setState({
                [evt.target.name] : evt.target.value
            })
            
            // this.renderContactDetails(evt.target.value);
    }
    handleTextChange = (evt) => {
        // console.log("inside text change------------" +evt.target.value)
            this.setState({
                [evt.target.name] : evt.target.value
            })
            // this.renderContactDetails(evt.target.value);
    }
    renderContactDetails = (city,level) => {
        var details = "";
        // console.log("level-------"+level);
        if(level === 'levelOneCity' || level === 'localContactCity'){
            details = this.state.levelOneDetails[city];
        }
        if(level === 'levelTwoCity'){
            details = this.state.levelTwoDetails[city];
        }
        if(level === 'levelThreeCity'){
            details = this.state.levelThreeDetails[city];
        }
        // var details = this.state.levelOneDetails[city];
         console.log("inside set details---" + JSON.stringify(details))
        return(
            <div style={{marginTop: '2%',textAlign: 'center'}}>
            <Table bordered responsive>
                <tbody>
                  
                    <tr>
                        {level === 'localContactCity' ? 
                            <td>{this.state.localContactCity}</td>
                        
                         :  <td>{this.state[level]}</td>
                        }
                        {'name' in details &&
                          <td>{details.name}</td>
                        }
                        <td><a href={"mailto:" + details.email}>{details.email}</a></td>
                        <td>{details.contact}</td>
                    </tr>
                </tbody>
            </Table>
            </div>
        )
    }

    
    
    renderAddressDetails = (city) => {
        var details = this.state.centreAddressList[city];
        // console.log("inside add--------details---"+JSON.stringify(details))
        return(
            <Card className="rowMargin">
                <Card.Text className="formMargin"><b>UNIVERSITY REGIONAL OFFICE & NMAT/NPAT CENTRE ADDRESS</b><br/><br/>{details}</Card.Text>
            </Card>
        )
    }

    handleSubmit = () =>{
        // console.log("inside submit----------student--"+JSON.stringify(this.state.studentData));
        var body = 'orgid=00D90000000s6BL&retURL=null&encoding=UTF-8&name=' 
                    + this.state.studentData.firstName + ' ' + this.state.studentData.lastName
                    + '&email=' + this.state.studentData.emailId + '&phone=' 
                    + this.state.studentData.mobile
                    + '&origin=Web App&recordType=01290000000A959&00N9000000EQXMM=' +
                    this.state.purpose+'&00N9000000EPf0L=' + this.state.category +'&subject=' 
                    + this.state.subject + '&description=' + this.state.description + '&submit=null';

        confirmAlert({
            title: 'Confirm to submit',
            message: 'Are you sure you want to submit this query?',
            buttons: [
              {
                label: 'Yes',
                onClick: () => {
                    //temporarily commented
                    axios.defaults.headers.post['Content-Type'] = "application/x-www-form-urlencoded";
                    delete axios.defaults.headers.post["Access-Control-Allow-Origin"]; 
                    axios.post("https://webto.salesforce.com/servlet/servlet.WebToCase?encoding=UTF-8",body
                    ).then(response =>{
                        console.log(JSON.stringify(response));
                        this.setState({
                            responseData : response.data,
                        })
                    }).catch(function(error){
                        console.log(error);
                    })
                }
              },
              {
                label: 'No',
                onClick: () => {
                    this.setState({
                        levelOne : false,
                        levelTwo : false,
                        levelThree : false
                    })
                }
              }
            ]
          });
        

         
        

    }

    redirecttoMyTicket = () =>{
      AxiosHandler.AxiosPostHandler({
        url: myTicketSSOUrl,
        data: {
          sapid: this.state.studentData.sapid,
        },
        successCallBack: (response) => {
          if(response.data.status==="error"){
            alert("Unable to Redirect to My Tickets Page. Please try again!")
          }else{
            window.open(response.data.url,'_blank')
          } 
        },
        failureCallBack: (error) => {
          alert("Error While Loading My Ticket Page.Please try again!")
        },
      });
    }

    //Assigning properly course coordinator with full name
    getCourseCoordinatorName(){
      let courseCoordinatorName = "";
      if(this.state.coordinatorNameResponse == 'bhumika')
        courseCoordinatorName = "Bhumika Thakkar";
      else if(this.state.coordinatorNameResponse == 'crisendoll')
        courseCoordinatorName = "Crisendoll Gomes";
      else if(this.state.coordinatorNameResponse == 'priyanka')
        courseCoordinatorName = "Priyanka Gandhi";
      else if(this.state.coordinatorNameResponse == 'nomita')
        courseCoordinatorName = "Nomita Mukherjee";
      else
        courseCoordinatorName = 'Course Coordinator';

      return(courseCoordinatorName)
    }

    downloadSraPdf = () => { 
        if(WX_MASTERKEYS.includes(this.props.student.consumerProgramStructureId)){
          window.open(urls.static_portal+`resources_2015/SRB-MBA(WX).pdf`,'_blank');
        }else if(PDDM_MASTERKEYS.includes(this.props.student.consumerProgramStructureId)){
          window.open(urls.static_portal+`resources_2015/SRB_PDDM.pdf`,'_blank');
        }else {
          window.open(urls.static_portal+`resources_2015/SRB-M.Sc AI and ML.pdf`,'_blank');
        }
        //window.open("http://localhost:8080/studentportal/resources_2015/SRBMBAWx.pdf",'_blank');
   
}
  downloadNgasceSGRPdf = () =>{
    window.open(`https://d3q78eohsdsot3.cloudfront.net/resources_2015/NGASCEStudentGrievanceRedressal_MBAWX.pdf`,'_blank');
  }   
   
  render(){        
        return (
          <Container>
            <Row>
              <Col sm="12">
                <Card>
                  <Card.Header className="headerCss">
                    Student Resource Book (SRB) {this.state.studentData.sem}
                  </Card.Header>
                  <Card.Body>
                    <Col style={{ padding: "0px" }} className="mb-2">
                      <Col style={{ padding: "0px" }}>
                        <p style={{ lineHeight: "normal", fontSize: "1rem" }}>
                          {" "}
                          Please read the Student Resource Book carefully as it
                          summarizes the academic deliverables, evaluation
                          policies and administrative guidelines of the
                          University. All students are expected to know these
                          rules and policies as mentioned in the SRB.
                          <a
                            className="text-primary"
                            onClick={this.downloadSraPdf}
                          >
                            {" "}
                            <FontAwesomeIcon icon="download" /> Download SRB
                          </a>
                        </p>
                      </Col>
                    </Col>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
            <Row className="rowMargin">
              <Col sm="4">
             {/* Below form is commented by Gaurav and Added My ticket section in place of got a question card no. 14429 */}
            {/* <Card>
                  <Card.Header className="headerCss">
                    Got a Question?
                  </Card.Header>
                  <Card.Body>
                    <Form>
                      <Form.Group as={Row} controlId="purpose">
                        <Col>
                          <Form.Control
                            as="select"
                            name="purpose"
                            value={this.state.purpose}
                            onChange={this.handleDropdownChange}
                          >
                            <option value="">Select a Purpose</option>
                            <option value="Enquiry">Enquiry</option>
                            <option value="Complaint">Complaint</option>
                            <option value="Feedback">Feedback</option>
                          </Form.Control>
                        </Col>
                      </Form.Group>
                      <Form.Group as={Row} controlId="category">
                        <Col>
                          <Form.Control
                            as="select"
                            name="category"
                            value={this.state.category}
                            onChange={this.handleDropdownChange}
                          >
                            <option value="">Select a Category</option>
                            <option value="Admissions">Admissions</option>
                            <option value="Academics">Academics</option>
                            <option value="Examinations">Examinations</option>
                            <option value="Logistics">Logistics</option>
                            <option value="Student Support">
                              Student Support
                            </option>
                            <option value="General/Other">General/Other</option>
                          </Form.Control>
                        </Col>
                      </Form.Group>
                      <Form.Label>Subject:</Form.Label>
                      <Form.Group as={Row} controlId="subject">
                        <Col>
                          <Form.Control
                            type="text"
                            name="subject"
                            value={this.state.subject}
                            onChange={this.handleTextChange}
                          />
                        </Col>
                      </Form.Group>

                      <Form.Label>Description:</Form.Label>
                      <Form.Group as={Row} controlId="description">
                        <Col>
                          <Form.Control
                            as="textarea"
                            name="description"
                            value={this.state.description}
                            onChange={this.handleTextChange}
                          />
                        </Col>
                      </Form.Group>
                      <div className="submitBtnCss">
                        <Button
                          variant="primary"
                          id="btnSubmit"
                          onClick={this.handleSubmit}
                        >
                          Submit Query
                        </Button>
                      </div>
                    </Form>
                  </Card.Body>
                </Card> */}
            <Card>
              <Card.Header className="headerCss">
              Got a Question?
              </Card.Header>
              <Card.Body>
              Raise your Query or Concern to our Student Counsellor
                <br />
                <br />
                <h6>
                RESPONSE TIME IS 48 WORKING HOURS
                </h6>
                <br />
                <div className="submitBtnCss">
                  <Button
                    variant="primary"
                    onClick={this.redirecttoMyTicket}
                  >
                      My Tickets
                  </Button>
                </div>
              </Card.Body>
              <Table bordered responsive className='textOneLine'>
               </Table>  
            </Card>
              </Col>

              <Col sm="4">
                <Card>
                  <Card.Header className="headerCss">Reach Us</Card.Header>
                  <Card.Body>
                    <label for="question" class="text-uppercase">
                      ALL INDIA TOLL FREE
                    </label>
                    <h6>
                      1800 1025 136 (Toll Free)
                      <br />
                      <br />
                      Mon-Sat (9am-7pm)
                    </h6>
                    <Form>
                      <Form.Group as={Row} controlId="localContactCity">
                        <Col>
                          <Form.Control
                            as="select"
                            name="localContactCity"
                            value={this.state.localContactCity}
                            onChange={this.handleDropdownChange}
                          >
                            <option value="">Select a City</option>
                            <option value="Mumbai">Mumbai</option>
                            {/* {this.state.cityArray.map((city) => {
                                                        return(<option value={city}>{city}</option>)
                                                    }
                                                )
                                            } */}
                          </Form.Control>
                          {(this.state.localContactCity !== null && this.state.localContactCity !== "") && 
                            <div style={{ marginTop: "2%" }}>
                              <Table bordered responsive className='textOneLine'>
                                <tbody>
                                  <tr>
                                    <td>{this.state.localContactCity}</td>
                                    <td>Course Coordinator</td>
                                    <td>
                                      <a href="mailto:ngasce@nmims.edu">
                                      ngasce@nmims.edu
                                      </a>
                                    </td>
                                    <td>1800 1025 136</td>
                                  </tr>
                                </tbody>
                              </Table>  
                            </div>
                          // ) : // this.renderContactDetails(this.state.localContactCity,'localContactCity')
                          // null
                          }
                        </Col>
                      </Form.Group>
                    </Form>
                  </Card.Body>
                </Card>
              </Col>
              <Col sm="4">
                <Card>
                  <Card.Header className="headerCss">Visit Us</Card.Header>
                  <Card.Body>
                    <label for="question" class="text-uppercase">
                      MAIN HEAD OFFICE
                    </label>
                    <h6>
                      V.L.Mehta Road, Vile Parle (W) Mumbai, Maharashtra -
                      400056{" "}
                    </h6>
                    <Form>
                      <Form.Group as={Row} controlId="locateCentreCity">
                        <Col>
                          <Form.Control
                            as="select"
                            name="locateCentreCity"
                            value={this.state.locateCentreCity}
                            onChange={this.handleDropdownChange}
                          >
                            <option value="">Select a City</option>
                            {this.state.cityArray.map((city) => {
                              return <option value={city}>{city}</option>;
                            })}
                          </Form.Control>
                          {(this.state.locateCentreCity !== null && this.state.locateCentreCity !== "") &&
                            this.renderAddressDetails(
                              this.state.locateCentreCity
                            )
                          }
                        </Col>
                      </Form.Group>
                    </Form>
                  </Card.Body>
                  <Table bordered responsive className='textOneLine'>
               </Table> 
                </Card>
              </Col>
            </Row>
            <Row className="rowMargin">
              <Col sm="12">
                <Card>
                  <Card.Header className="headerCss">
                    Need Any Support? Here is Our Escalation Matrix
                  </Card.Header>

                  {/* Level 1 support */}
                  <a
                    className="btn btn-outline-secondary card-link collapseLink"
                    onClick={() =>
                      this.setState({
                        levelOne: !this.state.levelOne,
                        levelTwo: false,
                        levelThree: false,
                        levelFour : false,
                      })
                    }
                    aria-controls="example-collapse-text"
                    aria-expanded={this.state.levelOne}
                  >
                    <span className="collapsed">
                      LEVEL 1 – STUDENT COUNSELLOR ON THE TOLL-FREE NUMBER OR ASSOCIATE AT UNIVERSITY REGIONAL OFFICE & NMAT/NPAT CENTRE
                    </span>
                    <span className="expanded">
                      LEVEL 1 – STUDENT COUNSELLOR ON THE TOLL-FREE NUMBER OR ASSOCIATE AT UNIVERSITY REGIONAL OFFICE & NMAT/NPAT CENTRE
                    </span>
                  </a>
                  <Collapse in={this.state.levelOne}>
                    <Form className="formMargin">
                      <p>
                      You can contact the Student Counsellor on the toll-free number or the Associate at University Regional Office & NMAT/NPAT Centre along with the SR Number (the unique number you get when you register your service request with NGASCE) or contact the student services team                 
                      </p>
                      <h6> STUDENT COUNSELLOR ON THE TOLL-FREE NUMBER</h6>
                      <Form.Group as={Row} controlId="levelOneCity">
                        <Col>
                          {/* below code block temporarily commented, required in future */}
                          {/* <Form.Control as="select" name="levelOneCity" value={this.state.levelOneCity} onChange={this.handleDropdownChange}>
                                                <option value="">Select a City</option>
                                                {this.state.cityArray.map((city) => {
                                                            return(<option value={city}>{city}</option>)
                                                        }
                                                    )
                                                }
                                            </Form.Control> */}
                          {/* { this.state.levelOneCity !== null ?
                                                this.renderContactDetails(this.state.levelOneCity,'levelOneCity')
                                            : null} */}
                          {/* end of comment */}
                          <div style={{ marginTop: "2%", textAlign: 'center' }}>
                            <Table bordered responsive>
                              <tbody>
                                <tr>
                                  <td>Mumbai</td>
                                  {/* <td>{this.state.levelOneDetails['Mumbai'].name}</td> */}
                                  {/* <td>
                                     {this.getCourseCoordinatorName()}
                                  </td> */}
                                  <td>
                                    <a href="mailto:ngasce@nmims.edu">
                                    ngasce@nmims.edu
                                    </a>
                                  </td>
                                  {/* <td>+91 8424027721</td> */}
                                  <td>1-800-1025-136</td>
                                </tr>
                              </tbody>
                            </Table>
                          </div>
                          <Form.Group as={Row} controlId="levelTwoCity">
                        <Col>
                                  <h6>ASSOCIATE AT UNIVERSITY REGIONAL OFFICE & NMAT/NPAT CENTRE</h6>
                          <Form.Control
                            as="select"
                            name="levelTwoCity"
                            value={this.state.levelTwoCity}
                            onChange={this.handleDropdownChange}
                          >
                            <option value="">Select a City</option>
                            {this.state.cityArray.map((city) => {
                              return <option value={city}>{city}</option>;
                            })}
                          </Form.Control>
                          {(this.state.levelTwoCity !== null && this.state.levelTwoCity !== "") &&
                              this.renderContactDetails(
                                this.state.levelTwoCity,
                                "levelTwoCity"
                              )
                          }
                        </Col>
                      </Form.Group>

                        </Col>
                      </Form.Group>
                    </Form>
                  </Collapse>

                  {/* Level 2 support */}

                  <a
                    className="btn btn-outline-secondary card-link collapseLink"
                    onClick={() =>
                      this.setState({
                        levelTwo: !this.state.levelTwo,
                        levelOne: false,
                        levelThree: false,
                        levelFour : false,
                      })
                    }
                    aria-controls="example-collapse-text"
                    aria-expanded={this.state.levelTwo}
                  >
                    <span className="collapsed">
                      LEVEL 2 – MANAGER - STUDENT SERVICES
                    </span>
                    <span className="expanded">
                      LEVEL 2 – MANAGER - STUDENT SERVICES
                    </span>
                  </a>
                  <Collapse in={this.state.levelTwo}>
                    <Form className="formMargin">
                      <p>
                      If your issue is not resolved, you can contact the Manager - Student Services along with the SR Number (the unique number you get when you register your service request with NGASCE)
                      </p>

                      <div style={{ marginTop: "2%", textAlign: 'center' }}>
                            <Table bordered responsive>
                              <tbody>
                                <tr>
                                 <td>
                                    <a href="
                                         mailto:managerservices@nmims.edu">                                   
                                        managerservices@nmims.edu
                                    </a>
                                  </td>
                                  {/* <td>+91 8424027721</td> */}
                                  <td>+91 22 423 55522</td>
                                </tr>
                              </tbody>
                            </Table>
                          </div>
                      {/* <Form.Group as={Row} controlId="levelTwoCity">
                        <Col>
                          <Form.Control
                            as="select"
                            name="levelTwoCity"
                            value={this.state.levelTwoCity}
                            onChange={this.handleDropdownChange}
                          >
                            <option value="">Select a City</option>
                            {this.state.cityArray.map((city) => {
                              return <option value={city}>{city}</option>;
                            })}
                          </Form.Control>
                          {(this.state.levelTwoCity !== null && this.state.levelTwoCity !== "") &&
                              this.renderContactDetails(
                                this.state.levelTwoCity,
                                "levelTwoCity"
                              )
                          }
                        </Col>
                      </Form.Group> */}
                    </Form>
                  </Collapse>

                  {/* Level 3 support */}

                  <a
                    className="btn btn-outline-secondary card-link collapseLink"
                    onClick={() =>
                      this.setState({
                        levelThree: !this.state.levelThree,
                        levelOne: false,
                        levelTwo: false,
                        levelFour : false,
                      })
                    }
                    aria-controls="example-collapse-text"
                    aria-expanded={this.state.levelThree}
                  >
                    <span className="collapsed">
                    LEVEL 3 – HEAD - STUDENT SERVICES
                    </span>
                    <span className="expanded">
                    LEVEL 3 – HEAD - STUDENT SERVICES
                    </span>
                  </a>
                  <Collapse in={this.state.levelThree}>
                    <Form className="formMargin">
                      <p>
                      If you still want to escalate further, you can contact the Head - Student Services along with the SR Number (the unique number you get when you register your service request with NGASCE)
                      </p>

                      <div style={{ marginTop: "2%", textAlign: 'center' }}>
                            <Table bordered responsive>
                              <tbody>
                                <tr>
                                  {/* <td>{this.state.levelOneDetails['Mumbai'].name}</td> */}
                                  {/* <td>
                                     {this.getCourseCoordinatorName()}
                                  </td> */}
                                  <td>
                                    <a href="mailto:headservices@nmims.edu">
                                    headservices@nmims.edu
                                    </a>
                                  </td>
                                  {/* <td>+91 8424027721</td> */}
                                  <td>+91 22 423 55529</td>
                                </tr>
                              </tbody>
                            </Table>
                          </div>                
                    </Form>
                  </Collapse>

                   {/* Level 4 support */}

                   <a
                    className="btn btn-outline-secondary card-link collapseLink"
                    onClick={() =>
                      this.setState({
                        levelFour: !this.state.levelFour,
                        levelThree: false,
                        levelOne: false,
                        levelTwo: false,
                      })
                    }
                    aria-controls="example-collapse-text"
                    aria-expanded={this.state.levelFour}
                  >
                    <span className="collapsed">
                    LEVEL 4 – GRIEVANCE REDRESSAL CELL/COMMITTEE
                    </span>
                    <span className="expanded">
                    LEVEL 4 – GRIEVANCE REDRESSAL CELL/COMMITTEE
                    </span>
                  </a>
                  <Collapse in={this.state.levelFour}>
                    <Form className="formMargin">
                      <p>
                      If the students have grievance even after the resolution shared at Level 3 which is by Head Services of the School, students can put in formal application with all the relevant documents to be put forth before the Committee within 30 days from the date of the written communication of resolutions/recommendations of the Head Services of the School. Student must file an application along with necessary documents, if any, to the Office of the School, NMIMS University, Mumbai.
                      </p>

                      <p>Please click here to download the <a   className="text-primary" onClick={this.downloadNgasceSGRPdf}>Student Grievance Redressal policy</a></p>                             
                    </Form>
                  </Collapse>


                </Card>
              </Col>
            </Row>
          </Container>
        );
    }
}

// export default ContactUs
const mapStateToProps = state => {
	return {
        student: state,
        imageUrl : state.imageUrl,
        currentTimeboundId: state.currentTimeboundId
	}
}

export default connect(mapStateToProps)(analyticsManager(ContactUs))