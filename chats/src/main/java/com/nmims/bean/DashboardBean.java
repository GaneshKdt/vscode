package com.nmims.bean;

import java.io.Serializable;
import java.util.List;

public class DashboardBean implements Serializable {
	
	private String chatGroupName;
	
	private String groupId;

	private String subject;

	private String acadMonth;
	
	private String acadYear;

	private String batchName;

	public DashboardBean() {
		super();
	}

	public String getChatGroupName() {
		return chatGroupName;
	}

	public void setChatGroupName(String chatGroupName) {
		this.chatGroupName = chatGroupName;
	}

	public String getGroupId() {
		return groupId;
	}

	public void setGroupId(String groupId) {
		this.groupId = groupId;
	}

	public String getSubject() {
		return subject;
	}

	public void setSubject(String subject) {
		this.subject = subject;
	}

	public String getAcadMonth() {
		return acadMonth;
	}

	public void setAcadMonth(String acadMonth) {
		this.acadMonth = acadMonth;
	}

	public String getAcadYear() {
		return acadYear;
	}

	public void setAcadYear(String acadYear) {
		this.acadYear = acadYear;
	}

	public String getBatchName() {
		return batchName;
	}

	public void setBatchName(String batchName) {
		this.batchName = batchName;
	}

	@Override
	public String toString() {
		return "DashboardBean [chatGroupName=" + chatGroupName + ", groupId=" + groupId + ", subject=" + subject
				+ ", acadMonth=" + acadMonth + ", acadYear=" + acadYear + ", batchName=" + batchName + "]";
	}
	
}
