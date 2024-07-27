package com.nmims.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="lti.student_subject_config")
public class StudentSubjectConfig {

	@Id
	@Column(name = "id")
	private int id;

	@Column(name = "batchId")
	private int batchId;

	@Column(name = "acadYear")
	private String acadYear;

	@Column(name = "acadMonth")
	private String acadMonth;

	@Column(name = "prgm_sem_subj_id")
	private String prgm_sem_subj_id;

	public StudentSubjectConfig() {
		super();
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public int getBatchId() {
		return batchId;
	}

	public void setBatchId(int batchId) {
		this.batchId = batchId;
	}

	public String getAcadYear() {
		return acadYear;
	}

	public void setAcadYear(String acadYear) {
		this.acadYear = acadYear;
	}

	public String getAcadMonth() {
		return acadMonth;
	}

	public void setAcadMonth(String acadMonth) {
		this.acadMonth = acadMonth;
	}

	public String getPrgm_sem_subj_id() {
		return prgm_sem_subj_id;
	}

	public void setPrgm_sem_subj_id(String prgm_sem_subj_id) {
		this.prgm_sem_subj_id = prgm_sem_subj_id;
	}

}
