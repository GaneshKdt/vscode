import React, { Component } from 'react';
import MomentHelper from './shared/MomentHelper/MomentHelper'
const queryString = require('query-string')

class Test extends Component{

    getTotalAnnouncementsCount() {
        return ` Total : ${kachra["totalAnnouncementsDetails"].count} | Read : ${kachra["totalAnnouncementsDetails"].read}`
    }

    getAnnouncements() {
        let announcements = kachra["new_announce"]
        var returnedJSX = Object.values(announcements).map((announement) => {
            return (
                <>  
                    id : {announement.id}
                    <br/>
                    Subject : {announement.subject}
                    <hr/>
                </>
            )
        })
        return returnedJSX
    }
    render() {
        return (
            <div className="pt-5">  
                <div className="card my-auto mt-5 mx-auto w-50">
                    <div className="card-header"> Total Announcements Count { this.getTotalAnnouncementsCount() }  </div>
                    <div className="card-body"> 
                        {this.getAnnouncements()}
                    </div>
                </div>
            </div>
        )
    }
}
const kachra = {
    "totalAnnouncementsDetails" : {
        "count": "267",
        "read": "24",
    },
    "new_announce" : {

        "282" : {
            "id": "282",
            "subject": "Results of MBA (WX) Exams conducted for the respective subjects (Financial Accounting : Information for Decisions and Marketing Management) on 28th September, 2019 have been made live! ",
            "description": "<p>Dear Students,</p><p>Results of MBA (WX) Exams  conducted for the respective subjects (Financial Accounting : Information for  Decisions and Marketing Management) on 28th September, 2019 have been made live! &nbsp;</p><p><b>To view the Result</b>, pls. click on the <b>Exam Tab</b> (Respective Subject) </p><p><b>Passing Criteria:</b></p><p>In each subject, student  is required to obtain 50% marks on the Total Maximum Marks (100) in aggregate.  Best seven marks in internal assessment is considered and the student must  obtain 40% marks of the maximum marks of term end exam (i.e. 12 marks or more  out of 30 marks) </p><p>Kindly note: There is no  Revaluation process applicable. </p><p> </p><p><b>Non-Fulfilment of Passing  Criteria of Final Examination:</b></p><p>In case any student fails  to appear for the scheduled Final examination in any subject for reasons  whatsoever or overall fails in the subject/s: These students will have to  appear for the <b>Re-exam of 100 marks</b> which would be scheduled after  completion of academic lectures of all subjects of that term. Student will be  allowed for not more than two subjects in the Re-Exam attempt. Re-exam Fee is  not part of the Program fee and will be charged at Rs.2500/- per subject.</p><p> </p><p> </p><p>Regards,</p><p>Team NGASCE</p>",
            "startDate": "2019-10-03",
            "endDate": "2019-10-13",
            "active": "Y",
            "category": "Exams",
            "count": 0,
            "announcementId": "282",
            "masterKey": "111",
            "createdBy": "sanketpanaskar",
            "createdDate": "2019-10-03 15:45:17.0",
            "lastModifiedBy": "sanketpanaskar",
            "lastModifiedDate": "2019-10-03 15:45:17.0"
        },
        "281" : {
            "id": "281",
            "subject": "Results of MBA (WX) Exams conducted for the respective subjects (Financial Accounting: Information for Decisions & Marketing Management) on 22nd September, 2019 have been made live!",
            "description": "<p>Dear Students,</p><p>Results  of MBA (WX) Exams conducted for the respective subjects (Financial Accounting:  Information for Decisions &amp; Marketing Management) on 22nd September, 2019 have been made  live! </p><p><b>To view the Result</b>, pls. click on the <b>Exam  Tab</b> (Respective Subject) </p><p><b>Passing  Criteria:</b></p><p>In  each subject, student is required to obtain 50% marks on the Total Maximum  Marks (100) in aggregate. Best seven marks in internal assessment is considered  and the student must obtain 40% marks of the maximum marks of term end exam  (i.e. 12 marks or more out of 30 marks) </p><p>Kindly  note: There is no Revaluation process applicable. </p><p> </p><p><b>Non-Fulfilment  of Passing Criteria of Final Examination:</b></p><p>In  case any student fails to appear for the scheduled Final examination in any  subject for reasons whatsoever or overall fails in the subject/s: These  students will have to appear for the <b>Re-exam of 100 marks</b> which would be  scheduled after completion of academic lectures of all subjects of that term.  Student will be allowed for not more than two subjects in the Re-Exam attempt.  Re-exam Fee is not part of the Program fee and will be charged at Rs.2500/- per  subject.</p><p> </p><p> </p><p>Regards,</p><p>Team  NGASCE</p><p> </p>",
            "startDate": "2019-09-26",
            "endDate": "2019-10-06",
            "active": "Y",
            "category": "Exams",
            "count": 0,
            "announcementId": "281",
            "masterKey": "111",
            "createdBy": "77119966188",
            "createdDate": "2019-09-26 13:19:31.0",
            "lastModifiedBy": "77119966188",
            "lastModifiedDate": "2019-09-26 13:19:31.0"
        },
        "274" : {
            "id": "274",
            "subject": "Updated Guidelines for Term End Exam",
            "description": "<p style=\"box-sizing: border-box; margin: 0px 0px 10px; padding: 0px; caret-color: rgb(68, 68, 68); color: rgb(68, 68, 68); font-family: AllerRegular, &amp;quot;Helvetica Neue&amp;quot;, Helvetica, Arial, sans-serif; font-size: 14px; font-style: normal; font-variant-caps: normal; font-weight: normal; letter-spacing: normal; orphans: auto; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: auto; word-spacing: 0px; -webkit-text-size-adjust: auto; -webkit-text-stroke-width: 0px; text-decoration: none;\">Dear Students,</p><p style=\"box-sizing: border-box; margin: 0px 0px 10px; padding: 0px; caret-color: rgb(68, 68, 68); color: rgb(68, 68, 68); font-family: AllerRegular, &amp;quot;Helvetica Neue&amp;quot;, Helvetica, Arial, sans-serif; font-size: 14px; font-style: normal; font-variant-caps: normal; font-weight: normal; letter-spacing: normal; orphans: auto; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: auto; word-spacing: 0px; -webkit-text-size-adjust: auto; -webkit-text-stroke-width: 0px; text-decoration: none;\">Please find the updated&nbsp;<strong>Term End Exam Guidelines</strong>&nbsp;for your online proctored exams:</p><a href=\"https://drive.google.com/file/d/193QJT8eaB7cTdIgfHbUuRxmAOg8D864a/view?usp=sharing\" rel=\"nofollow\" style=\"box-sizing: border-box; margin: 0px; padding: 0px; background-color: transparent; color: inherit; text-decoration: none; cursor: pointer; caret-color: rgb(68, 68, 68); font-style: normal; font-variant-caps: normal; letter-spacing: normal; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; word-spacing: 0px; text-size-adjust: auto; -webkit-text-stroke-width: 0px;\"><span style=\"color: rgb(44, 130, 201);\"><b>Click Here to Download Guidelines</b></span></a><br style=\"box-sizing: border-box; margin: 0px; padding: 0px; caret-color: rgb(68, 68, 68); color: rgb(68, 68, 68); font-family: AllerRegular, &amp;quot;Helvetica Neue&amp;quot;, Helvetica, Arial, sans-serif; font-size: 14px; font-style: normal; font-variant-caps: normal; font-weight: normal; letter-spacing: normal; orphans: auto; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: auto; word-spacing: 0px; -webkit-text-size-adjust: auto; -webkit-text-stroke-width: 0px; text-decoration: none;\"><br style=\"box-sizing: border-box; margin: 0px; padding: 0px; caret-color: rgb(68, 68, 68); color: rgb(68, 68, 68); font-family: AllerRegular, &amp;quot;Helvetica Neue&amp;quot;, Helvetica, Arial, sans-serif; font-size: 14px; font-style: normal; font-variant-caps: normal; font-weight: normal; letter-spacing: normal; orphans: auto; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: auto; word-spacing: 0px; -webkit-text-size-adjust: auto; -webkit-text-stroke-width: 0px; text-decoration: none;\">All the Best!<br><br><p style=\"box-sizing: border-box; margin: 0px 0px 10px; padding: 0px; caret-color: rgb(68, 68, 68); color: rgb(68, 68, 68); font-family: AllerRegular, &amp;quot;Helvetica Neue&amp;quot;, Helvetica, Arial, sans-serif; font-size: 14px; font-style: normal; font-variant-caps: normal; font-weight: normal; letter-spacing: normal; orphans: auto; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: auto; word-spacing: 0px; -webkit-text-size-adjust: auto; -webkit-text-stroke-width: 0px; text-decoration: none;\">Vaishali</p>",
            "startDate": "2019-09-07",
            "endDate": "2019-10-07",
            "active": "Y",
            "category": "Exams",
            "attachment1": "",
            "attachment2": "",
            "attachment3": "",
            "program": "MBA - WX",
            "programStructure": "Jul2019",
            "count": 0,
            "announcementId": "274",
            "masterKey": "111",
            "createdBy": "sanketpanaskar",
            "createdDate": "2019-09-07 16:34:10.0",
            "lastModifiedBy": "sanketpanaskar",
            "lastModifiedDate": "2019-09-07 16:34:10.0"
        },
        "267" : {
            "id": "267",
            "subject": "IA Features Update",
            "description": "<p>Dear Students,</p><p> </p><p>Greetings from NGA - SCE!</p><p>We are glad to inform that with our new  enhanced features in Internal Assessment Test now you can give Tests more  effectively, features updated both on web and mobile apps.</p><br><p>Just remember a few important points:</p><p>1.You can now Use status column on right  to navigate through questions.</p><p>2. For answer/option to be saved it is  now mandatory to press &ldquo;Save &amp; Next&rdquo; button.</p>3.Auto Saving of answers/options&nbsp; has been removed<br><p> </p><p>The Submit Assignment button is now  moved to top will be enable only after Student reaches Q 10.</p>This announcements has been enabled for your Internal Assesment today.<br><br><br>All the best for your IA.<p> </p><img src=\"https://studentzone-ngasce.nmims.edu/Faculty/NMSCEMU132100303/pic.jpg\" alt=\"IA Update Img\" height=\"auto\" width=\"100%\">",
            "startDate": "2019-08-28",
            "endDate": "2020-01-20",
            "active": "Y",
            "category": "Exams",
            "program": "MBA - WX",
            "programStructure": "Jul2019",
            "count": 0,
            "announcementId": "267",
            "masterKey": "111",
            "createdBy": "sanketpanaskar",
            "createdDate": "2019-08-28 21:10:01.0",
            "lastModifiedBy": "sanketpanaskar",
            "lastModifiedDate": "2019-08-28 21:10:01.0"
        },
        "248" : {
            "id": "248",
            "subject": "All New Chat Feature Launch",
            "description": "<p><span style=\"font-family: Arial, Helvetica; font-size: 14px;\">Dear  Students,</span></p><p><br></p><p><span style=\"font-family: Arial, Helvetica; font-size: 14px;\">Greetings from NGA - SCE!</span></p><p><br></p><p><span style=\"font-family: Arial, Helvetica; font-size: 14px;\">We are glad to inform that now you can communicate effectively with your peers,  faculty and course coordinator with an all new <strong>chat option</strong>&nbsp;available within the student portal, feature active both on web and mobile apps. </span></p><p><br></p><p><span style=\"font-family: Arial, Helvetica; font-size: 14px;\">Just  remember a few important points:</span></p><p><span style=\"font-family: Arial,Helvetica; font-size: 14px;\">1. You will find the chat option either in the right-hand panel (expanded) or the bottom right corner (collapsed) of your screen<br>2. You can find and start a conversation, specific only to your course, with any of your batchmates listed in the contacts<br>3. Groups can only be created by either your faculty or course coordinator to facilitate group related activities, updates etc.</span></p><p><br></p><p><span style=\"font-family: Arial, Helvetica; font-size: 14px;\">You  are requested to thoroughly read the policy guidelines and agree to use the  chat option as mentioned below:</span></p><span style=\"font-family: Arial,Helvetica;\"><span style=\"font-size: 14px;\"><br><strong>TERMS OF USE</strong><br><br>The University recognises that communicating effectively is an integral component of the student experience while going through the course. It also recognises the need for multiple channels for communication in order to engage with diverse cohorts and/or communities for different purposes and situations.<br>The University undertakes to ensure student communication is clear, timely, accurate, accessible, targeted, personalised, inclusive, and reflective of its brand and reputation and in accordance with its Privacy Policy.<br>The Student Communication Policy outlines the principles that must apply while using the chat option. A student is expected to adhere to these chat etiquettes documented in the Principles as follows.<br><br><strong>Principles</strong><br>1. Students are required to maintain the utmost decency on the chat platform. Discussions and queries will be specific to the academic program they have enrolled for<br>2. Students are strictly prohibited from sharing any objectionable content (image, video, links, etc.) or any copyright material with their peers and in the groups<br>3. This is to be noted that all the conversations will be monitored and recorded to avoid any misuse and to make improvements on the platform<br>4. Students are encouraged to report any misconduct on the platform either to their course coordinator or to the student support team via email or call<br>5. Communication made in Groups Chats will be restricted to academics only, like work related to group activities, important dates, lecture updates etc.<br>6. If any student is found posting any obscene content in the chat window or using language that the University considers inappropriate, NMIMS Global Access School reserves the right to take action against the student including cancelling his/her admission Students are requested to provide their consent and agreement to the above mentioned policies.<br></span></span><p><br></p><p><span style=\"font-family: Arial, Helvetica; font-size: 14px;\">Regards,</span></p><p><span style=\"font-family: Arial, Helvetica; font-size: 14px;\">Vaishali Solanki</span></p><p><span style=\"font-family: Arial, Helvetica; font-size: 14px;\">Course Coordinator</span></p><br>",
            "startDate": "2019-07-20",
            "endDate": "2019-10-27",
            "active": "Y",
            "category": "General",
            "attachment1": "Announcements/MBA(WX)_Chat_-_Terms_and_Conditions.pdf_20072019.pdf",
            "attachment2": "",
            "attachment3": "",
            "program": "MBA - WX",
            "programStructure": "Jul2019",
            "count": 0,
            "announcementId": "248",
            "masterKey": "111",
            "createdBy": "sanketpanaskar",
            "createdDate": "2019-07-20 19:56:34.0",
            "lastModifiedBy": "sanketpanaskar",
            "lastModifiedDate": "2019-07-20 19:56:34.0"
        }
    },   
}

export default Test;