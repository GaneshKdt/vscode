import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import SessionFeedbackForm from './SessionFeedbackForm';
import Card from 'react-bootstrap/Card';

function AllFeedbacks(props) {

  function backFunction(){
    props.history.push({pathname: '/timeline/sessionFeedback',state: { indexvalue:0,pendingFeedbackData: props.location.state.pendingFeedbacks, isHeaderRequired: false, isSideBarRequired  : false}})
  }
    
   function showFeedback(index)
   {
       console.log("Changing index: ",index);
    props.history.push({pathname: '/timeline/sessionFeedback',state: { show:true,indexvalue:index,pendingFeedbackData: props.location.state.pendingFeedbacks, isHeaderRequired: false, isSideBarRequired  : false}})
   }
    console.log(props.location.state.pendingFeedbacks)
    console.log(props)
    return(
     <div>
       <Button id="backButton" variant="danger" onClick={backFunction}>Back</Button>
         {
        props.location.state.pendingFeedbacks.map((pendingFeedbackData,index) =>
        <div key={index}>
          <Card className="text-center">
  <Card.Img variant="top" />
  <Card.Body>
    <Card.Title> Feedback for subject - {pendingFeedbackData.subject} -{" "} </Card.Title>
    <Card.Text>
    Subject, Session: {pendingFeedbackData.subject} -{" "}
            {pendingFeedbackData.sessionName}<br>
            </br> Faculty Name: {pendingFeedbackData.firstName}{" "}
            {pendingFeedbackData.lastName}<br></br>
            Date & Time: {pendingFeedbackData.day},
            {pendingFeedbackData.date},
            {pendingFeedbackData.startTime}
    </Card.Text>
  </Card.Body>
  <Card.Body>
    <Card.Link href="#"> <Button onClick={()=>showFeedback(index)}>View Feedback</Button></Card.Link>
  </Card.Body>
</Card>
        </div>
        )
     }
     </div>
    );
  }

export default AllFeedbacks