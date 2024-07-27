import React from 'react';
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/NavDropdown'
import NavItem from 'react-bootstrap/NavItem'
import Dropdown from 'react-bootstrap/Dropdown'
import NavLink from 'react-bootstrap/NavLink'
import FormControl from 'react-bootstrap/FormControl'
import Image from 'react-bootstrap/Image'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './Header.css'
import axios from 'axios'  
import Badge from 'react-bootstrap/Badge'
import ConfigUrls, { Pages, API } from '../shared/config'
import InputGroup from 'react-bootstrap/InputGroup'
import { LinkContainer } from 'react-router-bootstrap'

const urls = new ConfigUrls().urls;

let isSpecialisationApplicable = API.isSpecialisationApplicable
class Header extends React.Component{
  
  constructor(props) {
		super(props)
		this.state = {
      keyword: [],
      notificationCount : 0,
      isSpecialisationApplicable : false
        } 
      this.SearchHandler = this.SearchHandler.bind(this)
    } 

  SearchHandler=(e)=>{
    e.preventDefault();
    console.log("e.target.value")
    if(e.target.value == ""){
      //if search box is empty
      this.searchLostFocus(e);
    }else{
      axios.defaults.headers.post['Content-Type'] = false;
      axios.post(urls.apiUrl_ltiDemo + "/getSearchKeywords",
      {
          'keyword' : e.target.value
      }
      ).then(response =>{
          console.log(response.data);
          this.setState({
              keyword : response.data,
          })
      }).catch(function(error){
          console.log(error);
      })
    }
  }
  searchLostFocus = (e) => {
    e.preventDefault();
      //close the search box
      this.setState({
        keyword : null,
    })
  }

  getNumberOfNotifications = () => {
    console.log("inside onload of badge**************")
  }

  // To Check student is register for sem 3
  isSpecialisationApplicable = () => {
    axios.defaults.headers.post['Content-Type'] = 'application/json';
    axios.post(isSpecialisationApplicable,
          JSON.stringify({
            sapid : this.props.sapId,
	          program : this.props.program
          })
        ).then(response => {
              this.setState({
                isSpecialisationApplicable : response.data.isSpecialisationApplicable
              })
              console.debug('isSpecialisationApplicable : ',this.state.isSpecialisationApplicable)
          }).catch((error) => {
            console.debug(error);
          })
  }

  componentDidMount(){
    //get notification count on load
    console.log("inside did mount of badge**************"+this.props.sapId);
    axios.defaults.headers.post['Content-Type'] = 'application/json';
        axios.defaults.headers.post["Access-Control-Allow-Origin"] = '*';
        axios.post(urls.apiUrl_announcement + "/getAllStudentAnnouncements", 
            JSON.stringify({ 
                userId : this.props.sapId,
                currentSemPSSId : []
            })
        ).then(response => {
        this.setState({
            notificationCount : response.data.length
        });
        // console.log("responseData---"+JSON.stringify(this.state.responseData));
        }).catch(function(error){
          console.log(error);
        })
        this.isSpecialisationApplicable()
  }

  navBarToggled = (status) => {
    window.$("body").toggleClass("navBarOpened", status);
    // window.$("body").toggleClass("sideBarOpened", status);
  }

