import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import 'material-design-icons'
import '../Home/Home.css'
import axios from 'axios'
import Card from 'react-bootstrap/Card'

import LoadingSpinner from '../../shared/LoadingSpinner/LoadingSpinner'
import ConfigUrls, { API } from '../../shared/config'

import Post from '../Post/Post'
const urls = new ConfigUrls().urls;

const announcement_modal = {
	backgroundColor: 'rgb(245,245,245)',
	borderRadius: '10px'
}


const announcement_modal_title =
	{ color: '#3b5998' }
const white = {
	backgroundColor: '#ffff'
}

class Timeline extends Component {

	constructor(props) {
		super(props)
		// Sets up our initial state
		this.state = {
			page: 1,
			error: false,
			hasMore: true,
			isLoading: false,
			data: null,
			listOfPosts: [],
			serverPath: null,
			student: this.props.data,
			isGotCurrentTimeboundId: false,
			keyword: null
		}

		window.onscroll = () => {
			////console.log('load More 1')

			// Bails early if:
			// * there's an error
			// * it's already loading
			// * there's nothing left to load
			////console.log('load More 2')
		}
	}

	handleScroll = () => {

		const {
			loadPosts,
			state: {
				error,
				hasMore,
				isLoading,
			},
		} = this

		if (error || isLoading || !hasMore) return;

		// Checks that the page has scrolled to the bottom
		const windowHeight = "innerHeight" in window ? window.innerHeight : document.documentElement.offsetHeight;
		const body = document.body;
		const html = document.documentElement;
		const docHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
		const windowBottom = windowHeight + window.pageYOffset;
		if (windowBottom >= docHeight) {
			//console.log('-------------------------------------------->load More 2')
			//loadPosts();
		}
	}

	componentWillReceiveProps(nextprops) {
		//console.log("IN Timeline componentWillReceiveProps() :");
		//console.log('---------------> Load Posts Called here3')
		if (nextprops != this.props) {
			//console.log("this.props.data.currentTimeboundId : " + this.props.data.currentTimeboundId);
			//console.log("this.state.isLoading : " + this.state.isLoading);
			this.setState({
				showActiveSubjects: true
			})
			//donot load post if posts loaded by componentdidmount
			if (this.props.data.currentTimeboundId) {
				//if (!this.state.isLoading) {
					this.setState({
						listOfPosts: [],
						page: 1
					}, () => {
						this.loadPosts();
					})
	
				//}
			}
		
		}

	}


	componentWillMount() {
		
		if (this.props.data.currentTimeboundId) {
			this.loadPosts()
		}
		window.addEventListener('scroll', this.handleScroll);
	}
	componentWillUnmount() {

		window.removeEventListener('scroll', this.handleScroll);

	}


