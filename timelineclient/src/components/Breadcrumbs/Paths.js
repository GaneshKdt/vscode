import Index from './Index'

const Paths = {
    home : [Index.home],
    calendar : [Index.home, Index.calendar],
    todo : [Index.home, Index.toDo],
    courseQueries : [Index.home, Index.courseQueries],
    attachmentViewer : [Index.home, Index.attachmentViewer],
    documentViewer : [Index.home, Index.documentViewer],
    // sessionFeedback : [Index.home, Index.sessionFeedback],

    //SR
        selectSR : [Index.home, Index.selectSR],
        srCreated : [Index.home, Index.srCreated],
        changeInDOB : [Index.home, Index.selectSR, Index.changeInDOB],
        changeInID : [Index.home, Index.selectSR, Index.changeInID],
        changeInName : [Index.home, Index.selectSR, Index.changeInName],
        changeInPhotograph : [Index.home, Index.selectSR, Index.changeInPhotograph],
        duplicateFeeReceipt : [Index.home, Index.selectSR, Index.duplicateFeeReceipt],
        duplicateICard : [Index.home, Index.selectSR, Index.duplicateICard],
        programDereg : [Index.home, Index.selectSR, Index.programDereg],

        duplicateStudyKit : [Index.home, Index.selectSR, Index.duplicateStudyKit],
        // Marksheet    
            issuanceOfMarksheet : [Index.home, Index.selectSR, Index.issuanceOfMarksheet],
            marksheetSummary : [Index.home, Index.selectSR, Index.issuanceOfMarksheet, Index.marksheetSummary],
            marksheetRequestConfirmation : [Index.home, Index.selectSR, Index.issuanceOfMarksheet, Index.marksheetRequestConfirmation],
        
        groups : [Index.home, Index.groups],
        
        redispatchOfStudyKit : [Index.home, Index.selectSR, Index.redispatchOfStudyKit],
        singleBook : [Index.home, Index.selectSR, Index.singleBook],
        issuanceOfFinalCertificate : [Index.home, Index.selectSR, Index.issuanceOfFinalCertificate],
        issuanceOfBonafide : [Index.home, Index.selectSR, Index.issuanceOfBonafide],
        issuanceOfTranscript : [Index.home, Index.selectSR, Index.issuanceOfTranscript],
        
        sRPaymentSuccess : [Index.home, Index.selectSR, Index.sRPaymentSuccess],
        SRStatusFailure : [Index.home, Index.selectSR, Index.SRStatusFailure],
        
        courseSpecialisation : [Index.home, Index.courseSpecialisation],
        courseSpecialisationMain : [Index.home, Index.courseSpecialisationMain],
        specializationSelection : [Index.home, Index.specializationSelection],
        specializationConfirmation : [Index.home, Index.specializationSelection, Index.specializationConfirmation],

        startTEEAssessment : [Index.home, Index.startTEEAssessment],
        subjectRepeatSR : [Index.home, Index.selectSR, Index.subjectRepeatSR],
        newSubjectRepeatSR : [Index.home, Index.selectSR, Index.subjectRepeatSR, Index.newSubjectRepeatSR],

    // Notifications / Announcements
        myCommunications : [Index.home, Index.myCommunications],
        notification : [Index.home, Index.notification],
        notificationsAnnouncements : [Index.home, Index.notificationsAnnouncements],

    // Exam Results
        courseExamHome : [Index.home, Index.courseExamHome],
        downloadMarksheet : [Index.home, Index.downloadMarksheet],

    // Exam Booking
        examBooking : [Index.home, Index.examBooking],
        newExamBooking : [Index.home, Index.newExamBooking],
        reScheduleExamBooking : [Index.home, Index.reScheduleExamBooking],
        examBookingOrderDetails : [Index.home, Index.examBookingOrderDetails],
        examBookingError : [Index.home, Index.examBookingError],
        examBookingSuccess : [Index.home, Index.examBookingSuccess],
        hallticketDownload : [Index.home, Index.hallticketDownload],

    // Profile
        changePassword : [Index.home, Index.changePassword],
        InstructorProfileNew : [Index.home, Index.InstructorProfileNew],
        studentProfile : [Index.home, Index.studentProfile],
        instructorProfile : [Index.home, Index.instructorProfile],
        publicProfile : [Index.home, Index.publicProfile],

    // Support
        contactUs : [Index.home, Index.contactUs],
        myDocuments : [Index.home, Index.myDocuments],
    // LTI
        preReads : [Index.home, Index.preReads],
        eLearn : [Index.home, Index.eLearn],
    
    // Session Plan Info
        sessionPlanDashboard : [Index.home, Index.sessionPlanDashboard],
        // sessionPlanModule : [Index.home, Index.sessionPlanDashboard, Index.sessionPlanModule],
        // startIATest : [Index.home, Index.startIATest],
        // viewTestResults : [Index.home, Index.viewTestResults],
        // watchVideo : [Index.home, Index.sessionPlanDashboard, Index.sessionPlanModule, Index.watchVideo],

    // elective payable sr for second time 
        electiveSRPaymentConfirmation : [Index.home, Index.electiveSRPaymentConfirmation],

    // Project registration
        projectRegistration : [Index.home, Index.projectRegistration],
}


class PathIndex {

    static indexedPaths = {}
    generatePathIndex() {
        for(var pathKeyName in Paths) {
            let pathsForPage = Paths[pathKeyName]
            if(pathsForPage && pathsForPage.length > 1) {
                let thisPage = pathsForPage[pathsForPage.length - 1]
                PathIndex.indexedPaths[thisPage.path] = pathsForPage
            }
        }
    }
    getPathDetails(path){
        if(!PathIndex.indexedPaths || !PathIndex.indexedPaths[path]) {
            this.generatePathIndex()
        }
        return PathIndex.indexedPaths[path]
    }    
}

export default PathIndex 