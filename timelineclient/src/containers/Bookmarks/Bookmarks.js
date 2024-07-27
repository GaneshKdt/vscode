import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Box, Grid } from "@material-ui/core";
import React, { Component } from "react";
import { Accordion, Button, Card, Col, Row } from "react-bootstrap";
import { connect } from "react-redux";
import { analyticsManager } from "../../shared/Analytics";
import AxiosHandler from "../../shared/AxiosHandler/AxiosHandler";
import ConfigUrls from "../../shared/config";
import LoadingSpinner from "../../shared/LoadingSpinner/LoadingSpinner";
import "./Bookmarks.css";
import $ from "jquery";
import "jquery-ui-bundle";
import { LinkContainer } from "react-router-bootstrap";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

const getBookmarksResources = new ConfigUrls().api.getBookmarksResources;
const getBookmarksVideos = new ConfigUrls().api.getBookmarksVideos;
const urls = new ConfigUrls().urls;
const previewPath = ['pdf','PDF']
export class Bookmarks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bookmarksResources: [],
      bookmarksVideos: [],
      sapId: this.props.sapId,
      content_id: "",
      loaded: false,
      error: false,
      errorMessage: "",
    };
  }

  componentDidMount() {
    console.log("Inside Bookmarks");

    //for resources bookmarks
    AxiosHandler.AxiosPostHandler({
      url: getBookmarksResources,
      data: {
        sapId: this.state.sapId,
      },
      successCallBack: (response) => {
        console.log("BookmarksResources : ", response);
        this.setState({
          bookmarksResources: response.data,
          loaded: true,
        });
      },
      failureCallBack: (error) => {
        this.setState({
          loaded: true,
          error: true,
          errorMessage: "Error Loading Resources bookmarks!",
        });
      },
    });

    //for videos bookmarks
    AxiosHandler.AxiosPostHandler({
      url: getBookmarksVideos,
      data: {
        sapId: this.state.sapId,
      },
      successCallBack: (response) => {
        console.log("BookmarksVideos : ", response);
        this.setState({
          bookmarksVideos: response.data,
          loaded: true,
        });
      },
      failureCallBack: (error) => {
        this.setState({
          loaded: true,
          error: true,
          errorMessage: "Error Loading Videos bookmarks!",
        });
      },
    });
  }

  getDaysFromUpload = (sessionDate) => {
    try {
      var startDate = Date.parse(sessionDate);
      var endDate = new Date();
      console.log("In getDaysFromUpload sdate : edate are :");
      console.log(startDate);
      console.log(endDate);
      var timeDiff = endDate - startDate;
      var daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
      return daysDiff == 1 ? daysDiff + " day ago" : daysDiff + " days ago";
    } catch (error) {
      return " ";
    }
  };

  handleBookmark = (event) => {
    console.log("handleBookmark : ", event.target);
    let obj = $(event.target).attr("id");
    if (!$(event.target).attr("type")) {
      obj = $(event.target).parent().parent().attr("id");
      console.log("obj : ", $(obj));
    }
    confirmAlert({
      title: "Confirm to submit",
      message: "Are you sure you want to remove this content from bookmarks?",
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            if (obj) {
              AxiosHandler.AxiosPostHandler({
                url: urls.apiUrl_studentPortals + "setBookmark",
                data: {
                  id: obj,
                  sapId: this.props.sapId,
                },
                successCallBack: (response) => {
                  $("." + obj).remove();
                  if ($(".resourceContent div").html() == "") {
                    $(".resourceContent").html(
                      '<p class="text-center card-text">No bookmarks of Resources</p>'
                    );
                  }
                  if ($(".videoContent div").html() == "") {
                    $(".videoContent").html(
                      '<p class="text-center card-text">No bookmarks of Videos</p>'
                    );
                  }
                },
                failureCallBack: (error) => {
                  console.log(error);
                },
              });
            }
          },
        },
        {
          label: "No",
          onClick: () => {},
        },
      ],
    });
  };

  getImageSource = (path) => {
    if (
      path.endsWith(".pdf") ||
      path.endsWith(".PDF") ||
      path.endsWith(".Pdf")
    ) {
      return "https://studentzone-ngasce.nmims.edu/ltidemo/assets/images/preview/pdf.png";
    } else if (
      path.endsWith(".ppt") ||
      path.endsWith(".pptx") ||
      path.endsWith(".PPT") ||
      path.endsWith(".PPTX")
    ) {
      return "https://studentzone-ngasce.nmims.edu/ltidemo/assets/images/preview/powerpoint.png";
    } else if (
      path.endsWith(".doc") ||
      path.endsWith(".docx") ||
      path.endsWith(".DOC") ||
      path.endsWith(".DOCX")
    ) {
      return "https://studentzone-ngasce.nmims.edu/ltidemo/assets/images/preview/document.png";
    } else {
      return "https://studentzone-ngasce.nmims.edu/ltidemo/assets/images/preview/xls.png";
    }
  };

  getFileType = (path) => {
    if (
      path.endsWith(".pdf") ||
      path.endsWith(".PDF") ||
      path.endsWith(".Pdf")
    ) {
      return "PDF";
    } else if (
      path.endsWith(".ppt") ||
      path.endsWith(".pptx") ||
      path.endsWith(".PPT") ||
      path.endsWith(".PPTX")
    ) {
      return "PPT";
    } else if (
      path.endsWith(".doc") ||
      path.endsWith(".docx") ||
      path.endsWith(".DOC") ||
      path.endsWith(".DOCX")
    )  
    {
      return "Word";
    } 
    else if (
      path.endsWith(".zip")
    )  
    {
      return "zip";
    } 
    else if (
      path.endsWith(".rar") 
    )  
    {
      return "rar";
    } 
    
    else {
      return "Excel";
    }
  };

  render() {
    const { loaded, error, errorMessage } = this.state;

    if (!loaded) {
      return <LoadingSpinner />;
    } else {
      return (
        <Card>
          <Card.Header>
            <Card.Title>
              <h5 className="bookmarkHeader">
                <FontAwesomeIcon icon="bookmark" /> Bookmarks
              </h5>
            </Card.Title>
          </Card.Header>
          <Card.Body>
            <Accordion>
              <Card>
                <Card.Header>
                  <Accordion.Toggle as={Button} variant="link" eventKey="0">
                    Resources
                  </Accordion.Toggle>
                </Card.Header>
                <Accordion.Collapse eventKey="0">
                  <Card.Body className="resourceContent">
                    {this.state.bookmarksResources.length != 0 ? (
                      <div>
                        {this.state.bookmarksResources.map((content) => {
                          var fileLocation_for_download =
                            urls.apiUrl_content_download_aws + content.previewPath;

                          var fileLocation_for_view =
                            urls.apiUrl_content_download_aws +
                            encodeURI(content.previewPath);
                          return (
                            (content.previewPath != null)?
                            <Box padding="1rem" className={content.id}>
                              <Grid container spacing={1}>
                                <Grid items xs={12}>
                                  <Card>
                                    <Card.Header>
                                      <Card.Title>
                                        <Row>
                                          <Col xs={8}>
                                            <Card.Text>
                                              {content.subject}
                                            </Card.Text>
                                          </Col>
                                          <Col
                                            xs={4}
                                            style={{
                                              textAlign: "right",
                                            }}
                                          >
                                            <Card.Text>
                                              {this.getDaysFromUpload(
                                                content.createdDate
                                              )}
                                            </Card.Text>
                                          </Col>
                                        </Row>
                                      </Card.Title>
                                    </Card.Header>
                                    <Card.Body>
                                      <Box
                                        style={{
                                          border: "1px solid lightgray",
                                          borderRadius: ".25rem",
                                          padding: "1rem",
                                        }}
                                      >
                                        <Row>
                                          <Col xs={1}>
                                            <Card.Img
                                              variant="top"
                                              src={this.getImageSource(
                                                content.previewPath
                                              )}
                                              style={{
                                                height: "3rem",
                                                width: "3rem",
                                              }}
                                              alt={content.name}
                                            />
                                          </Col>
                                          <Col xs={11}>
                                            <Card.Text
                                              style={{ fontWeight: "bold" }}
                                            >
                                              Description :{" "}
                                              {content.description}
                                              <br />
                                              Content Type :{" "}
                                              {content.contentType}
                                              <br />
                                              File Type :{" "}
                                              {this.getFileType(
                                                content.previewPath
                                              )}
                                              <br />
                                              <div className="float-right mr-3">
                                              {previewPath.some(word =>  content.previewPath.includes(word))
															                ? 
                                                <LinkContainer
                                                  to={{
                                                    pathname:
                                                      "/timeline/documentViewer",
                                                    source: fileLocation_for_view,
                                                  }}
                                                  style={fileButton}
                                                >
                                                  <Button variant="light ">
                                                    <FontAwesomeIcon icon="eye" />
                                                  </Button>
                                                </LinkContainer>
                                           : 
                                                content.urlType ===
                                                "Download" ? (
                                                  <Button
                                                    variant="light "
                                                    style={fileButton}
                                                    href={
                                                      fileLocation_for_download
                                                    }
                                                    target="_blank"
                                                  >
                                                    <FontAwesomeIcon icon="download" />
                                                  </Button>
                                                ) : null} 
                                                <Button
                                                  variant="light "
                                                  id={content.id}
                                                  style={fileButton}
                                                  onClick={this.handleBookmark}
                                                >
                                                  <FontAwesomeIcon
                                                    icon="bookmark"
                                                    style={{
                                                      color: "#fabc3d",
                                                    }}
                                                  />
                                                </Button>
                                              </div>
                                            </Card.Text>
                                          </Col>
                                        </Row>
                                      </Box>
                                    </Card.Body>
                                  </Card>
                                </Grid>
                              </Grid>
                            </Box>
                            :<></>
                          );
                        })}
                      </div>
                    ) : (
                      <Card.Text className="text-center">
                        No bookmarks of Resources
                      </Card.Text>
                    )}
                  </Card.Body>
                </Accordion.Collapse>
              </Card>

              <Card>
                <Card.Header>
                  <Accordion.Toggle as={Button} variant="link" eventKey="1">
                    Videos
                  </Accordion.Toggle>
                </Card.Header>
                <Accordion.Collapse eventKey="1">
                  <Card.Body className="videoContent">
                    {this.state.bookmarksVideos.length != 0 ? (
                      <div>
                        {this.state.bookmarksVideos.map((video) => {
                          return (
                            <Box padding="1rem" className={video.id}>
                              <Grid container spacing={1}>
                                <Grid items xs={12}>
                                  <Card>
                                    <iframe
                                      style={{ height: "30rem" }}
                                      src={video.videoLink}
                                    />
                                    <Card.Body>
                                      <Box>
                                        <Grid container spacing={2}>
                                          <Grid items xs={8}>
                                            <Card.Title>
                                              <Card.Text>
                                                {video.fileName}
                                              </Card.Text>
                                            </Card.Title>

                                            <Card.Text>
                                              <span className="text-muted">
                                                <FontAwesomeIcon icon="user-circle" />
                                                {"  "}
                                                {video.facultyName}
                                              </span>
                                              <br />
                                              <br />
                                              <span className="text-muted">
                                                <FontAwesomeIcon icon="clock" />
                                                {"  "}
                                                {this.getDaysFromUpload(
                                                  video.sessionDate
                                                )}
                                              </span>
                                            </Card.Text>
                                          </Grid>
                                          <Grid items xs={4}>
                                            <Button
                                              variant="light"
                                              id={video.id}
                                              onClick={this.handleBookmark}
                                              style={{ float: "right" }}
                                            >
                                              <FontAwesomeIcon
                                                icon="bookmark"
                                                style={{
                                                  color: "#fabc3d",
                                                }}
                                              />
                                            </Button>
                                          </Grid>
                                        </Grid>
                                      </Box>
                                    </Card.Body>
                                  </Card>
                                </Grid>
                              </Grid>
                            </Box>
                          );
                        })}
                      </div>
                    ) : (
                      <Card.Text className="text-center">
                        No Bookmarks for Videos
                      </Card.Text>
                    )}
                  </Card.Body>
                </Accordion.Collapse>
              </Card>
            </Accordion>
          </Card.Body>
        </Card>
      );
    }
  }
}

const mapStateToProps = (state) => {
  return {
    sapId: state.sapid,
  };
};

const fileButton = {
  color: "gray",
  paddingRight: "1",
  margin: "1",
  backgroundColor: "white",
};

export default connect(mapStateToProps)(analyticsManager(Bookmarks));
