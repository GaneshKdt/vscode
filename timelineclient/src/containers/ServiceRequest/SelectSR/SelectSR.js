import React, { Component } from 'react';
import axios from 'axios';
import'./SelectSR.css';
import { Redirect } from 'react-router-dom'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import {connect} from 'react-redux';
import {analyticsManager} from '../../../shared/Analytics'
import { Container, Table } from 'react-bootstrap';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import LoadingSpinner from '../../../shared/LoadingSpinner/LoadingSpinner';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ConfigUrls, { Pages, API } from '../../../shared/config'
import { LinkContainer } from 'react-router-bootstrap'

import CommonUtilities from '../CommonUtilities';
import AxiosHandler from "../../../shared/AxiosHandler/AxiosHandler";
import electiveSRPaymentConfirmation from '../../CourseSpecialisation/ElectiveSRPaymentConfirmation';

const commonUtilities = new CommonUtilities();
const urls = new ConfigUrls().urls;


const CHECK_FINAL_CERTIFICATE_ELIGIBILITY =  new ConfigUrls().api.checkFinalCertificateEligibility
const GET_SR_TYPES = new ConfigUrls().api.getSrTypes
const SR_ISSUANCE_OF_FINAL_CERTIFICATE = "Issuance of Final Certificate"

const TIMEBOUNDS_MASTERKEYS = ["111","131","151","154","155","156","157","158","160"]; 
const PDDM_MASTERKEYS = ["142","143","144","145","146","147","148","149"];
const PRODUCT_PG = "PG";
const PRODUCT_WX = "MBAWX";
const PRODUCT_PDDM = "PDDM";

const columns = [{
        dataField: 'id',
        text: 'Service Request ID',
        sort: true,
        headerStyle : {background: 'lightslategray',color: 'white'}
    }, 
    {
        dataField: 'serviceRequestType',
        text: 'Service Request Type',
        sort: true,
        headerStyle : {background: 'lightslategray',color: 'white'}
    },
    {
        dataField: 'requestStatus',
        text: 'Service Request Status',
        sort: true,
        headerStyle : {background: 'lightslategray',color: 'white'}
        
    },
    {
        dataField: 'tranStatus',
        text: 'Category',
        sort: true,
        headerStyle : {background: 'lightslategray',color: 'white'}
        
    },
    {
        dataField: 'respAmount',
        text: 'Amount',
        sort: true,
        headerStyle : {background: 'lightslategray',color: 'white'}
        
    },
    {
        dataField: 'description',
        text: 'Description',
        sort: true,
        headerStyle : {width : '25%',background: 'lightslategray',color: 'white'}
        
    },
    {
        dataField: 'documents[0].filePath',
        text: 'Documents',
        sort: true,
        headerStyle : {background: 'lightslategray',color: 'white'},
        formatter :  documentLink
        
        
    }
];
export function documentLink (content,row,rowIndex) {
    if(row.hasDocuments === 'Y'){
        // let link = urls.apiUrl_web_studentPortal + "viewSRDocumentsForStudents?serviceRequestId=" + row.id;
        let link = urls.apiUrl_web_studentPortal + urls.viewSRDocuments + row.id;

        return(
            <a href={link} target="_blank">
                <Button variant="light ">
                    <FontAwesomeIcon icon="eye" />  
                </Button>
            </a>      
        )
    }
    
}
const rowClasses = (row, rowIndex) => {
    if(rowIndex % 2 !== 0)
        return 'rowOdd';
    else
        return 'rowEven';
};

const customTotal = (from, to, size) => (
    <span className="react-bootstrap-table-pagination-total">
        { from } to { to } of { size }
    </span>
  );


let isSpecialisationApplicable = API.isSpecialisationApplicable

