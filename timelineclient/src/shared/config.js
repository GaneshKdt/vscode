import { ThemeProvider } from 'react-bootstrap'
import { BaseURL, AppConfig } from './config_settings'

class ConfigUrls {
    baseUrl = BaseURL
    urls = {
        baseUrl                     : this.baseUrl,
        apiUrl_chats                : this.baseUrl + "chats/",
        apiUrl_studentPortals       : this.baseUrl + "studentportal/m/",   
        apiUrl_SocialMedia          : this.baseUrl + "social-media/m/",
        apiUrl_acads                : this.baseUrl + "acads/m/",
        apiUrl_exam                 : this.baseUrl + "exam/m/",  
        apiUrl_ltiDemo              : this.baseUrl + "ltidemo/", 
        apiUrl_ltiDemo_analytics    : "https://ngasce-content.nmims.edu/" + "ltidemo/",
        apiUrl_ltiDemo_m            : this.baseUrl + "ltidemo/m/",
        apiUrl_web_acads            : this.baseUrl + "acads/",
        apiUrl_web_studentPortal    : this.baseUrl + "studentportal/",
        apiUrl_web_exam             : this.baseUrl + "exam/",
        apiUrl_content_download     : this.baseUrl + "content/",
        apiUrl_content_download_aws : "https://contentfilesngasce.s3.ap-south-1.amazonaws.com/Content/",
        apiUrl_feed_download        : this.baseUrl + "feedfiles/",
        apiUrl_hall_ticket_download : this.baseUrl + "hallticket/",
        pearson                     : 'https://elibrary.in.pearson.com/',
        productionUrl               : "https://studentzone-ngasce.nmims.edu/",
        apiUrl_timelineApis         : this.baseUrl + "timeline/api/",   
        initiateExamBooking         : this.baseUrl + "exam/embaInitiateExamBooking", 
        initiateSR                  : this.baseUrl + "studentportal/initiateSRByTrackId", 
        startTEEAssessment          : this.baseUrl + "ltidemo/start_mettl_assessment",   
        apiUrl_Announcement_download: "https://announcementfiles.s3.ap-south-1.amazonaws.com/",
        apiUrl_feed_download_aws    : "https://contentfilesngasce.s3.ap-south-1.amazonaws.com/feedfiles/",
        apiUrl_announcement         : this.baseUrl + "announcement/m", 
        apiUrl_servicerequest       : this.baseUrl + "servicerequest/m/", 
        static_portal               : "https://d3q78eohsdsot3.cloudfront.net/",
        apiUrl_KnowYorPolicy        : this.baseUrl + "knowyourpolicy",
        ...getURLForTest()
    }
    pages = {
        home                        : "/timeline/home",
        calendar                    : "/timeline/calendar",
        todo                        : "/timeline/todo",
        courseExamHome              : "/timeline/courseExamHome",
        rank                        : "/timeline/rank",
        knowYourPolicy              : "/timeline/knowYourPolicy",
        startIATest                 : "/timeline/startIATest",
        courseQueries               : "/timeline/courseQueries",
        contactUs                   : "/timeline/contactUs",
        studentProfile              : "/timeline/studentProfile",
        instructorProfile           : "/timeline/instructorProfile",
        examBooking                 : "/timeline/examBooking",
        myCommunications            : "/timeline/myCommunications",
        newExamBooking              : "/timeline/newExamBooking",
        examBookingOrderDetails     : "/timeline/examBookingOrderDetails",
        reScheduleExamBooking       : "/timeline/reScheduleExamBooking",  
        viewTestResults             : "/timeline/viewTestResults",
        hallticketDownload          : "/timeline/hallticketDownload",
        preReads                    : "/timeline/preReads",
        eLearn                      : "/timeline/eLearn",
        sessionPlan                 : "/timeline/sessionPlan",
        InstructorProfileNew        : "/timeline/InstructorProfileNew",
        attachmentViewer            : "/timeline/attachmentViewer",
        changeInDOB                 : "/timeline/changeInDOB",
        changeInID                  : "/timeline/changeInID",
        changeInName                : "/timeline/changeInName",
        changeInPhotograph          : "/timeline/changeInPhotograph",
        changePassword              : "/timeline/changePassword",
        documentViewer              : "/timeline/documentViewer",
        downloadMarksheet           : "/timeline/downloadMarksheet",
        duplicateFeeReceipt         : "/timeline/duplicateFeeReceipt",
        duplicateICard              : "/timeline/duplicateICard",
        examBookingError            : "/timeline/examBookingError",
        examBookingSuccess          : "/timeline/examBookingSuccess",
        notification                : "/timeline/notification",
        notificationsAnnouncements  : "/timeline/notificationsAnnouncements",
        programDereg                : "/timeline/programDereg",
        publicProfile               : "/timeline/publicProfile",
        selectSR                    : "/timeline/selectSR",
        sessionFeedback             : "/timeline/sessionFeedback",
        sessionPlanModule           : "/timeline/sessionPlanModule",
        srCreated                   : "/timeline/srCreated",
        watchVideo                  : "/timeline/watchVideo",

        duplicateStudyKit           : "/timeline/duplicateStudyKit",
        issuanceOfMarksheet         : "/timeline/issuanceOfMarksheet",
        marksheetSummary            : "/timeline/marksheetSummary",
        marksheetRequestConfirmation: "/timeline/marksheetRequestConfirmation",
        groups                      : "/timeline/groups",
        redispatchOfStudyKit        : "/timeline/redispatchOfStudyKit",
        singleBook                  : "/timeline/singleBook",
        issuanceOfFinalCertificate  : "/timeline/issuanceOfFinalCertificate",
        issuanceOfBonafide          : "/timeline/issuanceOfBonafide",
        issuanceOfTranscript        : "/timeline/issuanceOfTranscript",
        sRPaymentSuccess            : "/timeline/sRPaymentSuccess",
        SRStatusFailure             : "/timeline/SRStatusFailure",
        courseSpecialisation        : "/timeline/courseSpecialisation",
        courseSpecialisationMain    : "/timeline/courseSpecialisationMain",
        startTEEAssessment          : "/timeline/startTEEAssessment",
        subjectRepeatSR             : "/timeline/subjectRepeatSR",
        newSubjectRepeatSR          : "/timeline/newSubjectRepeatSR",
        specializationSelection     : "/timeline/specializationSelection",
        specializationConfirmation  : "/timeline/specializationConfirmation",
        electiveSelection           : "/timeline/electiveSelection",
        startTEEAssessment          : "/timeline/startTEEAssessment",
        subjectRepeatSR             : "/timeline/subjectRepeatSR",
        newSubjectRepeatSR          : "/timeline/newSubjectRepeatSR",
        myDocuments                 : "/timeline/myDocuments",
        projectRegistration         : "/timeline/projectRegistration"
    }
    
