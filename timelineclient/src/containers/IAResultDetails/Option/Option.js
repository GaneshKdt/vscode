import React, { Component } from 'react'
import { Card } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export class Option extends Component {
    constructor(props) {
        super(props);      

    }
    render() {
        let hightlight = ""
        if (this.props.options.selected === 'Y' && this.props.options.isCorrect != 'Y')
            hightlight = "lightRedBackground"
        // if (this.props.options.selected != 'Y' && this.props.options.isCorrect != 'Y')
        //     hightlight = ""

        // if (this.props.options.selected != 'Y' && this.props.options.isCorrect === 'Y')
        //     hightlight = ""

        if (this.props.options.selected === 'Y' && this.props.options.isCorrect === 'Y')
            hightlight = "lightGreenBackground"

        return (
            <Card className={hightlight} style={{ marginBottom: "5px" }}>
                <Card.Body className="IAResultDetails_optionCard" >
                    {this.props.options.selected === 'Y' && this.props.options.isCorrect === 'Y' ? (
                        <FontAwesomeIcon className="greencircle-icon" size="lg"
                            style={{ color: "#FFFFFF", marginRight: "5px", fontSize: "20px", width: "20px" }} icon="check" />)
                        : (this.props.options.selected === 'Y' && this.props.options.isCorrect !== 'Y' ?
                            (<FontAwesomeIcon className="redcircle-icon" size="lg"
                                style={{ color: "#FFFFFF", marginRight: "5px", fontSize: "20px", width: "20px" }} icon="times" />) : null)}
                    <span className="IAResultDetails_Text" >
                        <b>{this.props.oIndex + 1}. </b>
                        {this.props.options.optionData}
                    </span>
                </Card.Body>
            </Card>
        )
    }
}