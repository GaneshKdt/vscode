import React from 'react'

export function bookingStatusFormatter(cell, row) {
    let booked = row.previousBookingDetails
    let className = booked ? 'text-success' : 'text-danger'
    return (
        <span className = {`${ className } font-weight-bold`} >
            { booked ? `Booked` : `Not Booked`}
        </span>
    )
}

export function centerFormatter(cell, row) {
    if(row.previousBookingDetails && row.previousBookingDetails.centerName) {

        return row.previousBookingDetails.centerName
    } else {
        return '-'
    }
}

export function amountFormatter(cell, row) {
    let charge = row.bookingType == 'New Booking' ? row.bookingAmount : row.slotChangeAmount
    return `${charge}`
}