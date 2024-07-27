import React,{  Component } from "react";
import Card from 'react-bootstrap/Card';



export class CorrectAnswer extends Component{
    constructor(props) {
        super(props);        
     
    }
    render(){
        return(
            this.props.question.testQuestionsAnsDetails.isCorrect === 'N' ? (
                <div style={{marginTop:"20px" , marginBottom:"20px"}}>
                <Card>
               <Card.Body className="IAResultDetails_Text" style={{backgroundColor: "#fcf8e3" ,lineHeight: 1.5 ,borderColor: "#faebcc"}}>
                   
                   Your answer is incorrect.<br/>
                   The Correct answer is:			

                 {  this.props.question.question_type  === 2 ? (
                            <ul style={{ listStyleType: "square" , lineHeight: "26px"}}>
                                { this.props.question.testQuestionOptions.map((option) =>
                                option.isCorrect === 'Y' ? (
                                  <li dangerouslySetInnerHTML={{__html: option.optionData}}></li> 
                                ):null
                               
                               )}
                             
                         </ul>
                   ): this.props.question.testQuestionOptions.map((option) => 

                         option.isCorrect === 'Y' ? (
                        <div  dangerouslySetInnerHTML={{__html: option.optionData}} />
                         ):null 
                         
                    )}
               </Card.Body>
               </Card>	
                               </div>):null
        )
    }
    
}