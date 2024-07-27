import React, { Component } from 'react';

//Uses the ViewerJS library to view the file.
class ViewerJSFileViewer extends Component {
  render() {
    return (
        <div className="mx-auto bg-black h-100">
            <iframe src = {"/ViewerJS/#" + this.props.source } className="w-100 h-100" allowFullScreen webkitallowFullScreen></iframe>
        </div>
    );
  }

  onError(e) {
    console.log(e + 'error in file-viewer');
  }
}

export default ViewerJSFileViewer;