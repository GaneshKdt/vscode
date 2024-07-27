import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Pages } from "../../shared/config";
import Col from "react-bootstrap/Col"
import DueIcon from "@material-ui/icons/QueryBuilder";
import Moment from "react-moment";
import React from "react";
import Row from "react-bootstrap/Row"
import SubjectIcon from "@material-ui/icons/Subject";

function PendingProjectRegistration(props) {
    return(
        <Card className="pendingProjReg-card-block">
            <Card.Body className="pendingProjReg-card-body">
                <Row>
                    <Col sm={8}>
                        <Card.Title className="pendingProjReg-card-title">
                            <div>
                                <svg data-name="\u7EC4 1 \u62F7\u8D1D" width="28" height="28" style={{marginRight:"2%"}}>
                                    <path data-name="\u5F62\u72B6 2" d="M14 0A14 14 0 1 1 0 14 14 14 0 0 1 14 0zm6.662 21.994H7.338a1.332 1.332 0 0 1-1.332-1.332V7.338a1.332 1.332 0 0 1 1.332-1.332h13.324a1.332 1.332 0 0 1 1.332 1.332v13.324a1.332 1.332 0 0 1-1.332 1.332zM8 20.993h8.983V19.01H8v1.983zm9.962-13.009l-3.983 4.053-2.022-1.937-.95 1.2 1.836 1.9.723.795h.723L18.995 9.1zM20 16H8v1.983h12V16z" fill="#3366cc" fill-rule="evenodd"></path>
                                </svg>
                                <b>{props.type} - {props.acadMonth} {props.acadYear}</b>
                            </div>
                        </Card.Title>
                        <Card.Text>
                            <Row>
                                <span className="pendingProjReg-card-body-text">
                                    <DueIcon className="iconForDueTest"/>&nbsp;
                                    Register Within:&nbsp;<Moment format="MMM D, hh:mm a \(\I\S\T\)" withTitle>{props.startDateTime}</Moment>
                                    &nbsp;to&nbsp;<Moment format="MMM D, hh:mm a \(\I\S\T\)" withTitle>{props.endDateTime}</Moment>
                                </span>
                            </Row>
                            <Row>
                                <span className="pendingProjReg-card-body-text">
                                    <SubjectIcon className="iconForDueTest"/>&nbsp;
                                    {props.subject}
                                </span>
                            </Row>
                        </Card.Text>
                    </Col>
                    <Col sm={4} className="text-right">
                        {props.paid ?
                            <Button variant="success" className="pendingProjReg-card-button"
                                size="sm" disabled>Paid</Button>
                            :
                            <Link to={{
                                pathname: (Pages.projectRegistration),
                                state: {type: props.type}
                            }}>
                                <Button variant="primary" className="pendingProjReg-card-button"
                                    size="sm">Proceed</Button>
                            </Link>}
                    </Col>
                </Row>
            </Card.Body>
        </Card>
    );
}

export default PendingProjectRegistration;