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
@Table(name="exam.students")
public class Students implements Serializable{

	@Id
	@Column(name="sapid")
	private String sapid;

	@Column(name="firstName")
	private String firstName;

	@Column(name="lastName")
	private String lastName;

	@Column(name="imageUrl")
	private String imageUrl;

	@Column(name="program")
	private String program;
	
	@OneToMany(fetch = FetchType.LAZY)
	@JoinColumn(name = "id",  insertable = false, updatable = false)
	private List<Batch> batch;
	
	@OneToMany(fetch = FetchType.LAZY)
	@JoinColumn(name = "id",  insertable = false, updatable = false)
	private List<SubjectGroups> subject;

	public Students() {
		super();
	}

	public String getSapid() {
		return sapid;
	}

	public void setSapid(String sapid) {
		this.sapid = sapid;
	}

	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public String getImageUrl() {
		return imageUrl;
	}

	public void setImageUrl(String imageUrl) {
		this.imageUrl = imageUrl;
	}

	public String getProgram() {
		return program;
	}

	public void setProgram(String program) {
		this.program = program;
	}

	public List<Batch> getBatch() {
		return batch;
	}

	public void setBatch(List<Batch> batch) {
		this.batch = batch;
	}

	public List<SubjectGroups> getSubject() {
		return subject;
	}

	public void setSubject(List<SubjectGroups> subject) {
		this.subject = subject;
	}

}
