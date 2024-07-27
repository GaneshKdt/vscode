import React from 'react';
import axios from 'axios';
import { Paper, Button } from '@material-ui/core';
import { Form } from 'react-bootstrap'
import { connect } from 'react-redux';
import { API } from '../../shared/config';
import { Modal } from 'react-bootstrap';
import ErrorAndLoadingModal from '../../components/ErrorAndLoadingModal/ErrorAndLoadingModal';

function AskQuestion(props) {

	const [ purpose, setPurpose ] = React.useState('');
	const [ category, setCategory ] = React.useState('');
	const [ subject, setSubject ] = React.useState('');
	const [ description, setDescription ] = React.useState('');
    const [ showModal, setShowModal ] = React.useState(false)
    const [ showErrorLoadingModal, setShowErrorLoadingModal ] = React.useState(false)
    const [ loaded, setLoaded ] = React.useState(true)
    const [ error, setError ] = React.useState(false)
    
    const handlePurposeChange = (evt) => {
        setPurpose(evt.target.value)
    }

    const handleCategoryChange = (evt) => {
        setCategory(evt.target.value)
    }

    const handleSubjectChange = (evt) => {
        setSubject(evt.target.value)
    }

    const handleDescriptionChange = (evt) => {
        setDescription(evt.target.value)
    }
    
    const categoryTypes = [ "Admissions", "Academics", "Examinations", "Logistics", "Student Support", "General/Other" ]
    const purposeTypes = [ "Enquiry", "Complaint", "Feedback" ]

    const handleSubmit = () =>{
        setShowModal(true)
    }

    const hideModal = () => {
        setShowModal(false)
    }

    const hideErrorLoadingModal = () => {
        setShowErrorLoadingModal(false)
    }

    const onConfirmSubmit = () => {
        hideModal()
        setShowErrorLoadingModal(true)
        setLoaded(false)

        var body = 'orgid=00D90000000s6BL&retURL=null&encoding=UTF-8&name=' 
                    + props.student.firstName + ' ' + props.student.lastName
                    + '&email=' + props.student.emailId + '&phone=' 
                    + props.student.mobile
                    + '&origin=Web App&recordType=01290000000A959&00N9000000EQXMM=' +
                    purpose+'&00N9000000EPf0L=' + category +'&subject=' 
                    + subject + '&description=' + description + '&submit=null';
        
        axios.defaults.headers.post['Content-Type'] = "application/x-www-form-urlencoded";
        axios.post(
            API.salesForceCreateCase,
            body
        ).then(response =>{
            setLoaded(true)
            setError(false)
        }).catch(function(error){
            setLoaded(true)
            setError(true)
        })
    }
    return (
        <Paper className = 'p-3' style = {{overflowX : 'auto'}}>
            <h6 className="card-title mt-0">
                <span className="my-auto mr-auto">
                    Got a Question?
                </span>
            </h6>
            <hr/>
            <Form>      
                <Form.Group controlId="purpose">
                    <Form.Label> Purpose </Form.Label>
                    <Form.Control 
                        as="select"
                        value={ purpose }
                        onChange={ handlePurposeChange }
                    >
                        <option value="">Select a Purpose</option>
                        {
                            purposeTypes.map((purpose) => {
                                return <option key={`Purpose-${purpose}`} value={purpose}>{purpose}</option>
                            })
                        }
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId="category">
                    <Form.Label> Category </Form.Label>
                    <Form.Control 
                        as="select" 
                        value={category}
                        onChange={ handleCategoryChange }
                    >
                        <option value="">Select a Category</option>
                        {
                            categoryTypes.map((category) => {
                                return <option key={`Category-${category}`} value={category}>{category}</option>
                            })
                        }
                    </Form.Control>
                </Form.Group>
                <Form.Group>
                    <Form.Label> Subject </Form.Label>
                    <Form.Control 
                        type="text" 
                        value={ subject }
                        onChange={ handleSubjectChange } 
                    />
                </Form.Group>

                <Form.Group>
                    <Form.Label> Description </Form.Label>
                    <Form.Control 
                        as="textarea"
                        value={ description }
                        onChange={ handleDescriptionChange }
                    />
                </Form.Group>
                <Button variant="contained" color="primary" id="btnSubmit" onClick={handleSubmit}>Submit Query</Button>
            </Form>
            <ConfirmCase 
                open = { showModal }
                onHide = { hideModal }
                onConfirm = { onConfirmSubmit }
            />
            
            <ErrorAndLoadingModal
                show = { showErrorLoadingModal }
                loaded = { loaded }
                loadingMessage = { 'Creating Request...' }
                successMessage = { 'Your query has been posted successfully.' }
                error = { error }
                errorMessage = { 'Error saving your response. Please try again later' }
                onHide = { hideErrorLoadingModal }
            />
        </Paper>
    )
}

const ConfirmCase = (props) => {
    return (
        <Modal
            show={props.open}
            onHide={props.onHide}
            size="lg"
            centered
        >
            <Modal.Body>
                <h4>Confirm to submit</h4>
                <p>Are you sure you want to submit this query?</p>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide} autoFocus>
                    Cancel
                </Button>
                <Button onClick={props.onConfirm} color="primary">
                    Ok
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

const mapStateToProps = state => {
	return {
        student: state,
        imageUrl : state.imageUrl
	}
}

export default connect(mapStateToProps)(AskQuestion)