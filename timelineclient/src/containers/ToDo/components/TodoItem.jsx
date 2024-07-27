import React, { Component } from 'react'
import Dashboard from '@material-ui/icons/Dashboard';
import AssignmentTurnedIn from '@material-ui/icons/AssignmentTurnedIn';
import CheckCircle from '@material-ui/icons/CheckCircle'; 
import Notes from '@material-ui/icons/Notes'; 
import CreditCard from '@material-ui/icons/CreditCard'; 
import Moment from 'react-moment'
export class TodoItem extends Component {
    
  render() {
    const todo = this.props.todo
    console.log(todo);
     return (
         <div>
            <div className="py-3">
               
            </div>
            <div className="card card-stats-primary">
                <div className="card-body">
                    <div className="media">
                        <div className="mr-3">
                            {getIcon(todo.subject)}
                            
                        </div> 
                        <div className="media-body media-left">
                            <div>{todo.type}</div>
                            <small className="card-subtitle"><a
                                href="view-course.html">{todo.subject}</a></small>
                        </div>
                        <div className="media-body media-middle ">
                            <div className="card-subtitle">Last Date:<Moment format="D MMM YYYY" withTitle>{todo.lastDate}</Moment></div><br/>
                            <small className="card-subtitle">Sem {todo.sem}</small>
                        </div>
                        <div className="media-right">
                            <span className="badge badge-primary">New</span>
                        </div>
                    </div>
                </div>
            </div>
         </div>
        
    );
  }
}
function getIcon(title){
    if(title==="Project Submission"){
        return <Notes className="text-muted"/>;
    }else if(title==="Assignment Submission"){
        return <Notes className="text-muted"/>;
    }else if(title==="Exam Registration"){
        return <Notes className="text-muted"/>;
    }else{
        return <Notes className="text-muted"/>;
    }
        
}
export default TodoItem
