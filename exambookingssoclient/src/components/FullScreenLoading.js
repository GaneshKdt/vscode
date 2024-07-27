import React from "react";
import LoadingSpinner from "./LoadingSpinner/LoadingSpinner";

const FullScreenLoading = (props) => {
    return (
        <div style = {{height : '100vh', display : 'flex'}}>
            <LoadingSpinner centerX centerY/>
        </div>
    )
}

export default FullScreenLoading