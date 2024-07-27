import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
// import axios from 'axios'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Home from './containers/Home/Home'
import ToDo from './containers/ToDo/ToDo'
import SessionPlan from './containers/SessionPlan/SessionPlan'
import Notification from './containers/Notifications/Notifications'
import SelectSR from './containers/ServiceRequest/SelectSR/SelectSR'
import ChangeInDOB from './containers/ServiceRequest/ChangeInDOB/ChangeInDOB';
import ChangeInID from './containers/ServiceRequest/ChangeInID/ChangeInID';
import SRCreated from './containers/ServiceRequest/SRCreated/SRCreated';
import ChangeInName from './containers/ServiceRequest/ChangeInName/ChangeInName';
import ChangeInPhotograph from './containers/ServiceRequest/ChangeInPhotograph/ChangeInPhotograph';
import DuplicateFeeReceipt from './containers/ServiceRequest/DuplicateFeeReceipt/DuplicateFeeReceipt';
import DuplicateICard from './containers/ServiceRequest/DuplicateICard/DuplicateICard';
import SessionPlanModule from './containers/SessionPlan/SessionPlanModule/SessionPlanModule'
import WatchVideo from './containers/WatchVideo/WatchVideo';
// import Header from './components/Header'
// import LeftSideRootNavigationDrawer from './components/LeftSideRootNavigationDrawer/LeftSideRootNavigationDrawer'
import InstructorProfile from './containers/UserProfile/InstructorProfile/InstructorProfile';
import InstructorProfileNew from './containers/UserProfile/InstructorProfile/InstructorProfileNew';
import Calendar from './containers/Calendar/Calendar'
import PublicProfile from './containers/UserProfile/PublicProfile/PublicProfile';
import Login from './containers/Login'
import FileViewer from './components/DocumentViewer/FileViewer'
import StudentRouter from './StudentRouter'
import {connect} from 'react-redux';
import MyCommunications from './containers/StudentCommunication/MyCommunication';
import NotificationsAnnouncements from './containers/Notifications/NotificationsAndAnnouncements';
import PreReads from './containers/PreReads/PreReads'
import Logout from './Logout'
import ChangePassword from './containers/UserProfileForms/ChangePassword'
import { Container, Card, Row, Col } from 'react-bootstrap'
import ContactUs from './containers/StudentSupport/ContactUs/ContactUs';
import MyDocuments from './containers/StudentSupport/MyDocuments/MyDocuments';

//import CourseExamHome from './containers/CourseExam/CourseExamHome'
import ViewTest from './containers/SessionPlan/SessionPlanModule/SessionPlanModuleIA/ViewTest/ViewTest';

//import CourseExamHome from './containers/CourseExam/CourseExamHome';

//import CourseExamHome from './containers/CourseExam/CourseExamHome'
//import ViewTest from './containers/SessionPlan/SessionPlanModule/SessionPlanModuleIA/ViewTest/ViewTest';
import CourseExamHome from './containers/CourseExam/CourseExamHome';
import rank from './containers/Rank/Rank';
import eLearn from './containers/eLearn/eLearn';
import StudentProfile from './containers/UserProfile/StudentProfile/StudentProfile'
import CourseQueries from './containers/CourseQueries/CourseQueries'
import Test from './Test'
import SessionFeedbackRouter from './containers/SessionFeedback/SessionFeedbackRouter';

import IssuanceOfBonafide from './containers/ServiceRequest/IssuanceOfBonafide/IssuanceOfBonafide';
import IssuanceOfTranscript from './containers/ServiceRequest/IssuanceOfTranscript/IssuanceOfTranscript';
import './ResponsiveLeftAndTopSidebar.css';
import Group from './containers/Groups/Group';

