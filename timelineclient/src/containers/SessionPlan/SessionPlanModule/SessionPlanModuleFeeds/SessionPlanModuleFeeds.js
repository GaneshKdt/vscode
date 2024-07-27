import React, { Component } from 'react';
import { connect } from 'react-redux'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './SessionPlanModuleFeeds.css';
import 'material-design-icons/iconfont/material-icons.css';
import ConfigUrls from '../../../../shared/config'
import Container from 'react-bootstrap/Container';
import Timeline from '../../../Timeline/Timeline'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import NavDropdown from 'react-bootstrap/NavDropdown'
import { Link, withRouter } from 'react-router-dom'
const urls = new ConfigUrls().urls; 
var fileTypeSet=[ 
  {icon:"images",name:"Image",iconClass:"far"},
  {icon:"file-video", name:"Video",iconClass:"far"},
  {icon:"file", name:"File",iconClass:"far"},
  {icon:"file-alt", name:"Text",iconClass:"far"},
  {icon:"link", name:"Link",iconClass:"fas"},
  {icon:"bullhorn",name:"Announcement",iconClass:"fas"},
  {icon:"tasks", name:"Assignment",iconClass:"fas"},
  {icon:"play-circle", name:"Session",iconClass:"far"},
  {icon:"book-open", name:"Resource",iconClass:"fas"}
]
class SessionPlanModuleFeeds extends Component {
  constructor(props) {
		super(props)
    this.state = {
        error: null,
        isLoaded: false,
        data: null ,
        id: this.props.id,
        student: this.props.data,
        fileType:null
      };
  }
    
      componentDidMount(){
            console.log('In SessionPlanModuleFeeds componentDidMount()...');
            axios.defaults.headers.post['Content-Type'] = 'application/json';
            axios.post(urls.apiUrl_web_acads+"/api/getLRBySessionPlanModuleId",
            JSON.stringify({
                "id":this.state.id
            })
            ).then( response => {
                
                console.log("IN componentDidMount() got response : ")
                console.log(response);
            this.setState({
                data: response.data,
                isLoaded: true
            })
    
            }).catch(function(error){
                console.log(error);
            })
        
    }
    
  	searchPostByFileType=(key)=>{
      this.setState({
        fileType:key
      })
    } 

  render() { 
    if(!this.state.isLoaded)
    {
      return <div>Loading...</div>;
    }else{
        return <div >
          {/* <Container fluid={true} className="p-4"> */}
            <Container  className="p-4"> 
              <Row>
                <Col xl ={10} lg ={10} md = {12} sm={12}> 
                <NavDropdown  title={
                          <span >Filter posts by <FontAwesomeIcon style={{fontSize:" 11px"}} icon="sort-down"/></span>
                          }  id="collasible-nav-dropdown" >
                            <div className="container-fluid d-flex "> 
                              <div>
                                <span className="mb-1 text-muted"><small>POST TYPE</small></span><br/><br/> 
                                {fileTypeSet.map((type, id) => {
																return <NavDropdown.Item  key={id} style={{paddingLeft:"0px",paddingRight:"0px"}} onClick={(e) => this.searchPostByFileType(type.name)}>
																		<FontAwesomeIcon className="text-muted"  icon={[type.iconClass,type.icon]}/> {type.name}
																	</NavDropdown.Item>
															})}
                              </div>
                            </div>
                          </NavDropdown>
                    <Timeline sessionPlanModuleId={this.state.id} fileType={this.state.fileType}/>
                    
                </Col>
              
              </Row>
          </Container>
        </div> 
    }
  }
}
const mapStateToProps = state => {
	return {
		
	}
}
export default withRouter(connect(mapStateToProps)(SessionPlanModuleFeeds))