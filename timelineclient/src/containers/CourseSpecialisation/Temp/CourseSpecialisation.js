import React, { Component, Fragment } from 'react'
import {analyticsManager} from '../../../shared/Analytics'
import {connect} from 'react-redux';
import {Card, Accordion, Button, Form, Container, Table} from 'react-bootstrap'
import ConfigUrls, { API } from '../../../shared/config'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

// const urls = new ConfigUrls().urls;

let getSpecialisationTypes = API.getSpecialisationTypes

export class CourseSpecialisation extends Component {
    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    
    }

    state = {
        status : false,
        SpecialisationList : null,
        isSelected : '',
    }

    getSpecialisationTypes = () => {
        axios.defaults.headers.post['Content-Type'] = false;
        axios.post(//urls.apiUrl_exam + "getSpecialisationTypes"
            getSpecialisationTypes, 
        ).then(response =>{
            console.log('Somesh11');
            console.log(response.data)
            this.setState({
                status : response.data.status,
                SpecialisationList : response.data.SpecialisationList
            })
            console.log('Somesh');
            console.log(this.state.status);
            console.log(this.state.SpecialisationList)
        }).catch((error) => {
            console.error(error);
        })
    }

    handleChange(event) {
        this.setState({
            isSelected: event.target.id
        });
     }

    handleSubmit(event) {
        event.preventDefault();
        
        alert(`Seleted ID : ${this.state.isSelected} `);
    }

    componentDidMount(){
        this.getSpecialisationTypes()
    }

    render() {
        return(
            <Container>
                <Card>
                    <Card.Header><h4>Course Specialisation</h4></Card.Header>
                    <Card.Body>
                        {/* <p> Select Specialisation </p> */}
                        <Accordion defaultActiveKey="0">
                            <Card>
                                <Card.Header>
                                <Accordion.Toggle as={Button} variant="link" eventKey="0">
                                    Step - 1 : Select Specialisation Type
                                </Accordion.Toggle>
                                </Card.Header>
                                <Accordion.Collapse eventKey="0">
                                    <Card.Body>
                                        <Form>
                                            <fieldset onClick={this.onClick}>
                                                <Form.Check inline
                                                    type="radio"
                                                    label="Single Specialisation"
                                                    name="specialisationType"
                                                    id="specialisationType1"
                                                />
                                                <Form.Check inline
                                                    type="radio"
                                                    label="Dual Specialisation"
                                                    name="specialisationType"
                                                    id="specialisationType2"
                                                />
                                            </fieldset>
                                        </Form>
                                        <Button className="float-right" variant="primary" type="submit">Confirm</Button><br></br><br></br>
                                    </Card.Body>
                                </Accordion.Collapse>
                            </Card>
                            <Card>
                                <Card.Header>
                                <Accordion.Toggle as={Button} variant="link" eventKey="1">
                                    Step - 2 : Select Specialisation
                                </Accordion.Toggle>
                                </Card.Header>
                                <Accordion.Collapse eventKey="1">
                                <Card.Body>
                                    {this.state.status == 'Success' ? 
                                        <div>
                                            <Form onSubmit={this.handleSubmit}>
                                                <fieldset onClick={this.onClick}>
                                                    
                                                    {this.state.SpecialisationList.map(types => {
                                                        return(
                                                            <Fragment>
                                                                <Form.Check inline
                                                                    type="radio"
                                                                    label={types.specializationType}
                                                                    name="specialisation"
                                                                    id={types.id}
                                                                    checked={this.state.isSelected == types.id}
                                                                    onChange={this.handleChange}
                                                                />
                                                            </Fragment>
                                                        )
                                                    })}
                                                    
                                                </fieldset>
                                                <Button className="float-right" variant="primary" type="submit">Confirm</Button><br></br><br></br>
                                            </Form>
                                        </div> : 
                                        <div>
                                            <FontAwesomeIcon  className="mr-2" icon="exclamation-circle"/> 
                                            No Specialisation Available. Please try again after some time.
                                        </div>
                                    }
                                </Card.Body>
                                </Accordion.Collapse>
                            </Card>
                            <Card>
                                <Card.Header>
                                <Accordion.Toggle as={Button} variant="link" eventKey="2">
                                    Step - 3 : Select Subject
                                </Accordion.Toggle>
                                </Card.Header>
                                <Accordion.Collapse eventKey="2">
                                <Card.Body>
                                    <Table striped bordered hover>
                                        <thead>
                                            <tr>
                                                <th>TERM III</th>
                                                <th>Marketing (MG)</th>
                                                <th>Leadership & Strategy (LS)</th>
                                                <th>Operations & Supply Chain (OS)</th>
                                                <th>Applied Finance (AF)</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>Block 1</td>
                                                <td>Mark</td>
                                                <td>Otto</td>
                                                <td>@mdo</td>
                                                <td>@mdo</td>
                                            </tr>
                                            <tr>
                                                <td>Block 2</td>
                                                <td>Jacob</td>
                                                <td>Thornton</td>
                                                <td>@fat</td>
                                                <td>@mdo</td>
                                            </tr>
                                            <tr>
                                                <td>Block 3</td>
                                                <td>Larry the Bird</td>
                                                <td>@mdo</td>
                                                <td>@twitter</td>
                                                <td>@mdo</td>
                                            </tr>
                                            <tr>
                                                <td>Block 4</td>
                                                <td>Mark</td>
                                                <td>Otto</td>
                                                <td>@mdo</td>
                                                <td>@mdo</td>
                                            </tr>
                                            <tr>
                                                <td rowspan="2">Block 5</td>
                                                <td>Jacob</td>
                                                <td>Thornton</td>
                                                <td>@fat</td>
                                                <td>@mdo</td>
                                            </tr>
                                            <tr>
                                                <td>1</td>
                                                <td>Larry the Bird</td>
                                                <td>@mdo</td>
                                                <td>@twitter</td>
                                            </tr>
                                        </tbody>
                                    </Table>
                                    <Button className="float-right" variant="primary" type="submit">Confirm</Button><br></br><br></br>
                                    </Card.Body>
                                </Accordion.Collapse>
                            </Card>
                        </Accordion>
                    </Card.Body>
                </Card>
            </Container>
        )
    }
}

const mapStateToProps = state => {
	return {
    sapId: state.sapid,
    currentTimeboundId: state.currentTimeboundId
	}
}

export default connect(mapStateToProps)(analyticsManager(CourseSpecialisation)) 
