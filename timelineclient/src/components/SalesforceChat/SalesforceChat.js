import React, { Component } from 'react';
import { Button,Container,Card,Form } from 'react-bootstrap';
import "./SalesforceChat.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faComment, faComments, faSleigh}from '@fortawesome/free-solid-svg-icons'
import { Modal } from 'react-bootstrap';
import { confirmAlert } from 'react-confirm-alert'
import axios from 'axios'  
import { AppConfig, API } from '../../shared/config'

var contacts
class SalesforceChat extends Component{

  constructor(props) {
    super(props)
    this.state = {
      showModal           : false,
      hideModal           : true,
    }
  } 

  initializeChat = (liveagent) => {

    liveagent.startChat("57390000000H2q5");

  };

  showOfflineAlert = () =>{
    this.setState({showModal:true})
  }

  hideModal = () => {
    this.setState({showModal:false})
  }

  fetchContacts = () => {
    
    axios.defaults.headers.post['Content-Type'] = 'application/json';
    axios.post(API.getContactsForChat,
        JSON.stringify({
            "sapId": this.props.sapid
        })
    ).then(response => {
        /*
        Dont store in state as it is async and it may cause bugs where none
         of the functions (oninitialize and fetchcontatcts) set the contact list
         */
        contacts = response.data
        this.props.dispatch({
            type:'LoadStudentsBatchList',
            data:contacts});

    }).catch(error => {
        // console.log(error);
        
    })
  }

  componentDidMount(){

    /*
      added this to load contacts in attempt to fix the mentionUsers data being undefiend 
      and then map throwing error for undefiend
    */
    this.fetchContacts()

    try{
      let liveagent = this.props.liveagent 
      
      liveagent.init('https://d.la1-c2-hnd.salesforceliveagent.com/chat', '57290000000H2JL', '00D90000000s6BL');
      var fullName;
      if(this.props.lastName)
        fullName=this.props.firstName.trim()+' '+this.props.lastName.trim();
      else
        fullName=this.props.firstName.trim();
      
      liveagent.addCustomDetail('fullName', fullName ); 
      liveagent.addCustomDetail('email',  this.props.emailId.trim());
      liveagent.addCustomDetail('mobile', this.props.mobile.trim());
  
      if(this.props.city)
        liveagent.addCustomDetail('city', this.props.city.trim());
  
      if (!window._laq) 
            window._laq = [];
  
      window._laq.push(function () {
        liveagent.showWhenOffline("57390000000H2q5", 
              document.getElementById("liveagent_button_offline_57390000000H2q5"));
        liveagent.showWhenOnline("57390000000H2q5", 
              document.getElementById("liveagent_button_online_57390000000H2q5"));
      });
    }catch(error){
      console.debug(error)
    }
    
  }

  handleSubmit = (event) => {

    event.preventDefault();

    const query =  this.getQuery.value;
    const purpose =  this.getPurpose.value;
    const category =  this.getCategory.value;
    const subject =  this.getSubject.value;

    var body = 'orgid=00D90000000s6BL&retURL=null&encoding=UTF-8&name=' 
                + this.props.firstName + ' ' + this.props.lastName
                + '&email=' + this.props.emailId + '&phone=' 
                + this.props.mobile + '&origin=Web App&recordType=01290000000A959&00N9000000EQXMM='
                + purpose+'&00N9000000EPf0L=' + category +'&subject=' 
                + subject + '&description=' + query + '&submit=null';
    
    this.hideModal()

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
                this.setState({
                    responseData : response.data,
                })
                alert("Your query was raised successfully.")
            }).catch(function(error){
                console.debug('error: '+error);
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

  render(){

    return (
      <>
        <div className="chat-launcher-container">
            <button  id="liveagent_button_online_57390000000H2q5" className="chat-launcher-icon chat-button" 
              onClick={()=>this.initializeChat(this.props.liveagent)} >
                <FontAwesomeIcon className="fa-lg" icon={faComments} />
            </button>
            
            <button id="liveagent_button_offline_57390000000H2q5" style={{display:"none"}} className="chat-launcher-icon chat-button"
              onClick={() => this.showOfflineAlert()}>
                <FontAwesomeIcon className="fa-lg" icon={faComments} />
            </button>
            
        </div>
        <Modal
          show={this.state.showModal}
          onHide={() => this.hideModal()}
          onExit={() => this.hideModal()}
          dialogClassName="modal-90w"
          centered
          size = 'lg'
          >
                <Modal.Header className="d-block" closeButton>
                    <h6 className="card-title mb-0 mt-0">We are currenlty offline.</h6>
                    <small className="card-subtitle">
                        We are currenlty offline, please raise your query below. 
                        We will revert to your query as soon as possible.
                    </small>
                </Modal.Header>
                <Modal.Body as={Card.Body} style={{maxWidth : "60%", minWidth : '60%',margin: 'auto'}}>
                  <Form onSubmit={this.handleSubmit}>
                    <Form.Control
                            as="select"
                            name="purpose"
                            ref={(input)=>this.getPurpose = input}
                          >
                            <option value="">Select a Purpose</option>
                            <option value="Enquiry">Enquiry</option>
                            <option value="Complaint">Complaint</option>
                            <option value="Feedback">Feedback</option>
                          </Form.Control><br/>

                    <Form.Control
                            as="select"
                            name="category"
                            ref={(input)=>this.getCategory = input}
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
                          </Form.Control><br/>

                    <Form.Control type="text"  id="subject" placeholder="Enter subject"  ref={(input)=>this.getSubject = input} /><br/>
                    <Form.Control type="text"  id="query" placeholder="Enter your query"  ref={(input)=>this.getQuery = input} /><br/>
                    <Button type="submit" block>Raise your query</Button>
                  </Form>                                    
                </Modal.Body>
        </Modal>
      </>
    )

  }

}

export default SalesforceChat;