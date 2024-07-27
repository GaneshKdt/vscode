import React from "react";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import ErrorComponent from "../ErrorComponent/ErrorComponent";


const ErrorAndLoadingWrapper = (props) => {
    if ( !props.loaded ) {
        return (
            <div className="text-center mx-auto">
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