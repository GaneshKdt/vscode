import moment from 'moment-timezone'
import MomentHelper from '../MomentHelper/MomentHelper';

class TestDataHelper{

    static CheckIfResultIsToBeShownToStudent = (test) => {
        
        
        let hasStartAndEndDates = TestDataHelper.CheckIfHasStartAndEndDates(test)

        //If the test has ended
        let testEnded = TestDataHelper.CheckIfTestEnded(test)
        
        //If student has at least 1 attempt
        let hasAttempted = test.attempt > 0
        
        //Either showResults OR showResultsToStudents is returned
        let showResults = test.showResultsToStudents =='Y'

        return hasStartAndEndDates && testEnded && hasAttempted && showResults
    }

    static CheckAttemptResult = (test) => {
        
        let hasStartAndEndDates = TestDataHelper.CheckIfHasStartAndEndDates(test)

        //If the test has ended
        let testEnded = TestDataHelper.CheckIfTestEnded(test)
        
        //Either showResults OR showResultsToStudents is returned
        let showResults = test.showResultsToStudents =='Y'

        return hasStartAndEndDates && testEnded && showResults
    }

    static CheckIfStudentCanAttemptTest = (test) => {
        return TestDataHelper.CheckIfTestActive(test)
    }

    static CheckIfTestActive = (test) => {
        
        let hasStartAndEndDates = TestDataHelper.CheckIfHasStartAndEndDates(test)

        let testEnded = TestDataHelper.CheckIfTestEnded(test)
        let testStarted = TestDataHelper.CheckIfTestStarted(test)

        return hasStartAndEndDates && testStarted && !testEnded
    }

    
    static CheckIfIATestIsActive = (test) => {
        
        let hasStartAndEndDates = TestDataHelper.CheckIfHasStartAndEndDates(test)

        let testEnded = TestDataHelper.CheckIfIATestEnded(test)
        let testStarted = TestDataHelper.CheckIfTestStarted(test)

        return hasStartAndEndDates && testStarted && !testEnded
    }
    

    static CheckIfHasStartAndEndDates = (test) => {
        if(!test.endDate || test.endDate == '' || !test.startDate || test.startDate == '') {
            return false
        }
        return true;
    }
    static CheckIfTestEnded = (test) => {
        if(!test.endDate || test.endDate == '') {
            return false
        }
        var durationToAdd = test.duration ? test.duration : 0;

        var testEndDateTime = MomentHelper.getLocalTime(test.endDate)
        
        return moment().isAfter(testEndDateTime)
    }

    static CheckIfIATestEnded = (test) => {
        if(!test.endDate || test.endDate == '') {
            return false
        }
        var durationToAdd = test.duration ? test.duration : 0;

        var testEndDateTime = MomentHelper.getLocalTime(test.endDate)
        
        //Added by pranit on 28April20 to keeplive link for test as per new logic of small window start
        var testEndDateTimeWithDurationAdded = testEndDateTime.add(durationToAdd,'minutes')
        //Added by pranit on 28April20 to keeplive link for test as per new logic of small window end
        
        return moment().isAfter(testEndDateTimeWithDurationAdded)
    }

    static CheckIfTestStarted = (test) => {
        if(!test.startDate || test.startDate == '') {
            return false
        }
        var testStartDateTime = MomentHelper.getLocalTime(test.startDate)
        return moment().isAfter(testStartDateTime)
    }

    //Added by Pranit on 10Aug20 for reducing load during IAs start
    //Method returns true if it is allowed to call api
    static CanCallApiIfTimeIsOutOfWindowOfHighLoad = () => {
        try {
            moment.tz.setDefault('Asia/Calcutta'); // Set default time zone to Asia/Kolkota

            var format = 'HH:mm:ss'

            var time = moment() //gives you current time. no format required.
            
            let beforeTime = moment('21:35:00', format);
            let afterTime = moment('22:45:00', format);

            if (time.isBetween(beforeTime, afterTime)) {

                console.log('is between')
                return false;

            } else {

                console.log('is not between')
                return true;
            }
            
            
        } catch (error) {
            console.log("Error In CanCallApiIfTimeIsOutOfWindowOfHighLoad(): ",error);
            return true;
        }
    }
    //Added by Pranit on 10Aug20 for reducing load during IAs end

}
export default TestDataHelper