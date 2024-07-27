import './QuickBlox.css'
import React, { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faComments,faWindowClose}from '@fortawesome/free-solid-svg-icons'
import {API} from '../../shared/config'
function QuickBlox(props)
{
    var quickBloxUrl=API.quickbloxUrl+"?sapid="+props.sapid+"&firstName="+props.firstName+"&lastName="+props.lastName+"&isAdmin=N";
    const [showChat, setShowChat] = React.useState(false)

    const handleChatDisplay = (status) => {

        console.debug('in handleChatDisplay: '+JSON.stringify(showChat))
        setShowChat(status)

    }

    return(
        <>
            <div className='quickblox-chat-button'>
                 <button id="quickblox-chat-launch-button" className="quickblox-chat-icon"
                    onClick={()=>handleChatDisplay(true)} >
                    <FontAwesomeIcon className="fa-lg" icon={faComments} />
                </button>
            </div>
            <div style={{display:showChat ? 'block' : 'none' }} className='quickblox-chat-box'>
                <iframe  className='quickblox-iFrame'
                            src={quickBloxUrl}
                />
            </div>
            <div id='hide-chat' style={{display:showChat ? 'block' : 'none' }}>
                <button id="quickblox-chat-hide-button" className="close-chat"
                    onClick={()=>handleChatDisplay(false)} >
                    <FontAwesomeIcon className="fa-lg" icon={faWindowClose} />
                </button>
            </div>
        </>
    )
}
export default QuickBlox