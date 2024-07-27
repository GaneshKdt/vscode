import React, { Component } from 'react';
import Card from 'react-bootstrap/Card';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

class TabContact extends Component{
    state ={
        facultyContact : this.props.facultyData,
    }
    componentDidMount(){
        console.log("inside bio------------"+JSON.stringify(this.state.facultyContact))
    }
    render(){
        return(
            <div>
                <Card>
                    <Card.Body>
                        <h6>Contact</h6>
                        <hr />
                        <p>Email: {this.state.facultyContact.email}</p>
                    </Card.Body>
                </Card>
            </div>
        )
    }
}

export default TabContact