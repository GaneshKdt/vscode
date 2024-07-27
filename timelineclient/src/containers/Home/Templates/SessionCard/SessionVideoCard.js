import React, { Component } from 'react'
import Card from 'react-bootstrap/Card'
import Hashtags from '../../../Hashtags/Hashtags' 
import { connect } from 'react-redux'
const prof_pic = {
	height: '50px', 
	width: '50px',
}

const action_menu_btn = {
    float: 'right',
    color: '#d9d9d9'
}
class VideoCard extends Component {
    constructor(props) {
		super(props)
		
    } 
    
    render() {
        return (
            <>
            <Card.Body style={{paddingTop: '0rem',paddingBottom: '0px', backgroundColor : 'white'}} >
                {/* <Card.Text dangerouslySetInnerHTML = {{__html: this.props.session.content}} style = {{textAlign: 'left'}} /> */}
                <div style = {{marginBottom: '10px'}} dangerouslySetInnerHTML = {{__html: this.props.session.content}} ></div>
                <Hashtags tags={this.props.session.hashtags}/>

                {/* <div className="d-flex ">
                    
                </div> */}
            </Card.Body>
            <div className="embed-responsive embed-responsive-16by9"><iframe className="embed-responsive-item" src={this.props.url} allowfullscreen="allowfullscreen"></iframe></div>
            </>
        )
    }


}

const mapStateToProps = state => {
	return {
		sapId: state.sapid,
		data:state
	}
}

export default connect(mapStateToProps)(VideoCard)

