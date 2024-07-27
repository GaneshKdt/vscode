import { API } from "../../../shared/config";
import { connect } from "react-redux";
import { Container } from "react-bootstrap";
import AxiosHandler from "../../../shared/AxiosHandler/AxiosHandler";
import ErrorAndLoadingWrapper from "../../../shared/Helpers/ErrorAndLoadingWrapper/ErrorAndLoadingWrapper";
import LoadingSpinner from "../../../shared/LoadingSpinner/LoadingSpinner";
import PropTypes from "prop-types";
import React, { useEffect } from "react";

const SOURCE_WEBAPP = "WebApp";
const IS_WEB = true;

function SubmitPayment(props) {
    const [trackId, setTrackId] = React.useState("");
    const [loaded, setLoaded] = React.useState(false);

    useEffect(() => saveNoSlotBookingRequest(), []);
    useEffect(() => {
        {trackId &&
            setLoaded(true)}
    }, [trackId])

    useEffect(() => {
        {loaded &&
            submitPaymentForm()}
    }, [loaded])

    const saveNoSlotBookingRequest = () => {
        AxiosHandler.AxiosPostHandler({
            url: API.saveNoSlotBookingRequest,
            data: {
                sapid: props.sapid,
                timeboundId: props.currentTimeboundId,
                type: props.bookingType,
                amount: props.bookingAmount,
                paymentOption: props.paymentProvider,
                source: SOURCE_WEBAPP
            },
            successCallBack: (response) => {
                const responseData = response.data;
                if(responseData.success === true) {
                    console.log("saveNoSlotBookingRequest success response: ", responseData.message);
                    setTrackId(responseData.data.trackId);
                }
                else {
                    console.error("saveNoSlotBookingRequest error response: ", responseData.message);
                    setLoaded(false);
                }
            },
            failureCallBack: (error) => {
                console.error("Error while calling saveNoSlotBookingRequest: ", error);
                setLoaded(false);
            }
        })
    }

    const submitPaymentForm = () => window.$("#submit-payment").submit();

    return (
        <ErrorAndLoadingWrapper
            loaded = {loaded}
            loadingMessage = "Initiating payment request..."
        >
            <Container>
                <div className="w-100 text-center">
                    <LoadingSpinner loadingText = { `Please wait...` } noSpace />
                </div>
                
                <div className="d-none">
                    <form id="submit-payment" action={API.initiateNoSlotBooking}>
                        <input
                            type  = "hidden"
                            name  = "sapid"
                            value = {props.sapid}
                        />
                        <input
                            type  = "hidden"
                            name  = "timeboundId"
                            value = {props.currentTimeboundId}
                        />
                        <input
                            type  = "hidden"
                            name  = "bookingType"
                            value = {props.bookingType}
                        />
                        <input
                            type  = "hidden"
                            name  = "trackId"
                            value = {trackId}
                        />
                        <input
                            type  = "hidden"
                            name  = "isWeb"
                            value = {IS_WEB}
                        />
                    </form>
                </div>
            </Container>
        </ErrorAndLoadingWrapper>
    );
}

SubmitPayment.propTypes = {
    paymentProvider: PropTypes.string.isRequired,
    bookingType: PropTypes.string.isRequired,
    bookingAmount: PropTypes.string.isRequired
}

const mapStateToProps = state => {
	return {
		sapid: state.sapid,
        currentTimeboundId: state.currentTimeboundId
	}
}

export default connect(mapStateToProps)(SubmitPayment)