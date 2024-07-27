import React, { Component, Fragment } from 'react'

import { Col, Row , Container, Card}  from 'react-bootstrap'
import { connect } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import ConfigUrls from '../../shared/config'
import { analyticsManager } from '../../shared/Analytics'
import AxiosHandler from '../../shared/AxiosHandler/AxiosHandler'
import { Link } from 'react-router-dom';
import ContentLoader from "react-content-loader"

const urls = new ConfigUrls().urls
const apis = new ConfigUrls().api

const MyLoader = () => (
    <ContentLoader 
      height={400}
      width={300}
      speed={4}
      primaryColor= "#ECF0F1" //"#f3f3f3"
      secondaryColor= "#BDC3C7" //"#ecebeb"
    >
      <rect x="10" y="10" rx="0" ry="0" width="280" height="325" />
      <rect x="10" y="345" rx="0" ry="0" width="280" height="15" />
      <rect x="10" y="370" rx="0" ry="0" width="280" height="15" />
    </ContentLoader>
  )

export class eLearn extends Component {

    constructor(props) {
        super(props)
        this.state = {
            loading : true,
            showPearson : false,
            status : false,
            ltiResources : null,
        }
    }

    componentDidMount(){
        this.setState({
            loading: true,
        })
       
       AxiosHandler.AxiosPostHandler({
            // url: apis.checkPearsonAccess,    // Old API for Pearson access 
            url: apis.viewELearnResources,
            data: { 
                sapid : this.props.sapId
            },
            
            successCallBack: this.pearsonEReadsSuccessResponse,
            failureCallBack: this.pearsonEReadsFailResponse
        })
    }

    pearsonEReadsSuccessResponse = (response) => {
        this.setState({
            ltiResources : response.data.ltiResources,
            loading : false,
            error : false,
            status : response.data.status
        })
    }

    pearsonEReadsFailResponse = (response) => {
        this.setState({
            error: true,
            loading: false,
        });
    }

    redirectToPearson = () => {
            window.open(urls.pearson,'_blank');
    }

    /*

    redirectToPearson = () => {
        if(this.state.showPearson){
            window.open(urls.pearson,'_blank');
        }
    }

    pearsonEReadsSuccessResponse = (response) => {
        if(response.data && response.data.studentHasAccess === true){
            let pearsonAccessDetails = {
                username: response.data.username,
                password: response.data.password,
            }
            this.setState({
                showPearson: true,
                pearsonAccessDetails: pearsonAccessDetails,
                loading: false,
            });
        } else {
            this.setState({
                showPearson: false,
                loading: false,
            });
        }
    }

    pearsonEReadsFailResponse = (response) => {
        this.setState({
            error: true,
            errorMessage: 'Error loading data',
            loading: false,
        });
    }

    hidePearsonImage = () => {
        this.setState({
            hidePearsonImage : true,
        })
    }
    
    */

