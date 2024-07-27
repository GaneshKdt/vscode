import $ from "jquery";
import React, { Component } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import FormControls from "../../FormControls/FormControls";
import handleValidation from "../../ServiceRequest/Validations";
export class NotWorkedOptions extends Component {
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

  handleNotWorkedButtonClick = (event) => {
    let displayOthersTemp = this.state.displayOthers;
    let responsesTemp = this.state.responses;
    //let notWorkedArray = this.state.notWorkedArr;
    let stateThis = this;

    if ($(event.target).data("if") == "notSelected") {
      $(event.target).removeClass("btn-outline-primary");
      $(event.target).addClass("btn-primary");
      $(event.target).data("if", "selected");

      // notWorkedArray.push($(event.target).val());

      //set state of notWorkedArr
      // stateThis.setState({
      //   notWorkedArr: notWorkedArray,
      // });

      //responsesTemp["notWorked"] = stateThis.state.notWorkedArr.join(",");

      if ($(event.target).val() == "Others") {
        displayOthersTemp["othersNotWorkedInput"] = "block";
      }
      // if ($(event.target).val() == "Not Attended") {
      //   responsesTemp["attended"] = "N";
      //   displayOthersTemp["notAttendedNotWorkedInput"] = "block";
      // }

      if ($("#rateExpYes").data("if") == "selected") {
        $("#rateExpNotWorkedFormHtml").html("");
        $("#rateExpYes").data("if", "notSelected");
        $("#rateExpYes").removeClass("btn-primary");
        $("#rateExpYes").addClass("btn-outline-primary");

        $("#rateExpNo").data("if", "notSelected");
        $("#rateExpNo").removeClass("btn-primary");
        $("#rateExpNo").addClass("btn-outline-primary");
      }
    } else {
      $(event.target).addClass("btn-outline-primary");
      $(event.target).removeClass("btn-primary");
      $(event.target).data("if", "notSelected");

      // notWorkedArray.pop($(event.target).val());

      //set state of notWorkedArr
      // stateThis.setState({ notWorkedArr: notWorkedArray });

      //responsesTemp["notWorked"] = stateThis.state.notWorkedArr.join(",");

      if ($(event.target).val() == "Others") {
        responsesTemp["othersNotWorked"] = "";
        $("#othersNotWorkedInput textarea").html("");
        displayOthersTemp["othersNotWorkedInput"] = "none";
      }
      // if ($(event.target).val() == "Not Attended") {
      //   responsesTemp["attended"] = "Y";
      //   responsesTemp["reasonForNotAttending"] = "";
      //   $("#othersNotWorkedInput textarea").html("");

      //   displayOthersTemp["notAttendedNotWorkedInput"] = "none";
      // }

      if ($("#rateExpYes").data("if") == "selected") {
        $("#rateExpNotWorkedFormHtml").html("");
        $("#rateExpYes").data("if", "notSelected");
        $("#rateExpYes").removeClass("btn-primary");
        $("#rateExpYes").addClass("btn-outline-primary");

        $("#rateExpNo").data("if", "notSelected");
        $("#rateExpNo").removeClass("btn-primary");
        $("#rateExpNo").addClass("btn-outline-primary");
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
          <h6 class="black">
            Please help us understand what didn't work for you
          </h6>
          <Form.Group as={Row} id="notWorked">
            <Col sm={12} style={{ display: "block", textAlign: "center" }}>
              {Object.keys(options).map(function (key) {
                console.log("key and value : ", key + " " + options[key]);
                return (
                  <Button
                    variant="outline-primary"
                    id={options[key]}
                    data-if="notSelected"
                    value={options[key]}
                    onClick={self.handleNotWorkedButtonClick}
                  >
                    {key}
                  </Button>
                );
              })}
              {/* <Button
                                  variant="outline-primary"
                                  id="notAttendedNotWorked"
                                  data-if="notSelected"
                                  value="Not Attended"
                                  onClick={self.handleNotWorkedButtonClick}
                                  >
                                  Couldn't Attend
                                </Button> */}
              <Button
                variant="outline-primary"
                id="othersNotWorked"
                data-if="notSelected"
                value="Others"
                onClick={self.handleNotWorkedButtonClick}
              >
                Other
              </Button>
            </Col>
          </Form.Group>
          <hr />
        </Form>

        {/* Not Attended Not Worked */}
        {/* <Form
                        className="forFormSessionFeedback"
                        style={{
                        display: this.state.displayOthers["notAttendedNotWorkedInput"],
                        }}
                    >
                        <Form.Group as={Row} id="notAttendedNotWorkedInput">
                        <Col sm="12">
                            <FormControls
                            type="textarea"
                            name="reasonForNotAttending"
                            placeholder="Reason for not Attending"
                            value={this.state.responses["reasonForNotAttending"]}
                            onChange={this.handleOthersInput}
                            errors={JSON.stringify(this.state.errors)}
                            />
                        </Col>
                        </Form.Group>
                        <hr />
                    </Form> */}

        {/* Others Not Worked */}
        <Form
          className="forFormSessionFeedback"
          style={{
            display: this.state.displayOthers["othersNotWorkedInput"],
          }}
        >
          <Form.Group as={Row} id="othersNotWorkedInput">
            <Col sm="12">
              <FormControls
                type="textarea"
                name="othersNotWorked"
                placeholder="Leave a comment"
                value={this.state.responses["othersNotWorked"]}
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
