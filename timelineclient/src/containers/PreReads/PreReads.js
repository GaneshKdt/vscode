import React, { Component } from 'react'
import Table from 'react-bootstrap/Table'
import Card from 'react-bootstrap/Card'
import {Link} from 'react-router-dom'
import axios from 'axios'
import { connect } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import ConfigUrls from '../../shared/config'
import {analyticsManager} from '../../shared/Analytics'
import LoadingSpinner from '../../shared/LoadingSpinner/LoadingSpinner'
import ManagementCommunication from './brochureImages/01 Management Communication.png'
import FinancialAccounting from './brochureImages/02 Financial Accounting.png'
import QuantitativeMethods from './brochureImages/03 Quantitative Methods.png'
import MathsforManagement from './brochureImages/04 Maths for Management.png'
import Finance from './brochureImages/05 Finance.png'
import SpreadsheetModeling from './brochureImages/06 Spreadsheet Modeling.png'
const urls = new ConfigUrls().urls
const api = new ConfigUrls().api
export class PreReads extends Component {

    constructor(props) {
        super(props)
        this.state = {
            data: [],
            lResource: [],
            loading: true,
            harvardModuleData: [],
        }
    }

    viewELearnResources = () =>{
        axios.defaults.headers.post['Content-Type'] = 'application/json';
        axios.post(
            urls.apiUrl_acads + "/viewELearnResources",
            JSON.stringify({ 
                sapid : this.props.sapId,
                consumerProgramStructureId : this.props.consumerProgramStructureId
            })
        ).then(response => { 
            this.setState({
              data: response.data,
              loading: false,
            });
            console.log('In ELearing....')
            console.log(response);
        })
    }

    getHarvardModulesDate = () => {
        axios.defaults.headers.post['Content-Type'] = 'application/json';
        axios.post(
            api.getHarvardModulesDate,
            JSON.stringify({ 
                sapid : this.props.sapId
            })
        ).then(response => { 
            
            this.setState({
                harvardModuleData: response.data.harvardResources,
              loading: false,
            });
            console.log('In ELearing....')
            console.log(response);
        });
    }
 

    componentDidMount(){
        this.setState({
            loading: true,
        })
        
        this.viewELearnResources()
        this.getHarvardModulesDate()
       
    }
    
