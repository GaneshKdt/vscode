// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import React from 'react';
import { Accordion, Card } from 'react-bootstrap';

const CourseExamKey = (props) => {
    return (
        <Accordion>
            <Card>
                <Accordion.Toggle as={Card.Header} eventKey="0">
                    <h6 className="my-2 mx-3">
                        <span>
                            Key
                        </span>
                       
                        <ExpandMoreIcon/> 
                        {/* <FontAwesomeIcon 
                            className="float-right"
                            className="ml-3" 
                            icon="angle-down" 
                        /> */}
                    </h6>
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="0">
                    <Card.Body>
                        <div className="status-keys">
                            <table className="table">
                                <tbody>
                                    <tr><th className="course-text-orange">ANS</th><td>Assignment Not Submitted</td></tr>
                                    <tr><th className="course-text-red">AB</th><td>Absent</td></tr>
                                    <tr><th className="course-text-blue">NV</th><td>Null &amp; Void</td></tr>
                                    <tr><th className="course-text-green">CC</th><td>Copy Case</td></tr>
                                    <tr><th className="course-text-purple">RIA</th><td>Result Kept in Abeyance</td></tr>
                                    {/* <tr><th className="course-text-pink">NA</th><td>Not Eligible due to non submission of assignment</td></tr> */}
                                </tbody>
                            </table>
                        </div>
                    </Card.Body>
                </Accordion.Collapse>
            </Card>
        </Accordion>
    )
}

export default CourseExamKey 