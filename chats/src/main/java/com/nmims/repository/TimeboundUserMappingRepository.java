package com.nmims.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.nmims.model.TimeboundUserMapping;

@Repository
public interface TimeboundUserMappingRepository extends JpaRepository<TimeboundUserMapping, Long>{

}
