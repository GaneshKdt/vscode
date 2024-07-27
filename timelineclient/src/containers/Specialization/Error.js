import React, { Component } from 'react'
import { Card, Button,Alert } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export class Error extends Component {

    back  = (e) => {
        e.preventDefault();
        this.props.prevStep();
    }

    render() {
        return (
            <>
                <br />
                <Card>
                    <Card.Body>
                        <Alert variant="danger" className="fs-16">
                            <FontAwesomeIcon className="mr-2" icon="times-circle"/> Save Failed. Please try again...
                        </Alert>
                        <Button className="float-right" type="" onClick={e => this.props.handleErrorInSpecializationSelection(e)}>Try Again</Button>
                    </Card.Body>
                </Card>
            </>
        )
    }
}

export default Error
