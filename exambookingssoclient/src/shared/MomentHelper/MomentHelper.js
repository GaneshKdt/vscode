import moment from 'moment-timezone'

class MomentHelper {
    
    static getLocalTime = (date) => {
        if(isNaN(date)) {
            return moment.tz(date, 'Asia/Calcutta');
        } else {
            return MomentHelper.parseTimestamp(date)
        }
    }

    static getDateObject = (input) => {
        if(isNaN(input)) {
            let date = moment(input)
            return {
                isTimestamp : false,
                momentDate : date,
                isValid : date._isValid,
            }
        }
        let date = MomentHelper.parseTimestamp(input)
        return {
            isTimestamp : true,
            momentDate : date,
            isValid : date._isValid,
        }
    }

    static parseTimestamp = (timestamp) => {
        let timestampStr = Number.isInteger(timestamp) ? timestamp.toString() : timestamp
        
        return timestampStr.length === 13 ? 
            moment(parseInt(timestampStr))
             : moment(parseInt(timestampStr) * 1000)
    }

    static checkIfDateBeforeCurrent = (date, time) => {
        moment.tz.setDefault('Asia/Calcutta'); // Set default time zone to Asia/Kolkota

        if(time){
            return moment( new Date( date + " " + time) ).isBefore()
        }else{
            return moment( new Date( date ) ).isBefore()
        }
    }
    static checkIfDateAfterCurrent = (date, time) => {
        if(time){
            return moment( new Date( date + " " + time) ).isAfter()
        }else{
            return moment( new Date( date ) ).isAfter()
        }
    }

    static getSortedList = (list, options) =>{
        let sortedList = []
        if(options && options.param){
            let parameterName = options.param
            //Sort using a parameter name in a list of objects with dates
            if(options.descending){
                sortedList = list.sort( (a,b) => moment( new Date( b[parameterName] ) ) - moment( new Date( a[parameterName] ) ) )
            }else{
                sortedList = list.sort( (a,b) => moment( new Date( a[parameterName] ) ) - moment( new Date( b[parameterName] ) ) )
            }
        }else if(options && options.dateAndTime){
            
            let date = options.dateAndTime.date
            let time = options.dateAndTime.time

            //Sort using a parameter name in a list of objects with dates and times
            if(options.descending){
                sortedList = list.sort( 
                    (a,b) => moment( new Date( b[date] + " " + b[time] ) ) - moment( new Date( a[date] + " " + a[time] ) )
                )
            }else{
                sortedList = list.sort( 
                    (a,b) => moment( new Date( a[date] + " " + a[time] ) ) - moment( new Date( b[date] + " " + b[time] ) )
                )
            }
        }else{
            //Sort without a parameter name in a list of dates
            if(options.descending){
                sortedList = list.sort( (a,b) => moment( new Date( b ) ) - moment( new Date( a ) ) )
            }else{
                sortedList = list.sort( (a,b) => moment( new Date( a ) ) - moment( new Date( b ) ) )
            }
        }
        return sortedList
    }
    
    static getISTDateInCurrentTimezone = (date, time) => {
        moment.tz.setDefault('Asia/Calcutta'); // Set default time zone to Asia/Kolkota
        //Convert ONLY values from SERVER.
        //DONT CONVERT LOCAL DATES.
        if(time){
            return moment(new Date(date + " " + time))
        }else{
            return moment(new Date(date))
        }
    }

}

export default MomentHelper