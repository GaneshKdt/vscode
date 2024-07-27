package com.nmims.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.nmims.model.ConsumerType;

@Repository
public interface ConsumerTypeRepository extends JpaRepository<ConsumerType, Integer> {

}
