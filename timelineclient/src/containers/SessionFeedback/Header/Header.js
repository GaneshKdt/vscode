import React, { Component } from "react";

export class Header extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    pendingFeedbackData: this.props.pendingFeedbackData,
  };

  componentWillReceiveProps(nextProps) {
    this.setState({
      pendingFeedbackData: nextProps.pendingFeedbackData,
    });
  }

  render() {
    return (
      <>
        <h5>
          <b>
            Feedback for subject - {this.state.pendingFeedbackData.subject} -{" "}
            {this.state.pendingFeedbackData.sessionName}
          </b>{" "}
        </h5>
        <br />
        <div>
          <p>
            Subject, Session: {this.state.pendingFeedbackData.subject} -{" "}
            {this.state.pendingFeedbackData.sessionName}
          </p>
        </div>
        <div>
          <p>
            Faculty Name: {this.state.pendingFeedbackData.firstName}{" "}
            {this.state.pendingFeedbackData.lastName}
          </p>
        </div>

        <div>
          <p>
            Date & Time: {this.state.pendingFeedbackData.day},
            {this.state.pendingFeedbackData.date},
            {this.state.pendingFeedbackData.startTime}
          </p>
        </div>

        <div>
          <p>
            Your feedback will enable us to improve/enhance it for better
            learning in future. Feedback module has been divided into three
            parts: Session conducted, Technical aspect and Faculty interaction.{" "}
          </p>
        </div>
        <h6 class="black">Share feedback ratings (1-Lowest, 7-Highest)</h6>
        <hr />
      </>
    );
  }
}
