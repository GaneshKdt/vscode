import React, { Component } from 'react'
import { Col, Card, Button, Row } from 'react-bootstrap'

import LoadingSpinner from '../../../shared/LoadingSpinner/LoadingSpinner';
import ErrorComponent from '../../../components/ErrorComponent/ErrorComponent'
import QueriesList from '../QueriesList/QueriesList'
import AskQueryModal from '../../../shared/Helpers/QueryHelpers/AskQueryModal';

export class MyQueries extends Component {
    constructor(props) {
        super(props)
        this.state = {
            queriesLoaded : true,
            error : false,
        }
    }

    hideAskFacultyModal = () => {
        this.setState({
            showAskFacultyModal: false,
        })

        this.props.reload()
    }

    showAskFacultyModal = () => {
        this.setState({
            showAskFacultyModal: true,
        })
    }

    render() {

        const {
            queries,
            error,
            queriesLoaded,
            currentSubject,
        } = this.props

        return(
            <div className="mx-2">
                {
                    this.state.showAskFacultyModal ? (
                        <AskQueryModal onClose={this.hideAskFacultyModal}/>
                    ) : null
                }
                <Card.Body className="pb-1 pt-3 overflow-auto w-100">
                    <div className="card-title tab-header d-block mb-0">
                        <Row className="m-0">
                            <div className="mr-auto my-auto">
                                My Queries for { currentSubject }
                            </div>
                            <div className="ml-auto">
                                <Button 
                                    size = 'sm' 
                                    onClick = { this.showAskFacultyModal } 
                                >
                                    Ask a Question
                                </Button>
                            </div>
                        </Row>
                    </div>
                    <hr className="mt-0"/>
                    { 
                        queriesLoaded ? (
                            <>
                                {
                                    error ? (
                                        <Col>
                                            <ErrorComponent message = {"Error loading queries."} />
                                        </Col>
                                    ) : (
                                        <>
                                        {
                                            queries.length > 0 ? (
                                                <Col>
                                                    <QueriesList 
                                                        queries = {queries} 
                                                        type="My Queries"
                                                    />
                                                </Col>
                                            ) : (
                                                <Col>
                                                    <ErrorComponent message = {"No Queries yet!"} />
                                                </Col>
                                            )
                                        }
                                        </>
                                    )
                                }
                            </>
                            
                        ) : (
                            <Col className="text-center my-2">
                                <LoadingSpinner noSpace/>
                            </Col>
                        )
                    }
                </Card.Body>
            </div>
        )
    }
}

export default MyQueries