import React, { Component } from 'react'
import { ListGroup, Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'

import { Pages } from '../../../../shared/config'
import AskQueryModal from '../../../../shared/Helpers/QueryHelpers/AskQueryModal';
class AskFaculty extends Component{

	constructor(props) {
		super(props)

		this.state = {
            student:this.props.student,
            loading: false,
            showAskFacultyModal : false,
		}
    }

    hideAskFacultyModal = () => {
        this.setState({
            showAskFacultyModal: false,
        })
    }

    showAskFacultyModal = () => {
        this.setState({
            showAskFacultyModal: true,
        })
    }
    render(){
        return	(
            <>
                {
                    this.state.showAskFacultyModal ? (
                        <AskQueryModal onClose={this.hideAskFacultyModal}/>
                    ) : null
                }
                <Card>
                    <Card.Header style={{backgroundColor : 'white'}}>
                        <Link 
                            onClick={this.showAskFacultyModal}
                        >
                            <div class="media">
                                <div class="media-body media-middle">
                                    <h6 class="card-title">Ask Faculty</h6>
                                    <p class="card-subtitle">Raise an Academic Query</p>
                                </div>
                                <div class="media-right media-middle">
                                    <i class="material-icons">keyboard_arrow_right</i>
                                </div>
                            </div>
                        </Link>
                    </Card.Header>
                    <ListGroup as={Card.Body} variant="flush" className="p-0">
                        <Link to={Pages.courseQueries}>
                            <h6 class="text-center py-3 text-primary">
                                View queries and answers
                            </h6>
                        </Link>
                    </ListGroup>
                </Card>
            </>
        )
    }
}

export default AskFaculty