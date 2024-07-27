import React, {useState} from 'react'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'; import Card from 'react-bootstrap/Card';

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
    Academic Bank of Credits Id  :   
    </Form.Label>
    <Form.Label column sm="7">
        {props.abcId}
    </Form.Label>
</Form.Group>

{(props.abcId === "" || props.abcId === null)?
<Form.Group as={Row}>
    <div className='Container' >
        <Row>
            <Col sm={12}>
                <Form.Group as={Row} controlId="abcInfoId">                                            
                    <Col sm={{ span: 7, offset: 4 }} className="pl-sm-3">
                        <Card className="p-0">
                            <Card.Header className="p-2">
                                <strong>Update your Academic Bank of Credits Identification number</strong>
                            </Card.Header>
                            <Card.Body>
                                As per the UGC guidelines, it is recommended to create your unique Academic Bank of Credits identification number.
                                <a
                                    href="https://d3q78eohsdsot3.cloudfront.net/resources_2015/How_to_Create_ABC_ID.pdf"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                > Click here </a>
                                to know how to generate your ABC ID.                                
                                <p>
                                <br/><br/>
                                    To update your Academic Bank of Credits Id, please click on 
                                    <a href="publicProfile" rel="noopener noreferrer"> this link. </a> </p>                                                               
                            </Card.Body>
                        </Card>
                    </Col>
                </Form.Group>
            </Col>
        </Row>
    </div>                
</Form.Group>:''}

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
