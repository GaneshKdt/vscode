import React, { Component } from 'react'
import Card from 'react-bootstrap/Card'
import Media from 'react-bootstrap/Media'
import Image from 'react-bootstrap/Image'
import noPreview from '../Assets/Default-Logo/noPreview.jpg'
import SessionVideoCard from './SessionCard/SessionVideoCard'
import Hashtags from '../../Hashtags/Hashtags'
export class LinkCard extends Component {
  render() {
	let link =this.props.link
	
	var embedImage=(link.embedImage!="")?link.embedImage:noPreview
    return (
		//if link is youtube or viemo redirect to session card
		(PlayerNeeded((link.embedUrl)))? 
		<SessionVideoCard session={link} url={GeneratePlayerUrl(link.embedUrl)} />
		:
			<Card.Body style={{paddingTop: '0rem', backgroundColor : 'white'}}>
				<Card.Text dangerouslySetInnerHTML = {{__html: link.content}} style = {{textAlign: 'left'}} />
				<Hashtags tags={this.props.link}/>
				<Media >
					<Image src={embedImage} rounded width={100}  height={75} className="align-self-center mr-3 border"/>
					<Media.Body >
						<Card.Subtitle ><Card.Link href={link.embedUrl} target="_blank">{link.embedTitle}</Card.Link></Card.Subtitle> 
						<Card.Text> {link.embedDescription}</Card.Text>
					</Media.Body>
				</Media>
			</Card.Body>
    )
  }
}
const PlayerNeeded = (url) =>{
	return  (url.startsWith("https://youtu.be") || url.startsWith("https://www.youtube.com/")|| 
			url.startsWith("https://player.vimeo.com/") || url.startsWith("https://vimeo.com/"))?true:false	;
}
const GeneratePlayerUrl = (url) =>{
	var videoId = getYoutubeId(url);
	return (videoId==null)?"//player.vimeo.com/video/"+ url.split('/').slice(-1)[0].split('?')[0]:
	 "//www.youtube.com/embed/"+ videoId;
}
const getYoutubeId = (url) =>{
	var match = url.match(/^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/);
	return (match && match[2].length == 11)?match[2]:null
}
export default LinkCard

