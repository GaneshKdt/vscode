import React,{  Component } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Col from 'react-bootstrap/Col';


export class IAQuestion extends Component{
    constructor(props) {
        super(props);       
     
    }
    render(){
        return(
            <Col xs={12}>
          <span className="IAResultDetails_Text" >
           {
            this.props.question.type === 1 ||  this.props.question.type === 2 || this.props.question.type === 5 ? (
            this.props.question.studentAnswerCorrect === 1 ? (
             <FontAwesomeIcon size="lg" style={{color:"#2E7D32" , marginRight:"5px" , fontSize: "20px",width: "20px" }} icon="check"/> 
           
            ):(
              <FontAwesomeIcon size="lg" style={{color:"red" , marginRight:"5px" , fontSize: "20px",width: "20px"}} icon="times"/> 
            )
            ):null}
                      <b>Q{this.props.index+1}.</b>
                      <span dangerouslySetInnerHTML = {{__html: this.props.question.question}} ></span>
                      
          </span>
            </Col>
        )
    }
}