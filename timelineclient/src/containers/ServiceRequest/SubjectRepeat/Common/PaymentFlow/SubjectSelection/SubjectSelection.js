import React, { Component } from 'react'
import BootstrapTable from 'react-bootstrap-table-next';

class SubjectSelection extends Component {
    getRowSelect = () => {
        return {
            mode: 'checkbox',
            clickToSelect: true,
            selected: this.props.selectedSubjects.map(a => a.subject),
            classes: 'selected-row',
            onSelect: this.props.setSelectedSubjects,
            hideSelectAll: true,
            classes: (row, rowIndex) => {return 'selected-row'}
        }
    }

    render() {
        return (
            <BootstrapTable
                keyField    = { `subject` }
                data        = { this.props.availableSubjects }
                columns     = { columns }
                selectRow   = { this.getRowSelect() }
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
        dataField: 'subject',
        text: 'Subject Name',
        ...columnCommon,
    },{
        dataField: 'sem',
        text: 'Term',
        ...columnCommon,
    }, {
        dataField: 'amount',
        text: 'Charges (₹)',
        ...columnCommon,
}];