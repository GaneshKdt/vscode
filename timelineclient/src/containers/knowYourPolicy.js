import React, { Component } from "react";
import { connect } from 'react-redux';
import {analyticsManager} from '../shared/Analytics';
import { Accordion } from "react-bootstrap";
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import axios from 'axios';
import Button from "react-bootstrap/esm/Button";
import ConfigUrls from '../shared/config';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'  

const urls = new ConfigUrls().urls;
const noBorder = {
  borderLeft : '0px',
  borderTop : '0px',
  borderRight : '0px',
  borderBottom : '1px solid grey',
}
class knowYourPolicy extends Component{

    state = {
            groupId :'',
            categoryMap:{},
            subcategoryMap:{},
            policyMap:{}, 
            errorMessage:false,
            recordFound:false
    }

    componentDidMount=()=>{
        this.studentPolicy();
    }

    studentPolicy =()=>{
        axios.defaults.headers.post['Content-Type'] = 'application/json';
        let apiToCall = urls.apiUrl_KnowYorPolicy +'/m/studentPolicyForWX';
        axios.post(apiToCall, JSON.stringify({"masterkey":this.props.consumerProgramStructureId})).then(response => {
          this.setState({
              groupId: response.data.groupId,
              categoryMap: response.data.categoryMap,
              subcategoryMap: response.data.subcategoryMap,
              policyMap: response.data.policyMap,
              recordFound:true
          });
      }).catch(error => {
          this.setState({
              errorMessage: true
          });
      });
    }

    downloadSRB=()=>{
        window.open(urls.static_portal+`resources_2015/SRB-MBA(WX).pdf`,'_blank');  
    }

    render() {
        return (
          <Container>
            <Card>
              <Card.Header className="cardHeader">KNOW YOUR POLICY</Card.Header>
              <Card.Body >
                {(this.state.errorMessage) ?  <div className="container-fluid w-100 text-center border-4 text-danger" 
                >Internal Error To Get The Policy Please Try Again!</div> : ""}
               
               {(this.state.recordFound) ? (
                
                Object.keys(this.state.categoryMap).length > 0  ? ( 
                <Accordion flush style={{cursor:'pointer'}}>
                    {Object.entries(this.state.categoryMap).map(([key, category]) => (
                      <Card key={key}>
                        <Accordion.Toggle as={Card.Header} eventKey={key} className="accordion-header">
                          {category.categoryName}
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey={key}>
                            <Card.Body  >
                            <Accordion flush>
                                {this.state.subcategoryMap[key].map((subcategory) => (
                                  <Card key={subcategory.subcategoryId}  style={noBorder}>
                                    <Accordion.Toggle as={Card.Header} eventKey={subcategory.subcategoryId} className="accordion-header">
                                      {subcategory.subcategoryName}
                                    </Accordion.Toggle>
                                    <Accordion.Collapse eventKey={subcategory.subcategoryId}>
                                      <Card.Body>
                                        <Accordion flush>
                                          {this.state.policyMap[this.state.groupId.groupId + "-" + key + "-" + subcategory.subcategoryId].map((policy) => (
                                            <Card key={policy.policyId} style={noBorder}>
                                              <Accordion.Toggle as={Card.Header} eventKey={policy.policyId} className="accordion-header">
                                                {policy.title}
                                              </Accordion.Toggle>
                                              <Accordion.Collapse eventKey={policy.policyId}>
                                                <Card.Body><span dangerouslySetInnerHTML = {{__html: policy.description}} ></span></Card.Body>
                                              </Accordion.Collapse>
                                            </Card>
                                          ))}
                                        </Accordion>
                                      </Card.Body>
                                    </Accordion.Collapse>
                                  </Card>
                                ))}
                              </Accordion>
                            </Card.Body>
                        </Accordion.Collapse>
                      </Card>
                    ))}
                  </Accordion>
               
              ) : (
                 
                <div className="container-fluid w-100 text-center border-4 text-danger " >No Record Found</div>
               
               )
              ):""}
              </Card.Body>
            </Card>
            <Card className="mt-3">
            
                <Card.Body>
                  <div><h5 className="text text-primary">STUDENT RESOURCE BOOK (SRB)</h5></div>
                  <div className="row">
                    <div className="col-md-10"><p>Please read the Student Resource Book carefully as it
									contains details of the Academic, Evaluation and Administrative
									Rules and Regulations of the University. All students are
									expected to know these rules and policies as mentioned in the
									SRB.</p></div>
                    <div className="col-md-2 d-flex justify-content-end">
                    <Button variant="primary" onClick={this.downloadSRB}><FontAwesomeIcon className = "fa mr-2" icon="file-invoice" /><br/>Download SRB</Button>
                    </div>
              
                  </div>
                </Card.Body>
            </Card>
          </Container>
        );
      }
}
const mapStateToProps = state => {
    return {
        consumerProgramStructureId: state.consumerProgramStructureId, 
        //program: state.program
    }
}

 export default connect(mapStateToProps)(analyticsManager(knowYourPolicy))
