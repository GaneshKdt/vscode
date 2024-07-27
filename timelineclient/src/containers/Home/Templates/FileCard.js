import React, { Component } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import Card from 'react-bootstrap/Card'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import ConfigUrls from '../../../shared/config'
import Hashtags from '../../Hashtags/Hashtags'
import './FileCard.css'


const urls = new ConfigUrls().urls;
const previewPath = ['pdf','PDF']
export class FileCard extends Component {
  render() {
		console.log("file state");
		console.log(this.props.file);
		var fileLocation_for_download =  (this.props.file.type=="Resource")?urls.apiUrl_content_download_aws+this.props.file.filePath
		:urls.apiUrl_feed_download_aws+encodeURI(this.props.file.filePath)
		var fileLocation_for_view= (this.props.file.type=="Resource")?urls.apiUrl_content_download_aws+encodeURI(this.props.file.filePath)
		:urls.apiUrl_feed_download_aws+encodeURI(this.props.file.filePath)
		//var fileLocation = "https://studentzone-ngasce.nmims.edu/content//Organisational%20Behaviour/Leadership_Case_Study_X7nZaofGKJ.docx";
 
    return (
		<Card.Body style={{paddingTop: '0rem',  backgroundColor : 'white'}}>

			<Card.Text dangerouslySetInnerHTML = {{__html: this.props.file.content}} style = {{textAlign: 'left'}} />
			<Hashtags tags={this.props.file}/>
				<div  style={fileFrame} >

					<Row className="mx-2">

						<Col md="3" style={fileThumb} >
							<img  className="pt-4"   src={urls.apiUrl_ltiDemo+getImageByFileType(this.props.file.filePath)} alt="Generic placeholder"/>
						</Col>

						<Col md="9" style={fileInfo}>

							<h6 className="pt-0 mt-0">{this.props.file.fileName}</h6>
							<p className="p-0 m-0">File Type: {this.props.file.fileType} File</p>
							{(this.props.file.type=="File" && this.props.file.fileSize)?<p  className="p-0 m-0">File Size: {this.props.file.fileSize}</p>:""}
							<div className="float-right mr-3">
				
							{previewPath.some(word =>  this.props.file.filePath.includes(word))
								?
								
							
							<LinkContainer  
								to = {{
									pathname : "/timeline/documentViewer",
									source:  (fileLocation_for_view)
								}}
								style={fileDwnldBtn}  
							>
								<Button variant="link"
								className="fileHover">
									View 
									{/* <FontAwesomeIcon icon="eye" />   */}
								</Button>
        					</LinkContainer>
  							:
							<Button 
								variant="link" 
								 style={fileViewBtn} 
								className="fileHover" 
								href={fileLocation_for_download}
								target="_blank"
							>
								Download
								{/* <FontAwesomeIcon icon="download" /> */}
							</Button>}
  
</div>


						</Col>

					</Row>
					
				</div>

			</Card.Body>
    )
  }
}

export default FileCard

const POST_FILES_PATH = "D:/feedfiles/"
const downloadFileLink = urls.apiUrl_web_acads + 'downloadFile?filePath='+POST_FILES_PATH;
const fileFrame={width: "100%",
borderRadius: "3px",
border: "1px solid #dfe4e8",
position: "relative",

boxSizing: "border-box"}
const fileThumb={
	textAlign: "center",
	position: "relative",
    width: "100%",
    minHeight: "1px",
    paddingRight: "6px",
	paddingLeft: "6px"
}

const fileInfo={
	padding: "10px",
    verticalAlign: "top"
}	
const fileButton={
	color:"gray",
	paddingRight:"1",
	margin:"1",
	backgroundColor:"white"
}

const fileViewBtn={
	color: "#527aff"
}

const fileDwnldBtn={	
	color: "92c7ff"
}
var getImageByFileType = function(filetype) {
	var fileTypeCssClass;
	fileTypeCssClass = (function() {
	  switch (true) {
	case /video/.test(filetype):
	  return 'assets/images/preview/video.png';
	case /audio/.test(filetype):
	  return 'assets/images/preview/audio.png';
	case /pdf/.test(filetype):
	  return 'assets/images/preview/pdf.png';
	case /csv|excel/.test(filetype):
	  return 'assets/images/preview/spreadsheet.png';
	case /xls|xlsx/.test(filetype):  
		  return 'assets/images/preview/xls.png';       
	case /powerpoint|pptx|ppt/.test(filetype):
	  return 'assets/images/preview/powerpoint.png';
	case /msword|text|docx|doc/.test(filetype):
	  return 'assets/images/preview/document.png';
	case /zip/.test(filetype):
	  return 'assets/images/preview/zip.png';
	case /rar/.test(filetype):
	  return 'assets/images/preview/rar.png';
	default:
	  return 'default-filetype';
	  }
	})();
	return fileTypeCssClass;
	};
