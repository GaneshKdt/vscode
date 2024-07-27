import React, { Component } from 'react'
import Card from 'react-bootstrap/Card'
import Col from 'react-bootstrap/Col'
import ResponsiveEmbed from 'react-bootstrap/ResponsiveEmbed'
import Hashtags from '../../Hashtags/Hashtags'
export class VideoCard extends Component {
  render() {
    return (
      <>
      <Card.Body style={{paddingTop: '0rem', backgroundColor : 'white'}}> 
      <Card.Text dangerouslySetInnerHTML = {{__html: this.props.video.content}} style = {{textAlign: 'left'}}/>
      <Hashtags tags={this.props.video}/>
   
          {/* <div className="d-flex ">
              
          </div> */}
          </Card.Body>
          <div className="embed-responsive embed-responsive-16by9">
            {/* <iframe className="embed-responsive-item" src={this.props.serverPath+this.props.video.filePath} allowfullscreen></iframe>
             */}
            <video controls>
              <source className="embed-responsive-item" src={this.props.serverPath+this.props.video.filePath} type="video/mp4"/>
            </video>
            </div>
      </>
    )
  }
}

export default VideoCard



