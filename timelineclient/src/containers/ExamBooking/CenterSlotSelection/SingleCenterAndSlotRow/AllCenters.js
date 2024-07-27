import React, { Component } from 'react'
import { Modal, Form, Col, Row, Container, Alert, Card, Button } from 'react-bootstrap'
import Select from "react-select";
import './style.css'
import ErrorComponent from '../../../../components/ErrorComponent/ErrorComponent';
import CenterInfo from '../../Common/CenterInfo/CenterInfo';

class AllCenters extends Component {

    constructor(props) {
        super(props)
        
        this.state = {
            showNoSelectedError : false
        }
    }
    
    componentDidMount() {
        if(this.props.selectedCenter) {
            let center = this.props.selectedCenter
            let stateObj = this.createStateObject(center)
            let cityObj = this.createCityObject(center)
            let centerObj = this.createCenterObject(center)
            this.stateSelected(stateObj)
            this.citySelected(cityObj)
            this.centerSelected(centerObj)
        }
    }

    getStates = () => {

        var states = {}
        this.props.allCenters.forEach((center) => {
            let stateObj = this.createStateObject(center)

            let titleCaseStateName = titleCase(center.state)
            states[titleCaseStateName] = stateObj
        })

        var statesArray = Object.values(states).sort((a,b) => (a.label > b.label) ? 1 : ((b.label > a.label) ? -1 : 0));
        return statesArray
    }

    getCities = () => {

        if(!this.state.selectedState) {
            return []
        }
        let selectedState = this.state.selectedState.value.toUpperCase()
        let centersInState = this.props.allCenters.filter((center) => {
            let isSameState = selectedState === center.state.toUpperCase()
            return isSameState
        })

        var cities = []
        centersInState.forEach((center) => {
            let cityObj = this.createCityObject(center)

            let titleCaseCityName = titleCase(center.city)
            cities[titleCaseCityName] = cityObj
        })

        // This flow is used to make sure no duplicates are returned
        var citiesArray = Object.values(cities).sort((a,b) => (a.label > b.label) ? 1 : ((b.label > a.label) ? -1 : 0));

        return citiesArray
    }

    getCenters = () => {
        if(!this.state.selectedCity) {
            return []
        }

        let selectedState = this.state.selectedState.value.toUpperCase()
        let selectedCity = this.state.selectedCity.value.toUpperCase()

        let centersInStateAndCity = this.props.allCenters.filter((center) => {
            let isSameState = selectedState === center.state.toUpperCase()
            let isSameCity = selectedCity === center.city.toUpperCase()

            return isSameState && isSameCity
        })

        var centersToReturn = []
        centersInStateAndCity.forEach((center) => {
            let centerObj = this.createCenterObject(center)
            centersToReturn.push(centerObj)
        })
        return centersToReturn.sort((a,b) => (a.label > b.label) ? 1 : ((b.label > a.label) ? -1 : 0));
    }

    stateSelected = (selected) => {
        this.setState({
            selectedState : selected,
            selectedCity : null,
            selectedCenter : null,
        })
    }

    citySelected = (selected) => {
        this.setState({
            selectedCity : selected,
            selectedCenter : null,
        })
    }

    centerSelected = (selected) => {
        this.setState({
            selectedCenter : selected,
        })
    }

    saveCenter = () => {
        if(this.state.selectedCenter){
            this.props.saveCenter(this.state.selectedCenter)
            this.props.closed()
        } else {
            this.setState({
                showNoSelectedError : true
            })
        }
    }

    hideError = () => {
        this.setState({
            showNoSelectedError : false
        })
    }
    render() {
        return (
            <Modal 
                show = { this.props.show } 
                onHide={ this.props.closed }
                size = 'lg'
                dialogClassName="centers-list-modal"
                centered
                scrollable
            >
                <Modal.Header closeButton>
                    <Modal.Title>
                        Centers
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Container>
                        <Alert variant="danger" show={ this.state.showNoSelectedError } onClose={this.hideError} dismissible>
                            <p>
                                Please select a center!
                            </p>
                        </Alert>
                        <Row>
                            <Col md={4} sm={12}>
                                <Form.Group controlId="select-state">
                                    <Form.Label>Select State</Form.Label>
                                    <Select
                                        className="w-100 mb-2"
                                        name = "select-state"
                                        value = { this.state.selectedState }
                                        isDisabled =  { false }
                                        isLoading = { false }
                                        options = { this.getStates() }
                                        onChange = { this.stateSelected }
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={4} sm={12}>
                                <Form.Group controlId="select-city">
                                    <Form.Label>Select City</Form.Label>
                                    <Select
                                        className="w-100 mb-2"
                                        name = "select-city"
                                        isDisabled =  { !this.state.selectedState }
                                        value = { this.state.selectedCity }
                                        isLoading = { false }
                                        options = { this.getCities() }
                                        onChange = { this.citySelected }
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={4} sm={12}>
                                <Form.Group controlId="select-center">
                                    <Form.Label>Select Center</Form.Label>
                                    <Select
                                        className="w-100 mb-2"
                                        name = "select-center"
                                        isDisabled =  { !this.state.selectedCity }
                                        value = { this.state.selectedCenter }
                                        isLoading = { false }
                                        options = { this.getCenters() }
                                        onChange = { this.centerSelected }
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                        <hr/>
                        <Row>
                            <Container>
                                <Row>
                                    <Col>
                                        <Card>
                                            <Card.Body className="px-3 py-4">
                                                <h6 className="card-title"> Center Information </h6>
                                                <Container>
                                                    <Row>
                                                        { this.getCenterInfo() }
                                                    </Row>
                                                </Container>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                </Row>
                            </Container>
                        </Row>
                    </Container>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant="secondary"
                        className="mx-1"
                        onClick = { this.props.closed } 
                    >
                        Close
                    </Button>
                    <Button 
                        variant="primary"
                        className="mx-1"
                        onClick = { this.saveCenter } 
                    >
                        Select Center</Button>
                </Modal.Footer>
            </Modal>
        )
    }

    getCenterInfo = () => {
        if(this.state.selectedCenter) {
            return  <CenterInfo center = { this.state.selectedCenter.data }/>
        } else {
            return <ErrorComponent message = { "Please select a center" } ></ErrorComponent>
        }
    }

    createStateObject = (center) => {
        let titleCaseStateName = titleCase(center.state)
        let stateObj = {
            label : titleCaseStateName,
            value : titleCaseStateName,
        }
        return stateObj
    }

    createCityObject = (center) => {
        let titleCaseCityName = titleCase(center.city)
        let cityObj = {
            label : titleCaseCityName,
            value : titleCaseCityName,
        }
        return cityObj
    }

    createCenterObject = (center) => {
        let centerObj = {
            label : center.name,
            value : center.centerId,
            data : center,
        }
        return centerObj
    }
}

function titleCase(str) {
    var splitStr = str.toLowerCase().split(' ');
    for (var i = 0; i < splitStr.length; i++) {
        // You do not need to check if i is larger than splitStr length, as your for does that for you
        // Assign it back to the array
        splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);     
    }
    // Directly return the joined string
    return splitStr.join(' '); 
 }

export default AllCenters