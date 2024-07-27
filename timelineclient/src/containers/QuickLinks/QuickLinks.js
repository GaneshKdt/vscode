import React, { Component, Fragment } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom'
// import '../IssuanceOfMarksheet/IssuanceOfMarksheet.css';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import ConfigUrls from '../../shared/config'
import {analyticsManager} from '../../shared/Analytics'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import {connect} from 'react-redux';
// import '../SelectSR/SelectSR.css';
// import handleValidation from "../Validations";
import { Table } from 'react-bootstrap';
// import ModalForPreviewMarks from './ModalForPreviewMarks';
import PreviewIcon from '@material-ui/icons/ViewModule';
import DeleteIcon from '@material-ui/icons/Delete';
import LoadingSpinner from '../../shared/LoadingSpinner/LoadingSpinner';
import { LinkContainer } from 'react-router-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


const urls = new ConfigUrls().urls;

class QuickLinks extends Component {
    constructor(props) {
        super(props);
    }
    state = {
        student : this.props.student,
        sapId : this.props.student.sapid,
    }

   

    render(){
        return(
            <>
                <li>
                    <div className="ml-2">
                        <a>
                            <LinkContainer to='/timeline/downloadMarksheet'>
                                <div>Download Marksheet</div>
                            </LinkContainer>
                        </a>
                    </div>
                </li>
               
            </>
            
         
        )
    }
}

const mapStateToProps = state => {
	return {
        student: state,
        imageUrl : state.imageUrl
	}
}

export default connect(mapStateToProps)(QuickLinks)
