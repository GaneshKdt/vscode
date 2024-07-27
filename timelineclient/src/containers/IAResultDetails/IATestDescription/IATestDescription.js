import React,{  Component } from "react";
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Moment from 'react-moment'
import moment from 'moment'

export class IATestDescription extends Component{
    constructor(props) {
        super(props);       
     
    }
    changeTestDurationFormat(testDuration){   
      return moment.duration(testDuration, "minutes").format("D [days] h [hrs] mm [mins]");
    }
    render(){
        return(
            <>
             <Row>
                <Col sm={12}>
                    <h2
                    style={{
                        color: "grey",
                        marginLeft: "10px",
                        fontSize: 19.2,
                        fontWeight: "bold",
                        lineHeight: 1.1,
                        marginBottom: 16
                    }}
                    >
                    Internal Assessments Test For {this.props.subject}
                    </h2>
                </Col>

                <Col sm={12} style={{ textAlign: "center" }}>
                    <Card
                    className="IAResultDetails_card"
                    style={{ borderRadius: 3, border: 0 }}
                    >
                    <Card.Body className="IAResultDetails_cardBody">
                        <Card.Subtitle
                        style={{ textAlign: "center", color: "#9E9E9E" }}
                        className="IAResultDetails_cardSubTitle"
                        >
                        Test Name                        
                        </Card.Subtitle>

                        <Card.Text className="IAResultDetails_cardText">
                        {this.props.test.testName}
                        </Card.Text>
                    </Card.Body>
                    </Card>
                </Col>
            </Row>

            <Row>
              <Col md={6} lg={6} sm={6} xs={12}>
                <Card
                  className="IAResultDetails_card"
                  style={{ borderRadius: 3, border: 0 }}
                >
                  <Card.Body className="IAResultDetails_cardBody">
                    <Card.Subtitle
                      style={{ textAlign: "center", color: "#9E9E9E" }}
                      className="IAResultDetails_cardSubTitle"
                    >
                      Start Date
                    </Card.Subtitle>
          
                    <Card.Text
                      style={{ textAlign: "center", color: "#337ab7" }}
                      className="IAResultDetails_cardText"
                    >
                      <Moment format="MMM D\, YYYY \at hh:mm a" withTitle>
                      {this.props.test.startDate}
                                        </Moment>                      
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
          
              <Col md={6} lg={6} sm={6} xs={12}>
                <Card
                  className="IAResultDetails_card"
                  style={{ borderRadius: 3, border: 0 }}
                >
                  <Card.Body className="IAResultDetails_cardBody">
                    <Card.Subtitle
                      style={{ textAlign: "center", color: "#9E9E9E" }}
                      className="IAResultDetails_cardSubTitle"
                    >
                      End Date
                    </Card.Subtitle>
          
                    <Card.Text
                      style={{ textAlign: "center", color: "#337ab7" }}
                      className="IAResultDetails_cardText"
                    >
                        <Moment format="MMM D\, YYYY \at hh:mm a" withTitle>
                      {this.props.test.endDate}
                                        </Moment> 
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          
            <Row>
              <Col md={4} sm={4} xs={12}>
                <Card
                  className="IAResultDetails_card"
                  style={{ borderRadius: 3, border: 0 }}
                >
                  <Card.Body className="IAResultDetails_cardBody">
                    <Card.Subtitle
                      style={{ textAlign: "center", color: "#9E9E9E" }}
                      className="IAResultDetails_cardSubTitle"
                    >
                      Duration
                    </Card.Subtitle>
          
                    <Card.Text
                      style={{ textAlign: "center" }}
                      className="IAResultDetails_cardText"
                    >                      
                        {this.changeTestDurationFormat(this.props.test.duration)}
                       
                           
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
              {this.props.studentsTestDetails.showResult === "Y" ? (
                <Col md={4} sm={4} xs={12}>
                  <Card
                    className="IAResultDetails_card"
                    style={{ borderRadius: 3, border: 0 }}
                  >
                    <Card.Body className="IAResultDetails_cardBody">
                      <Card.Subtitle
                        style={{ textAlign: "center", color: "#9E9E9E" }}
                        className="IAResultDetails_cardSubTitle"
                      >
                        Your Score
                      </Card.Subtitle>
          
                      <Card.Text
                        style={{
                          color: "black",
                          fontSize: 18,
                          textAlign: "center",
                          color: "black"
                        }}
                        className="IAResultDetails_cardText"
                      >
                        {this.props.studentsTestDetails.score}
                        <span> out of </span> {this.props.test.maxScore}
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              ) : (
                <Col md={4} sm={4} xs={12}>
                  <Card
                    className="IAResultDetails_card"
                    style={{ borderRadius: 3, border: 0 }}
                  >
                    <Card.Body className="IAResultDetails_cardBody">
                      <Card.Subtitle
                        style={{ textAlign: "center", color: "#9E9E9E" }}
                        className="IAResultDetails_cardSubTitle"
                      >
                        Score Out Of
                      </Card.Subtitle>
          
                      <Card.Text
                        style={{ fontSize: 18, textAlign: "center", color: "black" }}
                        className="IAResultDetails_cardText"
                      >
                        {this.props.test.maxScore}
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              )}
          
              <Col md={4} sm={4} xs={12}>
                <Card
                  className="IAResultDetails_card"
                  style={{ borderRadius: 3, border: 0 }}
                >
                  <Card.Body className="IAResultDetails_cardBody">
                    <Card.Subtitle
                      style={{ textAlign: "center", color: "#9E9E9E" }}
                      className="IAResultDetails_cardSubTitle"
                    >
                      Attempt
                    </Card.Subtitle>
                    <Card.Text
                      style={{ fontSize: 18, textAlign: "center", color: "black" }}
                      className="IAResultDetails_cardText"
                    >
                      {`${this.props.studentsTestDetails.attempt} / ${this.props.test.maxAttempt}`}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            </Row>

             
            <Row>
              <Col md={12} sm={12} xs={12}>
                <Card
                  className="IAResultDetails_card"
                  style={{ borderRadius: 3, border: 0 }}
                >
                  <Card.Body className="IAResultDetails_cardBody">
                    <Card.Subtitle
                      style={{ textAlign: "center", color: "#9E9E9E" }}
                      className="IAResultDetails_cardSubTitle"
                    >
                      Proctoring Status
                    </Card.Subtitle>
          
                    <Card.Text
                      style={{ textAlign: "center" }}
                      className="IAResultDetails_cardText"
                    >                      
                        {this.props.test.proctoringEnabled == 'Y' ? (<>Proctoring Enabled</>) : (<>Proctoring Disabled</>) }
                       
                           
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
              </Row>   

          </>
          
        )
    }
}