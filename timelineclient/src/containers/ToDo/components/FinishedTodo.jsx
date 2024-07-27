import React, { Component } from 'react'
import Dashboard from '@material-ui/icons/Dashboard';
import AssignmentTurnedIn from '@material-ui/icons/AssignmentTurnedIn';
import CheckCircle from '@material-ui/icons/CheckCircle'; 
import Notes from '@material-ui/icons/Notes'; 
import CreditCard from '@material-ui/icons/CreditCard'; 
import Moment from 'react-moment'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
export class TodoTr extends Component {
    render() {
        return (
            this.props.todos.length < 1 ? 
            <h6 className="text-muted text-center" ><FontAwesomeIcon icon="exclamation-circle"/>  No ToDo</h6>
            :this.props.todos.map((todo)=>(
            
                <tr style={{display: 'table-row'}}>
                <td class="px-4">
                    <div class="media-left media-middle">
                        <CreditCard/>
                        
                            <dt>{todo.type}</dt>
                        
                        <small class="card-subtitle"><a
                            href="view-course.html">{todo.subject}</a></small>
                    </div>
                    
                </td>
                <td>
                    <div class="media-body  ">
                        <div class="text-muted"><Moment format="D MMM YYYY" withTitle>{todo.lastDate}</Moment></div>
                    </div>
                </td>
                <td><strong>{todo.grade}</strong> {todo.sem}</td>
                <td><CheckCircle style={{color: '#66BB6A'}}/></td>
        
                </tr>
            ))
        
        )
        
    }
}

export default TodoTr
