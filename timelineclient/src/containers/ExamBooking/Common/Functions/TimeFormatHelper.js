import React from 'react'
import moment from 'moment'

export function formatExamDate(subject) {
    if(subject && subject.examStartDateTime) {
        return (
            <span  className="text-nowrap">
                { moment(subject.examStartDateTime).format("D MMM YYYY") }
            </span>
        )
    } else {
        return '-'
    }
}

export function formatExamStartTime(subject) {
    if(subject && subject.examStartDateTime) {
        return (
            <span  className="text-nowrap">
                { moment(subject.examStartDateTime).format("hh:mm A") }
            </span>
        )
    } else {
        return '-'
    }
}

export function formatExamEndTime(subject) {
    if(subject && subject.examEndDateTime) {
        return (
            <span  className="text-nowrap">
                { moment(subject.examEndDateTime).format("hh:mm A") }
            </span>
        )
    } else {
        return '-'
    }
}