class SelectSR extends Component{
    constructor(props) {
        super(props);
        this.requestTypeRef = React.createRef();
    }
    state={
        srList : [],
        pddmMasterKeys : [
            142,143,144,145,146,147,148,149
        ],

        srType : "Select Service Request",
        studentData : this.props.student,
        pendingSR : null, 
        closedSR : null,  
        requestDocLinkId : "", 
        options : {
            paginationSize: 5,
            pageStartIndex: 1,
            firstPageText: 'First',
            prePageText: 'Back',
            nextPageText: 'Next',
            lastPageText: 'Last',
            nextPageTitle: 'First page',
            lastPageTitle: 'Last page',
            showTotal: true,
            paginationTotalRenderer: customTotal,
            sizePerPageList: [{
            text: '5', value: 5
            }, {
            text: '10', value: 10
            }, {
            text: 'All', value: 0
            }] // A numeric array is also available. the purpose of above example is custom the text
        },
        srStatus : ["pending", "closed"],
        
        responseData : [],   
        sapId :  this.props.student.sapid,
        amount : null,
        isCertificate : null,
        subjectList : [],
        error : null,
        forward : false,
        responseData : [],
        isSpecialisationApplicable : false,
        isSpecialisationSRApplicable : false,
        isLoaded : false,
        isServiceRequestRaised  : false,
        isSpecialisationSRPaymentApplicable : false,
        isMarksheetSRApplicable : false,
        isGradeSheetApplicable : true

    }

    isSpecialisationApplicable = () => {
        axios.defaults.headers.post['Content-Type'] = 'application/json';
        axios.post(isSpecialisationApplicable,
              JSON.stringify({
                sapid : this.state.studentData.sapid,
                program : this.state.studentData.program
              })
            ).then(response => {
                  this.setState({
                    isSpecialisationApplicable : response.data.isSpecialisationApplicable,
                    isSpecialisationSRApplicable : response.data.isSpecialisationSRApplicable,
                    isSpecialisationSRPaymentApplicable :  response.data.isSpecialisationSRPaymentApplicable,
                    isLoaded : true
                  })
              }).catch((error) => {
                console.debug(error);
              })
    }

    isServiceRequestRaised = () => {

        this.setState({isServiceRequestLoaded:false})
        axios.defaults.headers.post['Content-Type'] = 'application/json';
        axios.get(urls.apiUrl_exam + "/isServiceRequestRaised?sapId="+this.props.sapId
        ).then( response => {     
            if(response.data.isServiceRequestRaised == "true"){
                this.setState({
                    isServiceRequestRaised : true,
                    isServiceRequestLoaded :true
                })
            }else{
                this.setState({
                    isServiceRequestLoaded :true
                })
            }
        }).catch(function(error){
          console.log(error);
        })
    }

    isMarksheetSRApplicable = () =>{
        this.state.pddmMasterKeys.map((masterKey) => {
            if(masterKey == this.state.studentData.consumerProgramStructureId){
                this.state.isMarksheetSRApplicable = true;
                this.state.isGradeSheetApplicable = false;
            }
        })
    }


    /*
        commented out old logic for elective redirection
        isAlreadyRaiseSRforElectives = () =>{
            if (this.state.isServiceRequestLoaded) {
                if (!this.state.isServiceRequestRaised) {
                    return(
                        <Redirect to={{pathname: '/timeline/courseSpecialisationMain', 
                            state: { serviceRequest: true } }} />
                    )
                }else{
                    alert('You have already raised Service Request for Change in Specialisation')
                }
            }
        }
    */
    checkTypeOfElectiveSRAndRedirect = () => {

        if (this.state.isServiceRequestLoaded) {
            if ( !this.state.isSpecialisationSRPaymentApplicable ) {
                return(
                    <Redirect to={{pathname: '/timeline/electiveSelection', 
                        state : {serviceRequest: true} }} />
                )
            }else{
                return (
                    <Redirect to={{pathname: '/timeline/electiveSRPaymentConfirmation', 
                        values: { serviceRequest : true } }} />
                )
            }
        }

    }

