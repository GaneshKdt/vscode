import React, {useState} from 'react'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

function IssuanceOfTranscript (props)
{
    return(
<>
<Form.Group as={Row}>
<Form.Label column sm="4">
    Service Request Type  :   
</Form.Label>
<Form.Label column sm="7">
    {props.serviceRequestType}
</Form.Label>
</Form.Group>


<Form.Group as={Row}>
<Form.Label column sm="4">
    Charges:
</Form.Label>
<Form.Label column sm="7" className="charges">
    INR. {props.basicCost}/-
(for 3 Transcript and 300 /- for any Additional Transcript)
</Form.Label>
</Form.Group>


<Form.Group as={Row} controlId="numOfCopiesSelected">
<Col sm="10">
    <Form.Control as="select" name="numOfCopiesSelected" onChange={props.handleDropdownChange} >
            <option value="">Select additional Transcript</option>
            {props.noOfTranscripts.map(num =>
                <option value={num} key={num}>{num}</option>
            )}

    </Form.Control>
</Col>
</Form.Group>



</>
    )
}

export default IssuanceOfTranscript
