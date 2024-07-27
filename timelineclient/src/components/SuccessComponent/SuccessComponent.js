import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import CheckCircle from '@material-ui/icons/CheckCircle'; 

const SuccessComponent = (props) => {
    return (
        <h6 className="text-muted text-center py-4 mx-auto">
            {/* <CheckCircle/> */}
            <FontAwesomeIcon  className="mr-2 text-success" icon="check"/>
            {props.message}
        </h6>
    )
};
export default SuccessComponent