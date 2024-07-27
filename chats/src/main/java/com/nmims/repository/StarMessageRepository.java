package com.nmims.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.nmims.model.StarMessage;

@Repository
public interface StarMessageRepository extends JpaRepository<StarMessage, String> {

	public List<StarMessage> findBySapid(String sapid);
	
}
