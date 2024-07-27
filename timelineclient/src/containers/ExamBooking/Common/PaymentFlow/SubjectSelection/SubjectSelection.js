import React, { Component } from 'react'
import BootstrapTable from 'react-bootstrap-table-next';

import { bookingStatusFormatter, centerFormatter, amountFormatter } from '../../Functions/SubjectsTable'
import { formatExamDate, formatExamStartTime, formatExamEndTime } from '../../Functions/TimeFormatHelper'
class SubjectSelection extends Component {
    getRowSelect = () => {
        return {
            mode: 'checkbox',
            clickToSelect: true,
            selected: this.props.selectedSubjects.map(a => a.timeboundId),
            nonSelectable: this.props.cantSelectSubjects,
            classes: 'selected-row',
            onSelect: this.props.setSelectedSubjects,
            hideSelectAll: true,
            classes: (row, rowIndex) => {return 'selected-row'}
        }
    }

    render() {
        console.debug('COL : ', columns, columnCommon)
        return (
            <BootstrapTable
                keyField    = { `timeboundId` }
                data        = { this.props.availableSubjects }
                columns     = { columns }
                selectRow   = { this.getRowSelect() }
                rowClasses = { (row, index) => rowClasses(row, this.props.bookingType) }
                bootstrap4
            />
        )
    }
}

export default SubjectSelection

const columnCommon = {
    align: 'left',
    headerAlign: 'left',
    hidden: false,
}

const columns = [{
        dataField: 'timeboundId',
        text: 'Subject Id',
        hidden: true,
    }, {
        dataField: 'subjectName',
        text: 'Subject Name',
        ...columnCommon,
    }, {
        dataField: 'term',
        text: 'Term',
        ...columnCommon,
    }, {
        dataField: 'month',
        text: 'Month',
        ...columnCommon,
    }, {
        dataField: 'year',
        text: 'Year',
        ...columnCommon,
    }, {
        text : 'Booking Status',
        formatter : bookingStatusFormatter,
        ...columnCommon,
    }, {
        text: 'Center',
        formatter : centerFormatter,
        ...columnCommon,
    }, {
        text: 'Exam Date',
        formatter : (cell, row) => formatExamDate(row.previousBookingDetails),
        ...columnCommon,
    }, {
        text: 'Start Time',
        ...columnCommon,
        formatter : (cell, row) => formatExamStartTime(row.previousBookingDetails)
    }, {
        dataField: '',
        text: 'End Time',
        formatter : (cell, row) => formatExamEndTime(row.previousBookingDetails),
        ...columnCommon,
    }, {
        dataField: 'amount',
        text: 'Charges (₹)',
        formatter : amountFormatter,
        ...columnCommon,
}];

const rowClasses = (row, bookingType) => {
    if (bookingType == 'New Booking' ) {
        return row.previousBookingDetails ? 'not-selectable-row' : null
    } else {
        return row.previousBookingDetails ? null : 'not-selectable-row'
    }
};