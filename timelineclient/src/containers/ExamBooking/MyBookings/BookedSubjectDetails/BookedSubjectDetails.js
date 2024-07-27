import React, { Component } from 'react'
import BootstrapTable from 'react-bootstrap-table-next';

class SubjectSelection extends Component {
    render() {
        return (
            <BootstrapTable
                keyField    = { `timeboundId` }
                data        = { this.props.failedSubjects }
                columns     = { columns }
                selectRow   = { this.getRowSelect() }
                noDataIndication="Table is Empty" 
                bootstrap4
            />
        )
    }
}

export default SubjectSelection