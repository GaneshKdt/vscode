import React, { Component } from 'react'

import {Form, Popover, OverlayTrigger, Container, Row, Col} from 'react-bootstrap'
class Input extends Component{
    constructor(props) {
      super(props);
      this.overLayRef = React.createRef();
    }

    showOverlay(){
    }

    hideOverlay(){
    }
    
    render(){
        
        let inputElement = null

        switch ( this.props.elementType ) {
            case ( 'input' ):
                inputElement = (
                    <Form.Control
                        {...this.props.elementConfig}
                        value={this.props.value}
                        onChange={this.props.changed} 
                        onFocus={this.showOverlay()}
                        onBlur={this.hideOverlay()}
                        isValid = {this.props.touched && this.props.isValid}
                        isInvalid = {this.props.touched && !this.props.isValid}
                    />
                );
                break;
            case ( 'textarea' ):
                inputElement = (
                    <Form.Control 
                        as="textarea"
                        {...this.props.elementConfig}
                        value={this.props.value}
                        onChange={this.props.changed} 
                        onFocus={this.showOverlay()}
                        onBlur={this.hideOverlay()}
                        isValid = {this.props.touched && this.props.isValid}
                        isInvalid = {this.props.touched && !this.props.isValid}
                    />
                );
                break;
            case ( 'select' ):
                inputElement = (
                    <Form.Control 
                        as="select"
                        value={this.props.value}
                        onChange={this.props.changed}
                        onFocus={this.showOverlay()}
                        onBlur={this.hideOverlay()}
                        isValid = {this.props.touched && this.props.isValid}
                        isInvalid = {this.props.touched && !this.props.isValid}
                    >
                        {this.props.elementConfig.options.map(option => (
                            <option key={option.value} value={option.value}>
                                {option.displayValue}
                            </option>
                        ))}
                    </Form.Control>
                );
                break;
                
            case ( 'password' ):
                    inputElement = (
                        <Form.Control 
                            as="select"
                            value={this.props.value}
                            onChange={this.props.changed}
                            onFocus={this.showOverlay()}
                            onBlur={this.hideOverlay()}
                            isValid = {this.props.touched && this.props.isValid}
                            isInvalid = {this.props.touched && !this.props.isValid}
                        >
                            {this.props.elementConfig.options.map(option => (
                                <option key={option.value} value={option.value}>
                                    {option.displayValue}
                                </option>
                            ))}
                        </Form.Control>
                    );
                    break;
            case ( 'label' ): inputElement = (
                    <Form.Label className={this.props.labelWidth} >
                        {this.props.value}
                    </Form.Label>
                );
                break;

            default:
                inputElement = (
                    <Form.Control 
                        {...this.props.elementConfig}
                        value={this.props.value}
                        onChange={this.props.changed}
                        onFocus={this.showOverlay()}
                        onBlur={this.hideOverlay()}
                        isValid = {this.props.touched && this.props.isValid}
                        isInvalid = {this.props.touched && !this.props.isValid}
                    />
                );
    
        }

        var invalidMessage = []
        for(let key in this.props.invalidMessage){
            invalidMessage.push(
                <li key={key + this.props.controlId}>
                    {this.props.invalidMessage[key]}
                </li>
            )                    
        }

        return (
                <Form.Group 
                    controlId={this.props.controlId} 
                    className = {this.props.className}
                    style={{
                        "wordWrap": "break-word"
                    }}
                >
                    <Row>
                        <Col {...this.props.labelColProps}
                            //vertical center
                            style={{
                                "marginTop": "auto",
                                "marginBottom": "auto",
                                "marginLeft": "0px",
                                "marginRight": "0px",
                            }}
                        >
                            <Form.Label className={this.props.labelWidth} >
                                {this.props.label}{
                                    this.props.required? (
                                        <span className="text-danger"> * </span>
                                    ) : null
                                }
                            </Form.Label>
                        </Col>
                        <Col 
                            {...this.props.inputColProps}
                            style={{
                                "marginTop": "auto",
                                "marginBottom": "auto",
                                "marginLeft": "0px",
                                "marginRight": "0px",
                            }}
                        >
                            {inputElement}
                        </Col>
                    </Row>
                    <Row>
                        <Col {...this.props.labelColProps}></Col>
                        <Col {...this.props.inputColProps}>
                            <Form.Text className="text-danger pl-3">
                                {
                                    ( this.props.invalidMessage && this.props.touched ) ? 
                                    (
                                        <ul>
                                        {
                                            this.props.invalidMessage.map(message => (
                                                <li key={message + this.props.controlId}>
                                                    {message}
                                                </li>
                                            ))
                                        }
                                        </ul>
                                    ) : null
                                }
                            </Form.Text>
                        </Col>
                    </Row>
                       
                </Form.Group>
        );
    }
};

export default Input;