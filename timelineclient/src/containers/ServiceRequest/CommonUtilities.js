import ConfigUrls from '../../shared/config';
import axios from 'axios';
const urls = new ConfigUrls().urls;

class CommonUtilities{
    response = {};
    error = null;
    // function that gives city/state/country based on pincode
     populateCityStateCountry = (name, value, callBack, callReject) => {
        if(name === "pin"  && /^[0-9]{6}$/.test(value)){
            console.log("pin text changed---------" + value);
            axios.defaults.headers.post['Content-Type'] = false;
            axios.post(urls.apiUrl_web_studentPortal + "/getAddressDetailsFromPinCode",
            {
                'pin' : value,
            }
            ).then(response =>{
                console.log("inside success for common uti--")
                console.log(JSON.stringify(response.data.city + " --- " + response.data.state + "-----" + response.data.country));
                this.response['data'] = response.data;
                this.response['status'] = "success";
                callBack(this.response);
                

            }).catch(error =>{
                console.log("inside error for common uti--")
                console.log(error);
                this.response['status'] = "error";
                this.response['errorMessage'] = "Error in getting city/state/country.";
                callReject(this.response);
            })
        }
        else if(name === "pin"  && !(/^[0-9]{6}$/.test(value))){
            this.response['status'] = "error";
            this.response['errorMessage'] = "Please enter valid pin.";
            callReject(this.response);
        }
        
    }
    // concatinated postal address for shipping
    getPostalAddress = (obj,callBack) => {
       
        console.log("inside postal address---");
       
        let postalAddress = obj.houseNoName + "~" + obj.street + "~" +
        obj.locality + "~" +
        obj.pin + "~" + obj.city + "~" +
        obj.state + "~" + obj.country 
        this.response['status'] = "success";
        this.response['data'] = postalAddress;
        callBack(this.response);
        
    }

    getFeeAmount = (sapId,serviceRequestType,callBack,callReject) => {
        console.log("inside getamt---");
        axios.defaults.headers.post['Content-Type'] = false;
        axios.post(urls.apiUrl_studentPortals + "/ServiceRequestFee",
        {
            sapId : sapId,
            serviceRequestType : serviceRequestType,
        }
        ).then(response =>{
            console.log("getamt promise-------"+JSON.stringify(response));
            this.response['status'] = "success";
            this.response['data'] = response.data;
            callBack(this.response);

        }).catch(error =>{
            console.log("getamt promise-------error--"  + error);
            this.response['status'] = "error";
            this.response['errorMessage'] = "Error in getting Base Amount.";
            callReject(this.response);
            
        })
        
    }
    saveServiceRequest = (state, successCallBack, errorCallBack) => {
        console.log(" inside commonUtilities--",state);
        var serviceRequestType = state.serviceRequestType;
        if(!serviceRequestType || serviceRequestType===""){
            serviceRequestType = state.get('serviceRequestType');
        }
        var data={};
        var formData = new FormData();
        var url = "";
       
        data['sapId'] = state.sapId;
        data['serviceRequestType'] = state.serviceRequestType;
        data['amount'] = state.amount;



        switch(serviceRequestType){
            case 'Duplicate I-Card':
                data['wantAtAddress'] = state.wantAtAddress;
                data['postalAddress'] = state.shippingAddress;
                data['houseNoName'] = state.houseNoName;
                data['street'] = state.street;
                data['locality'] = state.locality;
                //data['landMark'] = state.landMark;
                data['pin'] = state.pin;
                data['city'] = state.city;
                data['state'] = state.state;
                data['country'] = state.country;
                url = urls.apiUrl_studentPortals + "/saveDuplicateICard";
                this.apiCall(url, data, successCallBack, errorCallBack);
            break;
            case "Change in DOB":
                console.log("inside dob----",state);
                url = urls.apiUrl_studentPortals + "/saveCorrectDOB";
                this.apiCall(url, state, successCallBack, errorCallBack);
            break;
            case "Change in Name":
                console.log("inside name----",state);
                url = urls.apiUrl_studentPortals + "/saveChangeInName";
                this.apiCall(url, state, successCallBack, errorCallBack);
            break;
            case "Change in Photograph":
                console.log("inside photo----",state);
                url = urls.apiUrl_studentPortals + "/saveChangeInPhotograph";
                this.apiCall(url, state, successCallBack, errorCallBack);
            break;
            case "Change in I-Card":
                console.log("inside ID----",state);
                url = urls.apiUrl_studentPortals + "/saveChangeInICard";
                this.apiCall(url, state, successCallBack, errorCallBack);
            break;
            case "Duplicate Fee Receipt":
                console.log("inside dup fee rec----",state);
                url = urls.apiUrl_studentPortals + "/saveDuplicateFeeReceipt";
                this.apiCall(url, state, successCallBack, errorCallBack);
            break;
            case "Duplicate Study Kit":
                console.log("inside dup study kit----",state);
                url = urls.apiUrl_studentPortals + "/saveDuplicateStudyKit";
                this.apiCall(url, state, successCallBack, errorCallBack);
            break;
            case "Re-Dispatch Of Study Kit":
                console.log("inside redispatch study kit----",state);
                url = urls.apiUrl_studentPortals + "/saveRedispatchStudyKit";
                this.apiCall(url, state, successCallBack, errorCallBack);
            break;
            case "Single Book":
                console.log("inside single book----",state);
                url = urls.apiUrl_studentPortals + "/saveSingleBook";
                this.apiCall(url, state, successCallBack, errorCallBack);
            break;
            default :
                console.log("incorrect SR type");
            break;
        }
    }

    apiCall = (url, data, successCallBack, errorCallBack) => {
        axios.defaults.headers.post['Content-Type'] = false;
        axios.post(url, data
        ).then(response =>{
            console.log(JSON.stringify(response));
            successCallBack(response);
        }).catch(error =>{
            console.log(error);
            errorCallBack(error, "Error in Saving SR.");
        })
    }
}

export default CommonUtilities