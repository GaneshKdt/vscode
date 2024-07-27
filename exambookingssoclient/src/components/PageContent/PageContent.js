import React from 'react'
import ErrorAndLoadingWrapper from '../ErrorAndLoadingWrapper/ErrorAndLoadingWrapper'
import { Row, Container, Alert } from 'react-bootstrap'

const PageContent = (props) => {

    return (
        <Container id={props.id} className = 'mb-5'>
            <Row className="pt-5 px-0 m-0">
                <div className = 'w-100' style={{flex: '1 1 auto'}}>
                    <h5 className="card-title">{ props.title ? props.title : null }</h5>
                    <h6 className="card-subtitle">{ props.subtitle ? props.subtitle : null } </h6>
                    <hr/>
                    {
                        props.errorAlert && props.errorAlertMessage ? (
                            <Alert variant='danger'>
                                { props.errorAlertMessage }
                            </Alert>
                        ) : null
                    }
                    
                    {
                        props.successAlert && props.successAlertMessage ? (
                            <Alert variant='success'>
                                { props.successAlertMessage }
                            </Alert>
                        ) : null
                    }
                    <div id={props.id ? props.id : null} className = 'w-100'>
                        <ErrorAndLoadingWrapper
                            loaded = { props.loaded }
                            error = { props.error }
                            loadingMessage = { props.loadingMessage }
                            errorMessage = { props.errorMessage }
                        >
                            {props.children}
                        </ErrorAndLoadingWrapper>
                    </div>
                </div>
            </Row>
        </Container>
    )
}

export default PageContent