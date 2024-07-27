package com.nmims.controller;

import java.util.ArrayList;

//import java.util.Date;
//import java.util.List;
import java.util.List;

import org.apache.commons.lang.StringUtils;
import org.apache.commons.lang.exception.ExceptionUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.HttpMethod;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
//import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;
import com.nmims.services.QuickBloxService;
import com.nmims.bean.ChatBean;
import com.nmims.bean.StudentBean;
import com.nmims.bean.SubjectGroupBean;
//import org.apache.commons.net.ntp.TimeStamp;


@Controller
@CrossOrigin(origins="*", allowedHeaders="*")
public class QuickBloxController {
	
	@Autowired
	QuickBloxService quickBloxService;
	
	private static final Logger logger = LoggerFactory.getLogger(QuickBloxController.class);
	
	@RequestMapping(value = "fullview")
	public ModelAndView fullview( @RequestParam(required = false) String userId ){

		ModelAndView modelAndView = new ModelAndView("fullview");
		Boolean loadPrivateChat = Boolean.FALSE;

		if( !StringUtils.isBlank(userId) )
			loadPrivateChat = Boolean.TRUE;

		modelAndView.addObject( "loadPrivateChat", loadPrivateChat );
		modelAndView.addObject( "loadPrivateChatWith", userId );

		return modelAndView ;

	}

	@RequestMapping(value = "sidebox")
	public ModelAndView sidebox( @RequestParam(required = false) String userId ){

		ModelAndView modelAndView = new ModelAndView("sidebox");
		
		return modelAndView ;

	}

	@RequestMapping(value = "quickblox",method = {RequestMethod.GET} )
	public ModelAndView quickblox(@RequestParam String sapid,@RequestParam (required = false) String firstName,@RequestParam (required = false) String lastName,@RequestParam String isAdmin)
	{
		String fullName="";
		if(isAdmin.equalsIgnoreCase("N"))
		{
			if(!lastName.equalsIgnoreCase("."))
				fullName=firstName+" "+lastName;
			else
				fullName=firstName;
		}
		else if(isAdmin.equalsIgnoreCase("Y"))
		{
			fullName="Group Admin";
		}
		
		List<ChatBean> chatUserList = quickBloxService.getContactsForChatBasedOnBatch(sapid);
		if(chatUserList == null) {
			chatUserList = new ArrayList<ChatBean>();
		}
		
		ModelAndView modelAndView = new ModelAndView("quickblox");
		modelAndView.addObject("sapid", sapid);
		modelAndView.addObject("fullName", fullName);
		modelAndView.addObject("chatUserList", chatUserList);
		return modelAndView ;
		
	}

