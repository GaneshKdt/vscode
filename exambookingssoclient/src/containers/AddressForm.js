import React, { useState } from 'react';
import 'react-confirm-alert/src/react-confirm-alert.css';

import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import handleValidation from "./Validations";
 
function AddressForm(props){
    
// const [city, setCity] = useState(props.city)
// const [state, setState] = useState(props.state)
// const [country, setCountry] = useState(props.country)
// const [houseNoName, setHouseNoName] = useState(props.houseNoName)
// const [street, setStreet] = useState(props.street)
// const [locality, setLocality] = useState(props.locality)
// const [postalAddress, setPostalAddress] = useState(null)
// const [landMark,setLandMark] = useState(props.landMark)
// const [pin, setPin] = useState(props.pin)
// const [error, setError] = useState(null)

    // function populateCityStateCountry(evt)  {
    //     if (evt.target.name === "pin" && /^[0-9]{6}$/.test(evt.target.value)) {
    //         console.log("pin text changed---------" + evt.target.value);
    //         AxiosHandler.AxiosPostHandler({
    //             url : CITY_COUNTRY_CODE_FROM_PIN,
    //             data: {
    //                 'pin': evt.target.value,
    //             } ,
    //             successCallBack: (success)=>{
    //                 setCity(success.data.city)
    //                 setState(success.data.state)
    //                 setCountry(success.data.country)
    //             } ,
    //             failureCallBack: (failure)=>{
    //                 setError("Error in getting city/state/country." + failure.toString())            
    //             }

    //         })
           
            
    //     }
    //     else {
    //             setError("Please enter valid pin.")             
    //     }
    // }

    function getPostalAddress(resolve) {

        console.log("inside postal address---");

        props.postalAddress = props.houseNoName + "~" + props.street + "~" +
        props.locality + "~" + props.landMark + "~" +
        props.pin + "~" + props.city + "~" +
        props.state + "~" + props.country

        this.setState({
            shippingAddress: props.postalAddress,
        }, () => {
            resolve();
            console.log("postaladd--", this.state.shippingAddress);
        })

    }


         // validations
         let fieldsToValidateHash = {
            houseNoName: { "name": "houseNoName", "value": props.wantAtAddress, "type": "checkAddress", "shippingAddress": props.houseNoName },
            street: { "name": "street", "value": props.wantAtAddress, "type": "checkAddress", "shippingAddress": props.street },
            locality: { "name": "locality", "value": props.wantAtAddress, "type": "checkAddress", "shippingAddress": props.locality },
            landMark: { "name": "landMark", "value": props.wantAtAddress, "type": "checkAddress", "shippingAddress": props.landMark },
            pin: { "name": "pin", "value": props.wantAtAddress, "type": "checkAddress", "shippingAddress": props.pin },
            city: { "name": "city", "value": props.wantAtAddress, "type": "checkAddress", "shippingAddress": props.city },
            state: { "name": "state", "value": props.wantAtAddress, "type": "checkAddress", "shippingAddress": props.state },
            country: { "name": "country", "value": props.wantAtAddress, "type": "checkAddress", "shippingAddress": props.country },
        }
return(
        <>
            <Form.Group as={Row} controlId="shippingAddress">
                <Form.Label column sm="4">
                    Confirm/Edit Address:
                </Form.Label>
            </Form.Group>
            <Form.Group as={Row} controlId="houseNoName">
                <Form.Label column sm="4">
                    (*) Address Line 1 : House Details
                </Form.Label>
                <Col sm="8">
                    <Form.Control type="textarea" name="houseNoName"  value={props.houseNoName} onChange={props.handleTextChange}/>
                    {props.errors["houseNoName"] !== "" ?
                        <Form.Text className="text-muted"><span className="mandatory">{props.errors["houseNoName"]}</span></Form.Text>
                    :null}
                </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="street">
                <Form.Label column sm="4">
                (*) Address Line 2 : Street Name:
                </Form.Label>
                <Col sm="8">
                    <Form.Control type="textarea" name="street"  value={props.street} onChange={props.handleTextChange}/>
                    {props.errors["street"] !== "" ?
                        <Form.Text className="text-muted"><span className="mandatory">{props.errors["street"]}</span></Form.Text>
                    :null}
                </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="locality">
                <Form.Label column sm="4">
                (*) Address Line 3 : Locality Name:
                </Form.Label>
                <Col sm="8"> 
                    <Form.Control type="textarea" name="locality"  value={props.locality} onChange={props.handleTextChange}/>
                    {props.errors["locality"] !== "" ?
                        <Form.Text className="text-muted"><span className="mandatory">{props.errors["locality"]}</span></Form.Text>
                    :null}
                </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="landMark">
                <Form.Label column sm="4">
                (*) Address Line 4 : Nearest LandMark:
                </Form.Label>
                <Col sm="8">
                    <Form.Control type="textarea" name="landMark"  value={props.landMark} onChange={props.handleTextChange}/>
                    {props.errors["landMark"] !== "" ?
                        <Form.Text className="text-muted"><span className="mandatory">{props.errors["landMark"]}</span></Form.Text>
                    :null}
                </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="pin">
                <Form.Label column sm="4">
                (*) Postal Code:
                </Form.Label>
                <Col sm="8">
                    <Form.Control type="textarea" name="pin"  value={props.pin} onChange={props.handleTextChange}/>
                    {props.errors["pin"] !== "" ?
                        <Form.Text className="text-muted"><span className="mandatory">{props.errors["pin"]}</span></Form.Text>
                    :null}
                </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="city">
                <Form.Label column sm="4">
                (*) Shipping City:
                </Form.Label>
                <Col sm="8">
                    <Form.Control type="textarea" name="city"  value={props.city}  disabled={true}/>
                    {props.errors["city"] !== "" ?
                        <Form.Text className="text-muted"><span className="mandatory">{props.errors["city"]}</span></Form.Text>
                    :null}
                </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="state">
                <Form.Label column sm="4">
                (*) Shipping State:
                </Form.Label>
                <Col sm="8">
                    <Form.Control type="textarea" name="state"  value={props.state}  disabled={true}/>
                    {props.errors["state"] !== "" ?
                        <Form.Text className="text-muted"><span className="mandatory">{props.errors["state"]}</span></Form.Text>
                    :null}
                </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="country">
                <Form.Label column sm="4">
                (*) Country For Shipping:
                </Form.Label>
                <Col sm="8">
                    <Form.Control type="textarea" name="country"  value={props.country} disabled={true}/>
                    {props.errors["country"] !== "" ?
                        <Form.Text className="text-muted"><span className="mandatory">{props.errors["country"]}</span></Form.Text>
                    :null}
                </Col>
            </Form.Group>
        </>

)


}

export default AddressForm


