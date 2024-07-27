var QBconfig = {
    credentials: {
    	 appId: '98225',
         authKey: 'MLrJ3R8VqDCMzmV',
         authSecret: 'd5X45mvBwsvnAzJ',
         accountKey: 'bZnyp7QppT6akQHGuNwx'
    },
    appConfig: {
        chatProtocol: {
            active: 2
        },
        endpoints: {
            api: 'api.quickblox.com',
            chat: 'chat.quickblox.com'
        },
        streamManagement: {
            enable: true
        },
        debug: {
            mode: 1,
            file: null
        }
    }
};

var appConfig = {
    dilogsPerRequers: 15,
    messagesPerRequest: 50,
    usersPerRequest: 15,
    typingTimeout: 3 // 3 seconds
};

var CONSTANTS = {
    DIALOG_TYPES: {
        CHAT: 3,
        GROUPCHAT: 2,
        PUBLICCHAT: 1
    },
    ATTACHMENT: {
        TYPE: 'image',
        BODY: '[attachment]',
        MAXSIZE: 25000000, // set 25 megabytes,
        MAXSIZEMESSAGE: 'The uploaded file exceeds maximum file size (25MB).'
    },
    NOTIFICATION_TYPES: {
        NEW_DIALOG: '1',
        UPDATE_DIALOG: '2',
        LEAVE_DIALOG: '3'
    }
};