	loadPosts = () => {
		//console.log('---------------> Load Posts Called here2')
		//console.log(this.props)
		this.setState(
			{ isLoading: true, hasMore: true },
			() => {
				//Check if keyword is present(comes from search bar). if not avoid sending null or undef as input values.
				//Keyword is stored in this.props.location.searchParams from header keyword search
				var keyword = (
					(this.props.keyword ? this.props.keyword : "")
				)

				var facultyId = (
					(this.props.facultyId ? this.props.facultyId : "")
				)
				var fileType = (
					(this.props.facultyId ? this.props.fileType : "")
				)
				var sessionPlanModuleId = (
					(this.props.sessionPlanModuleId ? this.props.sessionPlanModuleId : "")
				)

				this.setState({
					facultyId: facultyId,
					fileType: fileType
				})
				//get timebound from toggling active subject or from left sidebar
				var tb = this.props.timeBoundId //get timebound from toggling active subject 
				var timeBoundId = (tb == 0) ? tb : this.props.data.currentTimeboundId  //get timebound from left sidebar
				var timeBoundId = this.props.keyword ? 0 : timeBoundId //get all posts if searching keyword
				var postType = this.props.postType ? this.props.postType : (timeBoundId == 0) ? "All" : "" //get all post if postType=all or timeBoundId=0
				//console.log("before tl load")
				// console.log("facultyId:" + facultyId +
				// 	"pageId:" + this.state.page +
				// 	"userId:" + this.props.sapId +
				// 	"keyword:" + keyword +
				// 	"timeBoundId:" + timeBoundId +
				// 	"fileType:" + this.props.fileType)
				axios.defaults.headers.post['Content-Type'] = 'application/json';
				// axios.post(API.listPost, 
				axios.post(API.getPostsFromRedis,
					JSON.stringify({
						"facultyId": facultyId,
						"pageId": this.state.page,
						"userId": this.props.sapId,
						"keyword": keyword,
						"timeBoundId": timeBoundId,
						"fileType": this.props.fileType,
						"postType": postType,
						"sessionPlanModuleId": sessionPlanModuleId

					})
				).then(response => {
					try {
						// this.setState({
						// 	hasMore: false,
						// 	isLoading: false,
						// })

						if (response.data.listOfPosts.length > 0) {
							//console.log('--------------------------->Loaded')
							//console.log('---------------> Load Posts Called here4')

							//console.log(response.data)
							this.setState({
								listOfPosts: [],
							},
							()=>{
							
							this.setState({
								data: response.data,
								isLoaded: true,
								page: this.state.page + 1,
								isLoading: false,
								serverPath: response.data.serverPath,
								listOfPosts: [
									//...this.state.listOfPosts,//commneted this as list is appended 4times in prod
									...response.data.listOfPosts,

								],
								keyword: keyword
							}, () => {
								//console.log('IN Timeline endOf listPost() ')
								//console.log('this.state.isLoading ')
								//console.log(this.state.isLoading)

							})	
							})
						}

						else {
							//console.log('--------------------------->No Post')
							this.setState({
								hasMore: false,
								isLoading: false,
								keyword: keyword
							})
						}

					} catch (error) {
						//console.log("IN Timeline catch of then : ");
						//console.log(error);
					}

				}).catch((error) => {
					//console.log('IN Timeline endOf listPost() catch 1 ')
					//console.log(error);
					this.setState({
						hasMore: false,
						isLoading: false,
					}, () => {
						//console.log('IN Timeline endOf listPost() catch')
						//console.log('this.state.isLoading ')
						//console.log(this.state.isLoading)

					})

				})

			}
		)


	}


	render() {

		const {
			error,
			hasMore,
			isLoading,
			listOfPosts,
			serverPath,
			student,
			fileType,
		} = this.state;

		return (
			<>
				{listOfPosts.map(post => {
					//console.log("props &state");
					//console.log(this.props);
					//console.log(this.state);
					return <Post
						post={post}
						serverPath={serverPath}
						loadPosts={this.loadPosts.bind(this)}
					/>
				})}


				{error &&
					<div style={{ color: '#900' }}>
						{error}
					</div>
				}
				{isLoading &&
					<div><LoadingSpinner /></div>
				}
				{(listOfPosts.length > 0 && !hasMore) &&
					<Card className="mb-2">
						<Card.Body>
							<Card.Text className="text-center">All posts loaded</Card.Text>
						</Card.Body>
					</Card>
				}{(listOfPosts.length < 1 && !isLoading) &&
					<Card className="mb-2">
						<Card.Body>
							<Card.Text className="text-center">No Post To Show</Card.Text>
						</Card.Body>
					</Card>
				}
				{/* <jsp:include page="errorMessage.jsp"></jsp:include> */}
				<div id="status"></div>
				<div id="appendable"></div>
				<div className="d-flex justify-content-center loader" >

				</div>

				{/* Modal for announcement */}
				<div className="modal fade" id="announcementModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalScrollableTitle" aria-hidden="true">
					<div className="modal-dialog modal-dialog-scrollable" role="document">
						<div className="modal-content">
							<div className="modal-header">
								<h5 style={announcement_modal_title} className="modal-title" id="exampleModalScrollableTitle">Announcement</h5>
								<button type="button" className="close" data-dismiss="modal" aria-label="Close">
									<span aria-hidden="true">&times;</span>
								</button>
							</div>
							<div className="modal-body" style={announcement_modal}>
								{/* <h5 style="{{font-weight:'500'}}" id="announcement_subject" ></h5> */}
								<div>
									{/* <span style="color:#26a9e0" id="announcement_category"></span> */}
								</div><br />
								{/* <div style="background-color:white;padding:15px 10px;" id="announcement_detail">
                                        </div> */}
								{/* <div id="announcement_attachment" style="margin-top:20px;">
                                        </div> */}
							</div>
						</div>
					</div>
				</div>
			</>

		)
	}
}
const mapStateToProps = state => {
	return {
		sapId: state.sapid,
		data: state,
		currentTimeboundId: state.currentTimeboundId
	}
}

export default connect(mapStateToProps)(Timeline)
