import React, { Component, form } from 'react'
import Input from './Input'
import { Form, Button, Card, Container, Row } from 'react-bootstrap'

class CustomForm extends Component{

    state = {
        formIsValid: false
    }

    constructor(props) {
        super(props)
        this.state = {
            //These are the core components. 
            formInputs: this.props.formInputs,

            //Purely visual, these are the headings for a group of form inputs
            //TODO: ability to mention order of input groups for rendering tabs, accodions, etc
            inputGroups: this.props.inputGroups,
            //Purely visual, these are the accodions for a group of form inputs. 
            //If none are mentioned, or have no inputs in them, no accodion groups are shown.
            //An input group can be placed in an accodion.
            accodionGroups: this.props.accodionGroups,

            //Purely visual, these are the tabs for a group of form inputs. 
            //If none are mentioned, or have no inputs in them, no tab groups are shown.
            //An accodion can be placed in a tab or input groups can directly mention their tab group
            tabGroups: this.props.tabGroups,

            //Defaults to a Submit text on the button. Can insert a loading icon here along with the button state var
            submitButtonText: this.props.submitButtonText? this.props.submitButtonText : "Submit",
            
            //when this is true, it means we disable the submit button
            submitButtonProcessing: this.props.submitButtonProcessing? this.props.submitButtonProcessing : false,
            
            //Parent/caller mentions this.
            //This is to provide flexibility and showing loader over the form.
            formPostAction: this.props.submitForm,
        }
    }

    static getDerivedStateFromProps(nextProps, prevState){
        
        if((prevState && prevState.updateState)){
            prevState.updateState = false;
            return prevState
        }

        let newState = {
            //These are the core components. 
            formInputs: nextProps.formInputs,

            //Purely visual, these are the headings for a group of form inputs
            //TODO: ability to mention order of input groups for rendering tabs, accodions, etc
            inputGroups: nextProps.inputGroups,
            //Purely visual, these are the accodions for a group of form inputs. 
            //If none are mentioned, or have no inputs in them, no accodion groups are shown.
            //An input group can be placed in an accodion.
            accodionGroups: nextProps.accodionGroups,

            //Purely visual, these are the tabs for a group of form inputs. 
            //If none are mentioned, or have no inputs in them, no tab groups are shown.
            //An accodion can be placed in a tab or input groups can directly mention their tab group
            tabGroups: nextProps.tabGroups,

            //Defaults to a Submit text on the button. Can insert a loading icon here along with the button state var
            submitButtonText: nextProps.submitButtonText? nextProps.submitButtonText : "Submit",
            
            //when this is true, it means we disable the submit button
            submitButtonProcessing: nextProps.submitButtonProcessing? nextProps.submitButtonProcessing : false,
            
            //Parent/caller mentions this.
            //This is to provide flexibility and showing loader over the form.
            formPostAction: nextProps.submitForm,
        }
        return newState
    }


    inputChangedHandler = (event, elementId) => {
        var updatedForm = {
            ...this.state.formInputs
        };
        var updatedFormElement = { 
            ...updatedForm[elementId]
        };

        //update the visible value
        updatedFormElement.value = event.target.value;

        //update check the status of the element validations.
        updatedFormElement.touched = true;
        updatedForm[elementId] = updatedFormElement;
        
        let formIsValid = true;
        
        var confirmedForm = []
        for (let index in updatedForm) {
            var thisInput = updatedForm[index];

            //2 inputs must have requiresConfirm as true and confirmKey on both must be the same.
            //Ex: password and conf. password can have key as "User Password".
            thisInput.confirmed = true
            // console.log(thisInput)
            if(thisInput.confirmKey){
                for (let index2 in updatedForm) {
                    let inputToCheckWith = updatedForm[index2];
                    if(inputToCheckWith.confirmKey && inputToCheckWith.value != thisInput.value){
                        thisInput.confirmed = false
                    }
                }
            }

            thisInput.invalidMessages = []
            if(!thisInput.confirmed){
                thisInput.valid = false
                formIsValid = false
                thisInput.invalidMessages.push('Your inputs dont match')
            }else{
                thisInput = this.checkValidity(thisInput);
            }
            confirmedForm.push(thisInput)
        }

        for(let elementIdentifier in updatedForm){
            //if the valid attribute is set, then use the set attribute, else check if this elements required status is set, 
                //if required, its not valid, else if not required, then its valid , 
            //if not then set its valid state as true
            formIsValid = (
                (updatedForm[elementIdentifier].valid != null && updatedForm[elementIdentifier].valid != undefined ? 
                    updatedForm[elementIdentifier].valid : 
                    (
                        updatedForm[elementIdentifier].required ? 
                        !updatedForm[elementIdentifier].required : true 
                    )
                )
                && formIsValid
            );
        }
        this.setState({
            formInputs: confirmedForm, 
            formIsValid: formIsValid,
            updateState: true,
        });
    }

