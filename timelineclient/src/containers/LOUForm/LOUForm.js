import axios from 'axios';
import { connect } from 'react-redux';
import React, { Component } from 'react'
import Button from 'react-bootstrap/Button';
import { API } from '../../shared/config';
import { analyticsManager } from '../../shared/Analytics';
import Image from 'react-bootstrap/Image'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import logo from '../../components/LeftSideRootNavigationDrawer/assets/logo/logo.jpg';
import AxiosHandler from '../../shared/AxiosHandler/AxiosHandler';
const savelouConfirmedAPI = API.savelouConfirmed;

export class LOUForm extends Component {

  state = {
    studentData: this.props.data,
    isdisabled: true,
    status: false
  }

  componentDidMount() {
    if (this.props.location.state && this.props.location.state.studentData) {
      this.setState({
        studentData: this.props.location.state.studentData
      })
    }
  }

  handlechange = (e) => {
    var isChecked = document.getElementById("LOU").checked;
    if (isChecked == true) {
      this.setState({ isdisabled: false })
    } else {
      this.setState({ isdisabled: true })
    }
  }

  handlesubmit = (e) => {
    e.preventDefault();
    AxiosHandler.AxiosPostHandler({
      url: savelouConfirmedAPI,
      data: {
        sapid: this.props.data.sapid,
        louConfirmed: document.getElementById("LOU").checked,
      },
      successCallBack: (response) => {
        if (response.status == 200) {
          window.location.replace('/timeline/login?sapid=' + this.props.data.sapid);
        }
      },
      failureCallBack: (error) => {
        window.location.replace('/timeline/home');
      },
    })
  }

  render() {
    return (
      <>

        <Card>
          <Card.Header>
            <Row>
              <div className="navbar navbar-light bg-faded ">
                <Image src={logo} border="light" thumbnail style={{ height: "75px" }} />
                <hr />
              </div>
            </Row>
          </Card.Header>

          <Card.Body>
            <Card>

              <Card.Header>
                <Row className="mx-auto">
                  <Col style={{ maxWidth: 'fit-content' }}>
                    <div className="circular-portrait circular-portrait-feedbackForm">
                      <Image src={this.state.studentData.imageUrl} />
                    </div>
                  </Col>
                  <Col>
                    <Row><h5 style={{ marginLeft: "18px" }}>{this.state.studentData.firstName}  {this.state.studentData.lastName}</h5></Row>
                    <Row><b><span style={{ marginLeft: "18px" }}>{this.state.studentData.sapid}</span></b></Row>
                    <Row>
                      <span style={{ marginLeft: "18px" }}>{this.state.studentData.emailId}</span><span className="borderRight"></span>
                      <span style={{ marginLeft: "18px" }}>{this.state.studentData.mobile}</span><span className="borderRight"></span>
                      <span style={{ marginLeft: "18px" }}>{this.state.studentData.programForHeader}</span>
                    </Row>
                  </Col>
                </Row>
              </Card.Header>

              <Card.Body>
                <div>
                  <div role="alert" className="fade alert  show  shadow p-2 mb-2 rounded">
                    <h5>Student Undertaking with respect to the Student Guidelines</h5>
                    <hr />
                    <p>I will always uphold the values and honour of the NGASCE, NMIMS. I promise to fulfil my responsibilities as a student and treat my colleagues, Staff and Faculty with dignity and respect. I hereby declare that I will follow the Student Guidelines, Policies, Procedures, University and Exam Code of Conduct etc. and in case of any violation on my part, I consent to the action in accordance with the Management’s decision.</p>
                    <p>I hereby agree to abide by the rules and regulations of SVKM’s NMIMS in my role as a participant of this program. I agree that NMIMS has the right to make any changes as it may deem fit in terms of the program, the decision of the vice-Chancellor of SVKM’s NMIMS will be final and binding on all the participants.</p>
                  </div>
                  <form onSubmit={this.handlesubmit}>
                    <div class="form-check">
                      <br></br> <input class="form-check-input" type="checkbox" onChange={this.handlechange} id="LOU" />
                      <label htmlFor='LOU' class="form-check-label">
                        I have read and understood the above guidelines/instructions.
                      </label>
                    </div><br></br>
                    <Button type="submit" value="Submit" disabled={this.state.isdisabled} > Submit </Button>
                  </form>
                </div>
              </Card.Body>

            </Card>
          </Card.Body>
        </Card>
      </>
    )
  }
}
const mapStateToProps = state => {
  return {
    sapId: state.sapid,
    data: state,
  }
}
export default connect(mapStateToProps)(analyticsManager(LOUForm))