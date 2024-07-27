package com.nmims.model;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="lti.star_message")
public class StarMessage implements Serializable{

	@Id
	@Column(name = "messageId")
	private String messageId;

	@Column(name = "sapid")
	private String sapid;
	
	@Column(name = "message")
	private String message;
	
	@Column(name = "userId")
	private String userId;

	@Column(name = "isGroup")
	private String isGroup;

	@Column(name = "date")
	private String date;

	@Column(name = "name")
	private String name;

	public StarMessage() {
		super();
	}

	public String getMessageId() {
		return messageId;
	}

	public void setMessageId(String messageId) {
		this.messageId = messageId;
	}
	
	public String getSapid() {
		return sapid;
	}

	public void setSapid(String sapid) {
		this.sapid = sapid;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	public String getUserId() {
		return userId;
	}

	public void setUserId(String userId) {
		this.userId = userId;
	}

	public String getIsGroup() {
		return isGroup;
	}

	public void setIsGroup(String isGroup) {
		this.isGroup = isGroup;
	}

	public String getDate() {
		return date;
	}

	public void setDate(String date) {
		this.date = date;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	@Override
	public String toString() {
		return "StarMessage [messageId=" + messageId + ", sapid=" + sapid + ", message=" + message + ", userId="
				+ userId + ", isGroup=" + isGroup + ", date=" + date + ", name=" + name + "]";
	}
	
}