    api = {
        changeUserPassword          : this.urls.apiUrl_studentPortals + "savePassword",
        studentTimeTableUpcomingHome: this.urls.apiUrl_acads + "studentTimeTableUpcomingHome",
        studentTodo                 : this.urls.apiUrl_ltiDemo + "StudentTodo",
        getMostRecentResults        : this.urls.apiUrl_exam + "getMostRecentResults",
        sendPageViewInfo            : this.urls.apiUrl_ltiDemo_analytics + "registerUpdate",
        getContactsForChat          : this.urls.apiUrl_ltiDemo + "getContactsForChat",

        //getBookmarks
        getBookmarksResources       : this.urls.apiUrl_web_studentPortal + "getBookmarksResources",
        getBookmarksVideos          : this.urls.apiUrl_web_studentPortal + "getBookmarksVideos",
        
        // getAllResults               : this.urls.baseUrl + 'exam/api/getIAResultsForSubjectsBySapid',
        getAllResults               : this.urls.apiUrl_web_exam + 'api/getIAResultsForSubjectsBySapid',
        checkIfAnyTestsActive       : this.urls.apiUrl_exam + 'checkIfAnyTestsActive',
        getStudentTimeTable         : this.urls.apiUrl_acads + "studentTimeTable",
        viewScheduledSessions       : this.urls.apiUrl_acads + "viewScheduledSession",
        attendScheduledSession      : this.urls.apiUrl_acads + "attendScheduledSessionForReact",
        getIABySapIdNModuleId       : this.baseUrl + "exam/" + "getIABySapIdNModuleId",
        viewTestDetailsForStudentsForAllViews       : this.urls.apiUrl_web_exam + "viewTestDetailsForStudentsForAllViews",
        getFinishedTestDataForTODO  : this.urls.apiUrl_exam + "getFinishedTestDataForTODO",
        getTestDataForTODO_V2       : this.urls.apiUrl_exam + "getTestDataForTODO_V2",
        getTeeAssessmentsBySapid    : this.urls.apiUrl_exam + "getTeeAssessmentsBySapid",
        getUpcomingTeeAssessmentsBySapid : this.urls.apiUrl_exam + "getUpcomingTeeAssessmentsBySapid",       
        getPendingTeeAssessmentsBySapid : this.urls.apiUrl_exam + "getPendingTeeAssessmentsBySapid",
        getSessionFeedback : this.urls.apiUrl_studentPortals + "feedbackCheck",
        saveSessionFeedback : this.urls.apiUrl_studentPortals + "FeedbackSave",
        facultyByTimeboundId        : this.urls.apiUrl_ltiDemo + "facultyByTimeboundId",
        getQueriesForStudent        : this.urls.apiUrl_studentPortals + "getQueriesForStudent",
        getPublicQueries            : this.urls.apiUrl_acads + "getPublicQueryMBAWX",
        getMyQueries                : this.urls.apiUrl_acads + "getMyQueryMBAWX",
        postQuery                   : this.urls.apiUrl_acads + "postQueryMBAWX",
        getIABySapIdNTimeBoundId       : this.urls.apiUrl_exam + "getIABySapIdNTimeBoundIds",
        getSessionPlanDetailsBySapidAndTimeboundId : this.urls.apiUrl_web_acads + "/api/getSessionPlanDetailsBySapidAndTimeboundId",
        generateMarksheet           : this.urls.apiUrl_exam + "studentSelfMarksheet",
        getGroupsMemberForStudent   : this.urls.apiUrl_ltiDemo_m + "getGroupsMemberForStudent",
        getMemberBySearch           : this.urls.apiUrl_ltiDemo_m + "getMemberBySearch",
        // getExamBookingData       : this.urls.apiUrl_ltiDemo + "getExamBookingData",
        getExamBookingData          : this.urls.apiUrl_exam + "getExamBookingData",
        getBookingsForTrackId       : this.urls.apiUrl_exam + "getStudentExamBookingsForTrackId",
        
        getStudentExamBookings      : this.urls.apiUrl_exam + "getExamBookingDashboardDetails_MBAWX",
        getPaymentOptions           : this.urls.apiUrl_web_studentPortal + "student/getPaymentOptions",
        saveExamBookingRequest      : this.urls.apiUrl_exam + "saveExamBookingRequest",
        embaGetExamBookingRequest   : this.urls.apiUrl_exam + "embaGetExamBookingRequestObject",
        getAllCenters               : this.urls.apiUrl_exam + "getAllCenters",
        getAvailableSlots           : this.urls.apiUrl_exam + "getSlotsForCenterAndTimeboundId",
        checkIfReRegApplicable      : this.urls.apiUrl_exam + "checkIfReRegApplicableForStudent",
        
        getAvailableMarksheets      : this.urls.apiUrl_exam + "getAvailableMarksheetsForStudent",
        getMarksHistory             : this.urls.apiUrl_exam + "getMarksHistoryForStudent",
        getPassFailStatus           : this.urls.apiUrl_exam + "getPassFailStatusForStudent",
        getCurrentSubjectResults    : this.urls.apiUrl_exam + "getCurrentSubjectResultsForStudent",

        getAllAttemptedIAForSubject : this.urls.apiUrl_web_exam + "api/getAllAttemptedIAForSubject",
        studentSelfMarksheetForSem  : this.urls.apiUrl_exam + "studentSelfMarksheetForSemMonthYear",

        // Pearson API's
        checkPearsonAccess          : this.urls.apiUrl_ltiDemo + "checkStudentPearsonAccess",
        viewELearnResources         : this.urls.apiUrl_ltiDemo + "m/viewELearnResources",
        getFinishedTeeAssessmentsBySapid : this.urls.apiUrl_exam + "getFinishedTeeAssessmentsBySapid",
        
        // Specialisation API
        isSpecialisationApplicable              : this.urls.apiUrl_exam + "isSpecialisationApplicable",
        getSpecialisationTypes                  : this.urls.apiUrl_exam + "getSpecialisationTypes",
        getSpecialisationSubjects               : this.urls.apiUrl_exam + "getSpecialisationSubjects",
        isSpecialisationDone                    : this.urls.apiUrl_exam + "isSpecialisationDone",
        checkExistingSpecialisation             : this.urls.apiUrl_exam + "checkExistingSpecialisation",
        saveStudentSpecialisationSubjects       : this.urls.apiUrl_exam + "saveStudentSpecialisationSubjects",
        fetchBlockDetails                       : this.urls.apiUrl_exam + "fetchBlockDetails",
        fetchBlockSequenceDetails               : this.urls.apiUrl_exam + "fetchBlockSequenceDetails",
        fetchStudentDetailsForSpecialization    : this.urls.apiUrl_exam + "fetchStudentDetailsForSpecialization",
        saveSpecializationForStudent            : this.urls.apiUrl_exam + "saveSpecializationForStudent",
        fetchSpecializationIfAlreadyOptedin     : this.urls.apiUrl_exam + 'fetchSpecializationIfAlreadyOptedin',
        
        printBookingStatus          : this.urls.apiUrl_exam + "printBookingStatus_MBAWX",
        downloadHallTicket          : this.urls.apiUrl_exam + "downloadHallTicket_MBAWX",
        previewHallTicket           : this.urls.apiUrl_exam + "previewHallTicket_MBAWX",
        saveNetworkLogs             : this.urls.apiUrl_ltiDemo_analytics + "saveNetworkLogs",
        getAssessmentDetails        : this.urls.apiUrl_exam + "getAssessmentDetails",
        listPost                    : this.urls.apiUrl_ltiDemo + "listPost",
        getPostsFromRedis           : this.urls.apiUrl_timelineApis + "post/getAllPostsFromRedisByTimeboundId",
        getUpcomingTestsFromCache   : this.urls.apiUrl_timelineApis + "test/getUpcomingTestsFromCacheBySapid",
        getReactionCount            : this.urls.apiUrl_ltiDemo + "getReactionCount",
        getCommentAndReactions      : this.urls.apiUrl_ltiDemo + "getCommentAndReactions",
        getReactedUserList          : this.urls.apiUrl_ltiDemo + "getReactedUserList",
        getStudentSubjectRepeatStatus  : this.urls.apiUrl_studentPortals + "getStudentSubjectRepeatStatusMBAWX",
        saveSubjectRegistrationSR      : this.urls.apiUrl_studentPortals + "saveSubjectRegistrationSRPaymentForMBAWX",
        findServiceRequest          : this.urls.apiUrl_studentPortals + "findServiceRequest",
        getHarvardModulesDate       : this.urls.apiUrl_ltiDemo_m + "getHarvardModulesDate",
        getVideoSubTopics           : this.urls.apiUrl_acads + "/getVideoSubTopics", 

        
        //SR 
        checkFinalCertificateEligibility : this.urls.apiUrl_studentPortals + "checkFinalCertificateEligibility",
        getServiceRequestFee : this.urls.apiUrl_studentPortals + "ServiceRequestFee",
        saveFinalCertificatePayment : this.urls.apiUrl_studentPortals + "saveFinalCertificateAndPayment",
        saveFinalCertificatePaymentWithFile : this.urls.apiUrl_studentPortals + "saveFinalCertificateAndPaymentWithfile",
        saveFinalCertificateRequest : this.urls.apiUrl_studentPortals + "saveFinalCertificateRequest",
        getSrTypes : this.urls.apiUrl_studentPortals +"/getSrTypes",
        getServiceRequestDocuments : this.urls.apiUrl_exam +"getServiceRequestDocuments",

        checkDeRegSemEligibility : this.urls.apiUrl_studentPortals + "checkSemDeregisterEligibility",
        checkTranscriptEligibility : this.urls.apiUrl_studentPortals + "checkTranscriptEligibility",
        //Address

        getAddressDetailsFromPinCode : this.urls.apiUrl_studentPortals + "getAddressDetailsFromPinCode",

        //SharingOnSocialMedia
        addCredentialLinkedIn : this.urls.apiUrl_SocialMedia + "addCredentialLinkedIn",
        getShareCertificateLinkedIn : this.urls.apiUrl_SocialMedia + "shareCertificateLinkedIn",
        //Course Coordinator
        getCurrentCourseCoordinator : this.urls.apiUrl_ltiDemo + "getCurrentCourseCoordinator",

        getReRegistrationLink : this.urls.apiUrl_studentPortals + "reRegForMobile",
        // getReRegistrationLink : this.urls.apiUrl_studentPortals + "reRegistrationPaymentLink",

        //for program withdrawal
        checkIfStudentApplicableForWithdrawal : this.urls.apiUrl_studentPortals + "checkIfStudentApplicableForWithdrawal",
        saveProgramWithdrawal : this.urls.apiUrl_studentPortals + "saveProgramWithdrawal",

        //for program exit
        checkIfStudentApplicableForProgramExit : this.urls.apiUrl_studentPortals + "checkIfStudentApplicableForExitProgram",
        saveProgramExit : this.urls.apiUrl_studentPortals + "saveExitProgram",

        //quickBlox chat url
        quickbloxUrl : this.urls.apiUrl_chats + "quickblox",

        admissionFeeReceipt : this.urls.apiUrl_exam +"/getAdmissionFeeReceipt",

        getStudentidCard : this.urls.apiUrl_exam +"getStudeIdCardDetails",

        studentidcardURL :  this.baseUrl+"studentportal/digitalidcard",

        checklouConfirmed:this.baseUrl+"studentportal/m/checklouConfirmed",
        savelouConfirmed:this.baseUrl+"studentportal/m/savelouConfirmed",
        myTicketSSOUrl:this.baseUrl+"studentportal/m/connectMyCases",
        subjectWiseRankData:this.baseUrl+"studentportal/m/getSubjectWiseRankForTimebound",

        //No Slot Booking
        saveNoSlotBookingRequest : this.urls.apiUrl_exam + "student/saveNoSlotBookingRequest",
        initiateNoSlotBooking : this.urls.apiUrl_web_exam + "student/embaInitiateNoSlotBooking",
        //saveTranscriptRequest : this.baseUrl+"saveTranscriptRequest",
        demoExamUrl : this.urls.apiUrl_exam + "getDemoExamForMbaWx",
        ...getAPIForTest()
    }
}

function getURLForTest() {
    // Only override API for LOCAL
    if (AppConfig.ENVIRONMENT !== 'LOCAL') {
        return null
    } else {
        return testURLs
    }
}

function getAPIForTest() {
    // Only override API for LOCAL
    if (AppConfig.ENVIRONMENT != 'LOCAL') {
        return null
    } else {
        return testAPIPaths
    }
}

// Add APIs you will be using for testing purposes here. They will override the ones in ConfigUrls.
// PS: Please remove the APIs when testing is done and going into PROD

const localBase = 'http://localhost:8080/'

const testURLs = {
    startTEEAssessment          : localBase + "ltidemo/start_mettl_assessment",   
}

const localUrls = {
}
const testAPIPaths = {
    // getStudentTermRepeatStatus  : localBase + "studentportal/m/getStudentTermRepeatStatusMBAWX",
    // saveTermRegistrationSR      : localBase + "studentportal/m/saveTermRegistrationSRPaymentForMBAWX",
    // findServiceRequest          : localBase + "studentportal/m/findServiceRequest",
}
export default ConfigUrls
export const API = new ConfigUrls().api
export const Pages = new ConfigUrls().pages
export const URL = new ConfigUrls().urls
export { AppConfig }