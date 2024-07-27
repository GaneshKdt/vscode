import React,{  Component } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Col from 'react-bootstrap/Col';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';

export class IAQuestion extends Component{
    constructor(props) {
        super(props);        
     
    }
    
    render(){ 
        return(
            <Col xs={12}>
          <span className="IAResultDetails_Text" >
           {
            this.props.question.question_type === 1 ||  this.props.question.question_type === 2 || this.props.question.question_type === 5 ? (
            this.props.question.testQuestionsAnsDetails.isCorrect === 'Y' ? (
             <CheckIcon fontSize="large" style={{color:"#2E7D32" , marginRight:"5px" , fontSize: "20px",width: "20px" }} /> 
            
            ):(
              <CloseIcon fontSize="large" style={{color:"red" , marginRight:"5px" , fontSize: "20px",width: "20px"}}  /> 
            )
            ):null}
                  
                      <b >Q{this.props.index+1}.</b>
                      <div className="displayBlockInOneRow" dangerouslySetInnerHTML={{__html: this.props.question.question}} />
                  
          </span>
            </Col>
        )
    }
}