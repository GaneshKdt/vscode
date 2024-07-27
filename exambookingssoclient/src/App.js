import { ThemeProvider } from '@material-ui/core/styles';
import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import ContactUs from './containers/ContactUs/ContactUs';
import CourseExamHome from './containers/CourseExam/CourseExamHome';
import ExamBookingHome from './containers/ExamBooking/ExamBookingHome/ExamBookingHome';
import NewExamBooking from './containers/ExamBooking/NewBooking/NewExamBooking';
import BookingError from './containers/ExamBooking/PaymentStatus/BookingError';
import BookingSuccess from './containers/ExamBooking/PaymentStatus/BookingSuccess';
import ReScheduleExamBooking from './containers/ExamBooking/ReSchedule/ReScheduleExamBooking';
import HallTicket from './containers/HallTicketDownload/HallTicket';
import ServiceRequest from './containers/ServiceRequest/ServiceRequest';
import ProgramDereg from './containers/ProgramDereg/ProgramDereg';
import GradesheetSR from './containers/GradesheetSR/GradesheetSR';
import MarksheetSummary from './containers/GradesheetSR/MarksheetSummary';
import MarksheetRequestConfirmation from './containers/GradesheetSR/MarksheetRequestConfirmation';
import IssuanceOfFinalCertificate from './containers/IssuanceOfFinalCertificate/IssuanceOfFinalCertificate'
import SRCreated from './containers/SRCreated/SRCreated';
import SRStatusSuccess from './containers/SRStatus/SRStatusSuccess';
import SRStatusFailure from './containers/SRStatus/SRStatusFailure';

import eLearn from './containers/eLearn/eLearn';
import Login from './containers/Login';
import Logout from './containers/Logout';
import ProtectedRoute from './ProtectedRoute';
import { AppConfig, Pages } from './shared/config';
import theme from './Theme';
import UpcomingExams from './containers/UpcomingExams/UpcomingExams';
import StartAssessment from './containers/StartAssessment/StartAssessment';
import IAResultDetails from './containers/IAResultDetails/IAResultDetails';
import {  AttachmentViewer } from './containers/IAResultDetails/AttachmentViewer/AttachmentViewer';
import IssuanceOfTranscript from './containers/IssuanceOfTranscript/IssuanceOfTranscript';
import IssuanceOfBonafide from './containers/IssuanceOfBonafide/IssuanceOfBonafide';

let base = AppConfig.APP_BASE

class App extends Component {

	render() {
		return (
			<ThemeProvider theme = {theme}>
				<BrowserRouter>
					<Switch> 
						<Route path={`${base}login`} component={Login}/>
						<ProtectedRoute path={Pages.logout} component={Logout}/>
						{/* <ProtectedRoute path={Pages.home} component={ExamBookingHome}/> */}

						<ProtectedRoute path={Pages.examBookingHome} component={ExamBookingHome}/>
						<ProtectedRoute path={Pages.newExamBooking} component={NewExamBooking}/>
						<ProtectedRoute path={Pages.slotChange} component={ReScheduleExamBooking}/>
						<ProtectedRoute path={Pages.examBookingError} component={BookingError} />
						<ProtectedRoute path={Pages.examBookingSuccess} component={BookingSuccess} />

						<ProtectedRoute path={Pages.hallticket} component={HallTicket} />

						<ProtectedRoute path={Pages.contactUs} component={ContactUs} />
						<ProtectedRoute path={Pages.courseExamHome} component={CourseExamHome} />
						<ProtectedRoute path={Pages.eLearn} component={eLearn}/>
						<ProtectedRoute path={Pages.programDereg} component={ProgramDereg} />
						<ProtectedRoute path={Pages.gradesheet} component={GradesheetSR} />
						<ProtectedRoute path={Pages.srCreated} component={SRCreated}/>
						<ProtectedRoute path={Pages.serviceRequest} component={ServiceRequest} />
						<ProtectedRoute path={Pages.assessmentsList} component={UpcomingExams}/>
						<ProtectedRoute path={Pages.upcomingExams} component={UpcomingExams}/>
						<ProtectedRoute path={Pages.startAssessment} component={StartAssessment}/>
						
						<ProtectedRoute path={Pages.viewTestResults} component={IAResultDetails}/>
						<ProtectedRoute path= {Pages.attachmentViewer} component={AttachmentViewer}/>
						
						<ProtectedRoute path={Pages.marksheetSummary} component={MarksheetSummary} />
						<ProtectedRoute path={Pages.marksheetRequestConfirmation} component={MarksheetRequestConfirmation} />	
						<ProtectedRoute path={Pages.issuanceFinalCert} component={IssuanceOfFinalCertificate}/>
						<ProtectedRoute path={Pages.issuanceTranscript} component={IssuanceOfTranscript}/>
						<ProtectedRoute path={Pages.sRPaymentSuccess} component={SRStatusSuccess}/>
						<ProtectedRoute path={Pages.sRStatusFailure} component={SRStatusFailure}/>
						<ProtectedRoute path={Pages.issuanceOfBonafide} component={IssuanceOfBonafide}/>
					</Switch>
				</BrowserRouter>
			</ThemeProvider>
		);
	}
}

export default App;