    componentDidMount(){
        this.srTypeList()
        this.isSpecialisationApplicable()
        this.isServiceRequestRaised()
        this.isMarksheetSRApplicable()
        //get all SRs
        this.state.srStatus.map(status => {
            axios.defaults.headers.post['Content-Type'] = 'application/json';
            axios.post(urls.apiUrl_studentPortals + "getStudentSRList?status="+status,
                JSON.stringify({ 
                    sapid : this.state.studentData.sapid,
                    
                })
            ).then(response =>{
                console.log("response-------------"+JSON.stringify(response))
                if(status === "pending"){
                console.log("inside if in response============")
                    this.setState({
                        pendingSR : response.data,
                    })
                }
                else if(status === "closed"){
                console.log("inside else in response============")
                    this.setState({
                        closedSR : response.data,
                    })
                }
                this.state.options.sizePerPageList[2].value = response.data.length;
            
            }).catch(error=>{
                console.log(error);
            })
        })
        // console.log('http://localhost:8080/studentportal/m/selectSRForm');
        // axios.defaults.headers.post['Content-Type'] = 'application/json';
        // axios.post("http://localhost:8080/studentportal/m/selectSRForm",
        //     JSON.stringify({ 
        //         userId : '77777777777'
        //     })
        // ).then(function(response){
        //     console.log(response);
        // }).catch(function(error){
        //     console.log(error);
        // })
        
    }
    // formSubmit = (evt) => {
        // axios.defaults.headers.post['Content-Type'] = 'application/json';
        // axios.post("http://localhost:8080/studentportal/m/addSRForm",
        //     JSON.stringify({ 
        //         userId : '77777777777'
        //     })
        // ).then(function(response){
        //     console.log(response);
        // }).catch(function(error){
        //     console.log(error);
        // })
    // }
    getSRType = (e) => {
        console.log("inside getSRtype==="+ this.state.srType);
        let requestType = this.state.srType;
        // let methodCall = "";
        // if(this.state.srType == "Change in DOB"){
        //     console.log("inside if**************");
        // //    methodCall = "http://localhost:8080/studentportal/m/saveCorrectDOB";
        // }
        // // else if(this.state.srType == "Change in I-Card"){
        //     methodCall= ""
        // }
        // else if(this.state.srType == "Change in I-Card"){

        // }
        // else if(this.state.srType == "Change in Name"){

        // }
        // else if(this.state.srType == "Change in Photograph"){

        // }
        // else if(this.state.srType == "Duplicate Fee Receipt"){

        // }
        // else if(this.state.srType == "Duplicate I-Card"){

        // }
        // else if(this.state.srType == "Issuance of Bonafide"){

        // }
        // else if(this.state.srType == "Issuance of Final Certificate"){

        // }
        // else if(this.state.srType == "Issuance of Marksheet"){

        // }
        // else if(this.state.srType == "Re-Dispatch Of Study Kit"){

        // }
        // else if(this.state.srType == "Single Book"){

        //get active SR list, for future
            // axios.defaults.headers.post['Content-Type'] = 'application/json';
            // const formData = new FormData();
            // formData.append('sapId', this.state.sapId);
            // axios.post(urls.apiUrl_studentPortals + "getActiveSRList",formData
            // ).then(response =>{
            //     console.log("response-------------"+JSON.stringify(response))
            //     this.setState({
            //         srList : response.data,
            //     })
            // }).catch(error=>{
            //     console.log(error);
            // })
        
    }
   
    
    setSRType = (evt) => {
        console.log("inside setSRtype===********"+ evt.target.value);
        console.table("inside set****************"+this.state);
        this.setState({
            srType : this.requestTypeRef.current.value
        })
        //console.log(this.state.amount);
        //console.log(this.state.isCertificate);
        //console.log(this.state.srType);

        if(this.state.srType === "Issuance of Final Certificate"){
            console.log("----->" + this.state.srType)
        }

        if(this.state.amount !==null && this.state.isCertificate !== null){
            
            this.setState({
                forward : true
            })
            if(this.state.srType === "Single Book"){
                if(this.state.subjectList !== null){
                    this.setState({
                        forward : true,
                    })
                }
            }
        }
        
        
    }
    getFeeAmount = (serviceRequestType) => {
        console.log("getFeeAmount")
        console.log("inside getamt---");
        var sapId = this.state.sapId;
        console.log(" inside select sr---",sapId, "=--=-=",serviceRequestType);
        var promiseGetAmount = new Promise(function(resolve, reject) {
            commonUtilities.getFeeAmount(sapId, serviceRequestType, resolve, reject);
        })
        promiseGetAmount.then(response =>{
            console.log("inside----promise then---2222222222",JSON.stringify(response.data));
            if(response.status === "success"){
                this.setState({
                    amount : response.data.amount,
                    isCertificate : response.data.isCertificate,
                    error : null,
                    subjectList : response.data.subjectList ,
                    srType : serviceRequestType
                }, ()=>{
                    console.log("inside after setstate---",this.state);
                    this.setAmount();
                });
            }
        }).catch(error =>{
            console.log("promise error---1111111");
            this.setState({
                error : error.errorMessage,
                srType : serviceRequestType
            })
        })
        
    }
    setAmount = () => {
        console.log("inside setamt---")
        if(this.state.isCertificate === true){
            console.log("inside if-------------")
            this.setState({
                amount : this.state.amount + this.state.amount * 0.18,
            })
        }
    }

