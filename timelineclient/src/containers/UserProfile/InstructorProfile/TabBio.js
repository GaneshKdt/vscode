import { Grid, Typography, Box, Divider } from "@material-ui/core";
import React, { Component } from "react";
import { Accordion, Button, Card } from "react-bootstrap";


class TabBio extends Component {
  render() {
    return this.props.facultyData ? (
      <div>
        <Accordion defaultActiveKey="0">
        {this.props.facultyData.isConsentForm == 'Y'? ( 
          <Card>
            <Card.Header>
              <Accordion.Toggle as={Button} variant="link" eventKey="0">
                Personal
              </Accordion.Toggle>
            </Card.Header>
            <Accordion.Collapse eventKey="0">
              <Card.Body>
                {this.props.facultyData.title ||
                this.props.facultyData.firstName ||
                this.props.facultyData.lastName ||
                this.props.facultyData.dob ||
                this.props.facultyData.email ||
                this.props.facultyData.mobile ||
                this.props.facultyData.facultyDescription ||
                this.props.facultyData.address ? (
                  <Box paddingX="1rem">
                    {/* {this.props.facultyData.title ? (
                      <div>
                        <Divider
                          variant="inset"
                          style={{ margin: "0.5rem 0rem" }}
                        />
                        <Grid container spacing={2}>
                          <Grid item xs={6}>
                            <Typography
                              className="ml-2"
                              style={{ fontWeight: "bold" }}
                            >
                              {" "}
                              Title :{" "}
                            </Typography>
                          </Grid>
                          <Grid item xs={6}>
                            <Typography
                              className="ml-2"
                              style={{ fontWeight: "bold" }}
                            >
                              {this.props.facultyData.title}
                            </Typography>
                          </Grid>
                        </Grid>
                        <Divider
                          variant="inset"
                          style={{ margin: "0.5rem 0rem" }}
                        />
                      </div>
                    ) : null} */}
                    {this.props.facultyData.firstName &&
                    this.props.facultyData.lastName ? (
                      <div>
                        <Divider
                          variant="inset"
                          style={{ margin: "0.5rem 0rem" }}
                        />
                        <Grid container spacing={2}>
                          <Grid item xs={6}>
                            <Typography
                              className="ml-2"
                              style={{ fontWeight: "bold" }}
                            >
                              {" "}
                              Name :{" "}
                            </Typography>
                          </Grid>
                          <Grid item xs={6}>
                            <Typography
                              className="ml-2"
                              style={{ fontWeight: "bold" }}
                            > Prof.{" "}
                              {this.props.facultyData.firstName}{" "}
                              {this.props.facultyData.lastName}
                            </Typography>
                          </Grid>
                        </Grid>
                        <Divider
                          variant="inset"
                          style={{ margin: "0.5rem 0rem" }}
                        />
                      </div>
                    ) : null}
                    {this.props.facultyData.facultyDescription ? (
                      <div>
                        <Divider
                          variant="inset"
                          style={{ margin: "0.5rem 0rem" }}
                        />
                        <Grid container spacing={2}>
                          <Grid item xs={6}>
                            <Typography
                              className="ml-2"
                              style={{ fontWeight: "bold" }}
                            >
                              {" "}
                              Faculty Description :{" "}
                            </Typography>
                          </Grid>
                          <Grid item xs={6}>
                            {/* <Typography
                              className="ml-2"
                              style={{ fontWeight: "bold" }}
                            >
                              {this.props.facultyData.facultyDescription}
                            </Typography>  */}
                            <div dangerouslySetInnerHTML={{ __html: this.props.facultyData.facultyDescription }}></div>
                          </Grid>
                        </Grid>
                        <Divider
                          variant="inset"
                          style={{ margin: "0.5rem 0rem" }}
                        />
                      </div>
                    ) : null}  
                    {/* {this.props.facultyData.dob ? (
                      <div>
                        <Divider
                          variant="inset"
                          style={{ margin: "0.5rem 0rem" }}
                        />
                        <Grid container spacing={2}>
                          <Grid item xs={6}>
                            <Typography
                              className="ml-2"
                              style={{ fontWeight: "bold" }}
                            >
                              {" "}
                              Date of Birth :{" "}
                            </Typography>
                          </Grid>
                          <Grid item xs={6}>
                            <Typography
                              className="ml-2"
                              style={{ fontWeight: "bold" }}
                            >
                              {this.props.facultyData.dob}
                            </Typography>
                          </Grid>
                        </Grid>
                        <Divider
                          variant="inset"
                          style={{ margin: "0.5rem 0rem" }}
                        />
                      </div>
                    ) : null} */}

                    {/* {this.props.facultyData.email ? (
                      <div>
                        <Divider
                          variant="inset"
                          style={{ margin: "0.5rem 0rem" }}
                        />
                        <Grid container spacing={2}>
                          <Grid item xs={6}>
                            <Typography
                              className="ml-2"
                              style={{ fontWeight: "bold" }}
                            >
                              {" "}
                              Email ID :{" "}
                            </Typography>
                          </Grid>
                          <Grid item xs={6}>
                            <Typography
                              className="ml-2"
                              style={{ fontWeight: "bold" }}
                            >
                              {this.props.facultyData.email}
                            </Typography>
                          </Grid>
                        </Grid>
                        <Divider
                          variant="inset"
                          style={{ margin: "0.5rem 0rem" }}
                        />
                      </div>
                    ) : null} */}

                    {/* {this.props.facultyData.secondaryEmail ? (
                      <div>
                        <Divider
                          variant="inset"
                          style={{ margin: "0.5rem 0rem" }}
                        />
                        <Grid container spacing={2}>
                          <Grid item xs={6}>
                            <Typography
                              className="ml-2"
                              style={{ fontWeight: "bold" }}
                            >
                              {" "}
                              Secondary Email ID :{" "}
                            </Typography>
                          </Grid>
                          <Grid item xs={6}>
                            <Typography
                              className="ml-2"
                              style={{ fontWeight: "bold" }}
                            >
                              {this.props.facultyData.secondaryEmail}
                            </Typography>
                          </Grid>
                        </Grid>
                        <Divider
                          variant="inset"
                          style={{ margin: "0.5rem 0rem" }}
                        />
                      </div>
                    ) : null} */}
                    {/* {this.props.facultyData.mobile ? (
                      <div>
                        <Divider
                          variant="inset"
                          style={{ margin: "0.5rem 0rem" }}
                        />
                        <Grid container spacing={2}>
                          <Grid item xs={6}>
                            <Typography
                              className="ml-2"
                              style={{ fontWeight: "bold" }}
                            >
                              {" "}
                              Mobile No. :{" "}
                            </Typography>
                          </Grid>
                          <Grid item xs={6}>
                            <Typography
                              className="ml-2"
                              style={{ fontWeight: "bold" }}
                            >
                              {this.props.facultyData.mobile}
                            </Typography>
                          </Grid>
                        </Grid>
                        <Divider
                          variant="inset"
                          style={{ margin: "0.5rem 0rem" }}
                        />
                      </div>
                    ) : null} */}

                    {/* {this.props.facultyData.altContact ? (
                      <div>
                        <Divider
                          variant="inset"
                          style={{ margin: "0.5rem 0rem" }}
                        />
                        <Grid container spacing={2}>
                          <Grid item xs={6}>
                            <Typography
                              className="ml-2"
                              style={{ fontWeight: "bold" }}
                            >
                              {" "}
                              Alternate Contact :{" "}
                            </Typography>
                          </Grid>
                          <Grid item xs={6}>
                            <Typography
                              className="ml-2"
                              style={{ fontWeight: "bold" }}
                            >
                              {this.props.facultyData.altContact}
                            </Typography>
                          </Grid>
                        </Grid>
                        <Divider
                          variant="inset"
                          style={{ margin: "0.5rem 0rem" }}
                        />
                      </div>
                    ) : null} */}
                    {/* {this.props.facultyData.officeContact ? (
                      <div>
                        <Divider
                          variant="inset"
                          style={{ margin: "0.5rem 0rem" }}
                        />
                        <Grid container spacing={2}>
                          <Grid item xs={6}>
                            <Typography
                              className="ml-2"
                              style={{ fontWeight: "bold" }}
                            >
                              {" "}
                              Office Contact :{" "}
                            </Typography>
                          </Grid>
                          <Grid item xs={6}>
                            <Typography
                              className="ml-2"
                              style={{ fontWeight: "bold" }}
                            >
                              {this.props.facultyData.officeContact}
                            </Typography>
                          </Grid>
                        </Grid>
                        <Divider
                          variant="inset"
                          style={{ margin: "0.5rem 0rem" }}
                        />
                      </div>
                    ) : null} */}
                    {/* {this.props.facultyData.homeContact ? (
                      <div>
                        <Divider
                          variant="inset"
                          style={{ margin: "0.5rem 0rem" }}
                        />
                        <Grid container spacing={2}>
                          <Grid item xs={6}>
                            <Typography
                              className="ml-2"
                              style={{ fontWeight: "bold" }}
                            >
                              {" "}
                              Home Contact :{" "}
                            </Typography>
                          </Grid>
                          <Grid item xs={6}>
                            <Typography
                              className="ml-2"
                              style={{ fontWeight: "bold" }}
                            >
                              {this.props.facultyData.homeContact}
                            </Typography>
                          </Grid>
                        </Grid>
                        <Divider
                          variant="inset"
                          style={{ margin: "0.5rem 0rem" }}
                        />
                      </div>
                    ) : null} */}
                    {/* {this.props.facultyData.location ? (
                      <div>
                        <Divider
                          variant="inset"
                          style={{ margin: "0.5rem 0rem" }}
                        />
                        <Grid container spacing={2}>
                          <Grid item xs={6}>
                            <Typography
                              className="ml-2"
                              style={{ fontWeight: "bold" }}
                            >
                              {" "}
                              Location :{" "}
                            </Typography>
                          </Grid>
                          <Grid item xs={6}>
                            <Typography
                              className="ml-2"
                              style={{ fontWeight: "bold" }}
                            >
                              {this.props.facultyData.location}
                            </Typography>
                          </Grid>
                        </Grid>
                        <Divider
                          variant="inset"
                          style={{ margin: "0.5rem 0rem" }}
                        />
                      </div>
                    ) : null} */}

                    {/* {this.props.facultyData.address ? (
                      <div>
                        <Divider
                          variant="inset"
                          style={{ margin: "0.5rem 0rem" }}
                        />
                        <Grid container spacing={2}>
                          <Grid item xs={6}>
                            <Typography
                              className="ml-2"
                              style={{ fontWeight: "bold" }}
                            >
                              {" "}
                              Address :{" "}
                            </Typography>
                          </Grid>
                          <Grid item xs={6}>
                            <Typography
                              className="ml-2"
                              style={{ fontWeight: "bold" }}
                            >
                              {this.props.facultyData.address}
                            </Typography>
                          </Grid>
                        </Grid>
                        <Divider
                          variant="inset"
                          style={{ margin: "0.5rem 0rem" }}
                        />
                      </div>
                    ) : null} */}
                  </Box>
                ) : (
                  <Card className="mb-2">
                    <Card.Body>
                      <Card.Text className="text-center">
                        None Details To Show
                      </Card.Text>
                    </Card.Body>
                  </Card>
                )}
              </Card.Body>
            </Accordion.Collapse>
          </Card>
         ):<Card className="mb-2">
         <Card.Body>
           <Card.Text className="text-center">
             None Details To Show
           </Card.Text>
         </Card.Body>
       </Card>}
          {/* <Card>
            <Card.Header>
              <Accordion.Toggle as={Button} variant="link" eventKey="1">
                Education
              </Accordion.Toggle>
            </Card.Header>
            <Accordion.Collapse eventKey="1">
              <Card.Body>
                {this.props.facultyData.graduationDetails ||
                this.props.facultyData.phdDetails ||
                this.props.facultyData.yearOfPassingGraduation ||
                this.props.facultyData.yearOfPassingPhd ||
                this.props.facultyData.areaOfSpecialisation ||
                this.props.facultyData.natureOfAppointment ? (
                  <Box paddingX="1rem">
                    {this.props.facultyData.phdDetails ? (
                      <div>
                        <Divider
                          variant="inset"
                          style={{ margin: "0.5rem 0rem" }}
                        />
                        <Grid container spacing={2}>
                          <Grid item xs={6}>
                            <Typography
                              className="ml-2"
                              style={{ fontWeight: "bold" }}
                            >
                              {" "}
                              Educational Qualification :{" "}
                            </Typography>
                          </Grid>
                          <Grid item xs={6}>
                            <Typography
                              className="ml-2"
                              style={{ fontWeight: "bold" }}
                            >
                              {this.props.facultyData.phdDetails}
                            </Typography>
                          </Grid>
                        </Grid>
                        <Divider
                          variant="inset"
                          style={{ margin: "0.5rem 0rem" }}
                        />
                        {this.props.facultyData.yearOfPassingPhd ? (
                          <div>
                            <Divider
                              variant="inset"
                              style={{ margin: "0.5rem 0rem" }}
                            />
                            <Grid container spacing={2}>
                              <Grid item xs={6}>
                                <Typography
                                  className="ml-2"
                                  style={{ fontWeight: "bold" }}
                                >
                                  {" "}
                                  Year of Passing :{" "}
                                </Typography>
                              </Grid>
                              <Grid item xs={6}>
                                <Typography
                                  className="ml-2"
                                  style={{ fontWeight: "bold" }}
                                >
                                  {this.props.facultyData.yearOfPassingPhd}
                                </Typography>
                              </Grid>
                            </Grid>
                            <Divider
                              variant="inset"
                              style={{ margin: "0.5rem 0rem" }}
                            />
                          </div>
                        ) : null}
                        <Divider
                          variant="inset"
                          style={{ margin: "0.5rem 0rem" }}
                        />
                        <Grid container spacing={2}>
                          <Grid item xs={6}>
                            <Typography
                              className="ml-2"
                              style={{ fontWeight: "bold" }}
                            >
                              {" "}
                              Highest Qualification :{" "}
                            </Typography>
                          </Grid>
                          <Grid item xs={6}>
                            <Typography
                              className="ml-2"
                              style={{ fontWeight: "bold" }}
                            >
                              {"Ph.D."}
                            </Typography>
                          </Grid>
                        </Grid>
                        <Divider
                          variant="inset"
                          style={{ margin: "0.5rem 0rem" }}
                        />
                      </div>
                    ) : (
                      <div>
                        {this.props.facultyData.graduationDetails ? (
                          <div>
                            <Divider
                              variant="inset"
                              style={{ margin: "0.5rem 0rem" }}
                            />
                            <Grid container spacing={2}>
                              <Grid item xs={6}>
                                <Typography
                                  className="ml-2"
                                  style={{ fontWeight: "bold" }}
                                >
                                  {" "}
                                  Educational Qualification :{" "}
                                </Typography>
                              </Grid>
                              <Grid item xs={6}>
                                <Typography
                                  className="ml-2"
                                  style={{ fontWeight: "bold" }}
                                >
                                  {this.props.facultyData.graduationDetails}
                                </Typography>
                              </Grid>
                            </Grid>
                            <Divider
                              variant="inset"
                              style={{ margin: "0.5rem 0rem" }}
                            />
                            {this.props.facultyData.yearOfPassingGraduation ? (
                              <div>
                                <Divider
                                  variant="inset"
                                  style={{ margin: "0.5rem 0rem" }}
                                />
                                <Grid container spacing={2}>
                                  <Grid item xs={6}>
                                    <Typography
                                      className="ml-2"
                                      style={{ fontWeight: "bold" }}
                                    >
                                      {" "}
                                      Year of Passing :{" "}
                                    </Typography>
                                  </Grid>
                                  <Grid item xs={6}>
                                    <Typography
                                      className="ml-2"
                                      style={{ fontWeight: "bold" }}
                                    >
                                      {
                                        this.props.facultyData
                                          .yearOfPassingGraduation
                                      }
                                    </Typography>
                                  </Grid>
                                </Grid>
                                <Divider
                                  variant="inset"
                                  style={{ margin: "0.5rem 0rem" }}
                                />
                              </div>
                            ) : null}
                            <Divider
                              variant="inset"
                              style={{ margin: "0.5rem 0rem" }}
                            />
                            <Grid container spacing={2}>
                              <Grid item xs={6}>
                                <Typography
                                  className="ml-2"
                                  style={{ fontWeight: "bold" }}
                                >
                                  {" "}
                                  Highest Qualification :{" "}
                                </Typography>
                              </Grid>
                              <Grid item xs={6}>
                                <Typography
                                  className="ml-2"
                                  style={{ fontWeight: "bold" }}
                                >
                                  {this.props.facultyData.graduationDetails}
                                </Typography>
                              </Grid>
                            </Grid>
                            <Divider
                              variant="inset"
                              style={{ margin: "0.5rem 0rem" }}
                            />
                          </div>
                        ) : null}
                      </div>
                    )}
                    {this.props.facultyData.areaOfSpecialisation ? (
                      <div>
                        <Divider
                          variant="inset"
                          style={{ margin: "0.5rem 0rem" }}
                        />
                        <Grid container spacing={2}>
                          <Grid item xs={6}>
                            <Typography
                              className="ml-2"
                              style={{ fontWeight: "bold" }}
                            >
                              {" "}
                              Area of Specialisation :{" "}
                            </Typography>
                          </Grid>
                          <Grid item xs={6}>
                            <Typography
                              className="ml-2"
                              style={{ fontWeight: "bold" }}
                            >
                              {this.props.facultyData.areaOfSpecialisation}
                            </Typography>
                          </Grid>
                        </Grid>
                        <Divider
                          variant="inset"
                          style={{ margin: "0.5rem 0rem" }}
                        />
                        {this.props.facultyData.otherAreaOfSpecialisation ? (
                          <div>
                            <Divider
                              variant="inset"
                              style={{ margin: "0.5rem 0rem" }}
                            />
                            <Grid container spacing={2}>
                              <Grid item xs={6}>
                                <Typography
                                  className="ml-2"
                                  style={{ fontWeight: "bold" }}
                                >
                                  {" "}
                                  Other Area of Specialisation :{" "}
                                </Typography>
                              </Grid>
                              <Grid item xs={6}>
                                <Typography
                                  className="ml-2"
                                  style={{ fontWeight: "bold" }}
                                >
                                  {
                                    this.props.facultyData
                                      .otherAreaOfSpecialisation
                                  }
                                </Typography>
                              </Grid>
                            </Grid>
                            <Divider
                              variant="inset"
                              style={{ margin: "0.5rem 0rem" }}
                            />
                          </div>
                        ) : null}
                      </div>
                    ) : null}
                    {this.props.facultyData.natureOfAppointment ? (
                      <div>
                        <Divider
                          variant="inset"
                          style={{ margin: "0.5rem 0rem" }}
                        />
                        <Grid container spacing={2}>
                          <Grid item xs={6}>
                            <Typography
                              className="ml-2"
                              style={{ fontWeight: "bold" }}
                            >
                              {" "}
                              Nature of Appointment :{" "}
                            </Typography>
                          </Grid>
                          <Grid item xs={6}>
                            <Typography
                              className="ml-2"
                              style={{ fontWeight: "bold" }}
                            >
                              {this.props.facultyData.natureOfAppointment}
                            </Typography>
                          </Grid>
                        </Grid>
                        <Divider
                          variant="inset"
                          style={{ margin: "0.5rem 0rem" }}
                        />
                      </div>
                    ) : null}
                  </Box>
                ) : (
                  <Card className="mb-2">
                    <Card.Body>
                      <Card.Text className="text-center">
                        None Details To Show
                      </Card.Text>
                    </Card.Body>
                  </Card>
                )}
              </Card.Body>
            </Accordion.Collapse>
          </Card> */}

          {/* <Card>
            <Card.Header>
              <Accordion.Toggle as={Button} variant="link" eventKey="2">
                Academic/Professional Experience
              </Accordion.Toggle>
            </Card.Header>
            <Accordion.Collapse eventKey="2">
              <Card.Body>
                {this.props.facultyData.programGroup ||
                this.props.facultyData.programName ||
                this.props.facultyData.subjectPref1 ||
                this.props.facultyData.subjectPref2 ||
                this.props.facultyData.subjectPref3 ||
                this.props.facultyData.teachingExp ||
                this.props.facultyData.ngasceExp ||
                this.props.facultyData.corporateExp ||
                this.props.facultyData.currentOrganization ||
                this.props.facultyData.designation || 
                this.props.facultyData.facultyDescription ||
                this.props.facultyData.facultyType ? (
                  <Box paddingX="1rem">
                    {this.props.facultyData.facultyDescription ? (
                      <div>
                        <Divider
                          variant="inset"
                          style={{ margin: "0.5rem 0rem" }}
                        />
                        <Grid container spacing={2}>
                          <Grid item xs={6}>
                            <Typography
                              className="ml-2"
                              style={{ fontWeight: "bold" }}
                            >
                              {" "}
                              Faculty Description :{" "}
                            </Typography>
                          </Grid>
                          <Grid item xs={6}>
                            <Typography
                              className="ml-2"
                              style={{ fontWeight: "bold" }}
                            >
                              {this.props.facultyData.facultyDescription}
                            </Typography> 
                            <div dangerouslySetInnerHTML={{ __html: this.props.facultyData.facultyDescription }}></div>
                          </Grid>
                        </Grid>
                        <Divider
                          variant="inset"
                          style={{ margin: "0.5rem 0rem" }}
                        />
                      </div>
                    ) : null}  
                    {this.props.facultyData.facultyType ? (
                      <div>
                        <Divider
                          variant="inset"
                          style={{ margin: "0.5rem 0rem" }}
                        />
                        <Grid container spacing={2}>
                          <Grid item xs={6}>
                            <Typography
                              className="ml-2"
                              style={{ fontWeight: "bold" }}
                            >
                              {" "}
                              Faculty Type :{" "}
                            </Typography>
                          </Grid>
                          <Grid item xs={6}>
                            <Typography
                              className="ml-2"
                              style={{ fontWeight: "bold" }}
                            >
                              {this.props.facultyData.facultyType}
                            </Typography>
                          </Grid>
                        </Grid>
                        <Divider
                          variant="inset"
                          style={{ margin: "0.5rem 0rem" }}
                        />
                      </div>
                    ) : null}
                    {this.props.facultyData.programGroup ? (
                      <div>
                        <Divider
                          variant="inset"
                          style={{ margin: "0.5rem 0rem" }}
                        />
                        <Grid container spacing={2}>
                          <Grid item xs={6}>
                            <Typography
                              className="ml-2"
                              style={{ fontWeight: "bold" }}
                            >
                              {" "}
                              Program Group :{" "}
                            </Typography>
                          </Grid>
                          <Grid item xs={6}>
                            <Typography
                              className="ml-2"
                              style={{ fontWeight: "bold" }}
                            >
                              {this.props.facultyData.programGroup}
                            </Typography>
                          </Grid>
                        </Grid>
                        <Divider
                          variant="inset"
                          style={{ margin: "0.5rem 0rem" }}
                        />
                      </div>
                    ) : null}
                    {this.props.facultyData.programName ? (
                      <div>
                        <Divider
                          variant="inset"
                          style={{ margin: "0.5rem 0rem" }}
                        />
                        <Grid container spacing={2}>
                          <Grid item xs={6}>
                            <Typography
                              className="ml-2"
                              style={{ fontWeight: "bold" }}
                            >
                              {" "}
                              Program Name :{" "}
                            </Typography>
                          </Grid>
                          <Grid item xs={6}>
                            <Typography
                              className="ml-2"
                              style={{ fontWeight: "bold" }}
                            >
                              {this.props.facultyData.programName}
                            </Typography>
                          </Grid>
                        </Grid>
                        <Divider
                          variant="inset"
                          style={{ margin: "0.5rem 0rem" }}
                        />
                      </div>
                    ) : null}

                    {this.props.facultyData.subjectPref1 ||
                    this.props.facultyData.subjectPref2 ||
                    this.props.facultyData.subjectPref3 ? (
                      <div>
                        <Divider
                          variant="inset"
                          style={{ margin: "0.5rem 0rem" }}
                        />
                        <Grid container spacing={2}>
                          <Grid item xs={6}>
                            <Typography
                              className="ml-2"
                              style={{ fontWeight: "bold" }}
                            >
                              {" "}
                              Subject Preferences :{" "}
                            </Typography>
                          </Grid>
                          <Grid item xs={6}>
                            <Grid container spacing={3}>
                              <ul>
                                {this.props.facultyData.subjectPref1 ? (
                                  <li>
                                    <Grid item xs={12}>
                                      <Typography
                                        className="ml-2"
                                        style={{ fontWeight: "bold" }}
                                      >
                                        {this.props.facultyData.subjectPref1}
                                      </Typography>
                                    </Grid>
                                  </li>
                                ) : null}
                                {this.props.facultyData.subjectPref2 ? (
                                  <li>
                                    <Grid item xs={12}>
                                      <Typography
                                        className="ml-2"
                                        style={{ fontWeight: "bold" }}
                                      >
                                        {this.props.facultyData.subjectPref2}
                                      </Typography>
                                    </Grid>
                                  </li>
                                ) : null}
                                {this.props.facultyData.subjectPref3 ? (
                                  <li>
                                    <Grid item xs={12}>
                                      <Typography
                                        className="ml-2"
                                        style={{ fontWeight: "bold" }}
                                      >
                                        {this.props.facultyData.subjectPref3}
                                      </Typography>
                                    </Grid>
                                  </li>
                                ) : null}
                              </ul>
                            </Grid>
                          </Grid>
                        </Grid>
                        <Divider
                          variant="inset"
                          style={{ margin: "0.5rem 0rem" }}
                        />
                      </div>
                    ) : null}
                    {this.props.facultyData.teachingExp ? (
                      <div>
                        {" "}
                        <Divider
                          variant="inset"
                          style={{ margin: "0.5rem 0rem" }}
                        />
                        <Grid container spacing={2}>
                          <Grid item xs={6}>
                            <Typography
                              className="ml-2"
                              style={{ fontWeight: "bold" }}
                            >
                              {" "}
                              Total years of Teaching Experience :{" "}
                            </Typography>
                          </Grid>
                          <Grid item xs={6}>
                            <Typography
                              className="ml-2"
                              style={{ fontWeight: "bold" }}
                            >
                              {this.props.facultyData.teachingExp}
                            </Typography>
                          </Grid>
                        </Grid>
                        <Divider
                          variant="inset"
                          style={{ margin: "0.5rem 0rem" }}
                        />
                      </div>
                    ) : null}

                    {this.props.facultyData.ngasceExp ? (
                      <div>
                        <Divider
                          variant="inset"
                          style={{ margin: "0.5rem 0rem" }}
                        />
                        <Grid container spacing={2}>
                          <Grid item xs={6}>
                            <Typography
                              className="ml-2"
                              style={{ fontWeight: "bold" }}
                            >
                              {" "}
                              Total years of NGASCE Experience :{" "}
                            </Typography>
                          </Grid>
                          <Grid item xs={6}>
                            <Typography
                              className="ml-2"
                              style={{ fontWeight: "bold" }}
                            >
                              {this.props.facultyData.ngasceExp}
                            </Typography>
                          </Grid>
                        </Grid>
                        <Divider
                          variant="inset"
                          style={{ margin: "0.5rem 0rem" }}
                        />
                      </div>
                    ) : null}

                    {this.props.facultyData.corporateExp ? (
                      <div>
                        <Divider
                          variant="inset"
                          style={{ margin: "0.5rem 0rem" }}
                        />
                        <Grid container spacing={2}>
                          <Grid item xs={6}>
                            <Typography
                              className="ml-2"
                              style={{ fontWeight: "bold" }}
                            >
                              {" "}
                              Total years of Corporate Experience :{" "}
                            </Typography>
                          </Grid>
                          <Grid item xs={6}>
                            <Typography
                              className="ml-2"
                              style={{ fontWeight: "bold" }}
                            >
                              {this.props.facultyData.corporateExp}
                            </Typography>
                          </Grid>
                        </Grid>
                        <Divider
                          variant="inset"
                          style={{ margin: "0.5rem 0rem" }}
                        />
                      </div>
                    ) : null}

                    {this.props.facultyData.currentOrganization ? (
                      <div>
                        <Divider
                          variant="inset"
                          style={{ margin: "0.5rem 0rem" }}
                        />
                        <Grid container spacing={2}>
                          <Grid item xs={6}>
                            <Typography
                              className="ml-2"
                              style={{ fontWeight: "bold" }}
                            >
                              {" "}
                              Current Organization :{" "}
                            </Typography>
                          </Grid>
                          <Grid item xs={6}>
                            <Typography
                              className="ml-2"
                              style={{ fontWeight: "bold" }}
                            >
                              {this.props.facultyData.currentOrganization}
                            </Typography>
                          </Grid>
                        </Grid>
                        <Divider
                          variant="inset"
                          style={{ margin: "0.5rem 0rem" }}
                        />
                      </div>
                    ) : null}

                    {this.props.facultyData.designation ? (
                      <div>
                        <Divider
                          variant="inset"
                          style={{ margin: "0.5rem 0rem" }}
                        />
                        <Grid container spacing={2}>
                          <Grid item xs={6}>
                            <Typography
                              className="ml-2"
                              style={{ fontWeight: "bold" }}
                            >
                              {" "}
                              Designation :{" "}
                            </Typography>
                          </Grid>
                          <Grid item xs={6}>
                            <Typography
                              className="ml-2"
                              style={{ fontWeight: "bold" }}
                            >
                              {this.props.facultyData.designation}
                            </Typography>
                          </Grid>
                        </Grid>
                        <Divider
                          variant="inset"
                          style={{ margin: "0.5rem 0rem" }}
                        />
                      </div>
                    ) : null}
                  </Box>
                ) : (
                  <Card className="mb-2">
                    <Card.Body>
                      <Card.Text className="text-center">
                        None Details To Show
                      </Card.Text>
                    </Card.Body>
                  </Card>
                )}
              </Card.Body>
            </Accordion.Collapse>
          </Card> */}

          {/* <Card>
            <Card.Header>
              <Accordion.Toggle as={Button} variant="link" eventKey="3">
                Additional Information
              </Accordion.Toggle>
            </Card.Header>
            <Accordion.Collapse eventKey="3">
              <Card.Body>
                {this.props.facultyData.aadharNumber ||
                this.props.facultyData.approvedInSlab ||
                this.props.facultyData
                  .consentForMarketingCollateralsOrPhotoAndProfileRelease ||
                this.props.facultyData.honorsAndAwards ||
                this.props.facultyData.memberships ||
                this.props.facultyData.researchInterest ||
                this.props.facultyData
                  .articlesPublishedInInternationalJournals ||
                this.props.facultyData.articlesPublishedInNationalJournals ||
                this.props.facultyData.summaryOfPapersPublishedInABDCJournals ||
                this.props.facultyData
                  .paperPresentationsAtInternationalConference ||
                this.props.facultyData.paperPresentationAtNationalConference ||
                this.props.facultyData.caseStudiesPublished ||
                this.props.facultyData.booksPublished ||
                this.props.facultyData.bookChaptersPublished ||
                this.props.facultyData.listOfPatents ||
                this.props.facultyData.consultingProjects ||
                this.props.facultyData.researchProjects ? (
                  <Box paddingX="1rem">
                    {this.props.facultyData.aadharNumber ? (
                      <div>
                        <Divider
                          variant="inset"
                          style={{ margin: "0.5rem 0rem" }}
                        />
                        <Grid container spacing={2}>
                          <Grid item xs={6}>
                            <Typography
                              className="ml-2"
                              style={{ fontWeight: "bold" }}
                            >
                              {" "}
                              Aadhar Number :{" "}
                            </Typography>
                          </Grid>
                          <Grid item xs={6}>
                            <Typography
                              className="ml-2"
                              style={{ fontWeight: "bold" }}
                            >
                              {this.props.facultyData.aadharNumber}
                            </Typography>
                          </Grid>
                        </Grid>
                        <Divider
                          variant="inset"
                          style={{ margin: "0.5rem 0rem" }}
                        />
                      </div>
                    ) : null}

                    {this.props.facultyData.approvedInSlab ? (
                      <div>
                        <Divider
                          variant="inset"
                          style={{ margin: "0.5rem 0rem" }}
                        />
                        <Grid container spacing={2}>
                          <Grid item xs={6}>
                            <Typography
                              className="ml-2"
                              style={{ fontWeight: "bold" }}
                            >
                              {" "}
                              Approved in Slab :{" "}
                            </Typography>
                          </Grid>
                          <Grid item xs={6}>
                            <Typography
                              className="ml-2"
                              style={{ fontWeight: "bold" }}
                            >
                              {this.props.facultyData.approvedInSlab}
                            </Typography>
                          </Grid>
                        </Grid>
                        <Divider
                          variant="inset"
                          style={{ margin: "0.5rem 0rem" }}
                        />
                        {this.props.facultyData.dateOfECMeetingApprovalTaken ? (
                          <div>
                            <Divider
                              variant="inset"
                              style={{ margin: "0.5rem 0rem" }}
                            />
                            <Grid container spacing={2}>
                              <Grid item xs={6}>
                                <Typography
                                  className="ml-2"
                                  style={{ fontWeight: "bold" }}
                                >
                                  {" "}
                                  Date of EC Meeting Approval Taken :{" "}
                                </Typography>
                              </Grid>
                              <Grid item xs={6}>
                                <Typography
                                  className="ml-2"
                                  style={{ fontWeight: "bold" }}
                                >
                                  {
                                    this.props.facultyData
                                      .dateOfECMeetingApprovalTaken
                                  }
                                </Typography>
                              </Grid>
                            </Grid>
                            <Divider
                              variant="inset"
                              style={{ margin: "0.5rem 0rem" }}
                            />
                          </div>
                        ) : null}
                      </div>
                    ) : null}
                    {this.props.facultyData
                      .consentForMarketingCollateralsOrPhotoAndProfileRelease ? (
                      <div>
                        <Divider
                          variant="inset"
                          style={{ margin: "0.5rem 0rem" }}
                        />
                        <Grid container spacing={2}>
                          <Grid item xs={6}>
                            <Typography
                              className="ml-2"
                              style={{ fontWeight: "bold" }}
                            >
                              {" "}
                              Consent for Marketing Collaterals / Photo &
                              Profile Release :{" "}
                            </Typography>
                          </Grid>
                          <Grid item xs={6}>
                            <Typography
                              className="ml-2"
                              style={{ fontWeight: "bold" }}
                            >
                              {
                                this.props.facultyData
                                  .consentForMarketingCollateralsOrPhotoAndProfileRelease
                              }
                            </Typography>
                          </Grid>
                        </Grid>
                        <Divider
                          variant="inset"
                          style={{ margin: "0.5rem 0rem" }}
                        />
                        {this.props.facultyData
                          .consentForMarketingCollateralsOrPhotoAndProfileReleaseReason ? (
                          <div>
                            <Divider
                              variant="inset"
                              style={{ margin: "0.5rem 0rem" }}
                            />
                            <Grid container spacing={2}>
                              <Grid item xs={6}>
                                <Typography
                                  className="ml-2"
                                  style={{ fontWeight: "bold" }}
                                >
                                  {" "}
                                  Consent for Marketing Collaterals / Photo &
                                  Profile Release Reason :{" "}
                                </Typography>
                              </Grid>
                              <Grid item xs={6}>
                                <Typography
                                  className="ml-2"
                                  style={{ fontWeight: "bold" }}
                                >
                                  {
                                    this.props.facultyData
                                      .consentForMarketingCollateralsOrPhotoAndProfileReleaseReason
                                  }
                                </Typography>
                              </Grid>
                            </Grid>
                            <Divider
                              variant="inset"
                              style={{ margin: "0.5rem 0rem" }}
                            />
                          </div>
                        ) : null}
                      </div>
                    ) : null}
                    {this.props.facultyData.honorsAndAwards ? (
                      <div>
                        <Divider
                          variant="inset"
                          style={{ margin: "0.5rem 0rem" }}
                        />
                        <Grid container spacing={2}>
                          <Grid item xs={6}>
                            <Typography
                              className="ml-2"
                              style={{ fontWeight: "bold" }}
                            >
                              {" "}
                              Honors and Awards :{" "}
                            </Typography>
                          </Grid>
                          <Grid item xs={6}>
                            <Typography
                              className="ml-2"
                              style={{ fontWeight: "bold" }}
                            >
                              {this.props.facultyData.honorsAndAwards}
                            </Typography>
                          </Grid>
                        </Grid>
                        <Divider
                          variant="inset"
                          style={{ margin: "0.5rem 0rem" }}
                        />
                      </div>
                    ) : null}
                    {this.props.facultyData.memberships ? (
                      <div>
                        <Divider
                          variant="inset"
                          style={{ margin: "0.5rem 0rem" }}
                        />
                        <Grid container spacing={2}>
                          <Grid item xs={6}>
                            <Typography
                              className="ml-2"
                              style={{ fontWeight: "bold" }}
                            >
                              {" "}
                              Memberships :{" "}
                            </Typography>
                          </Grid>
                          <Grid item xs={6}>
                            <Typography
                              className="ml-2"
                              style={{ fontWeight: "bold" }}
                            >
                              {this.props.facultyData.memberships}
                            </Typography>
                          </Grid>
                        </Grid>
                        <Divider
                          variant="inset"
                          style={{ margin: "0.5rem 0rem" }}
                        />
                      </div>
                    ) : null}
                    {this.props.facultyData.researchInterest ? (
                      <div>
                        <Divider
                          variant="inset"
                          style={{ margin: "0.5rem 0rem" }}
                        />
                        <Grid container spacing={2}>
                          <Grid item xs={6}>
                            <Typography
                              className="ml-2"
                              style={{ fontWeight: "bold" }}
                            >
                              {" "}
                              Research Interest :{" "}
                            </Typography>
                          </Grid>
                          <Grid item xs={6}>
                            <Typography
                              className="ml-2"
                              style={{ fontWeight: "bold" }}
                            >
                              {this.props.facultyData.researchInterest}
                            </Typography>
                          </Grid>
                        </Grid>
                        <Divider
                          variant="inset"
                          style={{ margin: "0.5rem 0rem" }}
                        />
                      </div>
                    ) : null}
                    {this.props.facultyData
                      .articlesPublishedInInternationalJournals ? (
                      <div>
                        <Divider
                          variant="inset"
                          style={{ margin: "0.5rem 0rem" }}
                        />
                        <Grid container spacing={2}>
                          <Grid item xs={6}>
                            <Typography
                              className="ml-2"
                              style={{ fontWeight: "bold" }}
                            >
                              {" "}
                              Articles Published in International Journals :{" "}
                            </Typography>
                          </Grid>
                          <Grid item xs={6}>
                            <Typography
                              className="ml-2"
                              style={{ fontWeight: "bold" }}
                            >
                              {
                                this.props.facultyData
                                  .articlesPublishedInInternationalJournals
                              }
                            </Typography>
                          </Grid>
                        </Grid>
                        <Divider
                          variant="inset"
                          style={{ margin: "0.5rem 0rem" }}
                        />
                      </div>
                    ) : null}
                    {this.props.facultyData
                      .articlesPublishedInNationalJournals ? (
                      <div>
                        <Divider
                          variant="inset"
                          style={{ margin: "0.5rem 0rem" }}
                        />
                        <Grid container spacing={2}>
                          <Grid item xs={6}>
                            <Typography
                              className="ml-2"
                              style={{ fontWeight: "bold" }}
                            >
                              {" "}
                              Articles Published in National Journals :{" "}
                            </Typography>
                          </Grid>
                          <Grid item xs={6}>
                            <Typography
                              className="ml-2"
                              style={{ fontWeight: "bold" }}
                            >
                              {
                                this.props.facultyData
                                  .articlesPublishedInNationalJournals
                              }
                            </Typography>
                          </Grid>
                        </Grid>
                        <Divider
                          variant="inset"
                          style={{ margin: "0.5rem 0rem" }}
                        />
                      </div>
                    ) : null}
                    {this.props.facultyData
                      .summaryOfPapersPublishedInABDCJournals ? (
                      <div>
                        <Divider
                          variant="inset"
                          style={{ margin: "0.5rem 0rem" }}
                        />
                        <Grid container spacing={2}>
                          <Grid item xs={6}>
                            <Typography
                              className="ml-2"
                              style={{ fontWeight: "bold" }}
                            >
                              {" "}
                              Summary of Papers Published in ABDC Journals :{" "}
                            </Typography>
                          </Grid>
                          <Grid item xs={6}>
                            <Typography
                              className="ml-2"
                              style={{ fontWeight: "bold" }}
                            >
                              {
                                this.props.facultyData
                                  .summaryOfPapersPublishedInABDCJournals
                              }
                            </Typography>
                          </Grid>
                        </Grid>
                        <Divider
                          variant="inset"
                          style={{ margin: "0.5rem 0rem" }}
                        />
                      </div>
                    ) : null}
                    {this.props.facultyData
                      .paperPresentationsAtInternationalConference ? (
                      <div>
                        <Divider
                          variant="inset"
                          style={{ margin: "0.5rem 0rem" }}
                        />
                        <Grid container spacing={2}>
                          <Grid item xs={6}>
                            <Typography
                              className="ml-2"
                              style={{ fontWeight: "bold" }}
                            >
                              {" "}
                              Paper Presentations at International Conference :{" "}
                            </Typography>
                          </Grid>
                          <Grid item xs={6}>
                            <Typography
                              className="ml-2"
                              style={{ fontWeight: "bold" }}
                            >
                              {
                                this.props.facultyData
                                  .paperPresentationsAtInternationalConference
                              }
                            </Typography>
                          </Grid>
                        </Grid>
                        <Divider
                          variant="inset"
                          style={{ margin: "0.5rem 0rem" }}
                        />
                      </div>
                    ) : null}
                    {this.props.facultyData
                      .paperPresentationAtNationalConference ? (
                      <div>
                        <Divider
                          variant="inset"
                          style={{ margin: "0.5rem 0rem" }}
                        />
                        <Grid container spacing={2}>
                          <Grid item xs={6}>
                            <Typography
                              className="ml-2"
                              style={{ fontWeight: "bold" }}
                            >
                              {" "}
                              Paper Presentation at National Conference :{" "}
                            </Typography>
                          </Grid>
                          <Grid item xs={6}>
                            <Typography
                              className="ml-2"
                              style={{ fontWeight: "bold" }}
                            >
                              {
                                this.props.facultyData
                                  .paperPresentationAtNationalConference
                              }
                            </Typography>
                          </Grid>
                        </Grid>
                        <Divider
                          variant="inset"
                          style={{ margin: "0.5rem 0rem" }}
                        />
                      </div>
                    ) : null}
                    {this.props.facultyData.caseStudiesPublished ? (
                      <div>
                        <Divider
                          variant="inset"
                          style={{ margin: "0.5rem 0rem" }}
                        />
                        <Grid container spacing={2}>
                          <Grid item xs={6}>
                            <Typography
                              className="ml-2"
                              style={{ fontWeight: "bold" }}
                            >
                              {" "}
                              Case Studies Published :{" "}
                            </Typography>
                          </Grid>
                          <Grid item xs={6}>
                            <Typography
                              className="ml-2"
                              style={{ fontWeight: "bold" }}
                            >
                              {this.props.facultyData.caseStudiesPublished}
                            </Typography>
                          </Grid>
                        </Grid>
                        <Divider
                          variant="inset"
                          style={{ margin: "0.5rem 0rem" }}
                        />
                      </div>
                    ) : null}
                    {this.props.facultyData.booksPublished ? (
                      <div>
                        <Divider
                          variant="inset"
                          style={{ margin: "0.5rem 0rem" }}
                        />
                        <Grid container spacing={2}>
                          <Grid item xs={6}>
                            <Typography
                              className="ml-2"
                              style={{ fontWeight: "bold" }}
                            >
                              {" "}
                              Books Published :{" "}
                            </Typography>
                          </Grid>
                          <Grid item xs={6}>
                            <Typography
                              className="ml-2"
                              style={{ fontWeight: "bold" }}
                            >
                              {this.props.facultyData.booksPublished}
                            </Typography>
                          </Grid>
                        </Grid>
                        <Divider
                          variant="inset"
                          style={{ margin: "0.5rem 0rem" }}
                        />
                      </div>
                    ) : null}
                    {this.props.facultyData.bookChaptersPublished ? (
                      <div>
                        <Divider
                          variant="inset"
                          style={{ margin: "0.5rem 0rem" }}
                        />
                        <Grid container spacing={2}>
                          <Grid item xs={6}>
                            <Typography
                              className="ml-2"
                              style={{ fontWeight: "bold" }}
                            >
                              {" "}
                              Book Chapters Published :{" "}
                            </Typography>
                          </Grid>
                          <Grid item xs={6}>
                            <Typography
                              className="ml-2"
                              style={{ fontWeight: "bold" }}
                            >
                              {this.props.facultyData.bookChaptersPublished}
                            </Typography>
                          </Grid>
                        </Grid>
                        <Divider
                          variant="inset"
                          style={{ margin: "0.5rem 0rem" }}
                        />
                      </div>
                    ) : null}
                    {this.props.facultyData.listOfPatents ? (
                      <div>
                        <Divider
                          variant="inset"
                          style={{ margin: "0.5rem 0rem" }}
                        />
                        <Grid container spacing={2}>
                          <Grid item xs={6}>
                            <Typography
                              className="ml-2"
                              style={{ fontWeight: "bold" }}
                            >
                              {" "}
                              List of Patents :{" "}
                            </Typography>
                          </Grid>
                          <Grid item xs={6}>
                            <Typography
                              className="ml-2"
                              style={{ fontWeight: "bold" }}
                            >
                              {this.props.facultyData.listOfPatents}
                            </Typography>
                          </Grid>
                        </Grid>
                        <Divider
                          variant="inset"
                          style={{ margin: "0.5rem 0rem" }}
                        />
                      </div>
                    ) : null}
                    {this.props.facultyData.consultingProjects ? (
                      <div>
                        <Divider
                          variant="inset"
                          style={{ margin: "0.5rem 0rem" }}
                        />
                        <Grid container spacing={2}>
                          <Grid item xs={6}>
                            <Typography
                              className="ml-2"
                              style={{ fontWeight: "bold" }}
                            >
                              {" "}
                              Consulting Projects :{" "}
                            </Typography>
                          </Grid>
                          <Grid item xs={6}>
                            <Typography
                              className="ml-2"
                              style={{ fontWeight: "bold" }}
                            >
                              {this.props.facultyData.consultingProjects}
                            </Typography>
                          </Grid>
                        </Grid>
                        <Divider
                          variant="inset"
                          style={{ margin: "0.5rem 0rem" }}
                        />
                      </div>
                    ) : null}
                    {this.props.facultyData.researchProjects ? (
                      <div>
                        <Divider
                          variant="inset"
                          style={{ margin: "0.5rem 0rem" }}
                        />
                        <Grid container spacing={2}>
                          <Grid item xs={6}>
                            <Typography
                              className="ml-2"
                              style={{ fontWeight: "bold" }}
                            >
                              {" "}
                              Research Projects :{" "}
                            </Typography>
                          </Grid>
                          <Grid item xs={6}>
                            <Typography
                              className="ml-2"
                              style={{ fontWeight: "bold" }}
                            >
                              {this.props.facultyData.researchProjects}
                            </Typography>
                          </Grid>
                        </Grid>
                        <Divider
                          variant="inset"
                          style={{ margin: "0.5rem 0rem" }}
                        />
                      </div>
                    ) : null}
                  </Box>
                ) : (
                  <Card className="mb-2">
                    <Card.Body>
                      <Card.Text className="text-center">
                        None Details To Show
                      </Card.Text>
                    </Card.Body>
                  </Card>
                )}
              </Card.Body>
            </Accordion.Collapse>
          </Card> */}
        </Accordion>
        {/* <h6>Summary</h6>
                <p dangerouslySetInnerHTML={{ __html: this.props.facultyData.facultyDescription }} /> 
                <hr />
                <h6>Expert In </h6> 
                
                {
	this.props.facultyData.subjectList.map(subject => {
return <><i className="fas fa-book mr-2 align-self-center"></i>{subject}<br /></>
	}) }  */}

        {/* <hr /> 
<h6>Contact</h6>
                <p>email: {this.props.facultyData.email}</p>
                <p>mobile: {this.props.facultyData.mobile}</p> */}
      </div>
    ) : (
      <Card className="mb-2">
        <Card.Body>
          <Card.Text className="text-center">None Details To Show</Card.Text>
        </Card.Body>
      </Card>
    );
  }
}

export default TabBio;
