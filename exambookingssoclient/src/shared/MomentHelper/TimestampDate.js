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

function getTimezone() {
    return moment.tz(moment.tz.guess()).zoneAbbr()
}