    render() {

    const shimmerEffect = [];
    for (let index = 0; index < 12; index++) {
        shimmerEffect.push(
            <Col xs={12} sm={6} md={6} lg={6} xl={4} className="mt-3">
                <Card>
                    <MyLoader />
                </Card>
            </Col>
        )
    }
        
        return (
            /*
            <Container className="py-3">
                <Card>
                    <Card.Header className = "bg-white">
                        <h6>e-Learning Resources</h6>
                    </Card.Header>
                    <Card.Body>
                        {
                            this.state.loading ? (
                                <div className="mx-auto text-center p-2">
                                    <LoadingSpinner noSpace loadingText={'Fetching available resources..'}/>
                                </div>
                            ) : this.state.error ? (
                                    <div className="text-center">
                                        <ErrorComponent message = { this.state.errorMessage ? this.state.errorMessage : 'Error Loading Data' } /> 
                                    </div>
                                ) : this.state.showPearson && this.state.showPearson === true ? (
                                    <Col lg={4} md={6} sm={12} xs={12}>
                                        <Card>
                                            <Card.Header className = "bg-white">
                                                <h6 className="card-title">
                                                    {
                                                        !this.state.hidePearsonImage ? (
                                                            <img 
                                                                src={ this.state.hidePearsonImage ? null : "/timeline/images/logos/pearson.png"} 
                                                                onError={ this.hidePearsonImage }
                                                                style={{
                                                                    height: '2rem'
                                                                }}
                                                            />
                                                        ) : null
                                                    }
                                                    Pearson e-Library    
                                                </h6>
                                            </Card.Header>
                                            <Card.Body>
                                                <Col className="mb-2">
                                                    <Col>
                                                        <label><b>Username</b></label>
                                                    </Col>
                                                    <Col>
                                                        {this.state.pearsonAccessDetails.username}
                                                    </Col>
                                                </Col>
                                                <Col className="mt-2">
                                                    <Col>
                                                        <label><b>Password</b></label>
                                                    </Col>
                                                    <Col>
                                                        {this.state.pearsonAccessDetails.password}
                                                    </Col>
                                                </Col>
                                            </Card.Body>
                                            <Card.Footer className = "bg-white">
                                                <Col>
                                                    <a className="text-primary" onClick={this.redirectToPearson}>Click here to go to the Pearson e-Library</a>
                                                </Col>
                                            </Card.Footer>
                                        </Card>
                                    </Col>
                            ) : (
                                <div className="text-center">
                                    <ErrorComponent message = { 'No e-Learning Resources available at this time' } /> 
                                </div>
                            )
                        }
                    </Card.Body>
                </Card>
            </Container>
            */
            <Container>
                <Card>
                    <Card.Header>
                        <h4><FontAwesomeIcon icon="graduation-cap" />&nbsp;&nbsp;eLearn Resources</h4>
                    </Card.Header>
                    <Card.Body>
                        {this.state.loading ? (
                            <div>
                                <Row>
                                    <Col xs={12}>
                                        <Row className = "mr-5 mb-3">
                                            {shimmerEffect}
                                        </Row>
                                    </Col>
                                </Row>
                            </div>

                        ) : this.state.error ? (
                            <div>
                                <Card.Title style={{textAlign: "center"}} >
                                    <FontAwesomeIcon  className="mr-2" icon="exclamation-circle"/> 
                                        No eLearn Available !
                                </Card.Title>

                                {/* <Card>
                                    <Card.Body>
                                        <Col className="mb-2">
                                            <Col>
                                                <label><b>Username : </b></label>
                                                {this.props.sapId}
                                            </Col>
                                        </Col>
                                        <Col className="mt-2">
                                            <Col>
                                                <label><b>Password : </b></label>
                                                Ngasce@2019
                                            </Col>
                                        </Col>
                                    </Card.Body>
                                    <Card.Footer className = "bg-white">
                                        <Col>
                                            <a className="text-primary" onClick={this.redirectToPearson}>Click here to go to the Pearson e-Library</a>
                                        </Col>
                                    </Card.Footer>
                                </Card> */}

                            </div>
                        ) : !this.state.error ? (
                        <div>
                            <Row>
                                <Col xs={12}>
                                    <Row className = "mr-5 mb-3">
                                        {this.state.ltiResources.map(resource => {
                                            return(
                                                <Fragment>
                                                    <Col xs={12} sm={6} md={6} lg={6} xl={4} className=" mt-3">
                                                        <Link target="_blank" to={{
                                                                        pathname: urls.apiUrl_ltiDemo 
                                                                        + 'm/viewLTIResource?rid=' + resource.id 
                                                                        + '&sapid='+this.props.sapId  }}>
                                                            <Card className="h-100">
                                                                <Card.Img variant="top" thumbnail src={resource.Thumbnail_URLs} />
                                                                <Card.Body>
                                                                    {resource.contextTitle}
                                                                    {/* <Card.Text>{resource.resource_link_description}</Card.Text> */}
                                                                </Card.Body>
                                                            </Card>
                                                        </Link>
                                                    </Col>
                                                </Fragment>
                                            )
                                        })}
                                        {/* Display Wiley Ebook for MBA-Wx Term 5 Students only */}
                                            {/* {this.props.consumerProgramStructureId == '151' && this.props.sem == '5' &&
                                            <Col xs={12} sm={6} md={6} lg={6} xl={4} className=" mt-3">
                                                <Link target="_blank" to={{ pathname : 'https://ebooks.wileyindia.com/pdfreader/damodaran-on-valuation-2ed50075794'}} 
                                                    referrerpolicy="strict-origin-when-cross-origin">
                                                    <Card className="h-100">
                                                        <Card.Img variant="top" thumbnail src={'https://d5fsf5hqkq44r.cloudfront.net/resources_2015/images/wiley.png'} />
                                                        <Card.Body>
                                                            {'Textbook for Analytics'}
                                                        </Card.Body>
                                                    </Card>
                                                </Link>
                                            </Col>
                                            } */}
                                    </Row>
                                </Col>
                            </Row>
                        </div> 
                        ) : (
                        <div>
                            <Card.Title>
                                <FontAwesomeIcon  className="mr-2" icon="exclamation-circle"/> 
                                Error Loading Data ! Please try again after some time !
                            </Card.Title>
                        </div>
                        )}
                    </Card.Body>
                </Card>
            </Container>
        )
    }
}

const mapStateToProps = state => {
    return {
        sapId: state.sapid,
        consumerProgramStructureId: state.consumerProgramStructureId,
        program: state.program,
        sem: state.sem
    }
}

export default connect(mapStateToProps)(analyticsManager(eLearn))