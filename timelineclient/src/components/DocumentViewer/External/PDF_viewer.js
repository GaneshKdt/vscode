import React, { Component } from 'react';
import Iframe from 'react-iframe';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const handleFullScreen = () => {  
  const iframeElement = document.getElementById('pdfView');
  if (iframeElement.requestFullscreen) {
    iframeElement.requestFullscreen();
  } 
};
const fullScreenStyle = {
  fontSize: '16px',
  marginLeft:'47px',
  cursor: 'pointer',
  position:'absolute',
  top:'9px'
};
const mainDiv = {
  position : 'relative',
  height : '100vh'  
}
class PDF_viewer extends Component {
  state = {
   isMatched : false
  };
  componentDidMount(){
    const matched = window.matchMedia("(max-width: 767px)").matches;
    this.setState({
      isMatched: matched
    });
  }


    render() {
      return (
        <div style={mainDiv}>  
        {!this.state.isMatched ? ( <FontAwesomeIcon onClick={handleFullScreen} className = "fa" icon="expand" style={fullScreenStyle}/>) : ("")}      
    
        <Iframe  id="pdfView"
        url = {'https://d5fsf5hqkq44r.cloudfront.net/pdfjsViewerX/webX/viewer.html?file='+this.props.source+'#zoom=100' }   
        className="w-100 h-100"
        />
        </div>
      );
    }
  
    onError(e) {
      console.log(e + 'error in file-viewer');
    }
  }
  
  export default PDF_viewer;