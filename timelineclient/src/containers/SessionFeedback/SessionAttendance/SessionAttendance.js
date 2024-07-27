import $ from "jquery";
import React, { Component } from "react";
import { Col, Form, Row } from "react-bootstrap";
import FormControls from "../../FormControls/FormControls";
import handleValidation from "../../ServiceRequest/Validations";
export class SessionAttendace extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    responses: this.props.stateData.responses,
    remarks: this.props.stateData.remarks,
    displayOthers: this.props.stateData.displayOthers,
    fieldsToValidate: this.props.stateData.fieldsToValidate,
    errors: this.props.stateData.errors,
    reasonArray: this.props.stateData.reasonArray,
  };

  componentWillReceiveProps(nextProps) {
    this.setState({
      responses: nextProps.stateData.responses,
      remarks: nextProps.stateData.remarks,
      displayOthers: nextProps.stateData.displayOthers,
      fieldsToValidate: nextProps.stateData.fieldsToValidate,
      errors: nextProps.stateData.errors,
      reasonArray: nextProps.stateData.reasonArray,
    });
  }

  handleTextChange = (evt) => {
    console.log("inside text change------------" + evt.target.value);
    let tempRemarks = this.state.remarks;
    tempRemarks[evt.target.name] = evt.target.value;
    this.setState(
      {
        remarks: tempRemarks,
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

  handleDropdownChange = (evt) => {
    console.log("inside ddl change------------" + evt.target.value);
    let tempResponses = this.state.responses;
    let tempRemarks = this.state.remarks;
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
    let displayOthersTemp = this.state.displayOthers;
    // var remarksFieldName =  evt.target.name.replace("Response","Remarks");
    //---->if any rating is < 5, hide/show corresponding remarks field
    if (
      parseInt(evt.target.value) < 5 ||
      evt.target.value === "Others" ||
      evt.target.value === "N"
    ) {
      console.log("value < 5");
      displayOthersTemp[evt.target.name + "Remarks"] = "block";
    } else {
      displayOthersTemp[evt.target.name + "Remarks"] = "none";
    }
    if (evt.target.name === "studentConfirmationForAttendance") {
      //---->if attendance is Y then show form, else hide form
      if (evt.target.value === "Y") {
        displayOthersTemp["hideAllOtherForms"] = "block";
        tempResponses["reasonForNotAttending"] = "";
        tempRemarks["otherReasonForNotAttending"] = "";
      }
      if (evt.target.value === "N" || evt.target.value === "") {
        displayOthersTemp["hideAllOtherForms"] = "none";
        displayOthersTemp["rateExpForm"] = "none";
        // displayOthersTemp["othersNotWorkedInput"] = "none";
        // displayOthersTemp["rateExpNotWorkedForm"] = "none";
        // displayOthersTemp["othersWorkedInput"] = "none";

        $(".slider").each(function () {
          $(this).slider({
            value: 1,
          });
          $(this).find(".text strong").html("-");
        });

        $("#worked button").each(function () {
          if ($(this).data("if") == "selected") {
            $(this).click();
            if ($("#othersWorkedInput textarea").html() != "") {
              $("#othersWorkedInput textarea").html("");
            }
          }
        });

        $("#notWorked button").each(function () {
          if ($(this).data("if") == "selected") {
            $(this).click();
            if ($("#othersNotWorkedInput textarea").html() != "") {
              $("#othersNotWorkedInput textarea").html("");
            }
          }
        });

        if ($("#rateExpYes").data("if") == "selected") {
          $("#rateExpYes").data("if", "notSelected");
          $("#rateExpYes").removeClass("btn-primary");
          $("#rateExpYes").addClass("btn-outline-primary");
          $("#rateExpNotWorkedFormHtml").html("");
        }

        if ($("#rateExpNo").data("if") == "selected") {
          $("#rateExpNo").data("if", "notSelected");
          $("#rateExpNo").removeClass("btn-primary");
          $("#rateExpNo").addClass("btn-outline-primary");
        }

        // tempResponses["rateExp"] = "";
        // tempResponses["worked"] = "";
        // tempResponses["notWorked"] = "";
        tempResponses["othersWorked"] = "";
        tempResponses["othersNotWorked"] = "";
        tempResponses["rateExpNotWorked"] = "";

        if (tempResponses["reasonForNotAttending"] === "")
          displayOthersTemp["reasonForNotAttendingRemarks"] = "none";
      }
      //---->if reason for attending changing, reset all validations and errors
      this.setState(
        {
          fieldsToValidate: {},
          errors: {},
          remarks: tempRemarks,
        },
        () => {
          if (this.props.onChange) {
            this.props.onChange(this.state);
          }
        }
      );
    }
    if (evt.target.name === "reasonForNotAttending") {
      this.setState(
        {
          fieldsToValidate: {},
          errors: {},
        },
        () => {
          if (this.props.onChange) {
            this.props.onChange(this.state);
          }
        }
      );
    }
    //---->set state of others fields
    this.setState(
      {
        displayOthers: displayOthersTemp,
        responses: tempResponses,
        remarks: tempRemarks,
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
    //---->validate field
    handleValidation(this, field);
  };

  render() {
    return (
      <Form className="forFormSessionFeedback">
        <h6 class="black">Session Attended</h6>
        <Form.Group as={Row} controlId="studentConfirmationForAttendance">
          <Col sm="5">
            <FormControls type="label" text="Have you attended the session?" />
          </Col>
          <Col sm="6">
            <FormControls
              type="select"
              elementArray={["Y", "N"]}
              name="studentConfirmationForAttendance"
              value={this.state.responses["studentConfirmationForAttendance"]}
              onChange={this.handleDropdownChange}
              style={null}
              errors={JSON.stringify(this.state.errors)}
            />
          </Col>
        </Form.Group>
        <Form.Group
          controlId="reasonForNotAttending"
          style={{
            display: this.state.displayOthers[
              "studentConfirmationForAttendanceRemarks"
            ],
          }}
        >
          <FormControls type="label" text="Select Reason For Not Attending:" />

          <Col>
            <FormControls
              type="select"
              elementArray={this.state.reasonArray}
              name="reasonForNotAttending"
              value={this.state.responses["reasonForNotAttending"]}
              onChange={this.handleDropdownChange}
              style={null}
              errors={JSON.stringify(this.state.errors)}
            />
            <Form.Group as={Row} controlId="otherReasonForNotAttending">
              <Col>
                <FormControls
                  type="textarea"
                  name="otherReasonForNotAttending"
                  value={this.state.remarks["otherReasonForNotAttending"]}
                  onChange={this.handleTextChange}
                  style={{
                    display: this.state.displayOthers[
                      "reasonForNotAttendingRemarks"
                    ],
                  }}
                  errors={JSON.stringify(this.state.errors)}
                />
              </Col>
            </Form.Group>
          </Col>
        </Form.Group>
      </Form>
    );
  }
}