	//@RequestMapping(value="chatGroupCreation",method= {RequestMethod.POST})
	@ResponseBody
	public void chatGroupCreation()
	{
		List<SubjectGroupBean> subjectDetailsList = new ArrayList<SubjectGroupBean>();
		String token="";
		try
		{
			subjectDetailsList = quickBloxService.getActiveSubjectsDetailsList();
			logger.info("active subject size is: "+subjectDetailsList.size());
			token=quickBloxService.getUserSession("77777777");
		}
		catch(Exception e)
		{
			logger.info("Exception in getting active subject details: "+ExceptionUtils.getStackTrace(e));
			return;
		}
		
		for(SubjectGroupBean subjectDetailBean : subjectDetailsList)
		{
			logger.info(subjectDetailBean.toString());
			subjectDetailBean.setSubject_initials(quickBloxService.getInitials(subjectDetailBean.getSubject()));
			String chat_group_name = quickBloxService.getChatGroupName( subjectDetailBean );
			subjectDetailBean.setChat_group_name(chat_group_name);
			boolean groupAlreadyCretead=false;
			List<StudentBean> memberList = new ArrayList<StudentBean>();
			ArrayList<StudentBean> sucessfullUserCreationList = new ArrayList<StudentBean>();
			ArrayList<String> quickBloxUserIdsList= new ArrayList<String>();
			String courseCordinatorSapId=subjectDetailBean.getUserId();
			String courseCordinatorTumId=Integer.toString(subjectDetailBean.getTimebound_user_mapping_id());
			String courseCourdinatorQuickBloxId="";
			String quickBloxGroupId="";
			try
			{
				logger.info(subjectDetailBean.getChat_group_name());
				groupAlreadyCretead=quickBloxService.checkIfChatGroupAlreadyCreated(subjectDetailBean.getStudent_subject_config_id());
				logger.info(subjectDetailBean.getStudent_subject_config_id()+" group created: "+ groupAlreadyCretead);
			}
			catch(Exception e)
			{
				logger.info("Exception in checking if group already created for student subject config id: "+subjectDetailBean.getStudent_subject_config_id()+" is "+ExceptionUtils.getStackTrace(e));
				continue;
			}
			
			if(!groupAlreadyCretead)
			{
				try
				{
					memberList=quickBloxService.getGroupMembers(subjectDetailBean.getStudent_subject_config_id());
					for(StudentBean bean:memberList)
					{
						try
						{
							String quickBloxId=quickBloxService.checkIfUserExists(bean.getUserId(),token);
							if(!quickBloxId.equalsIgnoreCase("No user found"))
							{
								quickBloxUserIdsList.add(quickBloxId);
								sucessfullUserCreationList.add(bean);
								logger.info("user id:"+bean.getUserId()+" already exist in quickblox system for subject:"+subjectDetailBean.getStudent_subject_config_id());
							}
						}
						catch(Exception e)
						{
							logger.info("Exception in checkIfUserExists for user id:"+bean.getUserId()+" for subject:"+subjectDetailBean.getStudent_subject_config_id()+" is:"+e.getMessage());
						}
					}
					
					courseCourdinatorQuickBloxId=quickBloxService.checkIfUserExists(courseCordinatorSapId,token);
					if(courseCourdinatorQuickBloxId.equalsIgnoreCase("No user found"))
					{
						courseCourdinatorQuickBloxId = quickBloxService.createUser(token, courseCordinatorSapId);
					}
					
					String userToken=quickBloxService.getUserSession(courseCordinatorSapId);
					quickBloxGroupId=quickBloxService.createGroup(userToken,subjectDetailBean.getChat_group_name(), quickBloxUserIdsList);
					quickBloxUserIdsList.add(courseCourdinatorQuickBloxId);
					StudentBean courseCordinatorBean = new StudentBean();
					courseCordinatorBean.setId(courseCordinatorTumId);
					courseCordinatorBean.setUserId(courseCordinatorSapId);
					sucessfullUserCreationList.add(courseCordinatorBean);
					quickBloxService.insertUsersAndGroupDetails(quickBloxUserIdsList,sucessfullUserCreationList,subjectDetailBean,quickBloxGroupId,subjectDetailBean.getChat_group_name());
				}
				catch(Exception e)
				{
					logger.info("Exception for student subject config id: "+subjectDetailBean.getStudent_subject_config_id()+" is "+ExceptionUtils.getStackTrace(e));
				}
				
			}
			else
			{
				try
				{
					memberList=quickBloxService.getNewGroupMembers(subjectDetailBean.getStudent_subject_config_id());
					if(memberList.size()>0)
					{
						for(StudentBean bean:memberList)
						{
							try
							{
								String quickBloxId=quickBloxService.checkIfUserExists(bean.getUserId(),token);
								if(!quickBloxId.equalsIgnoreCase("No user found"))
								{
									quickBloxUserIdsList.add(quickBloxId);
									sucessfullUserCreationList.add(bean);
									logger.info("user id:"+bean.getUserId()+" already exist in quickblox system for subject:"+subjectDetailBean.getStudent_subject_config_id());
								}
							}
							catch(Exception e)
							{
								logger.info("Exception in checkIfUserExists for user id:"+bean.getUserId()+" for subject:"+subjectDetailBean.getStudent_subject_config_id()+" is:"+e.getMessage());
							}
						}
						String userToken=quickBloxService.getUserSession(courseCordinatorSapId);
						quickBloxGroupId=quickBloxService.updateGroup(userToken,subjectDetailBean.getStudent_subject_config_id(), quickBloxUserIdsList);
						quickBloxService.insertUserDetails(quickBloxUserIdsList,sucessfullUserCreationList,subjectDetailBean,quickBloxGroupId);
					}
					else
					{
						logger.info("No new member available for student subject config id:"+subjectDetailBean.getStudent_subject_config_id());
					}
				}
				catch(Exception e)
				{
					logger.info("Exception for student subject config id: "+subjectDetailBean.getStudent_subject_config_id()+" is "+ExceptionUtils.getStackTrace(e));
				}
			}
		}		
		
	}
	
	
}
