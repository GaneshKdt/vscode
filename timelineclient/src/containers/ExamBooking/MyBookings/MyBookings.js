import React, { Component } from 'react'
import GetStudentBookings from '../Functions/GetStudentBookings'

import { connect } from 'react-redux'

class MyBookings extends Components {
    constructor(props) {
        super(props)
        this.state = {
            
        };
    }

    componentDidMount() {
        GetStudentBookings(this.props.sapid, this.setStateFromHelper)
    }

    setStateFromHelper = (state) => {
        this.setState({
            ...state
        })
    }
    
    render() {
        return(
            <Container id="exam-booking">
                <Row>
                    <Col as={Card}>
                        <Card.Body>
                            <h5 className="card-title mb-0"> Exam Booking </h5>
                            <hr/>

                            <ErrorAndLoadingWrapper
                                loaded = {this.state.loaded}
                                error = {this.state.error}
                                loadingMessage = 'Loading...'
                                errorMessage = { this.state.errorMessage }
                            >
                                <BookedSubjectDetails />
                            </ErrorAndLoadingWrapper>
                        </Card.Body>
                    </Col>
                </Row>
            </Container>
        )
    }
}

const mapStateToProps = state => {
	return {
		sapid: state.sapid
	}
}

export default connect(mapStateToProps)(analyticsManager(MyBookings))