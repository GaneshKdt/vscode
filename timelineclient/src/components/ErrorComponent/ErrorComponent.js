import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const ErrorComponent = (props) => {
    return (
        <h6 className="text-muted text-center py-4 mx-auto">
            <FontAwesomeIcon  className="mr-2" icon="exclamation-circle"/>
            {props.message}
        </h6>
    )
};
export default ErrorComponent