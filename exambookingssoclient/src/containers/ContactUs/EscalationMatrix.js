import React from 'react';
import { Form, Col, Card, Accordion, Table } from 'react-bootstrap'
import { Paper } from '@material-ui/core';

export default function EscalationMatrix(props) {

	const [levelTwoCity, setLevelTwoCityInState] = React.useState('');

    const setLevelTwoCity = (event) =>{
        setLevelTwoCityInState(event.target.value)
    }

	const [levelOneCity, setLevelOneCityInState] = React.useState('');

    const setLevelOneCity = (event) =>{
        setLevelOneCityInState(event.target.value)
    }
    
    const renderContactDetails = (city,level) => {
        var details = levelContactDetails[level][city]

        if(details) {
            return(
                <Table bordered responsive style={{marginTop : '2%'}}>
                    <thead>
                        <tr>
                            <th>City</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{ city }</td>
                            <td>{details.name}</td>
                            <td><a href={`mailto:${details.email}`}>{details.email}</a></td>
                            <td>{details.contact}</td>
                        </tr>
                    </tbody>
                </Table>
            )
        } else {
            return 'Error'
        }
    }

    return (
        <Paper className = 'p-3'>
            <h6 className="card-title mt-0">
                <span className="my-auto mr-auto">
                    Need Any Support? Here is Our Escalation Matrix
                </span>
            </h6>
            <hr/>
            <Accordion>
                <Card>
                    <Accordion.Toggle as={Card.Header} variant="link" eventKey="0">
                        Level 1: Acad Coodinator at the University Regional Office
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey="0">
                        <Card.Body>
                            <p>
                                You can contact our Acad Coordinator along with the SR Number (the unique number you get when you register your service request with NGASCE)
                            </p>
                            <Form.Control
                                as="select"
                                name="levelOneCity"
                                value = { levelOneCity }
                                onChange = { setLevelOneCity }
                            >
                                <option value="">Select a City</option>
                                {
                                    props.cityArray.map((city) => {
                                            return(<option key={`City-Arr-Level-1-${city}`} value={city}>{city}</option>)
                                        }
                                    )
                                }
                            </Form.Control>
                            {
                                levelOneCity ? renderContactDetails(levelOneCity, 1) : null
                            }
                        </Card.Body>
                    </Accordion.Collapse>
                </Card>
                <Card>
                    <Accordion.Toggle as={Card.Header} variant="link" eventKey="1">
                        Level 2: Regional Head at the University Regional Office
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey="1">
                        <Card.Body>
                            <p>
                                To escalate further, you can contact the Regional Head along with the SR Number 
                                (the unique number you get when you register your service request with NGASCE)
                            </p>
                            <Form.Group>
                                <Col>
                                    <Form.Control
                                        as="select"
                                        name="levelTwoCity"
                                        value = { levelTwoCity }
                                        onChange = { setLevelTwoCity }
                                    >
                                        <option value="">Select a City</option>
                                        {
                                            props.cityArray.map((city) => {
                                                    return(<option key={`City-Arr-Level-2-${city}`} value={city}>{city}</option>)
                                                }
                                            )
                                        }
                                    </Form.Control>
                                    {
                                        levelTwoCity ? renderContactDetails(levelTwoCity,2) : null
                                    }
                                </Col>
                            </Form.Group>
                        </Card.Body>
                    </Accordion.Collapse>
                </Card>
                <Card>
                    <Accordion.Toggle as={Card.Header} variant="link" eventKey="2">
                        Level 3: Head Student Services
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey="2">
                        <Card.Body>
                            <p>
                                If you still want to escalate further, you can contact the Head Student Services along with the SR Number 
                                (the unique number you get when you register your service request with NGASCE)
                            </p>
                            { renderContactDetails('Mumbai', 3) }
                        </Card.Body>
                    </Accordion.Collapse>
                </Card>
            </Accordion>
        </Paper>
    )
}

const levelContactDetails = {
    1 : {
        'Mumbai' : {'name' :'Priyanka Pingle','email' : 'ac_mumbai@nmims.edu' ,'contact' : '+91 22 42355775'},
        'Delhi' : {'name' :'Jasmeet Kaur','email' : 'ac_newdelhi@nmims.edu' ,'contact' : '+91 11 4505 3868'},
        'Bangalore' : {'name' :'Poornima K. P.','email' : 'ac_bangalore@nmims.edu' ,'contact' : '+91 80 4085 5513'},
        'Hyderabad' : {'name' :'Afifa Ismath','email' : 'ac_hyderabad@nmims.edu' ,'contact' : '+91 40 2701 5536'},
        'Pune' : {'name' :'Meghana Patange','email' : 'ac_pune@nmims.edu' ,'contact' : '+91 20 2551 1688'},
        'Ahmedabad' : {'name' :'Ketaki Amin','email' : 'ac_ahmedabad@nmims.edu' ,'contact' : '+91 79 4039 3329'},
        'Kolkata' : {'name' :'Sirshendu Sen','email' : 'ac_kolkata@nmims.edu' ,'contact' : '+91 33 4061 4565'},
    },
    2 : {
        'Mumbai' : {'name' :'Anurag Nath','email' : 'Anurag.nath@nmims.edu' ,'contact' : '02235476592'},
        'Delhi' : {'name' :'Salil Nayak','email' : 'Salil.nayak@nmims.edu' ,'contact' : '+91 11 4505 3868'},
        'Bangalore' : {'name' :'Micheal DCruz','email' : 'Michael.dcruz@nmims.edu' ,'contact' : '+91 80 4085 5537'},
        'Hyderabad' : {'name' :'Mohammed Faheem','email' : 'Mohammed.Faheem@nmims.edu' ,'contact' : '+91 40 2701 5536'},
        'Pune' : {'name' :'Nikhil Bhosle','email' : 'Nikhil.bhosale@nmims.edu' ,'contact' : '+91 20 3017 2244'},
        'Ahmedabad' : {'name' :'Deepak Asarsa','email' : 'Deepak.asarsa@nmims.edu' ,'contact' : '+91 79 4039 3328'},
        'Kolkata' : {'name' :'Pranay Kumar','email' : 'Pranay.kumar@nmims.edu' ,'contact' : '+91 33 4061 4562'},
    },
    3 : {
        'Mumbai' : {'name' :'Nelson Soans','email' : 'Nelson.Soans@nmims.edu' ,'contact' : '+91 22 423 55529'}
    }
}