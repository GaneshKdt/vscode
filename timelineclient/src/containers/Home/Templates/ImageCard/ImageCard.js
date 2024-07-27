import React, { Component } from 'react'
import Card from 'react-bootstrap/Card'
import Image from 'react-bootstrap/Image'
import Hashtags from '../../../Hashtags/Hashtags'
class ImageCard extends Component {
    render() {
        return (
            <>
            <Card.Body style={{paddingTop: '0rem', backgroundColor : 'white'}}>
                
                <Card.Text dangerouslySetInnerHTML = {{__html: this.props.image.content}} style = {{textAlign: 'left'}} />
                <Hashtags tags={this.props.image}/>
                </Card.Body>
                <Card.Img variant="bottom" src={this.props.serverPath+this.props.image.filePath} />
                {/* <div className="card-body" ><img className="img-fluid img-thumbnail" src="{this.props.image.filePath}" /></div> */}
            </>
        )
    }

}

export default ImageCard

