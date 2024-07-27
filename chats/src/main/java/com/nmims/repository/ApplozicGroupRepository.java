package com.nmims.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.nmims.model.ApplozicGroups;

@Repository
public interface ApplozicGroupRepository extends JpaRepository<ApplozicGroups, Long> {

}
