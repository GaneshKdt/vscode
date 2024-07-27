import React from 'react'
import { Container, Row, Card, Col, Alert } from 'react-bootstrap'
import ErrorAndLoadingWrapper from '../../shared/Helpers/ErrorAndLoadingWrapper/ErrorAndLoadingWrapper'

const PageContent = (props) => {

    return (
        <Container>
            <div className="pt-2 pb-4">
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
                <div id={props.id ? props.id : null}>
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
        </Container>
    )
}

export default PageContent