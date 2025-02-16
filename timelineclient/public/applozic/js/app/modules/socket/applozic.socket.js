(function(window){
    'use strict';
    function define_ALSocket() {
        var ALSocket = {};
        var MCK_APP_ID;
        ALSocket.events = {};
        var subscriber = null;
        var encryptedSubscriber = null;
        ALSocket.stompClient = null;
        var TYPING_TAB_ID = '';
        ALSocket.typingSubscriber = null;
        ALSocket.openGroupSubscriber = [];
        var checkConnectedIntervalId;
        var sendConnectedStatusIntervalId;
        var OPEN_GROUP_SUBSCRIBER_MAP=[];
        ALSocket.mck_typing_status = 0;
        var MCK_TYPING_STATUS;
        var SOCKET = '';
        var MCK_WEBSOCKET_URL = 'socket.applozic.com';
        var MCK_WEBSOCKET_PORT = "80";
        ALSocket.MCK_TOKEN;
        ALSocket.USER_DEVICE_KEY;
        ALSocket.USER_ENCRYPTION_KEY;
        var mckUtils = new MckUtils();
        var isReconnectAvailable = true;

        /**
         * var events = {
                'onConnectFailed': function() {},
                'onConnect': function() {},
                'onMessageDelivered': function() {},
                'onMessageRead': function() {},
                'onMessageDeleted': function() {},
                'onConversationDeleted': function() {},
                'onUserConnect': function() {},
                'onUserDisconnect': function() {},
                'onConversationReadFromOtherSource': function() {},
                'onConversationRead': function() {},
                'onMessageReceived': function() {},
                'onMessageSentUpdate': function() {},
                'onMessageSent': function() {},
                'onUserBlocked': function() {},
                'onUserUnblocked': function() {},
                'onUserActivated': function() {},
                'onUserDeactivated': function() {},
                'connectToSocket': function() {},
                'onMessage': function(resp) { console.log(resp); },
                'onTypingStatus': function(resp) {}
               };
        window.Applozic.ALSocket.init("applozic-sample-app", "https://apps.applozic.com", events);
        */
        ALSocket.init = function(appId, data, _events) {
            if (appId) {
                MCK_APP_ID = appId;
            }
            if (typeof data !== "undefined") {
                ALSocket.MCK_TOKEN = data.token;
                ALSocket.APP_VERSION_CODE = data.appVersionCode;
                ALSocket.USER_DEVICE_KEY = data.deviceKey;
                if (data.encryptionKey || parseInt(data.appVersionCode) >= window.Applozic.ALApiService.DEFAULT_ENCRYPTED_APP_VERSION) {
                    ALSocket.USER_ENCRYPTION_KEY = data.userEncryptionKey;
                }
                MCK_WEBSOCKET_URL = data.websocketUrl;

                if (typeof data.websocketPort === "undefined") {
                    MCK_WEBSOCKET_PORT = (!mckUtils.startsWith(MCK_WEBSOCKET_URL, "https")) ? "15674" : "15675";
                } else {
                    MCK_WEBSOCKET_PORT = data.websocketPort;
                }
            }
            ALSocket.events = _events;
            if (typeof MCK_WEBSOCKET_URL !== 'undefined' && navigator.onLine) {
                if (window.WebSocket) {
                    MCK_WEBSOCKET_URL = MCK_WEBSOCKET_URL.replace("https://", "");
                    SOCKET = new WebSocket("wss://" + MCK_WEBSOCKET_URL + ":" + MCK_WEBSOCKET_PORT+ "/ws");
                    ALSocket.stompClient = Stomp.over(SOCKET);
                    ALSocket.stompClient.heartbeat.outgoing = 10000;
                    ALSocket.stompClient.heartbeat.incoming = 0;
                    ALSocket.stompClient.reconnect_delay = 30000;
                    ALSocket.stompClient.debug = null;
                    ALSocket.stompClient.onclose = function() {
                        ALSocket.disconnect();
                    };
                    ALSocket.stompClient.connect("guest", "guest", ALSocket.onConnect, ALSocket.onError, '/');
                    window.addEventListener("beforeunload", function(e) {
                        var check_url;
                        (e.target.activeElement) && (check_url=e.target.activeElement.href);
                        if(!check_url || 0 === check_url.length){
                            ALSocket.disconnect();
                        }
                    });
                }
            }
        };
        ALSocket.setOnline = function () {
            if (typeof window.Applozic.ALSocket !== 'undefined') {
                window.Applozic.ALSocket.sendStatus(1);
            }
        };
        ALSocket.checkConnected = function(isFetchMessages) {
            if (ALSocket.stompClient.connected) {
                if (checkConnectedIntervalId) {
                    clearInterval(checkConnectedIntervalId);
                }
                if (sendConnectedStatusIntervalId) {
                    clearInterval(sendConnectedStatusIntervalId);
                }
                // Below code will check that socket is connected or not in every 10 minutes.
                checkConnectedIntervalId = setInterval(function() {
                    ALSocket.connectToSocket(isFetchMessages);
                }, 600000);
                // Below code will send online status to server in every 20 minutes.
                sendConnectedStatusIntervalId = setInterval(function() {
                    ALSocket.sendStatus(1);
                }, 1200000);
            };
            ALSocket.connectToSocket(isFetchMessages);
        };
        ALSocket.connectToSocket = function(isFetchMessages) {
            if (typeof ALSocket.connectToSocket === "function") {
                ALSocket.events.connectToSocket(isFetchMessages);
            }
        };
        ALSocket.stopConnectedCheck = function() {
            if (checkConnectedIntervalId) {
                clearInterval(checkConnectedIntervalId);
            }
            if (sendConnectedStatusIntervalId) {
                clearInterval(sendConnectedStatusIntervalId);
            }
            checkConnectedIntervalId = '';
            sendConnectedStatusIntervalId = '';
            ALSocket.disconnect();
        };
        ALSocket.disconnect = function() {
            if (ALSocket.stompClient && ALSocket.stompClient.connected) {
                ALSocket.sendStatus(0);
                ALSocket.stompClient.disconnect();
                if (typeof SOCKET === "object") {
                    SOCKET.close();
                    SOCKET = '';
                }
            }
        };
        ALSocket.unsubscibeToTypingChannel = function() {
            if (ALSocket.stompClient && ALSocket.stompClient.connected) {
                if (ALSocket.typingSubscriber) {
                    if (ALSocket.mck_typing_status === 1) {
                        ALSocket.sendTypingStatus(0, TYPING_TAB_ID);
                    }
                    ALSocket.typingSubscriber.unsubscribe();
                }
            }
            ALSocket.typingSubscriber = null;
        };
        ALSocket.unsubscibeToNotification = function() {
            if (ALSocket.stompClient && ALSocket.stompClient.connected) {
                subscriber && subscriber.unsubscribe();
                encryptedSubscriber && encryptedSubscriber.unsubscribe();
            }
            subscriber = encryptedSubscriber = null;
        };
        ALSocket.subscibeToTypingChannel = function(subscribeId) {
            if (ALSocket.stompClient && ALSocket.stompClient.connected) {
                ALSocket.typingSubscriber = ALSocket.stompClient.subscribe("/topic/typing-" + MCK_APP_ID + "-" + subscribeId, ALSocket.onTypingStatus);
            } else {
                ALSocket.reconnect();
            }
        };
        ALSocket.subscribeToOpenGroup = function(group) {
            console.log('adding subscription');
            if (ALSocket.stompClient && ALSocket.stompClient.connected) {
                var subs = ALSocket.stompClient.subscribe("/topic/group-" + MCK_APP_ID + "-" + group.contactId, ALSocket.onOpenGroupMessage);
                ALSocket.openGroupSubscriber.push(subs.id);
                OPEN_GROUP_SUBSCRIBER_MAP[group.contactId] = subs.id;
            } else {
                ALSocket.reconnect();
            }
        };
        ALSocket.sendTypingStatus = function (status, mck_typing_status, MCK_USER_ID, tabId) {
            ALSocket.mck_typing_status =mck_typing_status;
            if (ALSocket.stompClient && ALSocket.stompClient.connected) {
                if (status === 1 && ALSocket.mck_typing_status === 1) {
                    ALSocket.stompClient.send('/topic/typing-' + MCK_APP_ID + "-" + TYPING_TAB_ID, {
                        "content-type": "text/plain"
                    }, MCK_APP_ID + "," + MCK_USER_ID + "," + status);
                }
                if (tabId) {
                    if (tabId === TYPING_TAB_ID && status === ALSocket.mck_typing_status && status === 1) {
                        return;
                    }
                    TYPING_TAB_ID = tabId;
                    ALSocket.stompClient.send('/topic/typing-' + MCK_APP_ID + "-" + tabId, {
                        "content-type": "text/plain"
                    }, MCK_APP_ID + "," + MCK_USER_ID + "," + status);
                    setTimeout(function() {
                        ALSocket.mck_typing_status = 0;
                    }, 60000);
                } else if (status === 0) {
                    ALSocket.stompClient.send('/topic/typing-' + MCK_APP_ID + "-" + TYPING_TAB_ID, {
                        "content-type": "text/plain"
                    }, MCK_APP_ID + "," + MCK_USER_ID + "," + status);
                }
                ALSocket.mck_typing_status = status;
            }
        };
        ALSocket.onTypingStatus = function(resp) {
            if (typeof ALSocket.events.onTypingStatus === "function") {
                ALSocket.events.onTypingStatus(resp);
            }
        };
        ALSocket.reconnect = function() {
            if (isReconnectAvailable) {
                isReconnectAvailable = false;
                ALSocket.unsubscibeToTypingChannel();
                ALSocket.unsubscibeToNotification();
                ALSocket.disconnect();
                var data = {};
                data.token = ALSocket.MCK_TOKEN ;
                data.deviceKey = ALSocket.USER_DEVICE_KEY;
                data.userEncryptionKey = ALSocket.USER_ENCRYPTION_KEY;
                data.websocketUrl = MCK_WEBSOCKET_URL;
                data.websocketPort = MCK_WEBSOCKET_PORT;
                ALSocket.init(MCK_APP_ID, data, ALSocket.events);
            }
        };
        ALSocket.onError = function(err) {
            console.log("Error in channel notification. " + err);
            if (typeof ALSocket.events.onConnectFailed === "function") {
                setTimeout(function () {
                    ALSocket.events.onConnectFailed();
                    isReconnectAvailable = true;
                }, 30000);
            }
        };
        ALSocket.sendStatus = function(status) {
            if (ALSocket.stompClient && ALSocket.stompClient.connected) {
                ALSocket.stompClient.send('/topic/status-v2', {
                    "content-type": "text/plain"
                }, ALSocket.MCK_TOKEN + "," + ALSocket.USER_DEVICE_KEY + "," + status);
            }
        };
        ALSocket.sendMessageStatus = function (messageKey, status, MCK_USER_ID) {
            if (ALSocket.stompClient && ALSocket.stompClient.connected) {
                ALSocket.stompClient.send("/topic/message-status", {
                    "content-type": "text/plain"
                }, MCK_USER_ID + "," + messageKey + "," + status);
            }
        };
        ALSocket.onConnect = function() {
            isReconnectAvailable = true;
            if (ALSocket.stompClient.connected) {
                (subscriber || encryptedSubscriber) && ALSocket.unsubscibeToNotification();
                ALSocket.handleOnConnect();
            } else {
                setTimeout(function() {
                    ALSocket.handleOnConnect();
                }, 5000);
            }
            if (typeof ALSocket.events.onConnect === "function") {
                ALSocket.events.onConnect();
            }
        };
        ALSocket.handleOnConnect = function () {
            var topic = "/topic/" + ALSocket.MCK_TOKEN;
            var encryptedTopic = "/topic/encr-" + ALSocket.MCK_TOKEN;
            subscriber = ALSocket.stompClient.subscribe(topic, ALSocket.onStompMessage);
            ALSocket.USER_ENCRYPTION_KEY && (encryptedSubscriber = ALSocket.stompClient.subscribe(encryptedTopic, ALSocket.onStompMessage));
            ALSocket.sendStatus(1);
            ALSocket.checkConnected(true);
        };
        ALSocket.onOpenGroupMessage = function (obj) {
            if (typeof ALSocket.events.onOpenGroupMessage === "function") {
                ALSocket.events.onOpenGroupMessage(obj);
            }
        };
        ALSocket.onStompMessage = function (obj) {
            var response;
            if (subscriber != null && subscriber.id === obj.headers.subscription) {
                response = obj.body;
            } else if (encryptedSubscriber != null && encryptedSubscriber.id === obj.headers.subscription) {
                response = mckUtils.decrypt(obj.body, ALSocket.USER_ENCRYPTION_KEY);
            }
            ALSocket.onMessage(response);
        };
        ALSocket.onMessage = function (obj) {
            if (mckUtils.isJsonString(obj)) {
                var resp = JSON.parse(obj);
                var messageType = resp.type;
                if (typeof ALSocket.events.onMessage === "function") {
                    ALSocket.events.onMessage(resp);
                }
                if (messageType === "APPLOZIC_04" || messageType === "MESSAGE_DELIVERED") {
                    ALSocket.events.onMessageDelivered(resp);
                } else if (messageType === 'APPLOZIC_08' || messageType === "MT_MESSAGE_DELIVERED_READ") {
                    ALSocket.events.onMessageRead(resp);
                } else if (messageType === "APPLOZIC_05") {
                    ALSocket.events.onMessageDeleted(resp);
                } else if (messageType === 'APPLOZIC_27') {
                    ALSocket.events.onConversationDeleted(resp);
                } else if (messageType === 'APPLOZIC_11') {
                    ALSocket.events.onUserConnect(resp.message);
                } else if (messageType === 'APPLOZIC_12') {
                    var userId = resp.message.split(",")[0];
                    var lastSeenAtTime = resp.message.split(",")[1];
                    ALSocket.events.onUserDisconnect({
                        'userId': userId,
                        'lastSeenAtTime': lastSeenAtTime
                    });
                } else if (messageType === "APPLOZIC_29") {
                    ALSocket.events.onConversationReadFromOtherSource(resp);
                } else if (messageType === 'APPLOZIC_28') {
                    ALSocket.events.onConversationRead(resp);
                } else if (messageType === "APPLOZIC_16") {
                    var status = resp.message.split(":")[0];
                    var userId = resp.message.split(":")[1];
                    ALSocket.events.onUserBlocked({
                        'status': status,
                        'userId': userId
                    });
                } else if (messageType === 'APPLOZIC_17') {
                    var status = resp.message.split(":")[0];
                    var userId = resp.message.split(":")[1];
                    ALSocket.events.onUserUnblocked({
                        'status': status,
                        'userId': userId
                    });
                } else if (messageType === 'APPLOZIC_18') {
                    ALSocket.events.onUserActivated();
                } else if (messageType === 'APPLOZIC_19') {
                    ALSocket.events.onUserDeactivated();
                } else {
                    var message = resp.message;
                    if (messageType === "APPLOZIC_03") {
                        ALSocket.events.onMessageSentUpdate({
                            'messageKey': message.key
                        });
                    } else if (messageType === "APPLOZIC_01" || messageType === "MESSAGE_RECEIVED") {
                        var messageFeed = alMessageService.getMessageFeed(message);
                        ALSocket.events.onMessageReceived({
                            'message': messageFeed
                        });
                    } else if (messageType === "APPLOZIC_02") {
                        var messageFeed = alMessageService.getMessageFeed(message);
                        ALSocket.events.onMessageSent({
                            'message': messageFeed
                        });
                    }
                }
            }
        };
                       
        return ALSocket;
    }

    if(typeof(ALSocket) === 'undefined'){
        window.Applozic.ALSocket = define_ALSocket();
    } else{
        console.log("ALSocket already defined.");
    }
})(window);
