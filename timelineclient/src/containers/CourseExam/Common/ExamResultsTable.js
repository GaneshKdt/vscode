import React from 'react'
import BootstrapTable from 'react-bootstrap-table-next'
import ToolkitProvider from 'react-bootstrap-table2-toolkit';
import { Col, Row, Form, Card } from 'react-bootstrap';
import GetTableStructure from './GetTableStructure';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import SubjectResult from '../SubjectResult/SubjectResult';
import ErrorComponent from '../../../components/ErrorComponent/ErrorComponent';
import GenerateTableData from './GenerateTableData';


const tableId = {
    current : 'semester-overview-table',
    passFail : 'semester-overview-table',
    history : '',
    marksheet : 'marksheet-table',
    nonGradedMarksheet : 'marksheet-table',
}

const rowExpand = {
    current : true,
    passFail : true,
    history : false,
    marksheet : false,
    nonGradedMarksheet : false,
}

const checkIfExpandRow = (type) => {
    if( rowExpand[type] ) {
        return { expandRow : RowExpand }
    } else {
        return {}
    }
}

const errorMessages = {
    current : 'You dont have any subjects active in your current registration',
    passFail : 'You dont have any pass fail results available to be shown.',
    history : 'You have no TEE marks available to be shown.',
    marksheet : 'You have no gradesheets available for download.',
    nonGradedMarksheet : 'You have no marksheets available for download.',
}

const headers = {
    current : 'Results for the currently active Term.',
    passFail : 'Pass/Fail status for completed subjects.',
    history : 'Your TEE marks history.',
    marksheet : 'Gradesheet Download.',
    nonGradedMarksheet : 'Marksheet Download.',
}

const ExamResultsTable = (props) => {
    if(props.data && props.data.length > 0) {
        return (
            <ToolkitProvider
                keyField = 'timeboundId'
                columns = { GetTableStructure(props.type) }
                data = { GenerateTableData(props.data, props.type) }
                search
            >
                {
                    toolkitprops => (
                        <>
                            <Card.Title>
                                <Row className = 'mx-0'>
                                    <Col md = { 12 } lg = { 8 } xl = { 9 }  className = 'mr-lg-auto mt-auto px-0'>
                                        { headers[props.type] }
                                    </Col>
                                    <Col md = { 12 } lg = { 4 } xl = { 3 } className = 'ml-lg-auto px-0'>
                                        <Search { ...toolkitprops.searchProps } />
                                    </Col>
                                </Row>
                            </Card.Title>
                            <Card.Text>
                                <BootstrapTable
                                    { ...toolkitprops.baseProps }
                                    dataSize = { props.data.length }
                                    // bordered={ false }
                                    headerClasses = 'text-nowrap'
                                    classes='border'
                                    defaultSorted = { [{
                                        dataField: 'id',
                                        order: 'asc'
                                    }]}
                                    { ...checkIfExpandRow(props.type) }
                                    id = { tableId[props.type] }
                                    bootstrap4
                                    striped
                                    hover
                                />
                            </Card.Text>
                        </>
                    )
                }
            </ToolkitProvider>
        );
    } else {
        return (
            <Row className = 'mx-0 py-2'>
                <ErrorComponent message = { errorMessages[props.type] } />
            </Row>
        )
    }
}
const Search = (props) => {
    return <Form.Control placeholder = 'Search..' className = 'search-box' onChange = {(event) => props.onSearch(event.target.value) } />
};

const RowExpand = {
    onlyOneExpanding: true,
    renderer: (row) => (
        <SubjectResult timeboundId = { row.timeboundId } />
    ),
    showExpandColumn: true,
    expandHeaderColumnRenderer: ({ isAnyExpands }) => {
        return null
    },
    expandColumnRenderer: ({ expanded }) => {
        return expanded ? <FontAwesomeIcon icon='angle-down' /> : <FontAwesomeIcon icon='angle-up' />
    },
    expandColumnPosition: 'right'
}

export default ExamResultsTable