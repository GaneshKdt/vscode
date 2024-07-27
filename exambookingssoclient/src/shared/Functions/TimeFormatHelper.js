import moment from 'moment'

export function formatExamDate(subject) {
    if(subject && subject.examStartDateTime) {
        return moment(subject.examStartDateTime).format("D MMM, YYYY")
    } else {
        return '-'
    }
}

export function formatExamStartTime(subject, previous) {
    if(subject && subject.examStartDateTime) {
        return moment(subject.examStartDateTime).format("hh:mm A")
    } else {
        return '-'
    }
}

export function formatExamEndTime(subject) {
    if(subject && subject.examEndDateTime) {
        return moment(subject.examEndDateTime).format("hh:mm A")
    } else {
        return '-'
    }
}