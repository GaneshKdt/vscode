import moment from 'moment-timezone'


class SessionHelper {

    static checkIfSessionActive = (session) => {
        
        //Checks session date and time to verify if its active
        
        //get session start and end time in current utc time format
        let sessionStartDateTime = moment.tz(session.date + " " + session.startTime, 'Asia/Calcutta').subtract(1, 'hours')
        let sessionEndDateTime = moment.tz(session.date + " " + session.endTime, 'Asia/Calcutta')

        // console.debug(sessionStartDateTime.valueOf())
        if (sessionStartDateTime.isBefore() && sessionEndDateTime.isAfter()) {
            return true
        }
        return false
    }
    
}

export default SessionHelper