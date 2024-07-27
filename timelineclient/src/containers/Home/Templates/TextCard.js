import React, { Component } from 'react'
import Card from 'react-bootstrap/Card'
import parse from 'html-react-parser'
import './TextCard.css'
import Hashtags from '../../Hashtags/Hashtags'
export class TextCard extends Component {
  render() {
    return (
			<Card.Body style={{paddingTop: '0rem', backgroundColor : 'white'}}>
        {/* react shows a warning because card.text produces a <p> tag and the text supplied has <p> too */}
        <Card.Text dangerouslySetInnerHTML = {{__html: this.props.text.content}} style = {{textAlign: 'left'}} />	
        <Hashtags tags={this.props.text}/>
			</Card.Body>
    ) 
  }
}

export default TextCard





