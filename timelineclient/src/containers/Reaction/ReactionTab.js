import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export class ReactionTab extends Component {



    render() {
        console.log("reaction grpd")
        console.log(this.props.reaction)
        return ( 
            <div>
                <br/>
                {this.props.reaction.map(function(obj){

                    var userProfile = (obj.userId.slice(0,1)==7)?"studentProfile":"instructorProfile"

                    return (
                        <div className="d-flex px-2 f500">
                            <div className={"w20 reactionButton reaction-count-emoji "+obj.reactionType}></div>
                            <div class="ml-1"></div>
                            <Link to={{pathname:'/timeline/'+userProfile,state: { userId: obj.userId}}} ><b className="">{obj.fullName} </b></Link>
                        </div>
                    );
                  })}
            </div>
        )
    }
}

export default ReactionTab
