import React, { Component } from 'react';
import vue from '../assets/images/vuejs.png'
import node from '../assets/images/nodejs.png'
import git from '../assets/images/github.png'
import gulp from '../assets/images/gulp.png'

class TabExpertise extends Component{

	state ={
		facultyExpertise : this.props.facultyData,
	}
	componentDidMount(){
		console.log("inside bio------------"+JSON.stringify(this.state.facultyExpertise))
	}
    render(){

		
		
        return(
            <div>
                
            <h6><i className="fas fa-book-reader mr-2 align-self-center"></i> Expertise</h6><hr />
{
	this.props.facultyData.subjectList.map(subject => {
return <><i className="fas fa-book mr-2 align-self-center"></i>{subject}<br /></>
	}) 
}
			 

			  <br />
            
                <div className="card-columns">
			        <div className="card">
			          <div className="card-header bg-white">
			            <div className="media">
			                <a href="take-course.html">
			                  <img src={vue} alt="Card image cap" width="100" className="mr-3"/>
			                </a>
			              <div className="media-body media-middle">
			                <h4 className="card-title"><a href="take-course.html">Organisational Behaviour: Success Strategies</a></h4>
			                <div>
			                  <i className="material-icons text-warning md-18">star</i>
			                  <i className="material-icons text-warning md-18">star</i>
			                  <i className="material-icons text-warning md-18">star</i>
			                  <i className="material-icons text-warning md-18">star</i> 
			                  <i className="material-icons text-warning md-18">star_border</i>
			                </div>
			              </div>
			            </div>
			          </div>
			        </div>
                    <br />
			        <div className="card">
			          <div className="card-header bg-white">
			            <div className="media">
			                <a href="take-course.html">
			                  <img src={node} alt="Card image cap" width="100" className="mr-3"/>
			                </a>
			              <div className="media-body media-middle">
			                <h4 className="card-title"><a href="take-course.html">Managerial Economics</a></h4>
			                <div>
			                  <i className="material-icons text-warning md-18">star</i>
			                  <i className="material-icons text-warning md-18">star</i>
			                  <i className="material-icons text-warning md-18">star</i>
			                  <i className="material-icons text-warning md-18">star</i>
			                  <i className="material-icons text-warning md-18">star_border</i>
			                </div>
			              </div>
			            </div>
			          </div>
			        </div>
                    <br />
			        <div className="card">
			          <div className="card-header bg-white">
			            <div className="media">
			                <a href="take-course.html">
			                  <img src={git} alt="Card image cap" width="100" className="mr-3"/>
			                </a>
			              <div className="media-body media-middle">
			                <h4 className="card-title"><a href="take-course.html">Information Systems for Managers</a></h4>
			                <div>
			                  <i className="material-icons text-warning md-18">star</i>
			                  <i className="material-icons text-warning md-18">star</i>
			                  <i className="material-icons text-warning md-18">star</i>
			                  <i className="material-icons text-warning md-18">star</i>
			                  <i className="material-icons text-warning md-18">star_border</i>
			                </div>
			              </div>
			            </div>
			          </div>
			        </div>
                    <br />
			        <div className="card">
			          <div className="card-header bg-white">
			            <div className="media">
			                <a href="take-course.html">
			                  <img src={gulp} alt="Card image cap" width="100" className="mr-3"/>
			                </a>
			              <div className="media-body media-middle">
			                <h4 className="card-title"><a href="take-course.html">Marketing Management</a></h4>
			                <div>
			                  <i className="material-icons text-warning md-18">star</i>
			                  <i className="material-icons text-warning md-18">star</i>
			                  <i className="material-icons text-warning md-18">star</i>
			                  <i className="material-icons text-warning md-18">star</i>
			                  <i className="material-icons text-warning md-18">star_border</i>
			                </div>
			              </div>
			            </div>
			          </div>
			        </div>
			      </div>
            </div>
        )
    }
}

export default TabExpertise