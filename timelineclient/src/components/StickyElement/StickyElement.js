import React, { Component } from 'react'
import StickyBox from 'react-sticky-box'

var lastBottom = 0
class StickyElement extends Component {
  render() {
      return (
        <StickyBox 
          offsetTop={this.props.topDistance}
          offsetBottom={this.props.bottomDistance}
          style={
            this.props.style? 
              this.props.style : null
          }
        >
            <div id={this.props.id}>
              {this.props.children}
            </div>
        </StickyBox>
      );
  }
}

  export default StickyElement