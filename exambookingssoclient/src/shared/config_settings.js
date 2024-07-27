const VERSION = '0.0.1'

const APP_BASE = '/ssoservices/mbax/'
const RES_BASE = '/ssoservices/'
const EXAM_BOOKING_RELEASE_BOOKING_DEFAULT_CHARGE = 500
const EXAM_BOOKING_DEFAULT_CHARGE = 2500
const EXAM_BOOKING_INVALID_SLOT_SELECTION = 'We observed you have selected same date & time slot for two different subjects. Please change the time slot selected.'
const EXAM_BOOKING_DIFFERENT_CITIES_SELECTED = 'We observed you have selected different cities for exam centers. We suggest you cross verify one more time before proceeding to payment gateway'
const EXAM_BOOKING_SAME_SLOT_SELECTED = 'We observed you have selected the same center as your previous booking. We suggest you cross verify one more time before proceeding to payment gateway'
const EXAM_BOOKING_NO_SLOTS_LEFT = 'No seats are avialable for the current center. Please select a different center'
//When some config settings to be set are different in some envrionment(EX: API key for salesforce), set them here

const defaultConfig = {
    VERSION: VERSION,
    APP_BASE : APP_BASE,
    EXAM_BOOKING_RELEASE_BOOKING_DEFAULT_CHARGE : EXAM_BOOKING_RELEASE_BOOKING_DEFAULT_CHARGE,
    EXAM_BOOKING_DEFAULT_CHARGE : EXAM_BOOKING_DEFAULT_CHARGE,
    EXAM_BOOKING_INVALID_SLOT_SELECTION : EXAM_BOOKING_INVALID_SLOT_SELECTION,
    EXAM_BOOKING_DIFFERENT_CITIES_SELECTED : EXAM_BOOKING_DIFFERENT_CITIES_SELECTED,
    EXAM_BOOKING_SAME_SLOT_SELECTED : EXAM_BOOKING_SAME_SLOT_SELECTED,
    RES_BASE : RES_BASE,
    EXAM_BOOKING_NO_SLOTS_LEFT : EXAM_BOOKING_NO_SLOTS_LEFT,
    // METTL_DEMO_EXAM_URL : "https://tests.mettl.com/authenticateKey/db696a8e", // Old Link
    // METTL_DEMO_EXAM_URL : "https://tests.mettl.com/authenticateKey/15swy0t0jk", //updated link on 12Feb20
    METTL_DEMO_EXAM_URL : "https://tests.mettl.com/authenticateKey/2qyoc53b40", //updated link on 25Mar21
}

const prodConfig = {
    ...defaultConfig,
    ENVIRONMENT: 'PROD',
}
const testConfig = {
    ...defaultConfig,
    ENVIRONMENT: 'TEST',
}
const uatConfig = {
    ...defaultConfig,
    ENVIRONMENT: 'UAT',
}
const uat2Config = {
    ...defaultConfig,
    ENVIRONMENT: 'UAT2',
}
const uat3Config = {
    ...defaultConfig,
    ENVIRONMENT: 'UAT3',
}
const uat4Config = {
    ...defaultConfig,
    ENVIRONMENT: 'UAT4',
}
const uat5Config = {
    ...defaultConfig,
    ENVIRONMENT: 'UAT5',
}
const uat6Config = {
    ...defaultConfig,
    ENVIRONMENT: 'UAT6',
}
const localConfig = {
    ...defaultConfig,
    ENVIRONMENT: 'LOCAL',
    RES_BASE : '/'
}

function getConfigSettings(ENVIRONMENT) {

    //Send different app configuration depending on environment.
    switch(ENVIRONMENT){
        case 'PROD':
            return prodConfig
        case 'TEST':
            return testConfig
        case 'UAT':
            return uatConfig
        case 'UAT2':
            return uat2Config
        case 'UAT3':
            return uat3Config
        case 'UAT4':
            return uat4Config
        case 'UAT5':
            return uat5Config
        case 'UAT6':
            return uat6Config                
        case 'LOCAL':
            return localConfig
        default:
            return localConfig
    }
}

function getEnvironment(){
    //Get environment depending on window.location
    switch(window.location.host){
        case 'studentzone-ngasce.nmims.edu':
            return 'PROD';
        case 'test-studentzone-ngasce.nmims.edu':
            return 'TEST';
        case 'uat-studentzone-ngasce.nmims.edu':
            return 'UAT';
        case 'uat2-studentzone-ngasce.nmims.edu':
            return 'UAT2';
        case 'uat3-studentzone-ngasce.nmims.edu':
                return 'UAT3';
        case 'uat4-studentzone-ngasce.nmims.edu':
            return 'UAT4';
        case 'uat5-studentzone-ngasce.nmims.edu':
            return 'UAT5';    
        case 'uat6-studentzone-ngasce.nmims.edu':
            return 'UAT6';      
        default:
            return 'LOCAL';
    }
}

function getBaseUrl(ENVIRONMENT){
    //Get Base URL depending on environment
    switch(ENVIRONMENT){
        case 'PROD':
            return 'https://studentzone-ngasce.nmims.edu/';
        case 'TEST':
            return 'https://test-studentzone-ngasce.nmims.edu/';
        case 'UAT':
            return 'https://uat-studentzone-ngasce.nmims.edu/';
        case 'UAT2':
            return 'https://uat2-studentzone-ngasce.nmims.edu/';
        case 'UAT3':
            return 'https://uat3-studentzone-ngasce.nmims.edu/';
        case 'UAT4':
            return 'https://uat4-studentzone-ngasce.nmims.edu/';
        case 'UAT5':
            return 'https://uat5-studentzone-ngasce.nmims.edu/';
        case 'UAT6':
            return 'https://uat6-studentzone-ngasce.nmims.edu/';                
        default:
             //return 'http://10:8080/';
            // return 'http://192.168.29.253:8080/';
        //   return 'https://studentzone-ngasce.nmims.edu/';
            // return 'https://uat-studentzone-ngasce.nmims.edu/';
            // return 'https://test-studentzone-ngasce.nmims.edu/';
           //  return 'http://10.100.100.92:8080/';
           return 'http://localhost:8080/';
    }
} 

export const BaseURL = getBaseUrl(getEnvironment());
export const AppConfig = getConfigSettings(getEnvironment());
export default AppConfig