import React, { Component } from 'react';
import FileViewer from 'react-file-viewer';
import './DOCX_Viewer.css'
import FileExtension from 'file-extension';

//This class is only useful to render docx files.
class DOCX_Viewer extends Component {
  render() {
    return (
        <div className="mx-auto bg-black">
            <FileViewer
              fileType='docx'
              filePath={this.props.source}
              onError={this.onError}
            />
        </div>
    );
  }

  onError(e) {
    console.log(e + 'error in file-viewer');
  }
}

export default DOCX_Viewer;