import DuplicateStudyKit from './containers/ServiceRequest/DuplicateStudyKit/DuplicateStudyKit';
import IssuanceOfFinalCertificate from './containers/ServiceRequest/IssuanceOfFinalCertificate/IssuanceOfFinalCertificate';
import IAResultDetails from './containers/IAResultDetails/IAResultDetails';
import RedispatchStudyKit from './containers/ServiceRequest/RedispatchStudyKit/RedispatchStudyKit';
//import IssuanceOfBonafide from './containers/ServiceRequest/IssuanceOfBonafide/IssuanceOfBonafide';
// import IssuanceOfTranscript from './containers/ServiceRequest/IssuanceOfTranscript/IssuanceOfTranscript';
import SingleBook from './containers/ServiceRequest/SingleBook/SingleBook';
import IssuanceOfMarksheet from './containers/ServiceRequest/IssuanceOfMarksheet/IssuanceOfMarksheet';
import MarksheetSummary from './containers/ServiceRequest/IssuanceOfMarksheet/MarksheetSummary';
import MarksheetRequestConfirmation from './containers/ServiceRequest/IssuanceOfMarksheet/MarksheetRequestConfirmation';
import DownloadMarksheet from './containers/QuickLinks/DownloadMarksheet';
import ExamBooking from './containers/ExamBooking/ExamBooking';
import NewExamBooking from './containers/ExamBooking/NewBooking/NewExamBooking';
import ReScheduleExamBooking from './containers/ExamBooking/ReSchedule/ReScheduleExamBooking';
import BookingSuccess from './containers/ExamBooking/PaymentStatus/BookingSuccess';
import BookingError from './containers/ExamBooking/PaymentStatus/BookingError';
import HallTicket from './containers/HallTicket/HallTicket';
import ProgramDereg from './containers/ServiceRequest/ProgramDeregistration/ProgramDereg';
import CourseSpecialisation from './containers/CourseSpecialisation/Temp/CourseSpecialisation';
import CourseSpecialisationMain from './containers/CourseSpecialisation/CourseSpecialisationMain';
import {  AttachmentViewer } from './containers/IAResultDetails/AttachmentViewer/AttachmentViewer';
import SRStatusSuccess from './containers/ServiceRequest/SRStatus/SRStatusSuccess';
import SRStatusFailure from './containers/ServiceRequest/SRStatus/SRStatusFailure'

import StartAssessment from './containers/StartAssessment/StartAssessment'
import SubjectRepeat from './containers/ServiceRequest/SubjectRepeat/SubjectRepeat';
import NewSubjectRepeatSR from './containers/ServiceRequest/SubjectRepeat/NewSubjectRepeatSR/NewSubjectRepeatSR';
import Bookmarks from './containers/Bookmarks/Bookmarks';
import ScrollToTop from './shared/ScrollToTop/ScrollToTop'

import TestIAQuickJoin from './containers/TestIAQuickJoin/TestIAQuickJoin'
import ViewTestQuickJoin from './containers/TestIAQuickJoin/ViewTestQuickJoin/ViewTestQuickJoin'

import FaqPage from './containers/FaqPage';

import AllFeedbacks from './containers/SessionFeedback/AllFeedbacks'
import SessionFeedbackForm from './containers/SessionFeedback/SessionFeedbackForm'


import ElectiveSRPaymentConfirmation from './containers/CourseSpecialisation/ElectiveSRPaymentConfirmation'

import programWithdrawal from './containers/ServiceRequest/ProgramWithdrawal/programWithdrawal';
import exitProgram from './containers/ServiceRequest/ExitProgram/exitProgram';
import IssuanceOfMarksheetNonGrading from './containers/ServiceRequest/IssuanceOfMarksheetNonGrading/IssuanceOfMarksheetNonGrading';
import MarksheetSummaryNonGrading from './containers/ServiceRequest/IssuanceOfMarksheetNonGrading/MarksheetSummaryNonGrading';
import MarksheetRequestConfirmationNonGrading from './containers/ServiceRequest/IssuanceOfMarksheetNonGrading/MarksheetRequestConfirmationNonGrading';
import LOUForm from './containers/LOUForm/LOUForm';

