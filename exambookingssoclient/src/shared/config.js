import { BaseURL, AppConfig } from './config_settings'

class ConfigUrls {
    baseUrl = BaseURL
    appBase = AppConfig.APP_BASE
    urls = {
        baseUrl                     : this.baseUrl,

        apiUrl_acads                : this.baseUrl + "acads/m/",
        apiUrl_exam                 : this.baseUrl + "exam/m/",
        apiUrl_studentPortals       : this.baseUrl + "studentportal/m/",
        apiUrl_ltiDemo_m            : this.baseUrl + "ltidemo/m/",

        apiUrl_web_acads            : this.baseUrl + "acads/",
        apiUrl_web_exam             : this.baseUrl + "exam/",
        apiUrl_web_studentPortal    : this.baseUrl + "studentportal/",
        apiUrl_ltiDemo              : this.baseUrl + "ltidemo/",

        apiUrl_hall_ticket_download : this.baseUrl + "hallticket/",
        login                       : "https://studentzone-ngasce.nmims.edu/",
        logout                      : "https://grade.upgrad.com/v/not-found",
        productionUrl               : "https://studentzone-ngasce.nmims.edu/",
        initiateExamBooking         : this.baseUrl + "exam/initiateExamBooking_MBAX",
        // logo                        : "https://studentzone-ngasce.nmims.edu/studentportal/resources_2015/images/logo.jpg",
        // logo                        : AppConfig.RES_BASE + 'favicon.png',
        logo                        : AppConfig.RES_BASE + 'images/logohalf.png',
        startTEEAssessment          : this.baseUrl + "ltidemo/start_mettl_assessment_mbax",   
        ...getURLForTest()
    }
    pages = {

        eLearn                      : this.appBase + "eLearn",

        home                        : this.appBase + "examBookingHome",
        examBookingHome             : this.appBase + "examBookingHome",

        newExamBooking              : this.appBase + "newBooking",
        slotChange                  : this.appBase + "slotChange",
        hallticket                  : this.appBase + "hallticket",
        logout                      : this.appBase + "logout",
        contactUs                   : this.appBase + "contactUs",
        serviceRequest              : this.appBase + "serviceRequest",
        examResults                 : this.appBase + "courseExamHome",
        examBookingError            : this.appBase + "examBookingError",
        examBookingSuccess          : this.appBase + "examBookingSuccess",
        courseExamHome              : this.appBase + "courseExamHome",
        viewTestResults             : this.appBase + "viewTestResults",
        gradesheet                  : this.appBase + "gradesheet",
        issuanceFinalCert           : this.appBase + "issuanceFinalCert",
        issuanceTranscript          : this.appBase + "issuanceTranscript",
        upcomingExams               : this.appBase + "upcomingExams",
        assessmentsList             : this.appBase + "assessmentsList",
        startAssessment             : this.appBase + "startAssessment",
        programDereg                : this.appBase + "programDereg",
        gradesheet                  : this.appBase + "gradesheet",
        srCreated                   : this.appBase + "srCreated",
        serviceRequest              : this.appBase + "serviceRequest",
        marksheetSummary            : this.appBase + "marksheetSummary",
        marksheetRequestConfirmation: this.appBase + "marksheetRequestConfirmation",
        sRPaymentSuccess            : this.appBase + "sRPaymentSuccess",
        sRStatusFailure             : this.appBase + "sRStatusFailure",
        attachmentViewer            : this.appBase + "attachmentViewer"
    }
    api = {
        authenticate                : this.urls.apiUrl_studentPortals + "authenticate",
        getPaymentOptions           : this.urls.apiUrl_web_studentPortal + "getPaymentOptions",

        getExamBookingData          : this.urls.apiUrl_exam + "getExamBookingData_MBAX",
        getAllCenters               : this.urls.apiUrl_exam + "getAllCenters_MBAX",
        getStudentExamBookings      : this.urls.apiUrl_exam + "getStudentExamBookings_MBAX",
        
        saveExamBookingRequest      : this.urls.apiUrl_exam + "saveExamBookingRequest_MBAX",
        getAvailableSlots           : this.urls.apiUrl_exam + "getSlotsForCenterAndTimeboundId_MBAX",
        getBookingsForTrackId       : this.urls.apiUrl_exam + "getStudentExamBookingsForTrackId_MBAX",

        downloadHallTicket          : this.urls.apiUrl_exam + "downloadHallTicket_MBAX",
        previewHallTicket           : this.urls.apiUrl_exam + "previewHallTicket_MBAX",

        viewELearnResources         : this.urls.apiUrl_ltiDemo + "m/viewELearnResources",

        printBookingStatus          : this.urls.apiUrl_exam + "printBookingStatus_MBAX",

        salesForceCreateCase        : "https://webto.salesforce.com/servlet/servlet.WebToCase?encoding=UTF-8",
        serviceRequestFee           : this.urls.apiUrl_studentPortals + "ServiceRequestFee",
        saveProgramDeRegistration   : this.urls.apiUrl_studentPortals + "saveProgramDeRegistration", 
        checkDeRegSemEligibility    : this.urls.apiUrl_studentPortals + "checkSemDeregisterEligibility",
        //SR 
        checkFinalCertificateEligibility : this.urls.apiUrl_studentPortals + "checkFinalCertificateEligibility",
        getServiceRequestFee : this.urls.apiUrl_studentPortals + "ServiceRequestFee",
        saveFinalCertificatePayment : this.urls.apiUrl_studentPortals + "saveFinalCertificateAndPayment",
        saveFinalCertificateRequest : this.urls.apiUrl_studentPortals + "saveFinalCertificateRequest",
        studentSelfMarksheetForSem  : this.urls.apiUrl_exam + "mbaXstudentSelfMarksheetForSemMonthYear",
                
        getCurrentSubjectResults    : this.urls.apiUrl_exam + "getCurrentSubjectResultsForMbaXStudent",
        getAvailableMarksheets      : this.urls.apiUrl_exam + "getClearedSemForStudentMBAX",
        getMarksHistory             : this.urls.apiUrl_exam + "getClearedSemForStudentMBAX",
        getPassFailStatus           : this.urls.apiUrl_exam + "getMbaXPassFailStatusForStudent",
        getAllAttemptedIAForSubject : this.urls.apiUrl_web_exam + "api/getAllMbaXAttemptedIAForSubject",
        getAvailableMarksheetsSelf  : this.urls.apiUrl_exam + "getAvailableMarksheetsForMbaXStudent",
        //  getCurrentSubjectResults    : "http://localhost:8080/exam/m/getCurrentSubjectResultsForMbaXStudent",          
        // getAvailableMarksheets      : "http://localhost:8080/exam/m/getAvailableMarksheetsForMbaXStudent",      
        // getMarksHistory             : "http://localhost:8080/exam/m/getMarksHistoryForMbaXStudent",       
        // getPassFailStatus : "http://localhost:8080/exam/m/getMbaXPassFailStatusForStudent",      
        // getAllAttemptedIAForSubject : "http://localhost:8080/exam/api/getAllMbaXAttemptedIAForSubject",
        almashinesLogin                   : this.urls.apiUrl_studentPortals + "almashinesLogin",
        getAssessmentsBySapid       : this.urls.apiUrl_exam + "getMBAXAssessmentsBySapid",
        getAssessmentDetails        : this.urls.apiUrl_exam + "getMBAXAssessmentDetails",
        
        
        ...getAPIForTest()
    }
}

