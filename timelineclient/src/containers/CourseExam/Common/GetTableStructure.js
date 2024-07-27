import React from 'react'
import { Button } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import AxiosHandler from '../../../shared/AxiosHandler/AxiosHandler'
import { API } from '../../../shared/config'
import DownloadMarksheet from './DownloadMarksheet'

const tableStructure = {
    current : [ 'subject', 'term', 'examMonthYear', 'ia', 'tee', 'grace', 'resit', 'total', 'status' ],
    passFail : [ 'subject',  'term', 'examMonthYear','ia', 'tee', 'grace', 'resit', 'total', 'status' ],
    history : [ 'subject', 'term', 'examMonthYear', 'tee' ],
    marksheet : [ 'examMonthYear', 'term', 'marksheet' ],
    nonGradedMarksheet : [ 'examMonthYear', 'term', 'marksheet' ],
}

const GetTableStructure = (type) => {
    const fieldsList = tableStructure[type]
    
    let generatedStructure = []
    generatedStructure.push(structures['timeboundId'])
    // generatedStructure.push(structures['startDate'])
    generatedStructure.push(structures['id'])
    fieldsList.forEach((field) => {
        generatedStructure.push(structures[field])
    })
    return generatedStructure
}

export default GetTableStructure

const getFormattedCell = ( obj ) => {
	return (
		<span className = { `${obj.class} text-capitalize` }> 
			{ obj.value } 
		</span>
	)
}

const structures = {
    tee : {
        dataField: "TEE.value",
        text: "TEE",
        sort: true,
        formatter: (cell, row) => {
            return getFormattedCell( row.TEE )
        },
    },
    resit : {
        dataField: "resit.value",
        text: "Re-Exam",
        formatter: (cell, row) => {
            return getFormattedCell( row.resit )
        },
        sort: true,
    },
    grace : {
        dataField: "grace.value",
        text: "Grace",
        sort: true,
        formatter: (cell, row) => {
            return getFormattedCell( row.grace )
        },
    },
    total : {
        dataField: "total.value",
        text: "Total",
        sort: true,
        formatter: (cell, row) => {
            return getFormattedCell( row.total )
        },
    },
    status : {
        dataField: "status.value",
        text: "Status",
        sort: true,
        formatter: (cell, row) => {
            return getFormattedCell( row.status )
        },
    },
    ia : {
        dataField: "IA.value",
        text: "IA",
        sort: true,
        formatter: (cell, row) => {
            return getFormattedCell( row.IA )
        },
    },
    term : {
        dataField: "term",
        text: "Term",
        sort: true,
    },
    subject : {
        dataField: "subject.value",
        text: "Subject",
        sort: true,
        formatter: (cell, row) => {
            return getFormattedCell( row.subject )
        },
    },
    acadsMonthYear : {
        dataField: "acadsMonthYear.value",
        text: "Month/Year",
        sort: true,
        formatter: (cell, row) => {
            return getFormattedCell( row.acadsMonthYear )
        },
    },
    examMonthYear : {
        dataField: "examMonthYear.value",
        text: "Exam Cycle",
        sort: true,
        formatter: (cell, row) => {
            return getFormattedCell( row.examMonthYear )
        },
    },
    timeboundId : {
        dataField: "timeboundId",
        hidden: true
    },
    startDate : {
        dataField: "startDate",
        hidden: true
    },
    id : {
        dataField: "id.value",
        text: "#",
        sort: true,
        formatter: (cell, row) => {
            return getFormattedCell(row.id)
        },
    },
    marksheet : {
        text: "Download",
        sort: false,
        formatter : (cell, row) => {
            return (
                <DownloadMarksheet
                    {...row}
                />
            )
        }
    }
}