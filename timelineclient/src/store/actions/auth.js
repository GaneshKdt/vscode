import * as actionTypes from './actionTypes' ;
import { connect } from 'react-dom';
export const authStart = ()  =>{
    return {
        type: actionTypes.AUTH_START
    };
};

export const authSuccess = (authData) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        authData: authData
    };
};

export const authFail = (error) => {
        return {
            type: actionTypes.AUTH_FAIL,
            error: error
        };
}; 

export const auth = (email, password) => {
    return dispatch=>{
        dispatch(authStart());
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password) => dispatch(action.auth(email, password))
    }
}

export default connect(null, mapDispatchToProps)(Auth);    