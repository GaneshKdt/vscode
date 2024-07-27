import React from "react";
import ErrorComponent from "../../../components/ErrorComponent/ErrorComponent";
import LoadingSpinner from "../../LoadingSpinner/LoadingSpinner";


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