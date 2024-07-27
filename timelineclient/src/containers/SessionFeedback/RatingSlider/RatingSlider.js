import $ from "jquery";
import React, { Component } from "react";
import { Col, Form, Row } from "react-bootstrap";
export class RatingSlider extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    responses: this.props.stateData.responses,
    displayOthers: this.props.stateData.displayOthers,
    pendingFeedbackData: this.props.stateData.pendingFeedbackData,
  };

  componentDidMount() {
    let displayOthersTemp = this.state.displayOthers;
    let responsesTemp = this.state.responses;
    let stateThis = this;

    //code for slider
    var step = 7;
    $(".slider").each(function () {
      var self = $(this);
      var slider = self.slider({
        create: function () {
          console.log("slide");
          self.find(".text strong").text("-");
          setPathData(
            self.find(".smiley").find("svg path"),
            self.slider("value")
          );
        },
        slide: function (event, ui) {
          displayOthersTemp["rateExpForm"] = "block";
          responsesTemp["rateExp"] = ui.value.toString();
          responsesTemp["q1Response"] = ui.value.toString();
          responsesTemp["q2Response"] = ui.value.toString();
          responsesTemp["q3Response"] = ui.value.toString();
          responsesTemp["q4Response"] = ui.value.toString();
          responsesTemp["q5Response"] = ui.value.toString();
          responsesTemp["q6Response"] = ui.value.toString();
          responsesTemp["q7Response"] = ui.value.toString();
          responsesTemp["q8Response"] = ui.value.toString();

          //---->set display of others fields
          stateThis.setState(
            {
              displayOthers: displayOthersTemp,
              responses: responsesTemp,
            },
            () => {
              if (stateThis.props.onChange) {
                stateThis.props.onChange(stateThis.state);
              }
            }
          );

          console.log("slide");
          self.find(".text strong").text(ui.value);
          setPathData(self.find(".smiley").find("svg path"), ui.value);
        },
        range: "min",
        min: 1,
        max: step,
        value: 1,
        step: 1,
      });
    });

    //to show the face emoticons
    function setPathData(path, value) {
      var firstStep = (6 / step) * value;
      var secondStep = (2 / step) * value;
      path.attr(
        "d",
        "M1," +
          (7 - firstStep) +
          " C6.33333333," +
          (2 + secondStep) +
          " 11.6666667," +
          (1 + firstStep) +
          " 17," +
          (1 + firstStep) +
          " C22.3333333," +
          (1 + firstStep) +
          " 27.6666667," +
          (2 + secondStep) +
          " 33," +
          (7 - firstStep)
      );
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      responses: nextProps.stateData.responses,
      displayOthers: nextProps.stateData.displayOthers,
      pendingFeedbackData: nextProps.stateData.pendingFeedbackData,
    });
  }

  render() {
    return (
      <Form
        className="forFormSessionFeedback"
        style={{ display: this.state.displayOthers["hideAllOtherForms"] }}
      >
        <h6 class="black">
          Please rate your experience for{" "}
          {this.state.pendingFeedbackData.subject} -{" "}
          {this.state.pendingFeedbackData.sessionName}
        </h6>
        <Form.Group as={Row} id="rateExp">
          <Col sm="12">
            <div style={{ padding: "1rem", margin: "5rem 0rem 0rem 3rem" }}>
              <div className="slider rateExp">
                <div className="ui-slider-handle">
                  <div className="smiley">
                    <svg viewBox="0 0 34 10" version="1.1">
                      <path d=""></path>
                    </svg>
                  </div>
                </div>
                <div className="text">
                  <span>
                    <b>Rate</b>
                  </span>{" "}
                  <strong data-val="Rate Exp">-</strong>
                </div>
              </div>
            </div>
          </Col>
        </Form.Group>
        <hr />
      </Form>
    );
  }
}