  sideBarToggled = () => {
    window.$("body").toggleClass("sideBarOpened");
  }
  
render(){
        return(
<>
  <Row id="header">
  <Navbar 
    onToggle = {
      (collapsed) => {
        this.navBarToggled(collapsed)
      }
    } 
    id={"top-header"}
    fixed="top" 
    collapseOnSelect 
    expand="lg" 
    // className="navbar-icon-top pl-5 " 
    className="navbar-icon-top px-xl-5 px-sm-3 px-2" 
    style={{
      padding:'0px', 
      justifyContent:'left'
    }}
  >

    <Navbar.Toggle aria-controls="responsive-navbar-nav" md={{ span: 4 }}/>
    
    <Nav.Link 
      onClick={
        (e) => {
          e.preventDefault()
          this.sideBarToggled()
        }
      } 
      className="navbar-toggler" 
      md={{ span: 4 }}
    >     
      <div className="dark-text hover-light headerIcon headerNav">
        Toggle Navigation
      </div>
    </Nav.Link>
    <Navbar.Collapse id="responsive-navbar-nav "  >
      <Col sm={{ span: 12 }} xs={{ span: 12 }} lg={{ span: 3 ,offset:2}}  className="searchbar" >
                
      
       
        <NavDropdown 
											title={  
                        <InputGroup >
                        <InputGroup.Prepend>
                        <InputGroup.Text id="inputGroupPrepend"><FontAwesomeIcon icon="search"/></InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl type="text" placeholder="Search"  onKeyUp={this.SearchHandler}  className=" mr-sm-2" />
                    </InputGroup>
                        
												}  id="collasible-nav-dropdown">
													{
                            (this.state.keyword!=null && this.state.keyword.length>0) ?  
                            (
                              this.state.keyword.map(key => {
                                return (
                                  <LinkContainer 
                                    to = {{
                                      pathname : "/timeline/home",
                                      searchParams: { 
                                        keyword: key
                                      }
                                    }}
                                    activeClassName=""
                                  >
                                    <NavDropdown.Item>
                                      {key}
                                    </NavDropdown.Item>
                                  </LinkContainer>
                                  
                                )
                              })
                            ):(
                              <NavDropdown.Item   disabled >Searching...</NavDropdown.Item>
                            )
                          }	
					</NavDropdown>
          
         
      </Col>
      
      <Col lg={{ span: 7 }} sm={{ span: 12 }} xs={{ span: 12 }} >
    
      <Nav className="d-flex justify-content-lg-end justify-content-sm-center">
        <LinkContainer to="/timeline/home">
          <Nav.Link active={false} className="dark-text hover-light headerIcon">
            <FontAwesomeIcon className = "fa headerNav" icon="home"/>       
            <div className="dark-text hover-light headerIcon headerNav">
              Home
            </div>
          </Nav.Link>
        </LinkContainer>
        <LinkContainer to="/timeline/myCommunications">
          <Nav.Link active={false} className="dark-text hover-light headerIcon">
            <FontAwesomeIcon className = "fa headerNav" icon="envelope-open-text"/>   
            <div className="dark-text hover-light headerIcon headerNav">
              Messages
            </div>
          </Nav.Link>
        </LinkContainer>
        
        {/* <Nav.Link className="dark-text hover-light headerIcon" href="watch-video">
          <FontAwesomeIcon className = "fa" icon="chalkboard-teacher"/>           
          Video Gallery
        </Nav.Link> */}

        {/* <Nav.Link className="dark-text hover-light headerIcon" href="">  
          <FontAwesomeIcon className = "fa" icon="chart-line"/>          
          Progress
        </Nav.Link> */}
        <LinkContainer to="/timeline/notificationsAnnouncements">
          <Nav.Link active={false} className="dark-text hover-light headerIcon">
            <div className="nav-icon-container" style={{position: "relative"}}>
              <Badge variant="danger" pill style={{position:"absolute", top:"-10%", right:"20%"}}>
                  {this.state.notificationCount}
              </Badge>
              <FontAwesomeIcon className = "fa headerNav" icon="bullhorn"/>
              <div className="dark-text hover-light headerIcon headerNav">
                Notifications
              </div>
            </div>
          </Nav.Link>
        </LinkContainer>
        
        <Dropdown alignRight id="collasible-nav-dropdown" style={{width:'6rem'}}>

          <Dropdown.Toggle as={NavLink}>
            <div className="nav-icon-container">
              <span className="fa mb-0">
                <FontAwesomeIcon className = "fa mr-2" icon="graduation-cap"/> 
                <FontAwesomeIcon className = "d-inline-block" icon="angle-down" style={{fontSize: '10px'}}/>
              </span> 
            </div>
            <div className="dark-text hover-light headerIcon headerNav">Exams</div>
          </Dropdown.Toggle>

          <div className="dropdow-size">
          <Dropdown.Menu className="dropdow-size">
            <LinkContainer to = { Pages.courseExamHome }>
              <Dropdown.Item >  
                <FontAwesomeIcon className = "fa mr-2" icon="clipboard-list"/>       
                Exam Results
              </Dropdown.Item>
            </LinkContainer>
            {this.props.consumerProgramStructureId==='160'||this.props.consumerProgramStructureId==='111'||this.props.consumerProgramStructureId==='151'?
              <LinkContainer to = { Pages.rank }>
              <Dropdown.Item >  
              <FontAwesomeIcon className = "fa mr-2" icon="tasks"/>
                Rank
              </Dropdown.Item>
            </LinkContainer>:''
            }
            

            <LinkContainer to = { Pages.examBooking }>
              <Dropdown.Item>  
                <FontAwesomeIcon className = "fa mr-2" icon="calendar-check"/> 
                Exam Booking
              </Dropdown.Item>
            </LinkContainer>

            <LinkContainer to = { Pages.hallticketDownload }>
              <Dropdown.Item>  
                <FontAwesomeIcon className = "fa mr-2" icon="calendar-check"/> 
                HallTicket Download
              </Dropdown.Item>
            </LinkContainer>

            {this.state.isSpecialisationApplicable ? (
              <LinkContainer to = { Pages.electiveSelection }>
                <Dropdown.Item>  
                  <FontAwesomeIcon className = "fa mr-2" icon="clipboard-list"/>       
                    Electives Selection
                </Dropdown.Item>
              </LinkContainer>
              ) : ''
            }

          </Dropdown.Menu>
          </div>
        </Dropdown>

        {/* <LinkContainer to="/timeline/contactUs">
          <Nav.Link active={false} className="dark-text hover-light headerIcon">
            <FontAwesomeIcon className = "fa headerNav" icon="life-ring"/>       
            <div className="dark-text hover-light headerIcon headerNav">
              Support
            </div>
          </Nav.Link>
        </LinkContainer> */}
        <Dropdown alignRight id="collasible-nav-dropdown">

          <Dropdown.Toggle as={NavLink} className="border-left">
            <div className="nav-icon-container">
              <span className="fa mb-0">
                <FontAwesomeIcon className="fa headerNav d-inline-block" icon="life-ring"/> 
                <FontAwesomeIcon className="d-inline-block" icon="angle-down" style={{fontSize: '10px'}}/>
              </span> 
            </div>
            <div className="dark-text hover-light headerIcon headerNav">Support</div>
          </Dropdown.Toggle>
          
          <Dropdown.Menu>
            
            <LinkContainer to="/timeline/contactUs">  
              <Dropdown.Item >  
                <FontAwesomeIcon className = "fa mr-2" icon="phone"/> 
                Contact Us
              </Dropdown.Item>
            </LinkContainer>

            <LinkContainer to="/timeline/selectSR">
              <Dropdown.Item>  
                <FontAwesomeIcon className = "fa mr-2" icon="user-cog"/> 
                Service Request
              </Dropdown.Item>
            </LinkContainer>

          

            <LinkContainer to="/timeline/myDocuments">
              <Dropdown.Item>  
                <FontAwesomeIcon className = "fa mr-2" icon="file-invoice" />
                My Documents
              </Dropdown.Item>
            </LinkContainer>


            <LinkContainer to="/timeline/faqpage">  
              <Dropdown.Item > 
              <FontAwesomeIcon className = "fa mr-2" icon="question-circle" /> 
                FAQs
              </Dropdown.Item>
            </LinkContainer>

            <LinkContainer to="/timeline/knowYourPolicy">  
              <Dropdown.Item > 
              <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 384 512">
              <path d="M64 0C28.7 0 0 28.7 0 64V448c0 35.3 28.7 64 64 64H320c35.3 0 64-28.7 64-64V160H256c-17.7 0-32-14.3-32-32V0H64zM256 0V128H384L256 0zM112 256H272c8.8 0 16 7.2 16 16s-7.2 16-16 16H112c-8.8 0-16-7.2-16-16s7.2-16 16-16zm0 64H272c8.8 0 16 7.2 16 16s-7.2 16-16 16H112c-8.8 0-16-7.2-16-16s7.2-16 16-16zm0 64H272c8.8 0 16 7.2 16 16s-7.2 16-16 16H112c-8.8 0-16-7.2-16-16s7.2-16 16-16z"/></svg>
                <p className="ml-2 d-inline">Know Your Policy</p>
              </Dropdown.Item>
            </LinkContainer>


          </Dropdown.Menu>
        </Dropdown>

        <Dropdown as={NavItem} alignRight id="collasible-nav-dropdown">

          <Dropdown.Toggle as={NavLink} className="d-flex">
            
            <div className="circular-portrait">
              <Image src={this.props.imageUrl} />
            </div>
            <div className="settings-arrow"><FontAwesomeIcon icon="angle-down" />
            </div> 
          </Dropdown.Toggle>

          <Dropdown.Menu>

            <LinkContainer to="/timeline/publicProfile">
              <Dropdown.Item>
                <small>
                  <FontAwesomeIcon className = "fa mr-2" icon="user-edit"/>
                </small>
                Edit Account
              </Dropdown.Item>
            </LinkContainer>

              {/* <NavDropdown.Item href="profileNameUser">
                <FontAwesomeIcon className = "fa" icon="cog"/> Setting
              </NavDropdown.Item>
              <NavDropdown.Divider /> */}

            <LinkContainer to="/timeline/changePassword">
              <Dropdown.Item>
                <small>
                  <FontAwesomeIcon className = "fa mr-2" icon="key" />
                </small>
                Change Password
              </Dropdown.Item>
            </LinkContainer>

            <Dropdown.Divider />

            <LinkContainer to="/timeline/logout">
              <Dropdown.Item>
                <small>
                  <FontAwesomeIcon className = "fa mr-2" icon="sign-out-alt" />
                </small> 
                Logout
              </Dropdown.Item>
            </LinkContainer>
          </Dropdown.Menu>
        </Dropdown>


      {/* <Nav.Link className="dark-text hover-light headerIcon" href="">
        <FontAwesomeIcon className = "fa" icon="question-circle"/>          
        Help
      </Nav.Link> */}

      {/* <Nav.Link className="dark-text hover-light headerIcon" href="">
        <Image src="https://i0.wp.com/www.picmonkey.com/blog/wp-content/uploads/2015/04/LinkedIn_4.jpg?resize=200%2C200" height="30px" width="30px" roundedCircle />
        < br />
        Nelson
      </Nav.Link> */}

        {/* <li class="nav-item dropdown hover-light px-2 " >  
        <a class="nav-link dark-text" id="notificationDropdown" data-toggle="dropdown" href="#" role="button" aria-haspopup="false" aria-expanded="false">
          <span class="octicon octicon-bell  " ></span>
          <!-- <span class="badge badge-danger" style="margin:-1em;">3</span> -->
        </a>
        <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
          <li class="head text-light bg-primary">
            <div class="row">
              <div class="col-lg-12 col-sm-12 col-12">
                <span style="padding-left: inherit;"> Notifications (3)</span>
                <a href="viewAllNotification" class="float-right text-light" style="padding-right: inherit;" >See all</a>
              </div>
            </div>
          </li>
          
          <li class="notification-box">
            <div class="row">
              <div class="col-lg-3 col-sm-3 col-3 text-center">
                <img src="assets/images/people/110/guy-3.jpg" class="w-50 rounded-circle">
              </div>    
              <div class="col-lg-8 col-sm-8 col-8">
                <strong class="text-info">Deepak Gupta</strong>
                <div>
                   posted new post for <b>Business Economics</b>
                </div>
                <small class="text-warning">18.11.2018, 09:00</small>
              </div>    
            </div>
          </li>
          <li class="notification-box bg-gray">
            <div class="row">
              <div class="col-lg-3 col-sm-3 col-3 text-center">
                <img src="assets/images/people/110/guy-2.jpg" class="w-50 rounded-circle">
              </div>    
              <div class="col-lg-8 col-sm-8 col-8">
                <strong class="text-info">David Lorem</strong>
                <div>
                  liked your post.
                </div>
                <small class="text-warning">17.11.2018, 15:00</small>
              </div>    
            </div>
          </li>
          <li class="notification-box">
            <div class="row">
              <div class="col-lg-3 col-sm-3 col-3 text-center">
                <img src="assets/images/people/110/guy-5.jpg" class="w-50 rounded-circle" />
              </div>    
              <div class="col-lg-8 col-sm-8 col-8">
                <strong class="text-info">Johnson Jack</strong>
                <div>
                  commented on your post.
                </div>
                <small class="text-warning">17.11.2018, 13:00</small>
              </div>    
            </div>
          </li>
          
        </ul>

      </li>






        <li class="nav-item dropdown hover-light" >
        <a class="nav-link dark-text"  id="Preview" href="#" data-toggle="dropdown" role="button" aria-haspopup="false"> 
        	<i class="fas fa-cog fs-27"></i>
        </a>
        <div class="dropdown-menu w-auto" aria-labelledby="Preview">
          <a class="dropdown-item" href="accountEditUser"><i class="fas fa-edit"></i> <span class="icon-text">Edit Account</span></a>
          <a class="dropdown-item" href="profileNameUser"><i class="fas fa-user"></i> <span class="icon-text">Public ProfileName</span></a>
          <div class="dropdown-divider"></div>
          <a class="dropdown-item" href="/ltidemo/logout">Logout</a>
        </div>
      </li> */}

      {/* 
        <Nav.Link className="nav-item dropdown hover-light" >



        <a className="nav-link dark-text"  id="Preview" href="#" data-toggle="dropdown" role="button" aria-haspopup="false"> 
        	<i className="fas fa-cog fs-27"></i>
        </a>
        <div className="dropdown-menu w-auto" aria-labelledby="Preview">
          <a className="dropdown-item" href="accountEditUser"><i className="fas fa-edit"></i> <span className="icon-text">Edit Account</span></a>
          <a className="dropdown-item" href="profileNameUser"><i className="fas fa-user"></i> <span className="icon-text">Public ProfileName</span></a>
          <div className="dropdown-divider"></div>
          <a className="dropdown-item" href="/ltidemo/logout">Logout</a>
        </div>
      </Nav.Link> */}





    </Nav>
    </Col>
    </Navbar.Collapse>

</Navbar>
</Row>
</>

        );
    }
}
const mapStateToProps = state => {
  return {
      sapId: state.sapid,
      firstName: state.firstName,
      lastName: state.lastName,
      imageUrl: state.imageUrl,
      program: state.program,
      prgmStructApplicable: state.prgmStructApplicable,
      consumerProgramStructureId : state.consumerProgramStructureId
  }
}

export default withRouter(connect(mapStateToProps)(Header))
