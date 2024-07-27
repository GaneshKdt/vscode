import React, { Component } from 'react';
import Moment from 'react-moment';
import Table from 'react-bootstrap/Table';
import { Link } from 'react-router-dom'
import { Pages } from '../../shared/config';

// const empty = (
//     <>&nbsp;</>
// )
const empty = (
    <>-</>
)

class SessionPlanModuleInfo extends Component {
    
    render() { 
        const {
            module
        } = this.props
        return (
            <>
         <hr />

                <div className="session-plan-attributes">
                    {/* <div className="session-plan-attributes-title">
                        {
                            //Link to the session if session is loaded
                            module.session ? (
                                <Link 
                                    to={{
                                        pathname: Pages.calendar,
                                        sessionDetails: module.session
                                    }}
                                >
                                    Session
                                </Link>
                            ) : 'Session'
                        }
                    </div> */}
                    <Table borderless hover size="sm">
                        <tbody>
                            
                            <tr>
                                <td className="session-plan-attribute-name fontSizeResourceCardSub">
                                    Session Date
                                </td>
                                <td className="session-plan-attribute-value fontSizeResourceCardSub">
                                    {
                                    module.session ? (
                                        <Moment format="MMM D, H:mm" withTitle>{ module.session.date+' '+module.session.startTime }</Moment>
                                    ) : '-'
                                    }
                                </td>
                                <td className="session-plan-attribute-name fontSizeResourceCardSub">
                                    Attended
                                </td>
                                
                                <td className="session-plan-attribute-value fontSizeResourceCardSub">
                                    { 
                                        module.session && module.session.id ? 
                                            module.sessionOver ? 
                                                module.sessionAttended ? 'Yes' : 'No'
                                            : 'NA' 
                                         : empty
                                    }
                                </td>
                            </tr>
                            <tr>
                                <td className="session-plan-attribute-name fontSizeResourceCardSub">
                                IA Date
                                </td>
                                <td className="session-plan-attribute-value fontSizeResourceCardSub">
                                    { 
                                    module.testStartDate ? (
                                        <Moment format="MMM D, H:m" withTitle>{ module.testStartDate }</Moment>
                                    ) : 'NA'
                                    }
                                </td>
                                <td className="session-plan-attribute-name fontSizeResourceCardSub">
                                    Score
                                </td>
                                <td className="session-plan-attribute-value fontSizeResourceCardSub">
                                    { 
                                        module.testStartDate ? 
                                            module.testId && module.testOver && module.showResultsToStudents == 'Y' ? module.testScoreObtained : 'NA'
                                         : empty
                                    }
                                </td>
                            </tr>
                        </tbody>
                    </Table>
                </div>
                
            
                    {/* <div className="session-plan-attributes-title">
                        {
                            //Link to the startIATest if test has been scheduled(if test id has been generated)

                            module.testId ? (
                                <Link 
                                    to = {{
                                        pathname: Pages.startIATest,
                                        state: {
                                            sapId : this.props.sapid,
                                            testId : module.testId,
                                            module : module,
                                            testName: module.testName
                                        }
                                    }}
                                >
                                    Internal Assessment
                                </Link>
                            ) : 'Internal Assessment'
                        }
                    </div> */}
           
            </>
        )
    }
}

export default SessionPlanModuleInfo
