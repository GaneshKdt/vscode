import React from "react";
import { connect } from "react-redux";
import FullScreenLoading from "../components/FullScreenLoading";

function Logout(props){
    props.dispatch({
        type : 'USER_LOGOUT',
        data : {}
    })
    return <FullScreenLoading />
}

export default connect()(Logout);