import React from 'react'
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';

const ErrorComponent = (props) => {
    return (
        <h6 className="text-muted text-center py-4 mx-auto">
            <ErrorOutlineIcon className = 'mr-1'/>
            {props.message}
        </h6>
    )
};
export default ErrorComponent