import React, { Component } from 'react';
import {connect} from 'react-redux';
import { AppConfig, API } from '../../shared/config'
import axios from 'axios'

let checkIfAnyTestsActive = API.checkIfAnyTestsActive
const TIMEBOUNDS_MASTERKEYS = ["111","131","151","154","155","156","157","158"];

var applozicLoaded = false
var contactsLoaded = false
var contacts
class AppLozicChat extends Component {
    
    constructor(props){
        super(props);
        this.fetchContacts()
        this.state = {
            
        }
    }
    
    componentDidMount(){
      
        /* if(TIMEBOUNDS_MASTERKEYS.includes(this.props.data.consumerProgramStructureId)){        
        this.loginToApplozic()
        } */
        // this.initializeChatAllChecks()
    }

	componentWillUnmount() {
        window.$applozic.fn.applozic('logout');
	}

    initializeChatAllChecks = () => {
        axios.post(
            checkIfAnyTestsActive,
            { 
                "sapId": this.props.sapId 
            }
        ).then((response) => {
            if(response.data){
                if(response.data.error){
                    //If an error was found
                    console.log(response.data.error)
                }else if(!response.data.testsActive ){
                    //If no error was found and tests are not active.
                    this.loginToApplozic()
                }
            }
        }).catch((error) => {
            console.log(error)
        })
    }

    fetchContacts = () => {
        axios.defaults.headers.post['Content-Type'] = 'application/json';
        axios.post(API.getContactsForChat,
            JSON.stringify({
                "sapId": this.props.sapId
            })
        ).then(response => {
            //Dont store in state as it is async and it may cause bugs where none of the functions (oninitialize and fetchcontatcts) set the contact list
            contacts = response.data
            contactsLoaded = true
            this.props.dispatch({
                type:'LoadStudentsBatchList',
                data:contacts});

            //If applozic loaded before the fetch completed, set contacts
            if(applozicLoaded){
                this.setContacts()
            }
        }).catch(error => {
            // console.log(error);
            
        })
    }

    onInitialize = (status, data) => {
        if (status === 'success') {
            window.$("body").remove('#chat-unread-count-container')
            window.$('body').remove('.chat-launcher-icon')
            window.$("#chat-unread-count-container").detach().appendTo("#mck-sidebox-launcher");
            window.$('.mck-button-launcher').last().click()
            
            //If applozic loaded before the fetch completed, set applozicLoaded as true
            if(contacts && contactsLoaded){
                this.setContacts()
            }else{
                applozicLoaded = true
            }
        }
    }

    setContacts() {
        var contactsList = []
        contacts.forEach((contact) => {
            let newContact = {
                userId: contact.sapId, 
                displayName: contact.firstName + " " + contact.lastName,
                imageLink: contact.imageUrl,
            }
            if(newContact.userId != this.props.sapId){
                contactsList.push(newContact)
            }
        })

        window.$applozic.fn.applozic(
            'loadContacts', 
            {
                "contacts": contactsList
            }
        );
    }

    loginToApplozic = () => {
        try {
            window.$applozic.fn.applozic({
                // baseUrl:'https://apps.applozic.com',
                appId: AppConfig.CHAT_API_KEY,
                userId: this.props.sapId,
                accessToken: this.props.sapId,
                imageLink : this.props.data.imageUrl,
                userName : this.props.data.firstName + " " + this.props.data.lastName,
                ojq : window.$original,
                obsm : window.oModal,
                authenticationTypeId: 1, //1 for password verification from Applozic server and 0 for access Token verification from your server
                onInit : this.onInitialize, //callback function execute on plugin initialize
                maxAttachmentSize : 25, //max attachment size in MB
                desktopNotification : true,
                locShare : true,
                olStatus: true,
                emojilibrary: true, // true if you want to load emoticons in chat
                // notificationIconLink: 'https://www.applozic.com/favicon.ico',    //Icon to show in desktop notification, replace with your icon
                loadOwnContacts : true, //set to true if you want to populate your own contact list (see Step 4 for reference)
                onTopicDetails: function(topic) { console.log(topic); },
                'onMessageReceived': function(response) {
                    console.log(response);
                    if(response.message.contentType !==10 && response.message.contentType !== 102){
                    //write your code to update unread count in UI
                    }
                },
                topicBox: true,
            });
        } catch (e) {
            console.log(e)
            alert("Error initiating chat!")
        }
    }

