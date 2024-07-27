//validations for SRs

const patternName = /^[a-zA-Z_ ]+$/;
const patternEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const patternMobile = /^[0-9]+$/

function handleValidation(obj,field){
    console.log("inside validations----------"+JSON.stringify(obj.state));
    // obj.state.errors = {};
    //field level validations in if block(on text change etc.)
    //depending on field type validations are called
    if(field){
        switch (field["type"]) {
            case "name":
                console.log("type name----------")
                if(field.value === "" || field.value === null){
                    obj.state.errors[field.name] = "Field is mandatory";
                    obj.setState({
                        status : false,
                    })
                }
                else if(!field.value.match(patternName)){
                    obj.state.errors[field.name] = "Names can contain only letters";
                    obj.setState({
                        status : false,
                    })
                }
                else{
                    delete obj.state.errors[field.name];
                }
                
            break;
            case "checkAddress":
                if(field.value === true || field.value === "Yes"){
                    console.log("case checkAddress------------")
                    if(field.shippingAddress === "" || field.shippingAddress === null){
                        obj.state.errors[field.name] = "Field is mandatory";
                        obj.setState({
                            status : false,
                        })
                    }else{
                        delete obj.state.errors[field.name];
                    }
                    
                }
                else{
                    delete obj.state.errors[field.name];
                }
            break;
            case "date", "mandatoryText":
                if(!field.value){
                    console.log("case checkAddress------------")
                    obj.state.errors[field.name] = "Field is mandatory";
                    obj.setState({
                        status : false,
                    })
                    
                }
                else{
                    delete obj.state.errors[field.name];
                }
            break;    
            case "email":
                console.log("type email----------")
                if(field.value === "" || field.value === null){
                    obj.state.errors[field.name] = "Field is mandatory";
                    obj.setState({
                        status : false,
                    })
                }
                else if(!field.value.match(patternEmail)){
                    obj.state.errors[field.name] = "Please check email format";
                    obj.setState({
                        status : false,
                    })
                }
                else{
                    delete obj.state.errors[field.name];
                }
            break;
            case "mobile":
                console.log("type mobile----------")
                if(field.value === "" || field.value === null){
                    obj.state.errors[field.name] = "Field is mandatory";
                    obj.setState({
                        status : false,
                    })
                }
                else if(field.value.length != 10 || !field.value.match(patternMobile)){
                    obj.state.errors[field.name] = "Mobile number can contain only numbers and exactly 10 digits";
                    obj.setState({
                        status : false,
                    })
                }
                else{
                    delete obj.state.errors[field.name];
                }
            break;

        }
            
    }
    //form level validations in else block, validate all fields in a form on submit
    //fields are passed in an hash obj.state.fieldsToValidate
    else{
        console.log("default validation----------"+JSON.stringify(obj.state.fieldsToValidate))
            var fields = obj.state.fieldsToValidate
            for(var toValidate in fields){
                console.log("******"+JSON.stringify(fields[toValidate]))
                switch (fields[toValidate]["type"]){
                    case "date","mandatoryText":
                        console.log("case date------------"+fields[toValidate].value)
                        if(fields[toValidate].value === "" || fields[toValidate].value === null){
                            obj.state.errors[fields[toValidate].name] = "Field is mandatory";
                            obj.setState({
                                status : false,
                            })
                        }
                        else{
                            delete obj.state.errors[fields[toValidate].name];
                        }
                    break;
                    case "file":
                        console.log("case file------------")
                        if(fields[toValidate].value === null){
                            obj.state.errors[fields[toValidate].name] = "Document is mandatory";
                            obj.setState({
                                status : false,
                            })
                        }
                        else{
                            delete obj.state.errors[fields[toValidate].name];
                        }
                    break;
                    case "name":
                        if(fields[toValidate].value === "" || fields[toValidate].value === null){
                            obj.state.errors[fields[toValidate].name] = "Field is mandatory";
                            obj.setState({
                                status : false,
                            })
                        }
                        else if(!fields[toValidate].value.match(patternName)){
                            obj.state.errors[fields[toValidate].name] = "Names can contain only letters";
                            obj.setState({
                                status : false,
                            })
                        }
                        else{
                            delete obj.state.errors[fields[toValidate].name];
                        }
                    break;
                    case "checkAddress":
                        if(fields[toValidate].value === true || fields[toValidate].value === "Yes"){
                            console.log("case checkAddress------------")
                            if(fields[toValidate].shippingAddress === "" || fields[toValidate].shippingAddress === null){
                                obj.state.errors[fields[toValidate].name] = "Field is mandatory";
                                obj.setState({
                                    status : false,
                                })
                            }else{
                                delete obj.state.errors[fields[toValidate].name];
                            }
                            
                        }
                        else{
                            delete obj.state.errors[fields[toValidate].name];
                        }
                    break;

                }
            }
    }
    
       
            
          

    
    console.log("errors------------"+JSON.stringify(obj.state.errors))
}

export default handleValidation