import React, { Component } from "react";
import { ReactReader } from "react-reader";
import {
  Container,
  ReaderContainer,
  Bar,
  Logo,
  CloseButton,
  CloseIcon,
  FontSizeButton
} from "../Components";

// import './epub_viewer.css' 

const storage = global.localStorage || null;

class EPUB_Viewer extends Component {
  constructor(props) {
    super(props);
    this.rendition = null;
    this.state = {}
  }

  toggleFullscreen = () => {
    this.setState(
      {
        fullscreen: !this.state.fullscreen
      },
      () => {
        setTimeout(() => {
          const evt = document.createEvent("UIEvents");
          evt.initUIEvent("resize", true, false, global, 0);
        }, 1000);
      }
    );
  };

  static getDerivedStateFromProps(nextProps, prevState){
    
    // let locationChanged = (location, item) => {
    //   storage && storage.setItem(location, item);
    // }

    if(nextProps.source){
      let source = nextProps.source
      // let location = "epub-location-" + encodeURIComponent(source)
      if(!prevState){
        //First load; no state previously set
        // locationChanged(location, source)
        return {
          source: source,
          fullscreen: false,
          textSize: 5,
          smallerFontSizeEnabled: true,
          largerFontSizeEnabled: true,
        };
      }

      if(nextProps.source == prevState.source){
        //Loaded the same file again
        return prevState
      }else{
        //loaded a different file this time
        // locationChanged(location, "epubcfi(/6/2[cover]!/6)")
        return {
          source: source,
          fullscreen: false,
          textSize: 5,
          smallerFontSizeEnabled: true,
          largerFontSizeEnabled: true,
        };
      }
    }

    return prevState
  }
  

  onLargerFontSize = () => {
    const nextState = (this.state.textSize + 1);
    var willSmallerFontSizeEnabled = true
    var willLargerFontSizeEnabled = true;
    if(nextState == 9){
      willLargerFontSizeEnabled = false;
    }
    this.setState(
      {
        textSize: nextState,
        smallerFontSizeEnabled: willSmallerFontSizeEnabled,
        largerFontSizeEnabled: willLargerFontSizeEnabled,
      },
      () => {

        this.rendition.themes.fontSize(this.getFontSize());
      }
    );
  };

  onSmallerFontSize = () => {
    const nextState = (this.state.textSize - 1);
    var willSmallerFontSizeEnabled = true
    var willLargerFontSizeEnabled = true;
    if(nextState == 1){
      willSmallerFontSizeEnabled = false;
    }
    this.setState(
      {
        textSize: nextState,
        smallerFontSizeEnabled: willSmallerFontSizeEnabled,
        largerFontSizeEnabled: willLargerFontSizeEnabled,
      },
      () => {

        this.rendition.themes.fontSize(this.getFontSize());
      }
    );
  };

  getFontSize(){
    switch(this.state.textSize){
      case 1: return "60%";
      case 2: return "70%";
      case 3: return "80%";
      case 4: return "90%";
      case 5: return "100%";
      case 6: return "110%";
      case 7: return "120%";
      case 8: return "130%";
      case 9: return "140%";
      default: return "100%";
    }
  }

  getRendition = rendition => {
    // Set inital font-size, and add a pointer to rendition for later updates
    this.rendition = rendition;
    rendition.themes.fontSize(this.getFontSize());
  };

  render() {
    return (
      <Container>
        <ReaderContainer className="epub_reader">
          <ReactReader
            url={
              this.state.source
            }
            getRendition={this.getRendition}
          />
          <FontSizeButton disabled={!this.state.largerFontSizeEnabled} onClick={this.onLargerFontSize}>
            Larger font-size
          </FontSizeButton>
          <FontSizeButton disabled={!this.state.smallerFontSizeEnabled} onClick={this.onSmallerFontSize}>
            Smaller font-size
          </FontSizeButton>
        </ReaderContainer>
      </Container>
    );
  }
  onError(e) {
    console.log(e + 'error in file-viewer');
  }
}
export default EPUB_Viewer;