    render(){
        return(
            <div>
                <div id="mck-side-panel">
                    <div id="mck-sidebox" class="mck-sidebox mck-box mck-fade">
                        <div class="mck-box-dialog mck-box-sm mck-right mck-bg-white">
                            <div id="mck-sidebox-content"
                                class="mck-sidebox-content mck-box-content">
                                <div id="mck-conversation-header"
                                    class="mck-conversation-header mck-truncate n-vis"></div>
                                <div class="mck-box-top">
                                    <div class="blk-lg-10">
                                        <div id="mck-tab-individual" class="mck-row n-vis">
                                            <div class="mck-tab-link blk-lg-2">
                                                <a href="#" target="_self" role="link" class="mck-conversation-tab-link"><span
                                                    class="mck-icon-backward"></span></a>
                                            </div>
                                            <div class="blk-lg-6 mck-box-title">
                                                <div id="mck-tab-title" class="mck-tab-title mck-truncate">
                                                    Conversations</div>
                                                <div id="mck-tab-status"
                                                    class="mck-tab-status mck-truncate n-vis"></div>
                                                <div class="mck-typing-box mck-truncate n-vis">
                                                    <span id="mck-typing-label">typing...</span>
                                                </div>
                                            </div>
                            <div id="mck-btn-video-call" class="mck-videocall-btn  blk-lg-2 n-vis"></div>
                                        </div>
                                        <div id="mck-tab-conversation" class="mck-row">
                                            <h4 id="mck-conversation-title"
                                                class="mck-box-title mck-truncate">Conversations</h4>
                                        </div>
                                    </div>
                                    <div class="blk-lg-2">
                                        <button type="button"
                                            class="mck-minimize-icon mck-box-close mck-close icon n-vis">
                                            <span aria-hidden="true">&minus;</span>
                                        </button>
                                        <button type="button"
                                            class="mck-box-close mck-close-sidebox move-right"
                                            data-dismiss="mckbox" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>
                                </div>
                                <div id="mck-product-group"
                                    class="mck-tab-panel mck-btn-group mck-product-group">
                                    <div id="mck-product-box"
                                        class="mck-product-box n-vis mck-dropdown-toggle"
                                        data-toggle="mckdropdown" aria-expanded="true">
                                        <div class="mck-row">
                                            <div class="blk-lg-10">
                                                <div class="mck-row">
                                                    <div class="blk-lg-3 mck-product-icon"></div>
                                                    <div class="blk-lg-9">
                                                        <div class="mck-row">
                                                            <div class="blk-lg-8 mck-product-title mck-truncate"></div>
                                                            <div
                                                                class="move-right mck-product-rt-up mck-truncate blk-lg-4">
                                                                <strong class="mck-product-key"></strong><span
                                                                    class="mck-product-value"></span>
                                                            </div>
                                                        </div>
                                                        <div class="mck-row">
                                                            <div class="blk-lg-8 mck-truncate mck-product-subtitle"></div>
                                                            <div
                                                                class="move-right mck-product-rt-down mck-truncate blk-lg-4">
                                                                <strong class="mck-product-key"></strong><span
                                                                    class="mck-product-value"></span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="blk-lg-2">
                                                <span class="mck-caret n-vis"></span>
                                            </div>
                                        </div>
                                    </div>
                                    <ul id="mck-conversation-list"
                                        class="mck-dropdown-menu menu-right mck-conversation-list n-vis"
                                        role="menu"></ul>
                                </div>
                                <div id="mck-tab-option-panel"
                                    class="mck-tab-panel mck-top-btn-panel">
                                    <div id="mck-tab-menu-box" class="mck-tab-menu-box vis">
                                        <div class="mck-row">
                                            <div class="blk-lg-2 move-right">
                                                <div class="mck-dropdown-toggle" data-toggle="mckdropdown"
                                                    aria-expanded="true">
                                                    <img
                                                        src="/timeline/applozic/images/mck-icon-menu.png"
                                                        alt="Tab Menu"
                                                    />
                                                </div>
                                                <ul id="mck-tab-menu-list"
                                                    class="mck-dropdown-menu mck-tab-menu-box menu-right"
                                                    role="menu">
                                                    <li class="mck-tab-message-option"><a href="#" target="_self"
                                                        id="mck-btn-clear-messages"
                                                        class="mck-btn-clear-messages menu-item"
                                                        title="Clear Messages"> Clear Messages </a></li>
                                                    <li id="li-mck-block-user"><a href="#" target="_self"
                                                        id="mck-block-button" class="menu-item" title="Block User">
                                                            Block User </a></li>
                                                    <li id="li-mck-group-info" class="mck-group-menu-options">
                                                        <a href="#" target="_self" id="mck-group-info-btn" class="menu-item"
                                                        title="Group Info"> Group Info </a>
                                                    </li>
                                                    {/* <li id="li-mck-leave-group" class="mck-group-menu-options">
                                                        <a href="#" target="_self" id="mck-btn-leave-group" class="menu-item"
                                                        title="Exit Group"> Exit Group </a>
                                                    </li> */}
                                                    {/* <li id="li-mck-video-call">
                                                        <a href="#" target="_self" id="mck-btn-video-call" class="menu-item n-vis" title="Video Call">Video Call</a>
                                                    </li> */}
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="mck-box-body">
                                    <div id="mck-video-call-indicator" class="applozic-launchar n-vis row">
                                                <div id="mck-video-call-icon" class="col-lg-3 mck-alpha-contact-image">
                                                    <span class="mck-contact-icon"></span>
                                                </div>
                                                <div id="mck-vid-btn" class="mck-vid-flex-box">
                                                <div id="mck-video-call-indicator-txt" class="mck-video-call-indicator-txt"></div>
                                                            <div id="mck-call-btn-div" class= "col-lg-8">
                                                                <button id="mck-vid-receive-btn" class="mck-btn">Accept</button>
                                                                <button id="mck-vid-reject-btn" class="mck-btn">Reject</button>
                                                        </div>
                                                        </div>
                                        </div>
                                    <div id="mck-message-cell" class="mck-tab-cell mck-message-cell">
                                        <div id="mck-price-widget"
                                            class="mck-row mck-price-widget mck-top-widget n-vis">
                                            <div class="mck-widget-panel">
                                                <input type="text" id="mck-price-text-box" placeholder="Enter final agreed price"/>
                                                <button type="button" id="mck-price-submit"
                                                    class="mck-btn mck-btn-green mck-price-submit" title="Submit">
                                                    <span>Submit</span>
                                                </button>
                                            </div>
                                        </div>
                                        <div class="mck-message-inner"></div>
                                        <div id="mck-contact-loading" class="mck-loading">
                                            <img src="/timeline/applozic/images/ring.gif"
                                                alt="Loading" />
                                        </div>
                                        <div id="mck-no-conversations"
                                            class="mck-no-data-text mck-text-muted n-vis">
                                            {/* <h3>No conversations yet!</h3> */}
                                        </div>
                                        <div id="mck-no-messages"
                                            class="mck-no-data-text mck-text-muted n-vis">
                                            {/* <h3>No messages yet!</h3> */}
                                        </div>
                                        <div id="mck-no-more-conversations"
                                            class="mck-show-more-icon n-vis">
                                            {/* <h3>No more conversations!</h3> */}
                                        </div>
                                        <div id="mck-no-more-messages" class="mck-show-more-icon n-vis">
                                            {/* <h3>No more messages!</h3> */}
                                        </div>
                                    </div>
                                </div>
                                <div id="mck-offline-message-box"
                                    class="mck-offline-message-box n-vis">SET DEFAULT OFFLINE
                                    MESSAGE!</div>
                                <div id="mck-sidebox-ft" class="mck-box-ft">
                                    <div class="mck-box-form mck-row n-vis">
                                        <div class="blk-lg-12">
                                            <p id="mck-msg-error" class="mck-sidebox-error n-vis"></p>
                                        </div>
                                        <div id="mck-msg-response"
                                            class="blk-lg-12 mck-box-response n-vis">
                                            <div id="mck-response-text" class="response-text"></div>
                                        </div>
                                        <div class="blk-lg-12">
                                            <form id="mck-msg-form" class="vertical mck-msg-form">
                                                <div class="mck-form-group n-vis">
                                                    <label class="sr-only placeholder-text control-label"
                                                        htmlFor="mck-msg-to">To:</label> <input class="mck-form-cntrl"
                                                        id="mck-msg-to" name="mck-msg-to" placeholder="To" required />
                                                </div>
                                                <div id="mck-audio" class="mck-mic-timer n-vis">
                    <a href="#" target="_self" id="mck-stop-recording" class="mck-stop-btn n-vis "></a>
                    <label id="mck-minutes">00</label>:<label id="mck-seconds">00</label>
                        </div>
            <div  id="mck-reply-to-div" class="n-vis">
                                                        <button type="button" id="close"
                                                        class="mck-box-close mck-close-panel move-right">
                                                        <span aria-hidden="true">&times;</span>
                                                        </button>
                                                        <div id="mck-reply-to" class=" mck-msgto "></div>
                                                                                    <div id="mck-reply-msg"> </div>
                                                                                    </div>
                                                <div class="mck-form-group last last-child">
                                                    <label class="sr-only placeholder-text control-label"
                                                        htmlFor="mck-textbox">Message</label>
                                                    <div id="mck-textbox-container" class="mck-textbox-container">
                                                        <div class="mck-blk-2 mck-text-box-panel move-left">
                                                            <div class="mck-blk-12">
                                                                <button type="button" id="mck-btn-smiley"
                                                                    class="mck-btn mck-btn-smiley mck-btn-text-panel"
                                                                    title="Smiley">
                                                                    <span class="mck-icon-smiley-blue"></span>
                                                                </button>
                                                            </div>
                                                        </div>
                                                        <div
                                                            class="mck-blk-2 mck-text-box-panel mck-mid-panel move-left">
                                                            <div id="mck-attachmenu-box" class="mck-attach-menu">
                                                                <div id="mck-btn-attach"
                                                                    class="mck-dropdown-toggle mck-btn-attach mck-file-attach-label mck-btn mck-btn-text-panel"
                                                                    data-toggle="mckdropdown" aria-expanded="true"
                                                                    title="Attach File">
                                                                    <span class="mck-icon-upload"></span>
                                                                </div>
                                                                <ul id="mck-upload-menu-list"
                                                                    class="mck-dropup-menu mck-upload-menu-list mck-menu-right"
                                                                    role="menu">
                                                                    <li><a id="mck-file-up" href="#" target="_self"
                                                                        class="mck-file-upload menu-item"
                                                                        title="File &amp; Photos"> <img
                                                                            src="/timeline/applozic/images/mck-icon-photo.png"
                                                                            class="menu-icon" alt="File &amp; Photos"/><span
                                                                            id="mck-file-up-label">Files &amp; Photos</span>
                                                                    </a></li>
                                                                    <li><a id="mck-btn-loc" href="#" target="_self"
                                                                        class="menu-item mck-btn-loc" title="Share Location">
                                                                            <div class="mck-menu-icon">
                                                                                <span class="mck-icon-marker-blue"></span>
                                                                            </div> <span id="mck-share-loc-label">Share Location</span>
                                                                    </a></li>

                                                                </ul>
                                                            </div>
                                                            <div id="mck-attachfile-box" class="mck-blk-12 n-vis">
                                                                <button id="mck-file-up2" type="button"
                                                                    class="mck-file-upload mck-file-attach-label mck-btn mck-btn-text-panel"
                                                                    title="Attach File">
                                                                    <span class="mck-icon-upload"></span>
                                                                </button>
                                                            </div>
                                                        </div>
                                                        <a href="#" target="_self" id="mck-mike-btn" type="button"
                                                    class="mck-mic-btn mck-mike-btn vis"
                                                    title="Mic"></a>
                                                        <div id="mck-text-box" contentEditable="true"
                                                            class="mck-blk-8 mck-text-box mck-text required"></div>
                                                        <div class="mck-blk-2 mck-text-box-panel move-right">
                                                            <div class="mck-blk-12">
                                                                <button type="submit" id="mck-msg-sbmt"
                                                                    class="mck-btn mck-btn-text-panel" title="Send Message">
                                                                    <span class="mck-icon-send"></span>
                                                                </button>
                                                            </div>
                                                        </div>

                                                        <input id="mck-file-input" class="mck-file-input n-vis"
                                                            type="file" name="files[]"/>
                                                        <div id="mck-file-box" class="n-vis"></div>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                    <div id="mck-contacts-content"
                                        class="mck-contacts-content mck-text-center">
                                        <button type="button" id="mck-msg-new"
                                            class="mck-contact-search mck-btn mck-btn-blue"
                                            title="Start New">
                                            <span>Start New</span>
                                        </button>
                                    </div>
                                </div>
                                <div class="mck-running-on n-vis">
                                    <a href="https://www.applozic.com" target="_blank"><span
                                        class="n-vis">Applozic Chat SDK</span><strong>Powered by
                                            Applozic</strong></a>
                                </div>
                            </div>
                            <div id="mck-sidebox-search"
                                class="mck-sidebox-search mck-sidebox-content mck-box-content n-vis">
                                <div class="mck-box-top">
                                    <div class="mck-tab-link blk-lg-4">
                                        <a href="#" target="_self" role="link" class="mck-conversation-tab-link"><span
                                            class="mck-icon-backward"></span></a>
                                    </div>
                                    <div class="blk-lg-5">
                                        <div class="mck-box-title mck-truncate" title="Start New">Start
                                            New</div>
                                    </div>
                                    {/* <div class="blk-lg-3 move-right mck-start-new-menu-item mck-tab-menu-box">
                                        <div class="mck-dropdown-toggle" data-toggle="mckdropdown"
                                            aria-expanded="true">
                                            <img src="/timeline/applozic/images/icon-menu.png" alt="Tab Menu" />
                                        </div>
                                        <ul id="mck-start-new-menu-list"
                                            class="mck-dropdown-menu  menu-right" role="menu">
                                            <li><a href="#" target="_self" id="mck-new-group"
                                                class="mck-new-group-button menu-item" title="Create Group">Create
                                                    Group</a></li>
                                        </ul>
                                    </div> */}
                                </div>
                                <div id="mck-search-tab-box" class="mck-search-tab-box mck-row">
                                    <div class="blk-lg-12">
                                        <ul class="mck-nav mck-nav-panel">
                                            <li class="mck-nav-item mck-nav-divider"><a
                                                id="mck-contact-search-tab"
                                                class="mck-nav-link mck-contact-search active" href="#" target="_self"><strong>Contacts</strong></a></li>
                                            <li class="mck-nav-item"><a id="mck-group-search-tab"
                                                class="mck-nav-link mck-group-search" href="#" target="_self"><strong>Groups</strong></a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div class="mck-box-top mck-search-box-top">
                                    <div id="mck-contact-search-input-box"
                                        class="mck-input-group blk-lg-12">
                                        <input id="mck-contact-search-input" type="text"
                                            data-provide="typeahead" placeholder="Search..."/> <span
                                            class="mck-search-icon"><a href="#" target="_self" role="link"
                                            class="mck-contact-search-link"><span
                                                class="mck-icon-search"></span></a></span>
                                    </div>
                                    <div id="mck-group-search-input-box"
                                        class="mck-input-group blk-lg-12 n-vis">
                                        <input id="mck-group-search-input" type="text"
                                            data-provide="typeahead" placeholder="Search..."/> <span
                                            class="mck-search-icon"><a href="#" target="_self" role="link"
                                            class="mck-group-search-link"><span class="mck-icon-search"></span></a></span>
                                    </div>
                                </div>
                                <div class="mck-box-body">

                                    <div id="mck-search-cell" class="mck-tab-cell">
                                        <div class="mck-message-inner">
                                            <ul id="mck-contact-search-list"
                                                class="mck-contact-search-list mck-contact-list mck-nav mck-nav-tabs mck-nav-stacked"></ul>
                                            <ul id="mck-group-search-list"
                                                class="mck-contact-list mck-group-search-list mck-nav mck-nav-tabs mck-nav-stacked n-vis"></ul>
                                            <div id="mck-no-search-groups"
                                                class="mck-no-data-text mck-text-muted n-vis">No groups
                                                yet!</div>
                                            <div id="mck-no-search-contacts"
                                                class="mck-no-data-text mck-text-mutedn n-vis">No
                                                contacts yet!</div>
                                            <div id="mck-search-loading" class="mck-loading n-vis">
                                                <img src="/timeline/applozic/images/ring.gif"
                                                    alt="Loading" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div id="mck-group-create-tab"
                                class="mck-group-create-tab mck-sidebox-content mck-box-content n-vis">
                                <div class="mck-box-top">
                                    <div class="mck-tab-link blk-lg-4">
                                        <a id="mck-search-tab-link" href="#" target="_self" role="link"
                                            class="mck-contact-search"><span class="mck-icon-backward"></span>
                                        </a>
                                    </div>
                                    <div class="blk-lg-8">
                                        <div class="mck-box-title mck-truncate" title="Create Group">Create
                                            Group</div>
                                    </div>
                                </div>
                                <div class="mck-box-body">
                                    <div class="mck-tab-cell">
                                        <div id="mck-group-create-panel"
                                            class="mck-tab-panel mck-message-inner mck-group-create-inner">
                                            <div class="mck-group-sub-sec">
                                                <div id="mck-group-create-icon-box"
                                                    class="mck-group-create-icon-box mck-group-icon-box mck-hover-on">
                                                    <div class="mck-group-icon"></div>
                                                    <span class="mck-overlay-box">
                                                        <div class="mck-overlay">
                                                            <span class="mck-camera-icon"></span> <span
                                                                id="mck-gc-overlay-label" class="mck-overlay-label">Add
                                                                Group Icon</span>
                                                        </div>
                                                        <div id="mck-group-create-icon-loading"
                                                            class="mck-loading n-vis">
                                                            <img
                                                                src="/timeline/applozic/images/mck-loading.gif"
                                                                alt="Loading" />
                                                        </div> <input id="mck-group-icon-upload"
                                                        class="mck-group-icon-upload n-vis" type="file"
                                                        name="files[]"/>
                                                    </span>
                                                </div>
                                            </div>
                                            <div id="mck-group-create-name-sec" class="mck-group-sub-sec">
                                                <div id="mck-group-create-name-box"
                                                    class="mck-row mck-group-name-box">
                                                    <div class="blk-lg-12">
                                                        <div id="mck-gc-title-label" class="mck-label">Group
                                                            Title</div>
                                                    </div>
                                                    <div class="blk-lg-12">
                                                        <div id="mck-group-create-title"
                                                            class="mck-group-create-title mck-group-title"
                                                            contentEditable="true">Group title</div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div id="mck-group-create-type-sec" class="mck-group-sub-sec">
                                                <div id="mck-group-create-type-box"
                                                    class="mck-row mck-group-type-box">
                                                    <div class="blk-lg-12">
                                                        <div id="mck-gc-type-label" class="mck-label">Group
                                                            Type</div>
                                                    </div>
                                                    <div class="blk-lg-12">
                                                        <select id="mck-group-create-type" class="mck-select">
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                            <div id="mck-group-create-btn-sec" class="mck-group-sub-sec">
                                                <button type="button" id="mck-btn-group-create"
                                                    class="mck-btn mck-btn-green mck-btn-group-create"
                                                    title="Create Group">Create Group</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div id="mck-group-info-tab"
                                class="mck-group-info-tab mck-sidebox-content mck-box-content">
                                <div class="mck-box-top">
                                    <div class="mck-tab-link blk-lg-4">
                                        <a id="mck-group-back-link" href="#" target="_self" role="link"
                                            class="mck-group-back-link"> <span class="mck-icon-backward"></span>
                                        </a>
                                    </div>
                                    <div class="blk-lg-8">
                                        <div class="mck-box-title mck-truncate" title="Group Info">Group
                                            Info</div>
                                    </div>
                                </div>
                                <div id="mck-group-info-panel"
                                    class="mck-tab-panel mck-group-info-panel">
                                    <div class="mck-group-icon-sec">
                                        <div id="mck-group-info-icon-box"
                                            class="mck-group-icon-box mck-group-info-icon-box mck-hover-on">
                                            <div class="mck-group-icon"></div>
                                            <span class="mck-overlay-box n-vis">
                                                <div class="mck-overlay">
                                                    <span class="mck-camera-icon"></span> <span
                                                        id="mck-gi-overlay-label" class="mck-overlay-label">Change
                                                        Group Icon</span>
                                                </div>
                                                <div id="mck-group-info-icon-loading" class="mck-loading vis">
                                                    <img
                                                        src="/timeline/applozic/images/mck-loading.gif"
                                                        alt="Loading" />
                                                </div> <input id="mck-group-icon-change"
                                                class="mck-group-icon-change n-vis" type="file" name="file[]" />
                                            </span>
                                        </div>
                                        <div class="mck-text-center">
                                            <a id="mck-btn-group-icon-save" href="#" target="_self" role="link"
                                                class="mck-btn-group-icon-save n-vis" title="Save"> <img
                                                src="/timeline/applozic/images/mck-icon-save.png"
                                                alt="Save"/>
                                            </a>
                                        </div>
                                    </div>
                                    <div id="mck-group-name-sec" class="mck-group-name-sec">
                                        <div id="mck-group-name-box" class="mck-row mck-group-name-box">
                                            <div class="blk-lg-12">
                                                <div id="mck-group-title" class="mck-group-title"
                                                    contentEditable="false">Group title</div>
                                            </div>
                                            {
                                            /*<div class="blk-lg-3 mck-group-name-edit-icon">
                                                <a id="mck-group-name-edit" href="#" target="_self" role="link"
                                                    class="mck-group-name-edit vis" title="Edit"> <img
                                                    src="/timeline/applozic/images/mck-icon-write.png"
                                                    alt="Edit"/></a> <a id="mck-group-name-save" href="#" target="_self"
                                                    role="link" class="mck-group-name-save n-vis" title="Save">
                                                    <img
                                                    src="/timeline/applozic/images/mck-icon-save.png"
                                                    alt="Save"/>
                                                </a>
                                            </div>*/
                                            }
                                        </div>
                                    </div>
                                </div>
                                <div id="mck-group-member-panel"
                                    class="mck-tab-panel mck-group-member-panel vis">
                                    <div class="mck-group-md-sec">
                                        <div id="mck-group-member-title"
                                            class="mck-row mck-group-member-text">Members</div>
                                        <div id="mck-group-add-member-box"
                                            class="mck-row mck-group-admin-options mck-group-add-member-box n-vis">
                                            <a id="mck-group-add-member" class="mck-group-add-member"
                                                href="#" target="_self">
                                                <div class="blk-lg-3">
                                                    <img
                                                        src="/timeline/applozic/images/mck-icon-add-member.png"
                                                        alt="Add Member"/>
                                                </div>
                                                <div class="blk-lg-9">Add Member</div>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                <div class="mck-box-body">
                                    <div class="mck-tab-cell">
                                        <div class="mck-group-member-inner">
                                            <ul id="mck-group-member-list"
                                                class="mck-group-member-list mck-contact-list mck-nav mck-nav-tabs mck-nav-stacked">
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div id="mck-group-update-panel"
                                    class="mck-tab-panel mck-group-update-panel n-vis">
                                    <div class="mck-group-bottom-sec">
                                        <div class="mck-row mck-group-update-sec">
                                            <button type="button" id="mck-btn-group-update"
                                                class="mck-btn mck-btn-green mck-btn-group-update"
                                                title="Update">Update</button>
                                        </div>
                                    </div>
                                </div>
                                <div id="mck-group-info-ft" class="mck-group-info-ft">
                                    <button type="button" id="mck-btn-group-exit"
                                        class="mck-btn mck-btn-blue mck-btn-group-exit"
                                        title="Exit Group">Exit Group</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="mck-loc-box" class="mck-box mck-loc-box mck-fade"
                    aria-hidden="false">
                    <div class="mck-box-dialog mck-box-md">
                        <div class="mck-box-content">
                            <div class="mck-box-top mck-row">
                                <div class="blk-lg-10">
                                    <h4 class="mck-box-title">Share Location</h4>
                                </div>
                                <div class="blk-lg-2">
                                    <button type="button" class="mck-box-close" data-dismiss="mckbox"
                                        aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                            </div>
                            <div class="mck-box-body">
                                <div class="mck-form-group">
                                    <div class="blk-lg-12">
                                        <input id="mck-loc-address" type="text" class="mck-form-control"
                                            placeholder="Enter a location" autoComplete="off"/>
                                    </div>
                                </div>
                                <div id="mck-map-content" class="mck-loc-content"></div>
                                <div class="n-vis">
                                    <label class="blk-sm-2 mck-control-label">Lat.:</label>
                                    <div class="blk-sm-3">
                                        <input type="text" id="mck-loc-lat" class="mck-form-control"/>
                                    </div>
                                    <label class="blk-sm-2 mck-control-label">Long.:</label>
                                    <div class="blk-sm-3">
                                        <input type="text" id="mck-loc-lon" class="mck-form-control"/>
                                    </div>
                                </div>
                            </div>
                            <div class="mck-box-footer">
                                <button id="mck-my-loc" type="button"
                                    class="mck-my-loc mck-btn mck-btn-green">My Location</button>
                                <button id="mck-loc-submit" type="button"
                                    class="mck-btn mck-btn-blue mck-loc-submit move-right">Send</button>
                                <button id="mck-btn-close-loc-box" type="button"
                                    class="mck-btn mck-btn-default move-right" data-dismiss="mckbox">Close</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="mck-gm-search-box" class="mck-box mck-gm-search-box mck-fade"
                    aria-hidden="false">
                    <div class="mck-box-dialog mck-box-sm">
                        <div class="mck-box-content">
                            <div class="mck-box-top mck-row">
                                <div class="blk-lg-3">
                                    <img
                                        src="/timeline/applozic/images/mck-icon-add-member.png"
                                        alt="Add Member"/>
                                </div>
                                <div class="blk-lg-7">
                                    <h4 class="mck-box-title">Add Member</h4>
                                </div>
                                <div class="blk-lg-2">
                                    <button type="button" class="mck-box-close" data-dismiss="mckbox"
                                        aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                            </div>
                            <div class="mck-box-body">
                                <div class="mck-form-group">
                                    <div class="mck-input-group blk-lg-12">
                                        <input id="mck-group-member-search" type="text"
                                            data-provide="typeahead" placeholder="Search..."/> <span
                                            class="mck-search-icon"><a href="#" target="_self" role="link"
                                            class="mck-group-member-search-link"><span
                                                class="mck-icon-search"></span></a></span>
                                    </div>
                                </div>
                                <div class="mck-tab-cell">
                                    <div class="mck-message-inner">
                                        <ul id="mck-group-member-search-list"
                                            class=" mck-contact-list mck-group-member-search-list mck-nav mck-nav-tabs mck-nav-stacked"></ul>
                                        <div id="mck-no-gsm-text"
                                            class="mck-no-data-text mck-text-muted n-vis">No contacts
                                            yet!</div>
                                    </div>
                                    <div id="mck-gms-loading" class="mck-loading n-vis">
                                        <img src="/timeline/applozic/images/ring.gif"
                                            alt="Loading" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


                <div id="mck-video-box">
                    <div class="container applozic-vid-container n-vis">
                        <div class="row">
                            <div id="mck-vid-media" class="col-lg-12">
                                <div id="mck-audio-call-icon center-block"></div>
                            </div>
                        </div>
                    </div>
                    <div id="mck-vid-div-overlay" class="container applozic-vid-container n-vis">
                        <div class="row mck-vid-overlay-header">
                            <div id="mck-vid-icon" class="centered n-vis"><span></span></div>
                        </div>
                                <div class="row mck-vid-overlay-footer mck-flex-footer">
                            <div class="mck-vid-scr-controls">
                                <div class="footer-controls pull-right">
                                    <button id="mck-microfone-mute-btn" class="btn-controls">
                                        <svg id="mck-unmute-icon" class="mck-unmute-icon" focusable="false" height="24px" viewBox="0 0 24 24" width="24px" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M12 14c1.66 0 2.99-1.34 2.99-3L15 5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3zm5.3-3c0 3-2.54 5.1-5.3 5.1S6.7 14 6.7 11H5c0 3.41 2.72 6.23 6 6.72V21h2v-3.28c3.28-.48 6-3.3 6-6.72h-1.7z" />
                                        </svg>
                                        <svg id="mck-mute-icon" class="mck-mute-icon" focusable="false" height="24px" viewBox="0 0 24 24" width="24px" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M19 11h-1.7c0 .74-.16 1.43-.43 2.05l1.23 1.23c.56-.98.9-2.09.9-3.28zm-4.02.17c0-.06.02-.11.02-.17V5c0-1.66-1.34-3-3-3S9 3.34 9 5v.18l5.98 5.99zM4.27 3L3 4.27l6.01 6.01V11c0 1.66 1.33 3 2.99 3 .22 0 .44-.03.65-.08l1.66 1.66c-.71.33-1.5.52-2.31.52-2.76 0-5.3-2.1-5.3-5.1H5c0 3.41 2.72 6.23 6 6.72V21h2v-3.28c.91-.13 1.77-.45 2.54-.9L19.73 21 21 19.73 4.27 3z" />
                                        </svg>
                                    </button>
                                    <button id="mck-vid-disconnect" class="btn-controls">
                                        <svg class="mck-disconnect-icon  A1NRff" xmlns="http://www.w3.org/2000/svg" focusable="false" width="24px" height="24px" viewBox="0 0 24 24">
                                            <path d="M12 9c-1.6 0-3.15.25-4.6.72v3.1c0 .39-.23.74-.56.9-.98.49-1.87 1.12-2.66 1.85-.18.18-.43.28-.7.28-.28 0-.53-.11-.71-.29L.29 13.08c-.18-.17-.29-.42-.29-.7 0-.28.11-.53.29-.71C3.34 8.78 7.46 7 12 7s8.66 1.78 11.71 4.67c.18.18.29.43.29.71 0 .28-.11.53-.29.71l-2.48 2.48c-.18.18-.43.29-.71.29-.27 0-.52-.11-.7-.28-.79-.74-1.69-1.36-2.67-1.85-.33-.16-.56-.5-.56-.9v-3.1C15.15 9.25 13.6 9 12 9z"></path>
                                        </svg>
                                    </button>
                                </div>
                            </div>
                                            <div id="local-media" class="n-vis"></div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        sapId: state.sapid,
        data: state
    }
}

export default connect(mapStateToProps)(AppLozicChat)