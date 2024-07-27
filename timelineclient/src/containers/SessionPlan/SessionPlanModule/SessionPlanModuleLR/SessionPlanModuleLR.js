import React, { Component } from 'react';
import {  Route, Redirect,Link } from 'react-router-dom';
 
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button'
import './SessionPlanModuleLR.css';
import 'material-design-icons/iconfont/material-icons.css';
import LoadingSpinner from '../../../../shared/LoadingSpinner/LoadingSpinner';
import ConfigUrls from '../../../../shared/config'
import { connect } from 'react-redux'
import $ from "jquery";
import "jquery-ui-bundle";
const urls = new ConfigUrls().urls;

// import { ReactReader } from "react-reader";
//import FileViewer from 'react-file-viewer';
//import { Document, Page } from 'react-pdf';

//const BASE_API_URL ="https://uat-studentzone-ngasce.nmims.edu"
//const BASE_API_URL ="http://localhost:8080"
//const BASE_API_URL ="http://10.100.100.92:8080"
//const BASE_API_URL_2 ="http://10.100.64.78:8080"

const previewPath = ['pdf','PDF']
class SessionPlanModuleLR extends Component {
    state = {
        error: null,
        isLoaded: false,
        data: null ,
		id: this.props.id,
		sapId: this.props.sapId,
				numPages: null,
				pageNumber: 1,
      };
		
			onDocumentLoadSuccess = ({ numPages }) => {
				this.setState({ numPages });
			}
			onError(e) {
				console.log( 'error in file-viewer');
				
				console.log(e)
			}
    
      componentDidMount(){
        console.log('In SessionPlanModuleLR componentDidMount()...');
		this.getLRByIdFromState()
	  }
	
	getLRByIdFromState(){
		console.log('In SessionPlanModuleLR getLRByIdFromState()...');
		this.setState({
			isLoaded: false
		})
		axios.defaults.headers.post['Content-Type'] = 'application/json';
            axios.post(urls.apiUrl_web_acads + "api/getLRBySessionPlanModuleId",
            JSON.stringify({
				"id":this.state.id,
				"sapId":this.state.sapId
            })
            ).then( response => {
                
                console.log("IN componentDidMount() got response : ")
                console.log(response);
            this.setState({
                data: response.data,
                isLoaded: true
            })
								//console.log("EPUB URL : ");
								//console.log(urls.baseUrl + "/content/"+this.state.data.learningResources[3].previewPath);

            }).catch(function(error){
                console.log(error);
            })
	}
	
	componentDidUpdate(prevProps, prevState) {
		console.log('In SessionPlanModuleLR componentDidUpdate()...');
		console.log("Got prevProps, prevState : ")
		console.log(prevProps)
		console.log(prevState)
		if (prevState.id !== this.state.id) {
		  let updateSateObj = {
			id:this.state.id,
			isLoaded: true
		  }
		  console.log("updateSateObj : ");
		  console.log(updateSateObj);
		  this.setState({updateSateObj})
		  this.getLRByIdFromState()
		}else{
		  console.log("No State update : ");
		}
	  }
	  setkey=()=>{
		this.props.dispatch({
			type:'LAST_ACTIVE_TAB' ,
			data:{
				activeTab:"LR"
			}
		});
	  }
	  
	  static getDerivedStateFromProps(nextProps, prevState){
		console.log('In SessionPlanModuleLR getDerivedStateFromProps()...');
		console.log("Got nextProps, prevState : ")
		console.log(nextProps)
		console.log(prevState)
		console.log("nextProps.id :")
		console.log(nextProps.id)
		if(nextProps.id!==prevState.id){
		  let returnNewValuesObj = {
			id: nextProps.id
		  }
		  console.log("returnNewValuesObj : ");
		  console.log(returnNewValuesObj);
		 return returnNewValuesObj;
		}
		else { 
		  console.log("returning null : ");
		  return null;
		}
	  }

