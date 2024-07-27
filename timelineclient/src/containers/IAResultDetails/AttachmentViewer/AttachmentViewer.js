import React, { Component } from "react";
import Col from "react-bootstrap/Col";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Card, Row } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import "material-design-icons/iconfont/material-icons.css";
import { withRouter } from "react-router-dom";

const customHeight = {
  height: "100vh"
};
const backBtn = {
  position: "absolute",
  zIndex: "99",
  border: "none",
  outline: "none",
  backgroundColor: "white",
  color: "black",
  cursor: "pointer",
  padding: "5px",
  borderRadius: "50%",
  fontSize: "18px",
  boxShadow:
    "0px 3px 5px -1px rgba(0,0,0,0.2), 0px 6px 10px 0px rgba(0,0,0,0.14), 0px 1px 18px 0px rgba(0,0,0,0.12)"
};
const font14px = {
  fontSize: "30px"
};
export class AttachmentViewer extends Component {
  constructor(props) {
    super(props);
  }
  state = {
    source: ""
  };
  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.location.source !== prevState.source) {
      let source = nextProps.location.source;
      return {
        source: source
      };
    } else {
      return null;
    }
  }
  render() {
    const { source } = this.state;
    return (
      <div style={customHeight}>
        <button style={backBtn} onClick={this.props.history.goBack}>
          <i style={font14px} className="material-icons text-muted">
            chevron_left
          </i>
        </button>
        {source ? (
          <div className="embed-responsive embed-responsive-16by9">
            <iframe
              className="embed-responsive-item"
              src={source}
              allowfullscreen="allowfullscreen"
            ></iframe>
          </div>
        ) : (
          <Card>
            <Card.Body>
              <h5 style={{ textAlign: "center" }}>No Attachment Available</h5>
            </Card.Body>
          </Card>
        )}
      </div>
    );
  }
}

export default withRouter(AttachmentViewer);
