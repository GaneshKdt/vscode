import React, { Component } from 'react'
import { Col, Card } from 'react-bootstrap'

import LoadingSpinner from '../../../shared/LoadingSpinner/LoadingSpinner';
import ErrorComponent from '../../../components/ErrorComponent/ErrorComponent'
import QueriesList from '../QueriesList/QueriesList'

export class AllQueries extends Component {
    constructor(props) {
        super(props)
        this.state = {
            queriesLoaded : true,
            error : false,
        }
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
                <Card.Body className="pb-1 pt-3 overflow-auto w-100">
                    <div className="card-title tab-header">
                        All Queries for { currentSubject }
                    </div>
                    <hr/>
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
                                            queries && queries.length > 0 ? (
                                                <Col>
                                                    <QueriesList 
                                                        queries = {queries} 
                                                        type="All Queries"
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

export default AllQueries