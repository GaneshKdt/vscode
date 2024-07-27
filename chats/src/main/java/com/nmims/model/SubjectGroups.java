package com.nmims.model;

import java.io.Serializable;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;

@Entity
@Table(name="lti.subject_groups")
public class SubjectGroups implements Serializable{

	@Id
	@Column(name = "id")
	private String id;
	
	@Column(name = "subject")
	private String subject;

	@Column(name = "applozic_group_id")
	private String applozicAroupId;

	@Column(name = "timebound_user_mapping_id")
	private String timeboundUserMappingId;

	public SubjectGroups() {
		super();
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getSubject() {
		return subject;
	}

	public void setSubject(String subject) {
		this.subject = subject;
	}

	public String getApplozicAroupId() {
		return applozicAroupId;
	}

	public void setApplozicAroupId(String applozicAroupId) {
		this.applozicAroupId = applozicAroupId;
	}

	public String getTimeboundUserMappingId() {
		return timeboundUserMappingId;
	}

	public void setTimeboundUserMappingId(String timeboundUserMappingId) {
		this.timeboundUserMappingId = timeboundUserMappingId;
	}

}
