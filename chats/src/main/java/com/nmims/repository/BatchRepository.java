package com.nmims.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.nmims.model.Batch;

@Repository
public interface BatchRepository extends JpaRepository<Batch, Long>{

}