    checkValidity(formInput) {
        if(formInput.validation){
            return formInput.validation(formInput)
        }

        var invalidMessages = []

        var value = formInput.value

        var required = formInput.required ? formInput.required : false;
        var min = formInput.min ? formInput.min : 0;
        var max = formInput.max ? formInput.max : 0;

        //At any point 
        var valid = true

        //init the regex string at [ . ] (any character) [ * ] (any length), any number of lines .
        var regex = /(^.*$)*/
        //check the inputType of this input and run custom validations if necessary.
        //Always run these checks first.
        if(formInput.regex){
            regex = formInput.regex
            if(formInput.inputType == 'date'){
                valid = this.validateDate(value);
            }
        }else{
            if (formInput.name  != 'oldPassword'){
            switch(formInput.inputType){
                //add additional custom validations here.
                case 'email':
                    //A standard email regex
                    regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                    break;
                case 'password':
                    regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,20}$/
                    break;
                case 'name':
                    //Full name
                    regex = /^[a-zA-Z .,-]*$/;
                    break;
                case 'firstName':
                    //First name only
                    regex = /^[a-zA-Z]*$/;
                    break;
                case 'lastName':
                    //Last name only
                    regex = /^[a-zA-Z]*$/;
                    break;
                case 'mobile':
                    //Mobile -- a 10 digit long number
                    regex = /^\d{10}$/;
                    break;
                case 'date':
                    //If its a date, apply a date validation function.
                    regex = /(^.*$)*/
                    //valid = false if invalid date
                    valid = this.validateDate(value);
                    break;
                default :
                    regex = /(^.*$)*/
            }
          }
        }
        //check if required
        var requiredConditionFulfilled = true;
        if(required){
            if(value == ''){
                requiredConditionFulfilled = false
                invalidMessages.push("This is a required field.")
            }
        }

        //Check for regex match
        var regexMatched = true;
        if(!regex.test(value)){
            regexMatched = false;
            if(formInput.inputType == 'password')
                invalidMessages.push("Entered Password does not match the Password policy.")
            else
                invalidMessages.push("Your input doesn't match the required pattern")
        }
        
        //Check if the minlength and max length are correct
        var minMaxConditionFulfilled = true;
        if(formInput.inputType == 'date'){
            if( !(  min <= value && (value <= max || max == 0))   ){
                invalidMessages.push("Date not in range " + min + " - " + max)
                minMaxConditionFulfilled = false
            }
        }else{
            if( !(  min <= value.length && (value.length <= max || max == 0))   ){
                invalidMessages.push("Text size not in range " + min + " - " + max + ".")
                minMaxConditionFulfilled = false
            }
        }
        if(valid && requiredConditionFulfilled && regexMatched && minMaxConditionFulfilled){
            formInput.valid = true;
            formInput.invalidMessages = null
            //if element is not required and its length is 0
        }else if(!required && value.length == 0){
            formInput.valid = true;
            formInput.invalidMessages = null
        }else{
            formInput.valid = false;
            formInput.invalidMessages = invalidMessages
        }
        
