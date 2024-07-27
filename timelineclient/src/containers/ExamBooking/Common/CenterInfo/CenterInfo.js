import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'

const CenterInfo = (props) => {
    let center = props.center
    return (
        <Container>
            <Row className = 'py-2'>
                <Col xl={2} lg={3} md={4} sm={12}><span className = "font-weight-bold">Name</span></Col>
                <Col>{ center.name }</Col>
            </Row>
            <Row className = 'py-2'>
                <Col xl={2} lg={3} md={4} sm={12}><span className = "font-weight-bold">City</span></Col>
                <Col>{ center.city }</Col>
            </Row>
            <Row className = 'py-2'>
                <Col xl={2} lg={3} md={4} sm={12}><span className = "font-weight-bold">Address</span></Col>
                <Col>{ center.address }</Col>
            </Row>
            {
                center.googleMapUrl ? (
                    <Row className = 'py-2'>
                        <Col xl={2} lg={3} md={4} sm={12}><span className = "font-weight-bold">Location</span></Col>
                        <Col><a href = {center.googleMapUrl} rel="noopener noreferrer" target = "_blank" >Show on map</a></Col>
                    </Row>
                ): null
            }
        </Container>
    )
}

export default CenterInfo