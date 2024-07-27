import $ from "jquery";
import React, { Component } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import FormControls from "../../FormControls/FormControls";
import handleValidation from "../../ServiceRequest/Validations";
export class WorkedOptions extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    options: this.props.stateData.options,
    responses: this.props.stateData.responses,
    displayOthers: this.props.stateData.displayOthers,
    errors: this.props.stateData.errors,
  };

  componentWillReceiveProps(nextProps) {
    this.setState({
      options: nextProps.stateData.options,
      responses: nextProps.stateData.responses,
      displayOthers: nextProps.stateData.displayOthers,
      errors: nextProps.stateData.errors,
    });
  }

  handleWorkedButtonClick = (event) => {
    let displayOthersTemp = this.state.displayOthers;
    let responsesTemp = this.state.responses;
    // let workedArray = this.state.workedArr;
    let stateThis = this;

    if ($(event.target).data("if") == "notSelected") {
      $(event.target).removeClass("btn-outline-primary");
      $(event.target).addClass("btn-primary");
      $(event.target).data("if", "selected");

      // workedArray.push($(event.target).val());

      //set state of workedArr
      // stateThis.setState({
      //   workedArr: workedArray,
      // });

      //responsesTemp["worked"] = stateThis.state.workedArr.join(",");

      $("#notWorked #" + $(event.target).attr("id")).attr(
        "disabled",
        "disabled"
      );
      $("#notWorked #" + $(event.target).attr("id")).css(
        "cursor",
        "not-allowed"
      );
      $("#notWorked #" + $(event.target).attr("id")).addClass(
        "btn-outline-primary"
      );
      $("#notWorked #" + $(event.target).attr("id")).removeClass("btn-primary");
      $("#notWorked #" + $(event.target).attr("id")).data("if", "notSelected");

      if ($(event.target).val() == "Others") {
        displayOthersTemp["othersWorkedInput"] = "block";
      }
    } else {
      $(event.target).addClass("btn-outline-primary");
      $(event.target).removeClass("btn-primary");
      $(event.target).data("if", "notSelected");

      // workedArray.pop($(event.target).val());

      //set state of workedArr
      // stateThis.setState({
      //   workedArr: workedArray,
      // });

      //responsesTemp["worked"] = stateThis.state.workedArr.join(",");

      $("#notWorked #" + $(event.target).attr("id")).removeAttr("disabled");
      $("#notWorked #" + $(event.target).attr("id")).css("cursor", "pointer");
      if ($(event.target).val() == "Others") {
        responsesTemp["othersWorked"] = "";
        $("#othersWorkedInput textarea").html("");
        displayOthersTemp["othersWorkedInput"] = "none";
      }
    }

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
  };

  handleOthersInput = (evt) => {
    console.log(
      "inside handleOthersInput change------------" + evt.target.value
    );
    let tempResponses = this.state.responses;
    tempResponses[evt.target.name] = evt.target.value;
    this.setState(
      {
        responses: tempResponses,
      },
      () => {
        if (this.props.onChange) {
          this.props.onChange(this.state);
        }
      }
    );
    let field = {
      name: evt.target.name,
      value: evt.target.value,
      type: "mandatoryText",
    };
    handleValidation(this, field);
  };

  render() {
    let options = this.state.options;
    let self = this;
    return (
      <>
        <Form
          className="forFormSessionFeedback"
          style={{ display: this.state.displayOthers["rateExpForm"] }}
        >
          <h6 class="black">Please help us understand what worked for you</h6>
          <Form.Group as={Row} id="worked">
            <Col sm={12} style={{ display: "block", textAlign: "center" }}>
              {Object.keys(options).map(function (key) {
                console.log("key and value : ", key + " " + options[key]);
                return (
                  <Button
                    variant="outline-primary"
                    id={options[key]}
                    data-if="notSelected"
                    value={key}
                    onClick={self.handleWorkedButtonClick}
                  >
                    {key}
                  </Button>
                );
              })}
              <Button
                variant="outline-primary"
                id="othersWorked"
                data-if="notSelected"
                value="Others"
                onClick={self.handleWorkedButtonClick}
              >
                Other
              </Button>
            </Col>
          </Form.Group>
          <hr />
        </Form>

        {/* Others Worked */}
        <Form
          className="forFormSessionFeedback"
          style={{ display: this.state.displayOthers["othersWorkedInput"] }}
        >
          <Form.Group as={Row} id="othersWorkedInput">
            <Col sm="12">
              <FormControls
                type="textarea"
                name="othersWorked"
                placeholder="Leave a comment"
                value={this.state.responses["othersWorked"]}
                onChange={this.handleOthersInput}
                errors={JSON.stringify(this.state.errors)}
              />
            </Col>
          </Form.Group>
          <hr />
        </Form>
      </>
    );
  }
}
