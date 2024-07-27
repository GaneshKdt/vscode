package com.nmims.services;

import java.util.ArrayList;
import java.util.List;
import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.nmims.bean.ChatBean;
import com.nmims.bean.StudentBean;
import com.nmims.bean.SubjectGroupBean;
import com.nmims.dao.QuickBloxDao;
import com.nmims.helper.QuickBloxManager;


@Service
public class QuickBloxService {
	
	@Autowired
	QuickBloxManager quickBloxManager;
	
	@Autowired
	QuickBloxDao quickBloxDao;
	
	public List<SubjectGroupBean> getActiveSubjectsDetailsList() throws Exception
	{
		List<SubjectGroupBean> subjectDetailsList = new ArrayList<SubjectGroupBean>();
		subjectDetailsList=quickBloxDao.getActiveSubjectDetailsList();
		return subjectDetailsList;
	}
	
	public String getInitials(String str) 
	{
		
        String[] arr = str.split(" ");
        String finalResult = "";
        
        for (String s : arr) {
            if (s.equals("-") || s.equals(":") || Character.isLowerCase(s.charAt(0)) || s.equals("&")) {
                continue;
            }
            finalResult += Character.toUpperCase(s.charAt(0));
            if (s.contains(":")) {
                finalResult += s.split(":").length>1?Character.toUpperCase(s.split(":")[1].charAt(0)):"";
            }
            if (s.contains("-")) {
                finalResult += s.split("-").length>1?Character.toUpperCase(s.split("-")[1].charAt(0)):"";
            }
            if (s.contains("&")) {
                finalResult += s.split("&").length>1?Character.toUpperCase(s.split("&")[1].charAt(0)):"";
            }
        }
        return finalResult;
        
    }
	
	public String getChatGroupName( SubjectGroupBean bean ) 
	{

    	String chat_group_name = "";
    	
    	/* checking if the subject if for term 3 or 4 i.e has specialization, 
    	 * if not we add the term in batch name
    	 * else we add the specialization initials 
    	 * */
    	
    	if( StringUtils.isBlank( bean.getSpecialisation_initials() ) ) {

        	if( StringUtils.isBlank( bean.getBatch()) )
        		chat_group_name =  bean.getSubject_initials() + "-" + bean.getTerm() + "-B1-" + bean.getAcadMonth() + 
        		Integer.toString( bean.getAcadYear() ).substring(2);
        	else
        		chat_group_name =  bean.getSubject_initials() + "-" + bean.getTerm() + "-" + bean.getBatch() +"-" + bean.getAcadMonth() + 
        		Integer.toString( bean.getAcadYear() ).substring(2);
        	
    	}else {

        	if( StringUtils.isBlank( bean.getBatch()) )
        		chat_group_name =  bean.getSubject_initials() + "-" + bean.getSpecialisation_initials() + "-B1-" + bean.getAcadMonth() + 
        		Integer.toString( bean.getAcadYear() ).substring(2);
        	else
        		chat_group_name =  bean.getSubject_initials() + "-" + bean.getSpecialisation_initials() + "-" + bean.getBatch() +"-" + 
        	bean.getAcadMonth() + Integer.toString( bean.getAcadYear() ).substring(2);
        	
    	}
    	
    	return chat_group_name;
    		
	}
	
	public boolean checkIfChatGroupAlreadyCreated(int studentSubjectConfigId) throws Exception
	{
		
		boolean present = quickBloxDao.checkIfChatGroupAlreadyCreated(studentSubjectConfigId);
		
		return present;
		
	}
	
	public List<StudentBean> getGroupMembers(int studentSubjectConfigId) throws Exception
	{
		List<StudentBean> memberList = new ArrayList<StudentBean>();
		memberList = quickBloxDao.getGroupMembers(studentSubjectConfigId);
		return memberList;
	}
	
	public List<StudentBean> getNewGroupMembers(int studentSubjectConfigId) throws Exception
	{
		List<StudentBean> memberList = new ArrayList<StudentBean>();
		memberList = quickBloxDao.getNewGroupMembers(studentSubjectConfigId);
		return memberList;
	}
	
	public String getapplicationSession() throws Exception
	{
		String admin="N";
		String adminName="";
		String token =quickBloxManager.createSession(admin, adminName);
		return token;
	}
	
	public String createUser(String token,String sapid) throws Exception
	{
		String fullName="Group Admin";
		String userId=quickBloxManager.createUser(token, sapid, fullName);
		return userId;
	}
	
	public String getUserSession(String sapid) throws Exception
	{
		String admin="Y";
		String adminName=sapid;
		String token=quickBloxManager.createSession(admin, adminName);
		return token;
	}
	
	public String createGroup(String token,String groupName,ArrayList<String> quickBloxUserIdsList) throws Exception
	{
		String ids="";
		for(int i=0;i<=quickBloxUserIdsList.size()-2;i++)
		{
			ids=ids+quickBloxUserIdsList.get(i)+",";
		}
		ids=ids+quickBloxUserIdsList.get(quickBloxUserIdsList.size()-1);
		String groupId=quickBloxManager.createGroup(token, groupName, ids);
		return groupId;
	}
	
	public String updateGroup(String token,int studentSubjectConfigId,ArrayList<String>quickBloxuserIdsList) throws Exception
	{
		String groupId=quickBloxDao.getGroupId(studentSubjectConfigId);
		String quickBloxGroupId=quickBloxManager.updateGroup(token, groupId, quickBloxuserIdsList);
		return quickBloxGroupId;
	}
	
	public void insertUsersAndGroupDetails(ArrayList<String>quickBloxUserIdsList,ArrayList<StudentBean>sucessfullUserCreationList,SubjectGroupBean subjectDetailBean,String groupId,String chatGroupName) throws Exception
	{
		long quickBloxPrimaryId=quickBloxDao.insertQuickBloxGroups(groupId, chatGroupName,subjectDetailBean.getStudent_subject_config_id());
		int primaryKey=(int)quickBloxPrimaryId;
		quickBloxDao.insertUserDetails(quickBloxUserIdsList,sucessfullUserCreationList,subjectDetailBean,primaryKey);
	}
	
	public void insertUserDetails(ArrayList<String>quickBloxUserIdsList,ArrayList<StudentBean>sucessfullUserCreationList,SubjectGroupBean subjectDetailBean,String quickBloxGroupId) throws Exception
	{
		int quickBloxPrimaryKey=quickBloxDao.getQuickBloxPrimaryKey(quickBloxGroupId);
		quickBloxDao.insertUserDetails(quickBloxUserIdsList,sucessfullUserCreationList,subjectDetailBean,quickBloxPrimaryKey);
	}
	
	public String checkIfUserExists(String loginId,String token) throws Exception
	{
//		String token=getUserSession(existingSapId);
		return quickBloxManager.checkIfUserExist(loginId,token);
	}
	
	public boolean checkIfUserAlreadyCreated(String sapid)
	{
		boolean present=quickBloxDao.checkIfUserAlreadyCreated(sapid);
		return present;
	}
	
	public String getQuickBloxUserId(String sapid)
	{
		String quickbloxId=quickBloxDao.getQuickBloxUserId(sapid);
		return quickbloxId;
	}

	public List<ChatBean> getContactsForChatBasedOnBatch (String sapId) {
		return quickBloxDao.getContactsForChatBasedOnBatch(sapId);
	}

}

