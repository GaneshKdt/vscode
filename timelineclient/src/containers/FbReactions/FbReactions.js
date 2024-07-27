import React, { Component } from 'react'
import './newReaction.js'
import './newReaction.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import $ from 'jquery'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
export class FbReactions extends Component {

    constructor(props) {
        super(props)
        this.state = {
            myReaction:""
         }
    } 
    componentWillReceiveProps(nextProps) { 
        this.props = nextProps
        this.state = {
            myReaction:this.props.myReaction
         }
	}     
    componentDidMount(){
        $(this).fbReaction(); 
    } 
    SetReaction =(emoji)=>{
        this.props.handleSetReaction(emoji)
    }

    render() {
        const {
            myReaction
        } = this.state;

        var emojis=[ 
            {emojiName:"Like",emojiClass:"like"},
            {emojiName:"Celebrate", emojiClass:"celebrate"},
            {emojiName:"Love", emojiClass:"love"},
            {emojiName:"Insightful",emojiClass:"insightful"},
            {emojiName:"Curious", emojiClass:"curious"}
        ]

        var myReactionCamelcase=""
        {emojis.map(emoji => {
            if(myReaction===emoji.emojiClass){myReactionCamelcase=emoji.emojiName}
        })}

        return (
            <div className="btn like-btn"  >
                <a class="" style={{color: 'gray'}}> 
                    <span onClick={() =>this.SetReaction(this.props.likeOrUnlike)}>{(myReaction=="")?
                    <span style={{textAlign: 'center'}} ><FontAwesomeIcon  icon="thumbs-up"/>  Like</span>
                    :<div style={{display: 'flex'}}> <Col className={"reactionButton "+myReaction}></Col><Col className="emojiName" style={{color:'#007bff'}} >{myReactionCamelcase}</Col> </div>
                    }
                    </span>
                    <div class="reaction-box">
                        {emojis.map(emoji => {
                            return <div class= {"reaction-icon "+emoji.emojiClass} onClick={()=>this.SetReaction(emoji.emojiClass)}>
                            <label>{emoji.emojiName}</label>
                        </div>
                        })}
                    </div>
                </a>
        </div>
        )
    }
}

export default FbReactions
