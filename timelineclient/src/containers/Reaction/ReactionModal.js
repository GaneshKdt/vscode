import React, { Component } from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import { Link } from 'react-router-dom'
import Tabs from 'react-bootstrap/Tabs' 
import Tab from 'react-bootstrap/Tab'
import ReactionTab from './ReactionTab'
import axios from 'axios'
import ConfigUrls from '../../shared/config' 
import './reactionModal.css'
const urls = new ConfigUrls().urls.apiUrl_ltiDemo;
class ReactionModal extends Component { 

    constructor(props) {
        super(props);
        this.state = {
            modalShow:false,
            reactedUserList:[],
            modalPostId:0
        }

    }

     componentWillReceiveProps(nextProps){
          
          if( nextProps.modalShow!==this.state.modalShow){

            this.setState({modalPostId: nextProps.modalPostId,
                modalShow: nextProps.modalShow }
                , () => {
                    this.loadReactedPeople()
                });
          }
      }
  
      loadReactedPeople =()=>{ 
        
        axios.defaults.headers.post['Content-Type'] = 'application/json';
        axios.post(urls+"getReactedUserList",
            JSON.stringify({
                "post_id": this.state.modalPostId,
                "showAll":"true"
            })
        ).then(response => {
            
            this.setState({
               reactedUserList:response.data
            })
        }).catch(function (error) {
            console.log(error);
        })
        }


    render() {

        const {
            reactedUserList,
            modalShow
        } = this.state;

        var groupedByReactionType = groupBy(reactedUserList,"reactionType");
      
        return (
            <Modal show={modalShow} onHide={this.props.handleClose}>
            <Modal.Header closeButton>
            <h6>People who reacted</h6>
            </Modal.Header>
            <Modal.Body className="reaction-modal">

            <Tabs defaultActiveKey="all" id="uncontrolled-tab-example">
            <Tab eventKey="all" title={"All "+reactedUserList.length} >
                <br/>
            {reactedUserList.map(reaction => {

                //check user id and decide user profile link
                var userProfile = (reaction.userId.slice(0,1)==7)?"studentProfile":"instructorProfile"

                return <div className="d-flex px-2 f500 ">
                            <div className={"w20 reactionButton reaction-count-emoji "+reaction.reactionType}></div>
                            <div class="ml-1"></div>
                            <Link to={{pathname:'/timeline/'+userProfile,state: { userId: reaction.userId}}} ><b className="">{reaction.fullName} </b></Link>

                        </div>
            }) }
             </Tab>
            {
                Object.keys(groupedByReactionType).map(function (key,val) {
                    
                     return <Tab eventKey={key} title={ <><span className={"reactionButton col "+key}></span>{groupedByReactionType[key].length} </>}>

                     <ReactionTab reaction ={groupedByReactionType[key]}  />

                     </Tab>
                })
                
            }
            </Tabs>
            </Modal.Body>
          </Modal>
        )
    }
}
export default (ReactionModal)

//group reactions based on reaction emoji
var groupBy = function(xs, key) {
    return xs.reduce(function(rv, x) {
      (rv[x[key]] = rv[x[key]] || []).push(x);
      return rv;
    }, {});
  };