	handleBookmark = (event) => {
		console.log("handleBookmark : ", event.target);
		let obj = $(event.target);
		if (!$(event.target).attr("type")) {
		obj = $(event.target).parent().parent();
		console.log("obj : ", $(obj));
		}
		axios.defaults.headers.post["Content-Type"] = "application/json";
		if ($(obj).attr("data-selected") == "no") {
		axios
			.post(
			urls.apiUrl_studentPortals + "setBookmark",
			JSON.stringify({
				id: $(obj).attr("id"),
				bookmarked: "Y",
				url: "content",
				sapId: this.props.sapId,
			})
			)
			.then((response) => {
			$(obj).attr("data-selected", "yes");
			$(obj).find("svg").attr("style", "color:#fabc3d;");
			})
			.catch(function (error) {
			console.log(error);
			});
		} else {
		axios
			.post(
			urls.apiUrl_studentPortals + "setBookmark",
			JSON.stringify({
				id: $(obj).attr("id"),
				sapId: this.props.sapId,
			})
			)
			.then((response) => {
			$(obj).attr("data-selected", "no");
			$(obj).find("svg").attr("style", "");
			})
			.catch(function (error) {
			console.log(error);
			});
		}
	};
    
  render() { 
		
		const { pageNumber, numPages } = this.state;
		
    if(!this.state.isLoaded)
    {
      return <div>Loading...</div>;
    }else{
        return (
		<div  className="text-left sessionplan-container-bg" >	
			
			<div class="">
			<Card className="">
					<Card.Body >
						<Card.Title className = "mt-3">
						<i class="material-icons">folder</i> Resources
						</Card.Title>
						
							{/* <!-- resources from api cards start --> */}
							{
								this.state.data.learningResources.length < 1 
								? <div> <h6 className="text-muted" ><i class="material-icons">error_outline</i> No learning Resources Available </h6> </div>
								: 
								<Col>
								{/* Resources tableview start */}
									
									<Table responsive  className="session-plan-lr">
                            <thead>
                                <tr>
                                <th>Sr. No</th>
                                <th>Name</th>
                                <th>Description</th>
                                <th colSpan="2" className="text-center" >Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                
                                {this.state.data.learningResources.length < 1 ? 
                                        <tr>
                                            <td colSpan="4" className="text-center">
                                            <i class="material-icons">error_outline</i>Learning Resoueces Not Available.</td>
                                        </tr>
                                    
                                    : 
									this.state.data.learningResources.map((content, index)=>{
                                        return(
										(content.previewPath != null)?
                                        <tr key={content.id}>
                                            <td>{index+1}</td>
                                            <td>{content.name}</td>
                                            <td>{content.description}</td>
                                            <td className="text-center"> 
													
														{
															previewPath.some(word => content.previewPath.includes(word))
															? 
															 
															<Link onClick={this.setkey}
																title="View"
																
																to = {{
																pathname : "/timeline/documentViewer",
																source:  (urls.apiUrl_content_download_aws + 
																		 encodeURI(content.previewPath))
																}}
															>
															<Button variant="light ">
															<FontAwesomeIcon icon="eye" />  
															</Button>
															</Link>       
															/* <span className="notification-dot"></span> */
														
														
														:
																<a href={urls.apiUrl_content_download_aws+content.previewPath}
																	title="Download"
																	target="_blank" 
																	>
																	<Button variant="light ">
																	<FontAwesomeIcon icon="download" />
														</Button>
																</a>}
															
															
								

								{content.bookmarked === "Y" ? (
                                      <Button
                                        variant="light"
                                        id={content.id}
                                        data-selected="yes"
                                        onClick={this.handleBookmark}
                                      >
                                        <FontAwesomeIcon
                                          icon="bookmark"
                                          style={{ color: "#fabc3d" }}
                                        />
                                      </Button>
                                    ) : (
                                      <Button
                                        variant="light"
                                        id={content.id}
                                        data-selected="no"
                                        onClick={this.handleBookmark}
                                      >
                                        <FontAwesomeIcon icon="bookmark" />
                                      </Button>
                                    )}
                                            </td>
                                        </tr>
										:<></>
                                        )
                                    })
                                }

                            </tbody>
                        </Table>
						{/* resource tableview end */}

									</Col>
								
							}	
								{/* <!-- resources from api cards end --> */}
						
					</Card.Body>
				</Card>
		    </div>

		</div>
		
		)
        {/* container-fluid ends */}
					
					

    }
  }
}
const mapStateToProps = state => {
    return {
        
    }
}
export default connect(mapStateToProps)(SessionPlanModuleLR)