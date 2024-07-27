import React,{  Component } from "react";
import Col from 'react-bootstrap/Col';
import { Row, Card } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { LinkContainer } from "react-router-bootstrap";

export class AssignmentAttachment extends Component{
    constructor(props) {
        super(props); 
    }    
    getIconByType(fileType) {
        let icon = "file-pdf";
        if (fileType === "mp4") {
        icon = "file-video";
        }
        return icon;
    }

    getClassByType(fileType) {
        let className = "PDFLinkPdfIcon";
        if (fileType === "mp4") {
        className = "PDFLinkMp4Icon";
        }
        return className;
    }

    getLabelByAttachmentType(attachmentType){
        let label = "Question Attachment";
        if(attachmentType === 'answer'){
            label = "Answer Attachment"
        }
        return  label
    }
    render(){
        return(
        <span className="IAResultDetails_Text">
        
        <Row>
        <LinkContainer
        to={{
        pathname: "/timeline/attachmentViewer",
        source: this.props.source
        }}
        >
            <Col xs={12} sm={8} md={6} xl={4}>
            <Card style={{ marginTop: "8px" }}>
                <Card.Body className="IAResultDetails_optionCard PDFLink_attachmentCard">
                <Row>
                    <Col xs={2}>
                    <FontAwesomeIcon
                        className={this.getClassByType(this.props.fileType)}
                        icon={this.getIconByType(this.props.fileType)}
                    />
                    </Col>
                    <Col xs={10} style={{ fontWeight: 500, top: "10px" }}>
                    {this.getLabelByAttachmentType(this.props.attachmentType)}
                    </Col>
                </Row>
                </Card.Body>
            </Card>
            </Col>            
        </LinkContainer>
        </Row>
        </span>
        )
    }
}