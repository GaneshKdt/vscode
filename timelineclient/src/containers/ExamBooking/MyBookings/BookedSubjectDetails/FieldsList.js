import { Button } from "react-bootstrap";

const FieldsList = [
	{ dataField: 'timeboundId'	, text: 'Subject Id'		, hidden: true 									}, 
	{ dataField: 'subjectName'	, text: 'Subject Name'		, hidden: false 								}, 
	{ dataField: 'term'			, text: 'Term'				, hidden: false 								}, 
	{ dataField: 'month'		, text: 'Month'				, hidden: false 								}, 
	{ dataField: 'year'			, text: 'Year'				, hidden: false 								}, 
	{ dataField: 'bookingDate'	, text: 'Booking Date'		, hidden: false 								}, 
	{ dataField: ''				, text: 'Action'			, hidden: false , formatter: reBookingAction	}
]
function reBookingAction(cell, row) {
    return (
        <LinkContainer 
			to = {{
				pathname : "reBookingForSubject",
				timeboundId : row.timeboundId
			}} 
		>
            <Button variant="danger">
                Re Schedule
            </Button>
        </LinkContainer>
    );
}

export default FieldsList