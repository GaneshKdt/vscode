import React, { Component } from 'react';
import { Document, Page } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import { pdfjs } from 'react-pdf';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight, faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import './PDFReader.css' 
import {
  PDFViewContainer
} from "../Components";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;


var inputTextStyle = {
  'text-align': 'right',
  'background': 'transparent',
  'color': 'inherit',
  'border-width': '1px',
  'border-color': 'white',
  'border-radius': '3px',
};

class PDF_Reader extends Component {

  state = {
    file: "http://localhost:3000/sample.pdf",
    numPages: 0,
    pageNumber: 1
  }

  onDocumentLoadSuccess = ({ numPages }) => {
    this.setState({ numPages });
  }

  pageNumberChanged(event){
    console.log(event.target.value);
    this.setState({
      pageNumber: (event.target.value - 1)
    });
    this.nextPage();
  }

  nextPage = () => {

    const currentPageNumber = this.state.pageNumber;
    let nextPageNumber;

    if (currentPageNumber + 1 > this.state.numPages) {
      nextPageNumber = 1;
    } else {
      nextPageNumber = currentPageNumber + 1;
    }

    this.setState({
      pageNumber: nextPageNumber
    });
  }

  previousPage = () => {

    const currentPageNumber = this.state.pageNumber;
    let prevPageNumber;

    if (currentPageNumber - 1 == 0) {
      prevPageNumber = this.state.numPages;
    } else {
      prevPageNumber = currentPageNumber - 1;
    }

    this.setState({
      pageNumber: prevPageNumber
    });
  }

  render() {
    const { pageNumber, numPages } = this.state;

    return (
      <PDFViewContainer>
        <div className="text-light bg-dark">
          <div className="row w-100">
            <div className="mx-auto">
              <span className="mx-auto">
                <span>
                  <button className="btn text-light" onClick={this.previousPage}> <FontAwesomeIcon icon={faChevronLeft}/></button>
                </span>
                <span>
                  {this.state.file ?<span className="mx-2 align-middle"> <b>Page </b><input type="number" style={inputTextStyle} min={1} value={pageNumber} max={numPages} onChange={(event) => {this.pageNumberChanged(event)}} /><b> / {numPages}</b> </span>: null} 
                </span>
                <span>
                  <button className="btn text-light" onClick={this.nextPage}> <FontAwesomeIcon icon={faChevronRight}/></button>
                </span>
              </span>
            </div>
          </div>
        </div>
        <div className="PDFContent">
          <Document file={this.state.file} onLoadSuccess={this.onDocumentLoadSuccess}>
            <Page className="mx-auto text-center" pageNumber={pageNumber} />
          </Document>
        </div>
      </PDFViewContainer>
    );
  }
}

export default PDF_Reader;