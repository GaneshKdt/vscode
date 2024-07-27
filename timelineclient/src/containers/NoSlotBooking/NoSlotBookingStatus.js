import { Alert, Button, ButtonToolbar, Card, Container, Row } from "react-bootstrap";
import { analyticsManager } from "../../shared/Analytics";
import { connect } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import "./NoSlotBookingStatus.css";
import axios from "axios";
import ConfigUrls, { Pages } from "../../shared/config";
import PageContent from "../../components/PageContent/PageContent";
import React, { useEffect } from "react";

const urls = new ConfigUrls().urls;
const TYPE_PROJECT_REGISTRATION = "Project Registration";
const TYPE_PROJECT_RE_REGISTRATION = "Project Re-Registration";
const PAYMENT_STATUS_SUCCESSFUL = "Payment Successful";

function NoSlotBookingStatus(props) {
    const search = useLocation().search;
    const searchParams = new URLSearchParams(search);
    const [errorObj, setErrorObj] = React.useState({
        "error": false,
        "errorMessage": ""
    });
    const [loaded, setLoaded] = React.useState(false);
    const [noSlotBookings, setNoSlotBookings] = React.useState([]);
    const [show, setShow] = React.useState(true);

    useEffect(() => fetchNoSlotBookingStatus(), []);

    const closeAlert = () => setShow(false);

    const fetchNoSlotBookingStatus = () => {
        const trackId = searchParams.get("trackId") ? searchParams.get("trackId") : "None";

		axios.defaults.baseURL = urls.apiUrl_exam;
		axios.defaults.headers.post["Content-Type"] = "application/json;charset=UTF-8";
		axios.defaults.headers.post["Accept"] = "application/json";
        axios.get("student/fetchNoSlotBookingStatus", {
			params: {
                sapid: props.sapid,
				timeboundId: props.currentTimeboundId,
				trackId: trackId
			}
		})
		.then(response => {
			const responseData = response.data;
			if(responseData.success === true) {
				console.log("NoSlot Booking Status success response: ", responseData.message);
                setNoSlotBookings(responseData.data);
			}
			else {
				console.error("NoSlot Booking Status error response: ", responseData.message);
                setErrorObj({
                    "error": true,
                    "errorMessage": responseData.message
                });
			}
        })
		.catch((error) => {
            console.error("NoSlot Booking Status error: ", error);
            setErrorObj({
                "error": true,
                "errorMessage": "Error while fetching Booking status! Please contact support for any queries."
            });
        })
        .finally(setLoaded(true));
    }

    return (
        <PageContent
            id = "noslot-booking-status"
            title = "Booking Status"
            loaded = {loaded}
            error = {errorObj["error"]}
            loadingMessage = "Loading..."
            errorMessage = {errorObj["errorMessage"]}
        >
            {noSlotBookings.map(noSlotBooking => {
                return(
                    <Container>
                        {noSlotBooking["paymentStatus"] === PAYMENT_STATUS_SUCCESSFUL ? 
                            <Alert variant="success" show={show} onClose={closeAlert} dismissible>
                                <p className="alert-text">{noSlotBooking["type"]} Booking Successful</p>
                            </Alert>
                        :   <Alert variant="danger" show={show} onClose={closeAlert} dismissible>
                                <p className="alert-text">{noSlotBooking["type"]} Booking Failed</p>
                            </Alert>}

                        <Card>
                            <Card.Body  className="status-body">
                                <Card.Title className="status-title">
                                    {noSlotBooking["type"]} for student {noSlotBooking["sapid"]}
                                </Card.Title>
                                <Card.Text className="status-text">
                                    <Row sm={12} className="text-row">
                                        <span className="text-heading">Payment Status:</span>&nbsp;
                                            {noSlotBooking["paymentStatus"]}
                                    </Row>
                                    <Row sm={12} className="text-row">
                                        <span className="text-heading">Booking Type:</span>&nbsp;
                                            {noSlotBooking["type"]}
                                    </Row>
                                    <Row sm={12} className="text-row">
                                        <span className="text-heading">Booking Status:</span>&nbsp;
                                            {noSlotBooking["bookingStatus"] === "Y" ? "Booked" : "Not Booked"}
                                    </Row>
                                </Card.Text>
                                {(noSlotBooking["type"] === TYPE_PROJECT_REGISTRATION 
                                    || noSlotBooking["type"] === TYPE_PROJECT_RE_REGISTRATION) &&
                                    <Link to={{
                                        pathname: (Pages.projectRegistration),
                                        state: {type: noSlotBooking["type"]}
                                    }}>
                                        <Button variant="outline-info" className="status-button">
                                            Back to Project Registration</Button>
                                    </Link>}
                            </Card.Body>
                        </Card>
                    </Container>
                );
            })}
            <ButtonToolbar className = "mt-2">
                <Link to="home" className="button-link">
                    <Button variant="primary" className="mx-1 mt-1 mb-1">
                        Home</Button>
                </Link>
            </ButtonToolbar>
        </PageContent>
    );
}

const mapStateToProps = state => {
    return {
        sapid: state.sapid,
        currentTimeboundId: state.currentTimeboundId
    }
}

export default connect(mapStateToProps)(analyticsManager(NoSlotBookingStatus));