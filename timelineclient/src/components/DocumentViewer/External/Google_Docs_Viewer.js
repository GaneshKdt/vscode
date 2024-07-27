import React, { Component } from 'react';
import Iframe from 'react-iframe';

import $ from 'jquery';

//This class uses google docs to render the file
class Google_Docs_Viewer extends Component {
    render() {
      return (
        <Iframe 
        url = {"https://docs.google.com/gview?url=" + this.props.source + "&embedded=true" }
        id="FileViewer"
        className="w-100 h-100"
        //Only allow scripts and same origin requests from this element.
        sandbox="allow-same-origin allow-scripts"
        />
      );
    }
  
    onError(e) {
      console.log(e + 'error in file-viewer');
    }
  }
  
  export default Google_Docs_Viewer;
