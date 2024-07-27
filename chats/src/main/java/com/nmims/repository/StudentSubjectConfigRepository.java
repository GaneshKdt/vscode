package com.nmims.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.nmims.model.StudentSubjectConfig;

@Repository
public interface StudentSubjectConfigRepository extends JpaRepository<StudentSubjectConfig, Long>{

}