    render() {
        return (
            <div className="container">
                
                { 
                    this.state.loading ? (
                        <Card className="mx-auto text-center p-2">
                            <LoadingSpinner noSpace loadingText={'Fetching available resources..'}/>
                        </Card>
                    ) : (
                        <Card>
                            <Card.Body>                           
                                <h6>Pre-Learning Resources</h6>
                            <br />
                            <p>Welcome to the Pre-reads section. The Harvard modules listed below will offer you a comprehensive introduction to each subject area. 
                                    Most courses include a pre-assessment to establish your familiarity with the material. 
                                    All the modules also include final assessments for testing student mastery of the subject matter. </p>

                                <Table striped hover>
                                    <thead>
                                        <tr>
                                        <th>Sr. No</th>
                                        <th>Resource Name</th>
                                        <th>Resource Description</th>
                                        <th>Resource Provider</th>
                                        <th>End Date</th>
                                        <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        
                                        {
                                            this.state.data.length < 1 ? (
                                                <tr>
                                                    <td colSpan="5" className="text-center">
                                                    <FontAwesomeIcon icon="exclamation-circle"/> No Pre-Learning Resources available for you at this time </td>
                                               </tr>
                                            ): this.state.data.map((resource, index)=>{
                                                return(
                                                <tr>
                                                    <td>{index + 1}</td>
                                                    <td>{resource.context_title}</td>
                                                    <td>{resource.resource_link_description}</td>
                                                    <td>{resource.provider_name}</td>
                                                    <td>{resource.endDate}</td>
                                                    <td> 
                                                    <Link target="_blank" to={{
                                                        pathname: urls.apiUrl_ltiDemo + 'm/viewLTIResource?rid=' + resource.resource_id + '&sapid='+this.props.sapId  }}> View
                                                    </Link>
                                                    </td>
                                                </tr>
                                                )
                                            })
                                        }
                                    </tbody>
                                </Table>
                                <hr />
                                <h6>Important Note :</h6>

                                <p>We recommend you to follow the order mentioned below to allow build a solid foundation for business education. However, you can follow a pace that suits you best. 
                                    You can receive a personalized Certificate of Completion upon passing the final exam from the Harvard Business Publishing Education.</p>
                                <Table striped hover>
                                    <thead>
                                        <tr>
                                            <th>Harvard Modules</th>
                                            <th>Terms</th>
                                            <th>Before Dates</th>
                                            <th>Content Overview</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            this.state.harvardModuleData == null || this.state.harvardModuleData.length < 1  ? (
                                                <tr>
                                                    <td colSpan="5" className="text-center">
                                                    <FontAwesomeIcon icon="exclamation-circle"/> No Harvard Modules available  </td>
                                               </tr>
                                            ): this.state.harvardModuleData.map((harvardModule, index)=>{
                                                return(
                                                <tr>
                                                    {console.debug(harvardModule)}
                                                    <td>{harvardModule.module}</td>
                                                    <td>{harvardModule.terms}</td>
                                                    <td>{harvardModule.beforeDate}</td>
                                                    <td>
                                                    <a href={harvardModule.contentPath} target="blank">View Content</a>
                                                    </td>
                                                </tr>
                                                )
                                            })
                                        }
                                        {/* <tr>
                                            <td>Management Communication</td>
                                            <td>Foundation of Term I</td>

                                                {this.props.enrollmentMonth == 'Jul' &&
                                                    <td>29-07-2019</td>}
                                                {this.props.enrollmentMonth == 'Oct' &&
                                                    <td>04-11-2019</td>}
                                                {this.props.enrollmentMonth == 'Jan' &&
                                                    <td>03-02-2020</td>}
                                            

                                            <td>
                                                <a href={ManagementCommunication} target="blank">View Content</a>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Financial Accounting</td>
                                            <td>Foundation of Term I</td>

                                                {this.props.enrollmentMonth == 'Jul' &&
                                                    <td>29-07-2019</td>}
                                                {this.props.enrollmentMonth == 'Oct' &&
                                                    <td>04-11-2019</td>}
                                                {this.props.enrollmentMonth == 'Jan' &&
                                                    <td>03-02-2020</td>}

                                            <td>

                                                <a href={FinancialAccounting} target="blank">View Content</a>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Quantitative Methods</td>
                                            <td>Foundation of Term II</td>

                                                {this.props.enrollmentMonth == 'Jul' &&
                                                    <td>21-10-2019</td>}
                                                {this.props.enrollmentMonth == 'Oct' &&
                                                    <td>03-02-2020</td>}
                                                {this.props.enrollmentMonth == 'Jan' &&
                                                    <td>04-05-2020</td>}

                                            <td>
                                                <a href={QuantitativeMethods} target="blank">View Content</a>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Maths for Management</td>
                                            <td>Foundation of Term II</td>

                                                {this.props.enrollmentMonth == 'Jul' &&
                                                    <td>21-10-2019</td>}
                                                {this.props.enrollmentMonth == 'Oct' &&
                                                    <td>03-02-2020</td>}
                                                {this.props.enrollmentMonth == 'Jan' &&
                                                    <td>04-05-2020</td>}

                                            <td>
                                                <a href={MathsforManagement} target="blank">View Content</a>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Finance</td>
                                            <td>Foundation of Term III</td>

                                                {this.props.enrollmentMonth == 'Jul' &&
                                                    <td>13-01-2020</td>}
                                                {this.props.enrollmentMonth == 'Oct' &&
                                                    <td>04-05-2020</td>}
                                                {this.props.enrollmentMonth == 'Jan' &&
                                                    <td>03-08-2020</td>}

                                            <td>
                                                <a href={Finance} target="blank">View Content</a>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Spreadsheet Modelling</td>
                                            <td>Foundation of Term IV</td>

                                                {this.props.enrollmentMonth == 'Jul' &&
                                                    <td>06-04-2020</td>}
                                                {this.props.enrollmentMonth == 'Oct' &&
                                                    <td>03-08-2020</td>}
                                                {this.props.enrollmentMonth == 'Jan' &&
                                                    <td>02-11-2020</td>}

                                            <td>
                                                <a href={SpreadsheetModeling} target="blank">View Content</a>
                                            </td>
                                        </tr> */}
                                    </tbody>
                                </Table>
                            </Card.Body>
                        </Card>
                    )
                }
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        sapId: state.sapid,
        consumerProgramStructureId: state.consumerProgramStructureId,
        enrollmentMonth: state.enrollmentMonth
    }
}

export default connect(mapStateToProps)(analyticsManager(PreReads))
