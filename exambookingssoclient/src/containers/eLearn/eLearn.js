import React, { Component, Fragment } from 'react'

import { Col, Row , Container, Card}  from 'react-bootstrap'
import { connect } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import ConfigUrls from '../../shared/config'
import AxiosHandler from '../../shared/AxiosHandler/AxiosHandler'
import { Link } from 'react-router-dom';
import ContentLoader from "react-content-loader"
import PageContent from '../../components/PageContent/PageContent'

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
            status : response.data.status,
            loaded:true
        })
    }

    pearsonEReadsFailResponse = (response) => {
        this.setState({
            error: true,
            loading: false,
            loaded:true,
            errorMessage:"Internal Server Error! Please try again!"
        });
    }

    redirectToPearson = () => {
            window.open(urls.pearson,'_blank');
    }

    

    render() {

    const shimmerEffect = [];
    for (let index = 0; index < 12; index++) {
        shimmerEffect.push(
            <Col xs={12} sm={6} md={4} lg={3} xl={3} className="mt-3">
                <Card>
                    <MyLoader />
                </Card>
            </Col>
        )
    }
        
        return (
            <PageContent
            id = 'eLearn'
            title = 'E-Learn'
            subtitle = 'Your E-Learn Books'
            loaded = {this.state.loaded}
         error = {this.state.error}
             loadingMessage = 'Loading...'
             errorMessage = { this.state.errorMessage }
        >
            <Container>
                <br />
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

                            </div>
                        ) : !this.state.error ? (
                        <div>
                            <Row>
                                <Col xs={12}>
                                    <Row className = "mr-5 mb-3">
                                        {this.state.ltiResources.map(resource => {
                                            return(
                                                <Fragment>
                                                    <Col xs={12} sm={6} md={4} lg={3} xl={3} className=" mt-3">
                                                        <Link target="_blank" to={{
                                                                        pathname: urls.apiUrl_ltiDemo 
                                                                        + 'm/viewLTIResource?rid=' + resource.id 
                                                                        + '&sapid='+this.props.sapId  }}>
                                                            <Card className="h-100">
                                                                <Card.Img variant="top" thumbnail src={resource.Thumbnail_URLs} />
                                                                <Card.Body>
                                                                    <Card.Title>{resource.contextTitle}</Card.Title>
                                                                 
                                                                </Card.Body>
                                                            </Card>
                                                        </Link>
                                                    </Col>
                                                </Fragment>
                                            )
                                        })}
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
            </PageContent>
        )
    }
}

const mapStateToProps = state => {
    return {
        sapId: state.sapid
    }
}

export default connect(mapStateToProps)(eLearn)