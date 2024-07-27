import $ from "jquery";
import React, { Component } from "react";
import { Button, Form } from "react-bootstrap";
export class RatingSliderForNotWorked extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    questions: this.props.stateData.questions,
    responses: this.props.stateData.responses,
    remarks: this.props.stateData.remarks,
    displayOthers: this.props.stateData.displayOthers,
  };

  componentWillReceiveProps(nextProps) {
    this.setState({
      questions: nextProps.stateData.questions,
      responses: nextProps.stateData.responses,
      remarks: nextProps.stateData.remarks,
      displayOthers: nextProps.stateData.displayOthers,
    });
  }

  handleRateExpNotWorkedButtonClick = (event) => {
    let displayOthersTemp = this.state.displayOthers;
    let responsesTemp = this.state.responses;
    let remarksTemp = this.state.remarks;
    let stateThis = this;

    if ($(event.target).data("if") == "notSelected") {
      if ($(event.target).val() == "Y") {
        var c = 0;
        $("#notWorked button").each(function () {
          if ($(this).data("if") == "selected") {
            c++;
          }
        });
        if (c != 0) {
          var step = 7;
          $(event.target).removeClass("btn-outline-primary");
          $(event.target).addClass("btn-primary");
          $(event.target).data("if", "selected");

          $("#rateExpNo").removeClass("btn-primary");
          $("#rateExpNo").addClass("btn-outline-primary");
          $("#rateExpNo").data("if", "notSelected");

          displayOthersTemp["rateExpNotWorkedForm"] = "block";
          responsesTemp["rateExpNotWorked"] = $(event.target).val();

          $("#notWorked button").each(function () {
            if ($(this).data("if") == "selected") {
              var val = $(this).attr("id");
              var valSlice = $(this).attr("id").slice(0, 2) + "Remarks";
              var orgVal = $(this).val();
              if (orgVal != "Others" /* && orgVal!="Not Attended"*/) {
                $("#rateExpNotWorkedFormHtml").html(
                  $("#rateExpNotWorkedFormHtml").html() +
                    '<h6 class="black">' +
                    stateThis.state.questions[val] +
                    '</h6><div class="col-sm-12"><div style="padding:1rem;margin:6rem 0rem 0rem 3rem;"> ' +
                    '<div class = "slider"> <div class="ui-slider-handle"><div class="smiley">' +
                    '<svg viewBox = "0 0 34 10" version = "1.1" > <path d=""></path></svg ></div></div> ' +
                    '<div class = "text"> <span><b>Rate</b></span><strong data-val="' +
                    val +
                    '">-</strong></div></div></div></div>' +
                    ' <div id="' +
                    valSlice +
                    '" style="display: none" class="form-group row ' +
                    valSlice +
                    '"><hr /><div class="col-sm-12"><textarea name="' +
                    valSlice +
                    '" ' +
                    ' placeholder="Add a remark" class="form-control remarks"></textarea><small class="text-muted form-text">' +
                    ' <span class="mandatory"></span></small></div></div> ' +
                    " <hr /> "
                );
              }
            }
          });

          $("#rateExpNotWorkedFormHtml .slider").each(function () {
            var self = $(this);
            var slider = self.slider({
              create: function () {
                self.find(".text strong").text("-");
                setPathData(
                  self.find(".smiley").find("svg path"),
                  self.slider("value")
                );
              },
              slide: function (event, ui) {
                responsesTemp[
                  self.find(".text strong").data("val")
                ] = ui.value.toString();

                console.log("responsesTemp ", responsesTemp);

                self.find(".text strong").text(ui.value);
                setPathData(self.find(".smiley").find("svg path"), ui.value);
                if (parseInt(ui.value) < 5) {
                  $(
                    "#" +
                      self.find(".text strong").data("val").slice(0, 2) +
                      "Remarks"
                  ).attr("style", "display:block");
                } else if (parseInt(ui.value) >= 5) {
                  $(
                    "#" +
                      self.find(".text strong").data("val").slice(0, 2) +
                      "Remarks"
                  )
                    .find("textarea")
                    .val("");
                  remarksTemp[
                    self.find(".text strong").data("val").slice(0, 2) +
                      "Remarks"
                  ] = "";
                  $(
                    "#" +
                      self.find(".text strong").data("val").slice(0, 2) +
                      "Remarks"
                  ).attr("style", "display:none");
                }
              },
              range: "min",
              min: 1,
              max: step,
              value: 1,
              step: 1,
            });
          });
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
          $(".remarks").on("input", function () {
            remarksTemp[$(this).attr("name")] = $(this).val().trim();
          });
        } else {
          this.setState(
            {
              showConfirmDialog: true,
              dialogProps: {
                title: "Field is Required!",
                message:
                  "Please choose yes or no to rate your experience for options which didn't work for you!",
              },
            },
            () => {
              if (this.props.onChange) {
                this.props.onChange(this.state);
              }
            }
          );
          // alert("Please choose at least one option which didn't work for you!");
        }
      } else {
        $(event.target).removeClass("btn-outline-primary");
        $(event.target).addClass("btn-primary");
        $(event.target).data("if", "selected");

        $("#rateExpYes").removeClass("btn-primary");
        $("#rateExpYes").addClass("btn-outline-primary");
        $("#rateExpYes").data("if", "notSelected");

        $("#rateExpNotWorkedFormHtml").html("");

        displayOthersTemp["rateExpNotWorkedForm"] = "none";
        responsesTemp["rateExpNotWorked"] = $(event.target).val();

        Object.keys(this.state.responses).forEach(function (key) {
          responsesTemp["q1Response"] = responsesTemp["rateExp"];
          responsesTemp["q1Remarks"] = "";
          responsesTemp["q2Response"] = responsesTemp["rateExp"];
          responsesTemp["q2Remarks"] = "";
          responsesTemp["q3Response"] = responsesTemp["rateExp"];
          responsesTemp["q3Remarks"] = "";
          responsesTemp["q4Response"] = responsesTemp["rateExp"];
          responsesTemp["q4Remarks"] = "";
          responsesTemp["q5Response"] = responsesTemp["rateExp"];
          responsesTemp["q5Remarks"] = "";
          responsesTemp["q6Response"] = responsesTemp["rateExp"];
          responsesTemp["q6Remarks"] = "";
          responsesTemp["q7Response"] = responsesTemp["rateExp"];
          responsesTemp["q7Remarks"] = "";
          responsesTemp["q8Response"] = responsesTemp["rateExp"];
          responsesTemp["q8Remarks"] = "";
        });

        Object.keys(this.state.remarks).forEach(function (key) {
          remarksTemp[key] = "";
        });
      }

      //---->set display of others fields
      stateThis.setState(
        {
          displayOthers: displayOthersTemp,
          responses: responsesTemp,
          remarks: remarksTemp,
        },
        () => {
          if (stateThis.props.onChange) {
            stateThis.props.onChange(stateThis.state);
          }
        }
      );
    }
  };

  render() {
    return (
      <>
        <Form
          className="forFormSessionFeedback"
          style={{
            display: this.state.displayOthers["rateExpForm"],
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <h6 class="black">
              Would you like to rate your experience on the factors that didn’t
              work for you?
            </h6>
            <div>
              <Button
                variant="outline-primary"
                id="rateExpYes"
                data-if="notSelected"
                value="Y"
                onClick={this.handleRateExpNotWorkedButtonClick}
              >
                Yes
              </Button>
              <Button
                variant="outline-primary"
                id="rateExpNo"
                data-if="notSelected"
                value="N"
                onClick={this.handleRateExpNotWorkedButtonClick}
              >
                No
              </Button>
            </div>
          </div>
          <hr />
        </Form>

        {/* Rate Exp for options which didn't work --------------- */}
        <Form
          className="forFormSessionFeedback"
          id="rateExpNotWorkedFormHtml"
          style={{
            display: this.state.displayOthers["rateExpNotWorkedForm"],
          }}
        ></Form>
      </>
    );
  }
}
