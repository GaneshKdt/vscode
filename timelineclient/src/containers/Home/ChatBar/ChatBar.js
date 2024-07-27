import React, { Component } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import LoadingSpinner from '../../../shared/LoadingSpinner/LoadingSpinner'
import './ChatBar.css'
import ConfigUrls from '../../../shared/config'
// import Card from 'react-bootstrap/Card'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const urls = new ConfigUrls().urls;

// const chatSpanStyle = {
//     background: '#4cd137', 
//     borderRadius: '100%',
//     display: 'inline-block', 
//     height: '8px; width: 8px' 
// }

class ChatBar extends Component{
	constructor(props) {
		super(props)
		this.state = {
			isMemberLoaded: false,
			error: false,
			groupMembersData: null,
			members: [],

		}
	}

	componentDidMount() { 
		this.loadGroupMember()
	}
	// static getDerivedStateFromProps(nextProps, prevState){
	// 	console.log('componentWillReceivePropscomponentWillReceiveProps')
		
	// 	console.log(this.props)
	// 	console.log(nextProps)
	// 	console.log(prevState)

	// 	//this.props = nextProps 
	// 	// if(nextProps.currentTimeboundId){
	// 	// 	this.loadGroupMember();
	// 	// }
	// } 
	// componentWillMount(){
	
	// }
	componentWillReceiveProps(nextProps){
		// alert("props received")
		this.props = nextProps
		this.loadGroupMember()

	} 
	// static getDerivedStateFromProps(props, state) {
	// 		this.loadGroupMember();

	//   }

	loadGroupMember = () => {
		//console.log('---------------> this.props.timebound_set' + this.props.currentTimeboundId)

		

		axios.defaults.headers.post['Content-Type'] = 'application/json';
		axios.post(urls.apiUrl_ltiDemo + "/getGroupsMemberForStudent",
			JSON.stringify({
				"timeBoundId": this.props.currentTimeboundId,
				"userId": this.props.sapId
			})
		).then(response => {
			console.log('Got Response data for /getGroupsMemberForStudent --> ')
			console.log(response.data)
			this.setState({
				groupMembersData: response.data.groupsMemberForStudent,
				isMemberLoaded: true,
				isMemberLoading: false,
			})
			console.log(this.state.groupMembersData)
		}).catch(function (error) {
			console.log(error);
		})
	}
	
	
	render() {
		const {
			groupMembersData,
			isMemberLoaded
		} = this.state;

		
		if (!isMemberLoaded) {
			return <LoadingSpinner />
		} else {
	
	return(
				
		<div className="chatBar">
			<div className="p-2 card-header border-bottom">
				<span>
					<FontAwesomeIcon icon="users" />  Groups Members 
				</span>
			</div>

			<div className="p-2">
				{
					groupMembersData.length < 1 ? (
						<div>
							<h6 className="text-muted text-center" >No Group Members!</h6>
						</div>
					): (
						groupMembersData.map (student => {
							return(
								<div className="row mx-0 h-auto py-1 chat-bar">
									<div className="imgContainer">
										<img src={student.imageUrl} onerror="this.onerror=null; this.src='default_user_image.jpg'" alt="No img" width="35" height="35" />
									</div>
									<div className="nameContainer my-auto">
										{student.firstName} {student.lastName}
									</div>
									{/* <div className="col-md-1 mt-2">
										<span style = {chatSpanStyle}></span>
									</div> */}
								</div>
							)
						})
					)
				}
			</div>
		</div>
		)
	}
	   
	
    }
}

const mapStateToProps = state => {
	console.log("mapStateToPropsmapStateToPropsmapStateToPropsmapStateToPropsmapStateToPropsmapStateToPropsmapStateToPropsmapStateToProps")
	console.log(state)
    return {
		sapId: state.sapid,
		currentTimeboundId: state.currentTimeboundId,
		timebound_set: state.timebound_set         
    }
}

export default connect(mapStateToProps)(ChatBar); 