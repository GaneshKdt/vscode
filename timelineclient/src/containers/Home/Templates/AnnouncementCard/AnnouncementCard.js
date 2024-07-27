import React, { Component } from 'react'

// 
import Card from 'react-bootstrap/Card'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Hashtags from '../../../Hashtags/Hashtags'

import './AnnouncementCard.css'

import AnnouncementModal from './AnnouncementModal'
import {Button} from 'react-bootstrap'


const prof_pic = {
	height: '50px',
	width: '50px',
}

const category = {
	fontSize: '14px',
	color: '#3b5998',
}

const view_button = {
	fontSize: '18px !important',
}

class AnnouncementCard extends Component {
	constructor(props) {
		super(props)
		// Sets up our initial state
		this.state = {
            setShow:false
		}
	} 
	handleShow =()=>{
        this.setState({ setShow :!this.state.setShow})
    }
	render() {
		const handleShow = () => {
			this.setState({
				setShow:true
			})
		}
		
		
		var content = (this.props.announcement.content.length>150)?this.props.announcement.content.slice(0, 150)+"...":this.props.announcement.content
		
		return (
			<>
				<Card.Body style={{paddingTop: '0rem', backgroundColor : 'white'}}> 
					<div className="media mb-2">
						<div className="media-body">
							<div className="grey-card">
							<div className="announcement-container">
								<div className="mini-task-item-wrapper">
									<div class="content-left"><FontAwesomeIcon style={{fontSize:'18px'}} icon="bullhorn"/></div>
									<div className="mcq-card-content-center">
										<p  className="announcement-title" dangerouslySetInnerHTML = {{__html: this.props.announcement.fileName}}></p>
										<p   dangerouslySetInnerHTML = {{__html: content}}></p>
										<span className="announcement-subheading">Category:{this.props.announcement.category} 
										<Button variant="link" className="show_announcement_model" onClick={handleShow}>View</Button>
										</span>
									</div>
								</div>
							</div>
							
							<Hashtags tags={this.props.announcement}/>
								
								
							</div>

						</div>
					</div>

	 
				</Card.Body>
                <AnnouncementModal handleShow ={this.handleShow} setShow={this.state.setShow} announcement={this.props.announcement} />
			</>
		)
	}
}

export default AnnouncementCard