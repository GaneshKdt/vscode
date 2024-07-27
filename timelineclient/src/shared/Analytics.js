import React from 'react';
import ReactGA from 'react-ga';
import axios from 'axios'
import { connect } from 'react-redux'
import {
    isMobile,
    fullBrowserVersion,
    browserName,
    mobileVendor,
    mobileModel,
    deviceDetect
} from 'react-device-detect';
import { API, AppConfig } from './config'

async function sendClientDeviceDetails(analyticsObject){
    //send the details of this page to server
    let deviceDetails = deviceDetect();    
    // alert(JSON.stringify(deviceDetails))
    let clientDeviceDetails = {}
    if(isMobile){
        clientDeviceDetails = {
            
            //Ex. Desktop/iOS/iOS(App)/Andriod/Android(App)
            deviceType: deviceDetails.os + "(Browser)",

            //Ex. LG - Nexus 5
            deviceName: (
                (mobileVendor == "none" || mobileVendor == "none") ? 
                deviceDetails.ua
                : mobileVendor + " - " + mobileModel),

            //Ex. Android
            deviceOS: deviceDetails.os,

            //Ex. 9
            deviceSystemVersion: deviceDetails.osVersion,  

            //Browser name in case of web, App in case of NGASCE Mobile app; Not avail. in mobile browsers Ex. Chrome
            browserName: deviceDetails.browserName,

            //App version number or Browser version number. Ex. 65
            browserVersion: deviceDetails.browserFullVersion,
            
            //React - Web/Mobile
            applicationType: 'React - Web',

            //Build version of the app
            applicationVersion: AppConfig.VERSION
        }
    }else{
        clientDeviceDetails = {

            //Ex. Desktop/iOS/iOS(App)/Andriod/Android(App)
            deviceType: "Browser",

            //Ex. LG - Nexus 5
            deviceName: deviceDetails.osName,

            //Ex. Android
            deviceOS: deviceDetails.osName,

            //Ex. 9
            deviceSystemVersion: deviceDetails.osVersion,  

            //Browser name in case of web, App in case of NGASCE Mobile app; Not avail. in mobile browsers Ex. Chrome
            browserName: browserName,

            //App version number or Browser version number. Ex. 65
            browserVersion: fullBrowserVersion,

            //React - Web/Mobile
            applicationType: 'React - Web',

            //Build version of the app
            applicationVersion: AppConfig.VERSION
        }
    }

    navigator.geolocation.getCurrentPosition(
        (position) => {
            clientDeviceDetails.latitude = position.coords.latitude
            clientDeviceDetails.longitude = position.coords.longitude

            sendAnalyticsDetailsToPortal(analyticsObject, clientDeviceDetails)
        },
        (error) => {
            clientDeviceDetails.latitude = 0
            clientDeviceDetails.longitude = 0

            sendAnalyticsDetailsToPortal(analyticsObject, clientDeviceDetails)
        },
        {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
    )
}

function sendAnalyticsDetailsToPortal(analyticsObject, clientDeviceDetails){
    analyticsObject.client = clientDeviceDetails
    axios.post( 
        API.sendPageViewInfo, 
        analyticsObject 
    ).then( 
        response => {
            console.log(response)
        }
    ).catch( 
        error => {
            console.log(error)
        }
    );
}

function registerPageView(pagePath, sapid, clientDeviceDetails, timestamp){


    if(AppConfig.ENVIRONMENT == "PROD"){
        
        //Init google analytics for react
        ReactGA.initialize('UA-51056462-2');
    
        //register this pageview in google analytics
        ReactGA.pageview(pagePath);

        var analyticsObject = {
            version: AppConfig.VERSION,
            page: pagePath,
            sapid: sapid,
            initialTimeStamp: timestamp,
            lastTimestamp: Date.now(),
            timeSpent: Date.now() - timestamp,
        }
        try {
            sendClientDeviceDetails(analyticsObject)
        }catch(err){
            alert(err)
        }
    }
}

export function analyticsManager(ComposedComponent) {
    class ReduxContainer extends React.PureComponent {
        
        constructor(props) {
            super(props);
            const { dispatch } = props
            this.state = {
                timestamp: Date.now()
            };
        }
      
        componentDidMount(){
            registerPageView(this.props.location.pathname, this.props.sapId, this.props.data.clientDetails, this.state.timestamp)
        }
        componentWillUnmount(){
            registerPageView(this.props.location.pathname, this.props.sapId, this.props.data.clientDetails, this.state.timestamp)
        }
        render () {
            return (
                <ComposedComponent
                    {...this.props}
                />
            )
        }
    }

    return connect(state => {
        return {
            sapId: state.sapid,
            data:state,
        }
    })(ReduxContainer)
}