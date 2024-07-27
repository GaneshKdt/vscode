import React, { Component } from 'react';
import Google_Docs_Viewer from './External/Google_Docs_Viewer';
import EPUB_Viewer from './EPUB/EPUB_Viewer';
// import ViewerJSFileViewer from './ViewerJS/ViewerJSFileViewer';
// import {  Route, Redirect,Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import 'material-design-icons/iconfont/material-icons.css';
import PDF_viewer from './External/PDF_viewer';
const customHeight ={
    height : '100vh'    
}
const backBtn = {
    position: 'absolute',
    //top: '20px', 
    //left: '30px',
    zIndex: '99',
    border: 'none',
    outline: 'none',
    backgroundColor: 'white',
    color: 'black',
    cursor: 'pointer',
    padding: '5px', 
    borderRadius: '50%',
    fontSize: '18px',
    boxShadow: '0px 3px 5px -1px rgba(0,0,0,0.2), 0px 6px 10px 0px rgba(0,0,0,0.14), 0px 1px 18px 0px rgba(0,0,0,0.12)'

  }
const font14px = {
    fontSize: '30px'
}
class FileViewer extends Component {
    constructor(props) {
        // console.log("FileViewer Props")
        // // console.log(props.match.params.src)
        super(props);
    }
    state = {
        fileType: "",
        source: "",
    };
	  
    static getDerivedStateFromProps(nextProps, prevState){
        // console.log('In FileViewer getDerivedStateFromProps()...');
        // console.log("Got nextProps, prevState : ")
        // console.log(nextProps)
        // console.log(prevState)
        // console.log("nextProps.location.source :")
        // console.log(nextProps.location.source)
        if(nextProps.location.source!==prevState.source){
            let source = nextProps.location.source
            // let source = "http://localhost:3000/epubTest/Digital_Marketing.epub"
            // console.log("returnNewValuesObj : ");
            // console.log(returnNewValuesObj);
            return {
                fileType: source.split(".").pop(),
                source: source
            };
        }
        else { 
            // console.log("returning null : ");
            return null;
        }
    }

    render() {
        const { fileType, source } = this.state;
        // console.log("File: " + source);
        // if(fileType == "pdf"){
        //     return (
        //         < ViewerJSFileViewer 
        //             source = {source} 
        //         />
        //     );
        // }else 
        if(fileType == "epub"){
            return ( <div className="">
                <button
                    style={backBtn}  
                    onClick={this.props.history.goBack}>
                    <i
                     style={font14px}
                     className="material-icons text-muted">chevron_left</i>
                </button>

                < EPUB_Viewer 
                    source = {source} 
                />
                </div>
            );
        }else{
            return ( <div style={customHeight}>
                <button
                    style={backBtn}  
                    onClick={this.props.history.goBack}>
                    <i 
                        style={font14px}
                        className="material-icons text-muted">chevron_left</i>
                </button>
                < PDF_viewer 
                    source = {source} 
                />
                </div>
            );
        }
    }
  }
  
  export default withRouter(FileViewer);
