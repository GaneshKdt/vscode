package com.nmims.bean;

public class ChatBean{
	
	String firstName;
	String lastName;
	String sapid;
	String imageUrl;
	String program;
	String batch;
	String subject;
	
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

	public String getSapid() {
		return sapid;
	}

	public void setSapid(String sapid) {
		this.sapid = sapid;
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

	public String getBatch() {
		return batch;
	}

	public void setBatch(String batch) {
		this.batch = batch;
	}

	public String getSubject() {
		return subject;
	}

	public void setSubject(String subject) {
		this.subject = subject;
	}

	@Override
	public String toString() {
		return "ChatBean [firstName=" + firstName + ", lastName=" + lastName + ", sapid=" + sapid + ", imageUrl="
				+ imageUrl + ", program=" + program + ", batch=" + batch + ", subject=" + subject + "]";
	}
	
}
