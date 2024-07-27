import MomentHelper from './MomentHelper'
import moment from 'moment-timezone'

export const FormattedDate = (props) => {
    let inputDate = props.date

    // if no date, return empty
    if(!inputDate) {
        return ''
    }
    
    // parse the input
    let date = MomentHelper.getDateObject(inputDate)
    if(!date.isValid) {
        return ''
    }
    
    let timezoneStr = date.isTimestamp ? getTimezone() : 'IST'
    return date.momentDate.format("MMM D, hh:mm A") + ' ' + timezoneStr
}


export const FeedCardHeaderDate = (props) => {
    let inputDate = props.date

    // if no date, return empty
    if(!inputDate) {
        return ''
    }

    // parse the input
    let date = MomentHelper.getDateObject(inputDate)

    // if not a valid date, return empty
    if(!date.isValid) {
        return ''
    }

    let currentDate = moment()
    let diffDays = currentDate.diff(date.momentDate, 'days')
    if(diffDays <= 3){
        // _ days ago.
        return capitalize(date.momentDate.fromNow()) + '.'
    }
    
    let timezoneStr = date.isTimestamp ? getTimezone() : 'IST'
    return date.momentDate.format("D MMM YYYY, hh:mm A") + ' ' + timezoneStr 
}


const capitalize = (s) => {
    if (typeof s !== 'string') return ''
    return s.charAt(0).toUpperCase() + s.slice(1)
}


function getTimezone() {
    return moment.tz(moment.tz.guess()).zoneAbbr()
}