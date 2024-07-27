import React, { Component } from 'react';
import axios from 'axios';
import woman4 from '../assets/images/people/110/woman-4.jpg'

class Timeline extends Component{ 
    render(){
        return(
            <div className="mb-2">
                                <div className="card" style={{fontSize: '12px !impotant'}} >
                                    <div className="card-body">
                                        <div className="tab-content">
                                        <div role="tabpanel" className="tab-pane active" id="timeline">
                                    {/* <!-- 1st card timeline --> */}
                                    <div className="card mb-2">
                                    <div className="card-body">
                                        <div className="media">
                                        <img className="mr-2" src={this.props.imageUrl} style={{width: '50px', height: '50px' }} alt="image"/>
                                        <div className="media-body align-self-center"> 
                                            <b><a href="">{this.props.studentData.firstName} {this.props.studentData.lastName}</a></b><span className="text-muted"> to </span><b><a href="">Fox Tales</a></b>
                                            <span id="action_menu_btn" className="text-muted" style={{float: 'right'}}><i className="fas fa-ellipsis-h"></i></span><br/>
                                            <span className="text-muted">Yesterday at 10:14 PM	</span>
                                        </div>
                                        </div><br/>
                                        <div className="action_menu">
                                    <ul>
                                        <li><i className="fas fa-ban"></i> Report...</li>
                                        <li><i className="fas fa-users"></i> Unfollow</li>
                                        <li><i className="far fa-eye-slash"></i> Hide Post</li>
                                        <li><i className="fas fa-share-square"></i> Share</li>
                                    </ul>
                                </div>
                                        <p>Today we say farewell to Gladys Fleetch as she begins a well-deserved retirement.</p>
                                        <p>Gladys joined the original Fox Mills in 1977, working as an assistant pattern cutter. The world has changed a lot since those days, and with our manufacturing heading overseas our business focused on fabric design and technology. And Gladys has stayed with us all this time, serving for so many years in purchasing, marketing, and still keeping her hand in with pattern design. I don't think there's a job here she hasn't done! </p>
                                    
                                    <div className="btn-group" role="group" aria-label="Basic button">
                                        <button type="button" className="btn btn-light" style= {{fontSize: '14px', backgroundColor:' white', color:'gray' }}><i className="fas fa-thumbs-up"></i>&nbsp;&nbsp;&nbsp;Like</button>
                                        <button type="button" className="btn btn-light" data-toggle="collapse" data-target="#collapse-comment1" style={{fontSize: '14px', backgroundColor: 'white', color:'gray'}}><i className="fas fa-comment-alt"></i>&nbsp;&nbsp;&nbsp;Comment</button>
                                        <button type="button" className="btn btn-light" style={{fontSize: '14px', backgroundColor: 'white', color:'gray'}}><i className="fas fa-share"></i>&nbsp;&nbsp;&nbsp;Share</button>
                                    </div>  	
                                    </div>
                                    </div>
                                    
                                    {/* <!-- 2nd card timeline --> */}
                                    <div className="card mb-2">
                                    <div className="card-body">
                                        <div className="media">
                                        <img className="mr-2" src={this.props.imageUrl} style={{width: '50px', height: '50px' }} alt="image"/>
                                        <div className="media-body align-self-center"> 
                                            <b><a href="">{this.props.studentData.firstName} {this.props.studentData.lastName}</a></b><span className="text-muted"> to </span><b><a href="">Business Economics</a></b>
                                            <span id="action_menu_btn" className="text-muted" style={{float: 'right'}}><i className="fas fa-ellipsis-h"></i></span><br/>
                                            <span className="text-muted">Yesterday at 10:14 PM	 </span>
                                        </div>
                                        </div><br/>
                                        <div className="action_menu">
                                    <ul>
                                        <li><i className="fas fa-ban"></i> Report...</li>
                                        <li><i className="fas fa-users"></i> Unfollow</li>
                                        <li><i className="far fa-eye-slash"></i> Hide Post</li>
                                        <li><i className="fas fa-share-square"></i> Share</li>
                                    </ul>
                                </div>
                                        <p>Today we say farewell to Gladys Fleetch as she begins a well-deserved retirement.</p>
                                        <p>Gladys joined the original Fox Mills in 1977, working as an assistant pattern cutter. The world has changed a lot since those days, and with our manufacturing heading overseas our business focused on fabric design and technology. And Gladys has stayed with us all this time, serving for so many years in purchasing, marketing, and still keeping her hand in with pattern design. I don't think there's a job here she hasn't done! </p>
                                    
                                    <div className="btn-group" role="group" aria-label="Basic button">
                                        <button type="button" className="btn btn-light" style={{fontSize: '14px', backgroundColor: 'white', color:'gray'}}><i className="fas fa-thumbs-up"></i>&nbsp;&nbsp;&nbsp;Like</button>
                                        <button type="button" className="btn btn-light" data-toggle="collapse" data-target="#collapse-comment1" style={{fontSize: '14px', backgroundColor: 'white', color:'gray'}}><i className="fas fa-comment-alt"></i>&nbsp;&nbsp;&nbsp;Comment</button>
                                        <button type="button" className="btn btn-light" style={{fontSize: '14px', backgroundColor: 'white', color:'gray'}}><i className="fas fa-share"></i>&nbsp;&nbsp;&nbsp;Share</button>
                                    </div>  	
                                    </div>
                                    </div>
                                    
                                    {/* <!-- 3rd card timeline --> */}
                                    <div className="card mb-2">
                                    <div className="card-body">
                                        <div className="media">
                                        <img className="mr-2" src={this.props.imageUrl} style={{width: '50px', height: '50px'}} alt="image"/>
                                        <div className="media-body align-self-center"> 
                                            <b><a href="">{this.props.studentData.firstName} {this.props.studentData.lastName}</a></b><span className="text-muted"> to </span><b><a href="">Fox Tales</a></b>
                                            <span id="action_menu_btn" className="text-muted" style={{float: 'right'}}><i className="fas fa-ellipsis-h"></i></span><br/>
                                            <span className="text-muted">Yesterday at 10:14 PM	 </span>
                                        </div>
                                        </div><br/>
                                        <div className="action_menu">
                                    <ul>
                                        <li><i className="fas fa-ban"></i> Report...</li>
                                        <li><i className="fas fa-users"></i> Unfollow</li>
                                        <li><i className="far fa-eye-slash"></i> Hide Post</li>
                                        <li><i className="fas fa-share-square"></i> Share</li>
                                    </ul>
                                </div>
                                        <p>Today we say farewell to Gladys Fleetch as she begins a well-deserved retirement.</p>
                                        <p>Gladys joined the original Fox Mills in 1977, working as an assistant pattern cutter. The world has changed a lot since those days, and with our manufacturing heading overseas our business focused on fabric design and technology. And Gladys has stayed with us all this time, serving for so many years in purchasing, marketing, and still keeping her hand in with pattern design. I don't think there's a job here she hasn't done! </p>
                                    
                                    <div className="btn-group" role="group" aria-label="Basic button">
                                        <button type="button" className="btn btn-light" style={{fontSize: '14px', backgroundColor: 'white', color:'gray'}}><i className="fas fa-thumbs-up"></i>&nbsp;&nbsp;&nbsp;Like</button>
                                        <button type="button" className="btn btn-light" data-toggle="collapse" data-target="#collapse-comment1" style={{fontSize: '14px', backgroundColor: 'white', color:'gray'}}><i className="fas fa-comment-alt"></i>&nbsp;&nbsp;&nbsp;Comment</button>
                                        <button type="button" className="btn btn-light" style={{fontSize: '14px', backgroundColor: 'white', color:'gray'}}><i className="fas fa-share"></i>&nbsp;&nbsp;&nbsp;Share</button>
                                    </div>  	
                                    </div>
                                    </div>
                                </div>
                                
                                <div role="tabpanel" className="tab-pane fade" id="about">
                                
                                    <div className="card mb-2">
                                        <div className="card-header"><i className="fas fa-user"></i> About Shirley</div>
                                        <div className="card-body">
                                        <h5>Work</h5><hr/>
                                            <div className="media">
                                            <i className="fas fa-briefcase mr-2 align-self-center"></i>
                                            <div className="media-body">Works at Student and SAAR IT Resources Pvt. Ltd. </div>
                                            </div>
                                            <br/>
                                        <h5>Education</h5><hr/>
                                            <div className="media">
                                            <i className="fas fa-graduation-cap mr-2 align-self-center"></i>
                                            <div className="media-body">YMT College Of Management </div>
                                            </div>
                                            <br/>
                                            <div className="media">
                                            <i className="fas fa-graduation-cap mr-2 align-self-center"></i>
                                            <div className="media-body">Studied B.M.M. (Bachelors in Management) at L.S.Raheja College Of Arts & Commerce </div>
                                            </div>
                                            <br/>
                                            <div className="media">
                                            <i className="fas fa-graduation-cap mr-2 align-self-center"></i>
                                            <div className="media-body">M.L.Dahanukar college of commerce</div>
                                            </div>
                                            <br/>
                                            <div className="media">
                                            <i className="fas fa-home mr-2 align-self-center"></i>
                                            <div className="media-body">Lives in Mumbai, Maharashtra </div>
                                            </div>
                                        </div>
                                    </div>
                                
                                </div>
                                <div role="tabpanel" className="tab-pane fade" id="followers">Followers</div>
                                <div role="tabpanel" className="tab-pane fade" id="more">More</div>
                                    </div>
                                    </div>
                                </div>
                            </div>
        )
    }
}
export default Timeline