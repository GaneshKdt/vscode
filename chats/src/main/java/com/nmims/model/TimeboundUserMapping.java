package com.nmims.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="lti.timebound_user_mapping")
public class TimeboundUserMapping {

	@Id
	@Column(name = "id")
	private String id;

	@Column(name = "timebound_subject_config_id")
	private int timeboundSubjectConfigId;

	public TimeboundUserMapping() {
		super();
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public int getTimeboundSubjectConfigId() {
		return timeboundSubjectConfigId;
	}

	public void setTimeboundSubjectConfigId(int timeboundSubjectConfigId) {
		this.timeboundSubjectConfigId = timeboundSubjectConfigId;
	}

}
