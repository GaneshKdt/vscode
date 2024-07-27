import React, { Component } from 'react';
import Form from 'react-bootstrap/Form'

class FormControls extends Component{ 

    state={
        // data : this.props.data,
        type : this.props.type,
        
    }
    componentDidMount(){
        console.log("form control============",this.props);
    }

    componentDidMount(){
        this.setState({
            // data : this.props.data,
        })
       
    }
    
    renderElements(){
        console.log("errors--------",this.props.errors);
        var error;
        if(this.props.errors!="" && this.props.errors!=undefined){
            error = JSON.parse(this.props.errors);
        }
        console.log("inside--------",error);
        switch (this.props.type){
            case "label":
                return(<Form.Label column>
                    {this.props.text}
                </Form.Label>)
                // break;
            case "text":
                return (
                    <>
                    <Form.Control
                        name={this.props.name}
                        value={this.props.value}
                        onChange={this.props.onChange}
                        style={this.props.style}
                        placeholder={this.props.placeholder}
                    />
                    {this.props.errors && error ? (
                        <Form.Text className="text-muted">
                        <span className="mandatory">{error[this.props.name]}</span>
                        </Form.Text>
                    ) : null}
                    </>
                );
                // break;
            case "textarea":
                return(<><Form.Control as="textarea" name={this.props.name} value={this.props.value} onChange={this.props.onChange} style={this.props.style} placeholder={this.props.placeholder}/>
                {this.props.errors && error  ?
                    <Form.Text className="text-muted"><span className="mandatory">{error[this.props.name]}</span></Form.Text>
                :null}
                </>)
                // break;
            case "select":
                return(<>
                        <Form.Control as="select" name={this.props.name} value={this.props.value} onChange={this.props.onChange} style={this.props.style} >
                            <option value="">Select</option>
                            {this.props.elementArray && this.props.elementArray.map((element) => {
                                        if(element === "Y")
                                            return(<option key={element} value={element}>Yes</option>)
                                        if(element === "N")
                                            return(<option key={element} value={element}>No</option>)
                                        else
                                            return(<option key={element} value={element}>{element}</option>)
                                    }
                                )
                            }
                        </Form.Control>
                        
                        {this.props.errors && error  ?
                            <Form.Text className="text-muted"><span className="mandatory">{error[this.props.name]}</span></Form.Text>
                        :null}
                    </>)
                // break;
            case "label", "textarea", "select" :
                if(this.props.errors && error)  
                   return <Form.Text className="text-muted"><span className="mandatory">{error[this.props.name]}</span></Form.Text>
               
            default :
                break;    
        }
        // if(data && data.errors){
        //     return(<Form.Text className="text-muted"><span className="mandatory">{data.errors}</span></Form.Text>)
        // }
    }
    render(){
        
        return(
            <>
               {this.renderElements()}
            </>
        )
    }
}
export default FormControls