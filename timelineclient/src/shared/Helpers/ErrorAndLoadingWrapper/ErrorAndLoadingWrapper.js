import React, { Component } from "react";
import LoadingSpinner from "../../LoadingSpinner/LoadingSpinner";
import ErrorComponent from "../../../components/ErrorComponent/ErrorComponent";


const ErrorAndLoadingWrapper = (props) => {
    if ( !props.loaded ) {
        return (
            <div className="text-center">
                <LoadingSpinner loadingText = { props.loadingMessage } noSpace />
            </div>
        )
    } else if ( props.error ) {
        return <ErrorComponent message = { props.errorMessage } />
    } else {
        return props.children
    }
}

export default ErrorAndLoadingWrapper