        return formInput
    }

    validateDate(value){
        //checks for         yyyy  -       mm        -              dd
        var dateformat = /^[0-9]{4}-(?:0[1-9]|1[012])-(?:0[1-9]|1[0-9]|2[0-9]|3[01])$/;
        // Match the date format through regular expression
        if(dateformat.test(value)){

            var pdate = value.split('-');
            //yyyy-dd-mm
            var date = parseInt(pdate[2]);
            var month  = parseInt(pdate[1]);
            var year = parseInt(pdate[0]);
            // Create list of days of a month [assume there is no leap year by default]
            var ListofDays = [31,28,31,30,31,30,31,31,30,31,30,31];
            if (month==1 || month>2){
                if (date>ListofDays[month-1]){
                    return false;
                }
            }
            if (month==2){
                //check if leap year
                var lyear = false;
                if ( (!(year % 4) && year % 100) || !(year % 400)){
                    lyear = true;
                }
                if ((lyear==false) && (date>=29)){
                    return false;
                }
                if ((lyear==true) && (date>29)){
                    return false;
                }
            }
            return true;
        }else{
            return false;
        }
    }
    
    formHandler = ( event ) => {
        event.preventDefault();
        this.state.formPostAction(this.state.formInputs);
    }

    render () {
        const formGroupsArray = [];

        var inputs = [];
        
        //make an array of inputs.
        
        for (let elementId in this.state.formInputs) {
            let thisInput = this.state.formInputs[elementId]
            if(!thisInput.group){
                thisInput.group = 0
            }
            if(thisInput.inputType != 'hidden'){
                inputs[elementId] = (
                    <Input 
                        key = { thisInput.group + " - " + elementId }
                        controlId = { thisInput.group + " - " + elementId }
                        elementType={thisInput.elementType}
                        elementConfig={thisInput.elementConfig}
                        value={thisInput.value}
                        label={thisInput.label}
                        isValid={(thisInput.valid ? thisInput.valid : false)}
                        invalidMessage={thisInput.invalidMessages ? thisInput.invalidMessages : []}
                        shouldValidate={thisInput.validation}
                        touched={thisInput.touched? thisInput.touched : false}
                        className={thisInput.className ? thisInput.className : "col-12"}
                        inputColProps={thisInput.inputColProps ? thisInput.inputColProps : {
                            md:"8", lg:"10", sm:"12"
                        }}
                        labelColProps={thisInput.labelColProps ? thisInput.labelColProps : {
                            md:"4", lg:"2", sm:"12"
                        }}
                        changed={(event) => this.inputChangedHandler(event, elementId)} 
                        required={thisInput.required}
                    />
                );
            }
        }


        //For every form group
        for (let index in this.state.inputGroups) {
            let groupId = this.state.inputGroups[index].groupId
            var inputsInGroup = [];
            //For every element in this form group
            for (let elementId in this.state.formInputs) {
                if(this.state.formInputs[elementId].group == groupId){
                    inputsInGroup.push(
                        inputs[elementId]
                    );
                }
            }
            formGroupsArray[index] = (
                <Card className="my-2">
                    {
                        (this.state.inputGroups[index].title && this.state.inputGroups[index].title.length > 0)
                        ? (
                            <Card.Header>
                                {this.state.inputGroups[index].title}
                            </Card.Header>
                        ) : null 
                    }
                    <Card.Body>
                        <Row>
                            {inputsInGroup}
                        </Row>
                    </Card.Body>
                </Card>
            );
        }
        return (
            <Form 
                onSubmit={this.formHandler}
            >
                {
                    formGroupsArray.map((formGroup, id) => (
                        <div key={id}>{formGroup}</div>
                    ))
                }
                <Button variant="primary" type="submit" disabled={(!this.state.formIsValid) || (this.state.submitButtonProcessing)}>{this.state.submitButtonText? this.state.submitButtonText : "Submit" }</Button>
            </Form>
        );
    }
}

export default CustomForm