package com.nmims.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "exam.consumer_type")
public class ConsumerType {

	@Id
	@Column(name = "id")
	private Integer id;

	@Column(name = "name")
	private String name;

	@Column(name = "isCorporate")
	private String isCorporate;

	@Column(name = "created_by")
	private String createdBy;

	@Column(name = "lastModifiedBy")
	private String lastModifiedBy;

	@Column(name = "created_at")
	private String createdAt;

	@Column(name = "updated_at")
	private String updatedAt;

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getIsCorporate() {
		return isCorporate;
	}

	public void setIsCorporate(String isCorporate) {
		this.isCorporate = isCorporate;
	}

	public String getCreatedBy() {
		return createdBy;
	}

	public void setCreatedBy(String createdBy) {
		this.createdBy = createdBy;
	}

	public String getLastModifiedBy() {
		return lastModifiedBy;
	}

	public void setLastModifiedBy(String lastModifiedBy) {
		this.lastModifiedBy = lastModifiedBy;
	}

	public String getCreatedAt() {
		return createdAt;
	}

	public void setCreatedAt(String createdAt) {
		this.createdAt = createdAt;
	}

	public String getUpdatedAt() {
		return updatedAt;
	}

	public void setUpdatedAt(String updatedAt) {
		this.updatedAt = updatedAt;
	}

	@Override
	public String toString() {
		return "ConsumerType [id=" + id + ", name=" + name + ", isCorporate=" + isCorporate + ", createdBy=" + createdBy
				+ ", lastModifiedBy=" + lastModifiedBy + ", createdAt=" + createdAt + ", updatedAt=" + updatedAt + "]";
	}
	
}
