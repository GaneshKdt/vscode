package com.nmims.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.nmims.model.SubjectGroups;

@Repository
public interface SubjectGroupsRepository extends JpaRepository<SubjectGroups, Long>{

	@Query(value = "SELECT sg FROM SubjectGroups sg GROUP BY sg.applozicAroupId")
	public List<SubjectGroups> findAllGroupByApplozicGroupId();
	
}
