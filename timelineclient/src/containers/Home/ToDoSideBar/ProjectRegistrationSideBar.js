import { Container, OverlayTrigger, Tooltip } from "react-bootstrap";
import { IconButton } from "@material-ui/core";
import { Link } from "react-router-dom";
import { Pages } from "../../../shared/config";
import Moment from "react-moment";
import React from "react";
import TakeTestIcon from '@material-ui/icons/PlayCircleOutline';

function ProjectRegistrationSideBar(props) {
    return (
        <Container>
            <div className="task-item">
                <div className="mini-task-item">
                    <div className="mini-task-item-wrapper">
                        <div className="iaIcon-content-left">
                            <svg data-name="\u7EC4 1 \u62F7\u8D1D" width="28" height="28" style={{marginRight:"1%"}}>
                                <path data-name="\u5F62\u72B6 2" d="M14 0A14 14 0 1 1 0 14 14 14 0 0 1 14 0zm6.662 21.994H7.338a1.332 1.332 0 0 1-1.332-1.332V7.338a1.332 1.332 0 0 1 1.332-1.332h13.324a1.332 1.332 0 0 1 1.332 1.332v13.324a1.332 1.332 0 0 1-1.332 1.332zM8 20.993h8.983V19.01H8v1.983zm9.962-13.009l-3.983 4.053-2.022-1.937-.95 1.2 1.836 1.9.723.795h.723L18.995 9.1zM20 16H8v1.983h12V16z" fill="#3366cc" fill-rule="evenodd"></path>
                            </svg>
                        </div>
                        <div className="content-right">
                            <div className="right-title-wrapper">
                                <div class="right-title" style={{width: "80%"}}>
                                    <Link to={Pages.todo}>
                                        {props.type} - {props.acadMonth} {props.acadYear}
                                    </Link>
                                </div>
                                {(new Date(props.startDateTime) <= new Date() && new Date()  <= new Date(props.endDateTime)) 
                                    && <div className="blinkingButton">Live</div>}
                            </div>
                            <div class="right-sub-box-wrapper">
                                <div class="class-name">
                                    <b>{props.subject}</b>
                                </div>
                            </div>
                            <div class="right-sub-box-wrapper">
                                <div class="class-color-icon" style={{backgroundColor: 'rgb(51, 102, 204)'}}></div>
                                <div class="class-name pl-1">
                                    Register Within: <Moment format="MMM D, hh:mm a \(\I\S\T\)" withTitle>{props.startDateTime}</Moment>
                                    &nbsp;to <Moment format="MMM D, hh:mm a \(\I\S\T\)" withTitle>{props.endDateTime}</Moment>
                                </div>
                                <div class="line"></div>
                                {(new Date(props.startDateTime) <= new Date() && new Date() <= new Date(props.endDateTime)) ?
                                    <Link to={{
                                        pathname: (Pages.projectRegistration),
                                        state: {type: props.type}
                                    }}>
                                        <OverlayTrigger
                                                placement="right-start"
                                                delay={{ show: 250, hide: 400 }}
                                                overlay={<Tooltip>Register</Tooltip>}
                                            >
                                                <IconButton className="takeTestIcon" htmlFor="icon-button-file" aria-label="Add" component="span">
                                                    <TakeTestIcon style={{height:"20px",width:'20px',color:'#007bff'}} />
                                                </IconButton>
                                        </OverlayTrigger>
                                    </Link>
                                    :
                                    <IconButton className="takeTestIcon" htmlFor="icon-button-file" aria-label="Add" component="span" disabled>
                                        <TakeTestIcon style={{height:"20px",width:'20px'}} />
                                    </IconButton>}
                           </div>
                       </div>
                   </div>
               </div>
           </div>
        </Container>
    );
}

export default ProjectRegistrationSideBar;