function getAPIForTest() {
    // Only override API for LOCAL
    if (AppConfig.ENVIRONMENT !== 'LOCAL') {
        return null
    } else {
        return testAPIPaths
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


// Add APIs you will be using for testing purposes here. They will override the ones in ConfigUrls.
// PS: Please remove the APIs when testing is done and going into PROD
const localBase = 'https://studentzone-ngasce.nmims.edu/'

const testURLs = {
    initiateExamBooking         : localBase + "exam/initiateExamBooking_MBAX",
}

const localUrls = {
    baseUrl                     : localBase,

    apiUrl_acads                : localBase + "acads/m/",
    apiUrl_exam                 : localBase + "exam/m/",
    apiUrl_studentPortals       : localBase + "studentportal/m/",
    apiUrl_ltiDemo_m            : localBase + "ltidemo/m/",

    apiUrl_web_acads            : localBase + "acads/",
    apiUrl_web_exam             : localBase + "exam/",
    apiUrl_web_studentPortal    : localBase + "studentportal/",
    apiUrl_ltiDemo              : localBase + "ltidemo/",

    productionUrl               : "https://studentzone-ngasce.nmims.edu/",
    initiateExamBooking         : localBase + "exam/embaInitiateExamBooking",
}
const testAPIPaths = {
    getExamBookingData          : localUrls.apiUrl_exam + "getExamBookingData_MBAX",
    getAllCenters               : localUrls.apiUrl_exam + "getAllCenters_MBAX",
    getStudentExamBookings      : localUrls.apiUrl_exam + "getStudentExamBookings_MBAX",
    
    saveExamBookingRequest      : localUrls.apiUrl_exam + "saveExamBookingRequest_MBAX",
    getAvailableSlots           : localUrls.apiUrl_exam + "getSlotsForCenterAndTimeboundId_MBAX",
    getBookingsForTrackId       : localUrls.apiUrl_exam + "getStudentExamBookingsForTrackId_MBAX",

    downloadHallTicket          : localUrls.apiUrl_exam + "downloadHallTicket_MBAX",
    previewHallTicket           : localUrls.apiUrl_exam + "previewHallTicket_MBAX",
    printBookingStatus          : localUrls.apiUrl_exam + "printBookingStatus_MBAX",
    salesForceCreateCase        : "https://cs5.salesforce.com/servlet/servlet.WebToCase",


}
const config = new ConfigUrls()
export default ConfigUrls
export const API = config.api
export const Pages = config.pages
export const URL = config.urls
export const BASE = config.appBase
export const RES_BASE = AppConfig.RES_BASE
export { AppConfig }