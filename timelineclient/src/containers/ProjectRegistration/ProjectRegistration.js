import { analyticsManager } from "../../shared/Analytics";
import { Button, Card, Col, Container, Modal, Row } from "react-bootstrap";
import { connect } from "react-redux";
import { FormattedDate } from "../../shared/MomentHelper/TimestampDate";
import { Link, useLocation } from "react-router-dom";
import "./ProjectRegistration.css";
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';
import axios from "axios";
import ConfigUrls from "../../shared/config";
import DateRangeIcon from '@material-ui/icons/DateRange';
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';
import PageContent from "../../components/PageContent/PageContent";
import PaymentMethodSelection from "../ExamBooking/Common/PaymentFlow/PaymentMethodSelection/PaymentMethodSelection";
import React, { useEffect } from "react";
import SchoolIcon from '@material-ui/icons/School';
import SubmitPayment from "../NoSlotBooking/PaymentFlow/SubmitPayment";

const urls = new ConfigUrls().urls;
const TYPE_PROJECT_REGISTRATION = "Project Registration";
const TYPE_PROJECT_RE_REGISTRATION = "Project Re-Registration";
const TYPE_NA = "Not Available";

function ProjectRegistration(props) {
    const location = useLocation();
    const type = location.state ? location.state.type : TYPE_NA;
    const [manualType, setManualType] = React.useState(TYPE_PROJECT_REGISTRATION);
    const [projectDetails, setProjectDetails] = React.useState({});
    const [loaded, setLoaded] = React.useState(false);
    const [errorObj, setErrorObj] = React.useState({
        "error": false,
        "errorMessage": ""
    });

    const [showPaymentOptions, setShowPaymentOptions] = React.useState(false);
    const [paymentOption, setPaymentOption] = React.useState("");

    useEffect(() => {
        if(type === TYPE_PROJECT_REGISTRATION)
            getProjectRegistrationDetails();
        else if(type === TYPE_PROJECT_RE_REGISTRATION)
            getProjectReRegistrationDetails();
        else if(type === TYPE_NA && manualType === TYPE_PROJECT_REGISTRATION)
            getProjectRegistrationDetails();
    }, []);

    useEffect(() => {
        if(manualType === TYPE_PROJECT_RE_REGISTRATION && projectDetails["live"])
            setLoaded(true);
        else if(manualType === TYPE_PROJECT_RE_REGISTRATION && !projectDetails["live"])
            getProjectReRegistrationDetails();
        else if(manualType === TYPE_NA)
            setLoaded(true);
    }, [manualType]);                   //manualType is changed when type is Not Available, and both Project reg and re-reg APIs are called

    const displayPaymentOptions = () => setShowPaymentOptions(true);
    const handleModalClose = () => setShowPaymentOptions(false);
    const paymentProvider = (selectedPaymentProvider) => setPaymentOption(selectedPaymentProvider.name);

    const getProjectRegistrationDetails = () => {
		axios.defaults.baseURL = urls.apiUrl_exam;
		axios.defaults.headers.post["Content-Type"] = "application/json;charset=UTF-8";
		axios.defaults.headers.post["Accept"] = "application/json";
        axios.get("student/projectRegistrationDetails", {
			params: {
				timeboundId: props.currentTimeboundId,
				sapid: props.sapid
			}
		})
		.then(response => {
			const responseData = response.data;
			if(responseData.success === true) {
				console.log("Project Registration details success response: ", responseData.message);
                setProjectDetails({...responseData.data});
			}
			else {
				console.error("Project Registration details error response: ", responseData.message);
                {type === TYPE_PROJECT_REGISTRATION &&
                    setErrorObj({
                        "error": true,
                        "errorMessage": responseData.message
                    })}
			}
        })
		.catch((error) => {
            console.error("Project Registration details error: ", error);
            {type === TYPE_PROJECT_REGISTRATION &&
                setErrorObj({
                    "error": true,
                    "errorMessage": "Error while fetching Project Registration details. Please try again after some time!"
                })}
        })
        .finally(() => {
            type === TYPE_PROJECT_REGISTRATION 
                ? setLoaded(true)
                : setManualType(TYPE_PROJECT_RE_REGISTRATION)
        });
    }

    const getProjectReRegistrationDetails = () => {
		axios.defaults.baseURL = urls.apiUrl_exam;
		axios.defaults.headers.post["Content-Type"] = "application/json;charset=UTF-8";
		axios.defaults.headers.post["Accept"] = "application/json";
        axios.get("student/projectReRegistrationDetails", {
			params: {
				timeboundId: props.currentTimeboundId,
				sapid: props.sapid
			}
		})
		.then(response => {
			const responseData = response.data;
			if(responseData.success === true) {
				console.log("Project Re-Registration details success response: ", responseData.message);
                setProjectDetails({...responseData.data});
			}
			else {
				console.error("Project Re-Registration details error response: ", responseData.message);
                const responseMessage = type === TYPE_PROJECT_RE_REGISTRATION 
                                            ? responseData.message 
                                            : "Error while fetching Project Registration details. Please try again after some time!"
                setErrorObj({
                    "error": true,
                    "errorMessage": responseMessage
                });
                
			}
        })
		.catch((error) => {
            console.error("Error while fetching Project Re-Registration details: ", error);
            const responseMessage = type === TYPE_PROJECT_RE_REGISTRATION 
                                        ? "Error while fetching Project Re-Registration details. Please try again after some time!"
                                        : "Error while fetching Project Registration details. Please try again after some time!"
            setErrorObj({
                "error": true,
                "errorMessage": responseMessage
            });
        })
        .finally(() => {
            type === TYPE_PROJECT_RE_REGISTRATION 
                ? setLoaded(true)
                : setManualType(TYPE_NA)
        });
    }

    return(
        <div>
            {paymentOption ?
                <SubmitPayment
                    paymentProvider = {paymentOption}
                    bookingType = {projectDetails.type}
                    bookingAmount = {projectDetails.charges}
                />
            :   <PageContent
                    id = "project-registration"
                    title = {projectDetails.type ? projectDetails.type : TYPE_PROJECT_REGISTRATION}
                    loaded = {loaded}
                    error = {errorObj["error"]}
                    loadingMessage = "Loading..."
                    errorMessage = {errorObj["errorMessage"]}
                >
                    {projectDetails["live"] ?
                        <Card className="card-tile">
                            <Card.Header className="card-header-tile">Please proceed with payment for {projectDetails.type}</Card.Header>
                            <Card.Body className="card-body-tile">
                                <Card.Title className="card-title-tile">{projectDetails.subject} - {projectDetails.type}</Card.Title>
                                    <Card.Text className="card-text-tile">
                                        <Col>
                                            <Row className="detail-row">
                                                <Col sm={6}>
                                                    <DateRangeIcon className="card-icon"/>&nbsp;
                                                    <span className="text-heading">Start Time:</span>&nbsp;<FormattedDate date = {projectDetails.startDateTime}/>
                                                </Col>
                                                <Col sm={6}>
                                                    <DateRangeIcon className="card-icon"/>&nbsp;
                                                    <span className="text-heading">End Time:</span>&nbsp;<FormattedDate date = {projectDetails.endDateTime}/>
                                                </Col>
                                            </Row>
                                            <Row className="detail-row">
                                                <Col sm={6}>
                                                    <LibraryBooksIcon className="card-icon"/>&nbsp;
                                                    <span className="text-heading">Subject:</span>&nbsp;{projectDetails.subject}
                                                </Col>
                                                <Col sm={6}>
                                                    <SchoolIcon className="card-icon"/>&nbsp;
                                                    <span className="text-heading">Academic Month Year:</span>&nbsp;{projectDetails.acadMonth}&nbsp;{projectDetails.acadYear}
                                                </Col>
                                            </Row>
                                            <Row className="detail-row">
                                                <Col sm="auto">
                                                    <AccountBalanceWalletIcon className="card-icon"/>&nbsp;
                                                    <span className="text-heading">Charges:</span>&nbsp;{projectDetails.charges}&nbsp;INR
                                                </Col>
                                            </Row>
                                        </Col>
                                    </Card.Text>
                                    <Col>
                                        {projectDetails.booked ?
                                            <Button variant="success" size="sm" className="card-button-tile" disabled>Paid</Button>
                                        :
                                            <Button variant="primary" onClick={displayPaymentOptions} className="card-button-tile">
                                                Select Payment Option</Button>}
                                    </Col>
                            </Card.Body>
                        </Card>
                        :
                        <Card className="card-tile">
                            <Card.Header className="card-header-tile">{TYPE_PROJECT_REGISTRATION}</Card.Header>
                            <Card.Body className="card-body-tile">
                                <Card.Title className="card-title-tile">Not eligible for {TYPE_PROJECT_REGISTRATION}</Card.Title>
                                <Card.Text className="card-text-tile">
                                    Please contact support for any further queries.
                                </Card.Text>
                                <Link to="contactUs">
                                    <Button variant="primary" className="card-button-tile">Contact Us</Button>
                                </Link>
                            </Card.Body>
                        </Card>
                    }
                    <Modal
                        show={showPaymentOptions}
                        onHide={handleModalClose}
                        size="xl"
                        centered
                        backdrop="static"
                        aria-labelledby="contained-modal-title-vcenter"
                    >
                        <Modal.Header closeButton>
                            <Modal.Title id="contained-modal-title-vcenter">
                                Select Payment Provider
                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Container>
                                <PaymentMethodSelection
                                    setPaymentProvider={paymentProvider}
                                    bookingType={projectDetails.type}
                                />
                            </Container>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button className="m-auto" onClick={handleModalClose}>Close</Button>
                        </Modal.Footer>
                    </Modal>
                </PageContent>
            }
        </div>
    );
}

const mapStateToProps = state => {
    return {
        sapid: state.sapid,
        currentTimeboundId: state.currentTimeboundId
    }
}

export default connect(mapStateToProps)(analyticsManager(ProjectRegistration));