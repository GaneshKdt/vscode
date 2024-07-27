import React, { Component } from 'react'
import { Card } from 'react-bootstrap'
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';

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
                <span className="IAResultDetails_Text" >
                    {this.props.options.selected === 'Y' && this.props.options.isCorrect === 'Y' ? (
                        <CheckIcon className="greencircle-icon" fontSize="large"
                            style={{ color: "#FFFFFF", marginRight: "5px", fontSize: "20px", width: "20px" }} icon="check" />)
                        : (this.props.options.selected === 'Y' && this.props.options.isCorrect !== 'Y' ?
                            (<CloseIcon className="redcircle-icon" fontSize="large"
                                style={{ color: "#FFFFFF", marginRight: "5px", fontSize: "20px", width: "20px" }} icon="times" />) : null)}
                    
                        <b>{this.props.oIndex + 1}. </b>
                        <div class="displayBlockInOneRow" dangerouslySetInnerHTML={{__html: this.props.options.optionData}} />
                    </span>
                </Card.Body>
            </Card>
        )
    }
}