    handleDropdownChange = (evt) =>{
        console.log(" inside ddl change----")
       // this.getFeeAmount(evt.target.value);
        
    }
    
    srTypeList = () => {
        axios.defaults.headers.post['Content-Type'] = 'application/json';
        axios.defaults.headers.post["Access-Control-Allow-Origin"] = '*';
        
        axios.post(GET_SR_TYPES,
        JSON.stringify({ 
            sapId : this.state.sapId,
        })
        ).then(response => {
           
        this.setState({
          srList :response.data.srTypes
        },
    () => {      
       
      });     	
 }).catch(error =>{
   
  })

    }

    getProductType = () => {
       
        if((PDDM_MASTERKEYS.includes(this.props.student.consumerProgramStructureId))){
           return PRODUCT_PDDM;
        }else{
            return PRODUCT_WX;
        }
    }

    render(){
        return(
            <>  { this.state.isLoaded ? (
                <Container>
                    <Row>
                        <Col >                         
                       
                            <Tabs defaultActiveKey="RaiseSR" id="uncontrolled-tab-example" >
                                <Tab eventKey="RaiseSR" title="Raise Service Request">
                                    <Card>
                                        <Card.Header className="cardHeader">Select Service Request</Card.Header>
                                
                                        <Form className="forFormInSR"> 
                                            <Form.Group as={Row} controlId="serviceRequestType">
                                                <Form.Label column sm="3">
                                                   Select Service Request Type:
                                                </Form.Label>
                                                <Col sm="8">
                                                    <Form.Control as="select" ref={this.requestTypeRef} name="serviceRequestType" value={this.state.serviceRequestType}  onChange={this.handleDropdownChange}>
                                                            <option key={""} value="" >Select Service Request</option>
                                                            { this.state.srList.map((item) => 
                                                                    {
                                                                        if (item === "Change in Specialisation") {
                                                                             if (this.state.isSpecialisationApplicable && this.state.isSpecialisationSRApplicable) {
                                                                                 return( <> <option key={item} value={item} >{item}</option> </> ) 
                                                                             }
                                                                        }else if(item === "Issuance of Marksheet"){
                                                                            if (this.state.isMarksheetSRApplicable) {
                                                                                return( <> <option key={item} value={item} >{item}</option> </> ) 
                                                                            }
                                                                        }else if(item === "Issuance of Gradesheet"){
                                                                            if (this.state.isGradeSheetApplicable) {
                                                                                return( <> <option key={item} value={item} >{item}</option> </> ) 
                                                                            }
                                                                        }
                                                                        else {
                                                                            return( <> <option key={item} value={item} >{item}</option> </> )
                                                                        }
                                                                    }
                                                                )
                                                            }
                                                    </Form.Control>
                                                </Col>
                                            </Form.Group>
                                        </Form>
                                        <Card.Footer> 
                                            <div className="forButtons">
                                                <Button variant="primary" id="submit" onClick={this.setSRType.bind(this)}>Proceed</Button>
                                            </div>
                                        </Card.Footer>
                                    </Card>
                                </Tab>
                                <Tab eventKey="PendingSR" title="View Pending" >
                                    {this.state.pendingSR ? 
                                        <>
                                        { this.state.pendingSR.length > 0 ? 
                                                <BootstrapTable keyField='id' data={ this.state.pendingSR } columns={ columns }  rowClasses={rowClasses}   pagination={paginationFactory(this.state.options)}/>
                                        : 
                                                <Card style={{height : '200px', textAlign : 'center'}}>
                                                    <Card.Text><h5 style={{marginTop: '50px'}}><FontAwesomeIcon icon="exclamation-circle"/>&nbsp;&nbsp;&nbsp;No Data to Display.</h5></Card.Text>
                                                </Card>
                                        }
                                        </>
                                    : <LoadingSpinner />}
                                </Tab>
                                <Tab eventKey="ClosedSR" title="View Closed">
                                    {this.state.closedSR && this.state.closedSR.length > 0 ? 
                                            <BootstrapTable keyField='id' data={ this.state.closedSR } columns={ columns }  rowClasses={rowClasses}   pagination={paginationFactory(this.state.options)}/>
                                    :
                                            <Card style={{height : '200px', textAlign : 'center'}}>
                                                <Card.Text><h5 style={{marginTop: '50px'}}><FontAwesomeIcon icon="exclamation-circle"/>&nbsp;&nbsp;&nbsp;No Data to Display.</h5></Card.Text>
                                            </Card>
                                    }
            
                                </Tab>
                                
                            </Tabs>       
                                        
                                
                                       

                                {this.state.srType === "Change in DOB" ? 
                                    <Redirect  to={{pathname:'/timeline/changeInDOB'}}/> 
                                    : null 
                                }
                                {this.state.srType === "Change in I-Card" ? 
                                    <Redirect  to={{pathname: '/timeline/changeInID'}} /> 
                                    : null 
                                }
                                {this.state.srType === "Change in Name" ? 
                                    <Redirect  to={{pathname: '/timeline/changeInName'}} /> 
                                    : null 
                                }
                                {this.state.srType === "Change in Photograph" ? 
                                    <Redirect  to={{pathname: '/timeline/changeInPhotograph'}} /> 
                                    : null 
                                }
                                {this.state.srType === "Duplicate Fee Receipt" ? 
                                    <Redirect  to={{pathname: '/timeline/duplicateFeeReceipt'}} /> 
                                    : null 
                                }
                                {this.state.srType === "Duplicate I-Card" ? 
                                    <Redirect  to={{pathname: '/timeline/duplicateICard'}} /> 
                                    : null 
                                }
                                {this.state.srType === "Duplicate Study Kit" ? 
                                    <Redirect  to={{pathname: '/timeline/duplicateStudyKit'}} /> 
                                    : null 
                                }
                                {this.state.srType === "Issuance of Bonafide" ? 
                                    <Redirect  to={{pathname: this.getProductType() === PRODUCT_WX ? '/timeline/issuanceOfEBonafide' : '/timeline/issuanceOfBonafide',state:{productType: this.getProductType()}}} /> 
                                    : null 
                                }
                                {this.state.srType === "Issuance of Final Certificate" ? 
                                   <Redirect to={{pathname: '/timeline/issuanceOfFinalCertificate',state:{productType: this.getProductType()}}} />   
                                    : null 
                                }
                                {this.state.srType === "Issuance of Gradesheet" ? 
                                     <Redirect  to={{pathname: '/timeline/issuanceOfMarksheet'}} /> 
                                    : null 
                                }
                                {this.state.srType === "Issuance of Marksheet" ? 
                                     <Redirect  to={{pathname: '/timeline/issuanceOfMarksheetNonGrading'}} /> 
                                    : null 
                                }
                                {this.state.srType === "Re-Dispatch Of Study Kit" ? 
                                    <Redirect  to={{pathname: '/timeline/reDispatchOfStudyKit'}} /> 
                                    : null 
                                }
                                {this.state.srType === "Single Book" ? 
                                    <Redirect  to={{pathname: '/timeline/singleBook',state:{productType: this.getProductType()}}} /> 
                                    : null 
                                }
                                {this.state.srType === "Issuance of Transcript" ? 
                                    <Redirect  to={{pathname: '/timeline/issuanceOfTranscript',state:{productType: this.getProductType()}}} /> 
                                    : null 
                                }
                                {this.state.srType === "Program De-Registration" ? 
                                    <Redirect  to={{pathname: '/timeline/programDereg'}} /> 
                                    : null 
                                }
                                {this.state.srType === "Subject Repeat M.Sc. AI and ML Ops" ? 
                                    <Redirect  to={{pathname: '/timeline/subjectRepeatSR'}} /> 
                                    : null 
                                }
                                {this.state.srType === "Subject Repeat MBA - WX" ? 
                                    <Redirect  to={{pathname: '/timeline/subjectRepeatSR'}} /> 
                                    : null 
                                }
                                {this.state.srType === "Program Withdrawal" ? 
                                    <Redirect  to={{pathname: '/timeline/programWithdrawal',state:{productType: this.getProductType()}}} /> 
                                    : null 
                                }
                                {this.state.srType === "Exit Program" ? 
                                    <Redirect  to={{pathname: '/timeline/exitProgram',state:{productType: this.getProductType()}}} /> 
                                    : null 
                                }
                                {this.state.srType === "Change in Specialisation" ?
                                    
                                    //this.isAlreadyRaiseSRforElectives()

                                    this.checkTypeOfElectiveSRAndRedirect()
                                    : null

                                    // <Redirect to={{pathname: '/timeline/courseSpecialisationMain' ,
                                    //     state: { serviceRequest: true }              }} />
                                }
                        </Col>
                    </Row>  
                </Container>    
                ): ''} 
                                                {/* <c:if test="${rowCount > 0}">
                                <h2 class="red text-capitalize">My Service Requests (${rowCount} Records Found)</h2>
                                <div class="clearfix"></div>
                                  <div class="panel-content-wrapper">
                                    <div class="table-responsive">
                                    <table class="table table-striped table-hover" style="font-size:12px">
                                                        <thead>
                                                            <tr> 
                                                                <th>Sr. No.</th>
                                                                <th>Service Request ID</th>
                                                                <th>Service Request Type</th>
                                                                <th>Service Request Status</th>
                                                                <th>Payment Status</th>
                                                                <th>Amount</th>
                                                                <th>Description</th>
                                                                <th>Documents</th>
                                                                <!-- <th>Process Service Request</th>-->
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                    
                                                         <c:forEach var="sr" items="${srList}" varStatus="status">
                                                            <!-- <c:url value="proceedToPayForSR" var="processSR">
                                                              <c:param name="srId" value="${sr.id}" />
                                                            </c:url> -->
                                                            <tr>
                                                                <td><c:out value="${status.count}"/></td>
                                                                <td><c:out value="${sr.id}"/></td>
                                                                <td><c:out value="${sr.serviceRequestType}"/></td>
                                                                <td><c:out value="${sr.requestStatus}"/></td>
                                                                <td><c:out value="${sr.tranStatus}"/></td>
                                                                <td><c:out value="${sr.respAmount}"/></td>
                                                                <td><c:out value="${sr.description}"/></td>
                                                                <td>
                                                                    <c:if test="${sr.hasDocuments == 'Y' }">
                                                                        <a href="/studentportal/viewSRDocumentsForStudents?serviceRequestId=${sr.id}" target="_blank">View</a>
                                                                    </c:if>
                                                                </td>
                                                                <!-- <td>
                                                                    <c:if test="${sr.requestStatus =='Re-Opened'}">
                                                                    <a href="${processSR}" title="Proceed To Pay For SR"><i class="fa fa-cog fa-lg fa-spin"></i></a>
                                                                    </c:if>
                                                                </td>-->
                                                            </tr>   
                                                        </c:forEach>
                                                            
                                                        </tbody>
                                                    </table>
                                    </div>
                                <br>
                            </div>
                            </c:if> */}
                                      
                            {/* //   </div> */}          
            </>
        );
    }
}
export function backToSR() {
    console.log("back--");
    this.setState({
        back : true,
    })
    
}
const mapStateToProps = state => {
	return {
        student: state,
        imageUrl : state.imageUrl
	}
}

export default connect(mapStateToProps)(analyticsManager(SelectSR))
