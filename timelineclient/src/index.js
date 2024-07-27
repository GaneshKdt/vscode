import React from 'react'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import 'bootstrap/dist/css/bootstrap.css';

import './index.css'
import App from './App'
import ToDo from './containers/ToDo/ToDo'
import * as serviceWorker from './serviceWorker'
import { BrowserRouter } from 'react-router-dom'
import Notification from './containers/Notifications/Notifications'
import reducer from './store/reducer'
import  { Provider } from 'react-redux'
import { library } from '@fortawesome/fontawesome-svg-core'
import { PersistGate } from 'redux-persist/integration/react'
import configureStore from './store/configureStore';
import LoadingSpinner from './shared/LoadingSpinner/LoadingSpinner'
import { 
    faStroopwafel, faBell, faSearch, faChalkboardTeacher, faBook, faQuestionCircle, faCog, faHome, faUsers, faBookOpen, 
    faListUl, faUserEdit, faSignOutAlt, faEnvelopeOpenText, faCalendarAlt,faAngleDown, faDownload, faChartLine,faUserCircle,faKey, 
    faPlusSquare,faEye, faExclamationCircle, faGraduationCap, faSortDown, faChevronDown,faCommentAlt,faThumbsUp ,faEllipsisH,faFilter,
    faUser, faLink, faTasks, faVideo, faBullhorn, faTimes, faLifeRing, faUserCog, faPlusCircle, faCircle, faChevronUp, faPhone, faBookmark,
    faAngleLeft, faClipboardList, faBookReader,faHeadphonesAlt,faClock,faCheck, faPlus, faMinus, faAngleUp,
    faChevronRight, faUserGraduate, faRedo, faCalendarCheck,faFilePdf,faFileVideo,faArrowUp,faCheckCircle,faTimesCircle,faInfoCircle,faFileInvoice,faExpand
} 
         from '@fortawesome/free-solid-svg-icons'
import {faImages,faFile,faFileAlt,faFileVideo as farFileVideo,faPlayCircle,faUser as farUser} from '@fortawesome/free-regular-svg-icons' 
 
library.add(
    faImages,faFile,faFileAlt,farFileVideo,faPlayCircle,farUser,
    faStroopwafel, faBell, faSearch, faChalkboardTeacher, faBook, faQuestionCircle, faCog, faHome, faUsers, faBookOpen, 
    faListUl, faUserEdit, faSignOutAlt, faEnvelopeOpenText, faCalendarAlt,faAngleDown, faDownload, faChartLine,faUserCircle,faKey, 
    faPlusSquare,faEye, faExclamationCircle, faGraduationCap, faSortDown, faChevronDown,faCommentAlt,faThumbsUp ,faEllipsisH,faFilter,
    faUser, faLink, faTasks, faVideo, faBullhorn, faTimes, faLifeRing, faUserCog, faPlusCircle, faCircle, faChevronUp, faPhone, faBookmark,
    faAngleLeft, faClipboardList, faBookReader,faHeadphonesAlt,faClock,faCheck, faPlus, faMinus, faAngleUp,
    faChevronRight, faUserGraduate, faRedo, faCalendarCheck,faFilePdf,faFileVideo,faArrowUp,faCheckCircle,faTimesCircle,faInfoCircle,faFileInvoice,faExpand
    
)

let { store, persistor } = configureStore();
 

const app = (
    <Provider store={store}>
         <PersistGate loading={<LoadingSpinner />} persistor={persistor}>
            <BrowserRouter>
                <App />
                {/* <ToDo /> */}
            </BrowserRouter>
        </PersistGate>
    </Provider>
)
ReactDOM.render(app, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

