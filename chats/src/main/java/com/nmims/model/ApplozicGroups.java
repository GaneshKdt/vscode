package com.nmims.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="lti.applozic_groups")
public class ApplozicGroups {

	@Id
	@Column(name = "id")
	private String id;

	@Column(name = "groupId")
	private String groupId;

	@Column(name = "chat_group_name")
	private String chatGroupName;

	public ApplozicGroups() {
		super();
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getGroupId() {
		return groupId;
	}

	public void setGroupId(String groupId) {
		this.groupId = groupId;
	}

	public String getChatGroupName() {
		return chatGroupName;
	}

	public void setChatGroupName(String chatGroupName) {
		this.chatGroupName = chatGroupName;
	}
	
}