import SpecializationSelection from './containers/Specialization/SpecializationSelection';
import SpecializationConfirmation from './containers/Specialization/SpecializationConfirmation';
import ElectiveSelection from './containers/Specialization/ElectiveSelection';
import IssuanceOfEBonafide from './containers/ServiceRequest/IssuanceOfEBonafide/IssuanceOfEBonafide';
import ProjectRegistration from './containers/ProjectRegistration/ProjectRegistration';
import NoSlotBookingStatus from './containers/NoSlotBooking/NoSlotBookingStatus';

import knowYourPolicy from './containers/knowYourPolicy';

var Router = require('react-router');
var portalUrl = require('./shared/config').portalUrl;

// var Router = require('react-router');
// var portalUrl = require('./shared/config').portalUrl



global.__basedir = __dirname;
class App extends Component {

  render() {
    return (
		<>
			<BrowserRouter>
				<ScrollToTop />
				<Switch>
					<StudentRouter path="/timeline/login" component={Login}/>
					<Route path="/timeline/logout" component={Logout}/>
					<Route path="/timeline/viewAllFeedbacks" render={(props) => <AllFeedbacks {...props} />}/>
					<Route path="/timeline/viewFeedback" render={(props) => <SessionFeedbackForm {...props} />}/>
					
					<Route path="/timeline/testIAQuickJoin" component={TestIAQuickJoin}/>
					<Route path="/timeline/startIATestQuickJoin" component={ViewTestQuickJoin}/>
					

					<StudentRouter path="/timeline/home" component={Home}/>
					<StudentRouter path="/timeline/changePassword" 
						render={ 
							(props) => 
								<Container>
									<Row >
									<Col xl={9} lg={10} md={12} sm={12}>
											<Card>
												<Card.Body>
													<ChangePassword 
														{...props}
													/>
												</Card.Body>
											</Card>
										</Col>
									</Row>
								</Container>
						}/>
					<StudentRouter path="/timeline/watchVideo" component={WatchVideo}/> 
					<StudentRouter path="/timeline/calendar" component={Calendar}/>
					<StudentRouter path="/timeline/bookmarks" component={Bookmarks}/>
					<StudentRouter path="/timeline/todo" component={ToDo}/> 
					<StudentRouter path="/timeline/selectSR" component={SelectSR} />
					<StudentRouter path="/timeline/changeInDOB" component={ChangeInDOB} />
					<StudentRouter path="/timeline/changeInID" component={ChangeInID} />
					<StudentRouter path="/timeline/changeInName" component={ChangeInName} />
					<StudentRouter path="/timeline/changeInPhotograph" component={ChangeInPhotograph} />
					<StudentRouter path="/timeline/duplicateFeeReceipt" component={DuplicateFeeReceipt} />
					<StudentRouter path="/timeline/duplicateICard" component={DuplicateICard} />
					<StudentRouter path="/timeline/duplicateStudyKit" component={DuplicateStudyKit} />
					<StudentRouter path="/timeline/issuanceOfMarksheet" component={IssuanceOfMarksheet} />
					<StudentRouter path="/timeline/marksheetSummary" component={MarksheetSummary} />
					<StudentRouter path="/timeline/marksheetRequestConfirmation" component={MarksheetRequestConfirmation} />
					<StudentRouter path="/timeline/programDereg" component={ProgramDereg} />
					<StudentRouter path="/timeline/srCreated" component={SRCreated} />
					<StudentRouter path="/timeline/publicProfile"component= {PublicProfile}/>
					<StudentRouter path="/timeline/instructorProfile" component={InstructorProfile} /> 
					<StudentRouter path="/timeline/studentProfile" component={StudentProfile} />
					<StudentRouter path="/timeline/InstructorProfileNew" component={InstructorProfileNew} />
					<StudentRouter path="/timeline/myCommunications" component={MyCommunications} />
					<StudentRouter path="/timeline/notification" component={Notification}/>
						
					<StudentRouter path="/timeline/notificationsAnnouncements" component={NotificationsAnnouncements}/> 
					<StudentRouter path="/timeline/preReads" component={PreReads} />
					<StudentRouter path="/timeline/documentViewer"
						render={ 
							(props) => 
								<FileViewer 
									{...props}
								/>
						}
					/>

					
					<StudentRouter path="/timeline/sessionPlan" component={SessionPlan}/>
					<StudentRouter path="/timeline/sessionPlanModule" component={SessionPlanModule}/>
					<StudentRouter path="/timeline/contactUs" component={ContactUs}/>
					<StudentRouter path="/timeline/courseExamHome" component={CourseExamHome}/>
					<StudentRouter path="/timeline/rank" component={rank}/>
					<StudentRouter path="/timeline/eLearn" component={eLearn}/>
					<StudentRouter path="/timeline/myDocuments" component={MyDocuments}/>
					<Route path="/chatTest" component={Test}/>
					
					{/* <StudentRouter path="/timeline/examBookingDetails" component={ExamBooking}/> */}
					
					{/* <StudentRouter path="/timeline/CourseExamHome" component={CourseExamHome}/> */}
					<StudentRouter path="/timeline/startIATest" component={ViewTest}/>
					<StudentRouter path="/timeline/sessionFeedback" component={SessionFeedbackRouter}/>
					<StudentRouter path="/timeline/LOUForm" component={LOUForm}/>

					{/* <StudentRouter path="/timeline/testIAQuickJoin" component={TestIAQuickJoin}/>
					<StudentRouter path="/timeline/startIATestQuickJoin" component={ViewTestQuickJoin}/>
					 */}
					<StudentRouter path="/timeline/courseQueries" component={CourseQueries} />
				
					<StudentRouter path="/timeline/duplicateStudyKit" component={DuplicateStudyKit}/>
					<StudentRouter path="/timeline/issuanceOfBonafide" component={IssuanceOfBonafide}/>

					<StudentRouter path="/timeline/viewTestResults" component={IAResultDetails}/>
					<StudentRouter path="/timeline/downloadMarksheet" component={DownloadMarksheet} />
					<StudentRouter path="/timeline/groups" component={Group} />

				
					<StudentRouter path="/timeline/duplicateStudyKit" component={DuplicateStudyKit}/>
					<StudentRouter path="/timeline/issuanceOfBonafide" component={IssuanceOfBonafide}/>
					<StudentRouter path="/timeline/issuanceOfTranscript" component={IssuanceOfTranscript}/>
					{/* <StudentRouter path="/timeline/issuanceOfBonafide" component={IssuanceOfBonafide}/> */}
					{/* <StudentRouter path="/timeline/issuanceOfTranscript" component={IssuanceOfTranscript}/> */}
					<StudentRouter path="/timeline/redispatchOfStudyKit" component={RedispatchStudyKit}/>
					<StudentRouter path="/timeline/singleBook" component={SingleBook}/>
					<StudentRouter path="/timeline/issuanceOfFinalCertificate" component={IssuanceOfFinalCertificate}/>
					
					<StudentRouter path="/timeline/examBookingError" component={BookingError} />
					<StudentRouter path="/timeline/examBookingSuccess" component={BookingSuccess} />
					<StudentRouter path="/timeline/examBooking" component={ExamBooking}/>
					<StudentRouter path="/timeline/newExamBooking" component={NewExamBooking}/>
					<StudentRouter path="/timeline/reScheduleExamBooking" component={ReScheduleExamBooking}/>

					<StudentRouter path="/timeline/viewTestResults" component={IAResultDetails}/>
				
					<StudentRouter path="/timeline/duplicateStudyKit" component={DuplicateStudyKit}/>
					{/* <StudentRouter path="/timeline/issuanceOfBonafide" component={IssuanceOfBonafide}/>
					<StudentRouter path="/timeline/issuanceOfTranscript" component={IssuanceOfTranscript}/> */}
					<StudentRouter path="/timeline/redispatchOfStudyKit" component={RedispatchStudyKit}/>
					<StudentRouter path="/timeline/singleBook" component={SingleBook}/>
					
					<StudentRouter path="/timeline/hallticketDownload" component={HallTicket}/>
					<StudentRouter path="/timeline/attachmentViewer" component={AttachmentViewer}/>

					<StudentRouter path="/timeline/sRPaymentSuccess" component={SRStatusSuccess}/>
					<StudentRouter path="/timeline/SRStatusFailure" component={SRStatusFailure}/>

					<StudentRouter path="/timeline/courseSpecialisation" component={CourseSpecialisation}/>
					<StudentRouter path="/timeline/courseSpecialisationMain" component={CourseSpecialisationMain}/>

					<StudentRouter path="/timeline/startTEEAssessment" component={StartAssessment}/>
					
					<StudentRouter path="/timeline/subjectRepeatSR" component={SubjectRepeat}/>

					<StudentRouter path="/timeline/newSubjectRepeatSR" component={NewSubjectRepeatSR}/>

					<StudentRouter path="/timeline/faqpage" component={FaqPage}/>


					<StudentRouter path="/timeline/electiveSRPaymentConfirmation" component={ElectiveSRPaymentConfirmation}/>

					<StudentRouter path="/timeline/programWithdrawal" component={programWithdrawal}/>

					<StudentRouter path="/timeline/exitProgram" component={exitProgram}/>

					<StudentRouter path="/timeline/issuanceOfMarksheetNonGrading" component={IssuanceOfMarksheetNonGrading}/>

					<StudentRouter path="/timeline/marksheetSummaryNonGrading" component={MarksheetSummaryNonGrading}/>

					<StudentRouter path="/timeline/marksheetRequestConfirmationNonGrading" component={MarksheetRequestConfirmationNonGrading}/>

					<StudentRouter path="/timeline/specializationSelection" component={SpecializationSelection}/>
					<StudentRouter path="/timeline/specializationConfirmation" component={SpecializationConfirmation}/>
					<StudentRouter path="/timeline/electiveSelection" component={ElectiveSelection}/>

					<StudentRouter path="/timeline/issuanceOfEBonafide" component={IssuanceOfEBonafide}/>

					<StudentRouter path="/timeline/knowYourPolicy" component={knowYourPolicy}/>
					<StudentRouter path="/timeline/projectRegistration" component={ProjectRegistration}/>
					<StudentRouter path="/timeline/noSlotBookingStatus" component={NoSlotBookingStatus} />
					
					{/* <Route path="/home" component={Home}/>
					<Route path="/session-plan-module" component={SessionPlanModule}/>
					<Route path="/watch-video" component={WatchVideo}/> 
					<Route path="/Calendar" component={Calendar}/>
					<Route path="/session-plan" component={SessionPlan}/>
					<Route path="/todo" component={ToDo}/> 
					<Route path="/selectSR" component={SelectSR} />
					<Route path="/changeInDOB" component={ChangeInDOB} />
					<Route path="/changeInID" component={ChangeInID} />
					<Route path="/changeInName" component={ChangeInName} />
					<Route path="/changeInPhotograph" component={ChangeInPhotograph} />
					<Route path="/duplicateFeeReceipt" component={DuplicateFeeReceipt} />
					<Route path="/duplicateICard" component={DuplicateICard} />
					<Route path="/srCreated" component={SRCreated} />
					<Route path="/publicProfile"component= {PublicProfile}/>
					<Route path="/instructorProfile" component={InstructorProfile} />
					<Route path="/myCommunications" component={MyCommunications} />
					<Route path="/notification" component={Notification}/>
					<Route path="/session-plan"
					  render={ (props) => <SessionPlan {...props} 
					  						
					  						subject= "Organisational Behaviour"
				  							/>
							}
					  />
					<Route path="/notifications_announcements" component={NotificationsAnnouncements}/> */}
				</Switch>
			</BrowserRouter>
			</>
		);
		
  }
}

const mapStateToProps = state => {
	return {
		sapId: state.sapid,
		data:state
	}
}

export default connect(mapStateToProps)(App)