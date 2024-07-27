import React, { useState } from 'react';

function GoToGatewayForm(props){
    return(
        <form id="submit-payment" action={props.payment_url} method="GET">
                             <input 
                                type  = "hidden" 
                                name  = "sapId" 
                                id    = "sapid" 
                                value = { props.sapId }
                            />

                            <input 
                                type  = "hidden" 
                                name  = "productType" 
                                id    = "productType" 
                                value = "MBAX"
                            />
                             <input 
                                type  = "hidden" 
                                name  = "source" 
                                id    = "source" 
                                value = { "WebApp" }
                            /> 
                            <input 
                                type  = "hidden" 
                                name  = "paymentOptionName" 
                                id    = "paymentOptionName" 
                                value = { props.paymentOptionName }
                            />
                            <input 
                                type  = "hidden" 
                                name  = "serviceRequestId" 
                                id    = "serviceRequestId" 
                                value = { props.serviceRequestId }
                            />
                             <input 
                                type  = "hidden" 
                                name  = "isWeb" 
                                id    = "isWeb" 
                                value = { true }
                            /> 
                            </form>

    );
}

export default GoToGatewayForm
