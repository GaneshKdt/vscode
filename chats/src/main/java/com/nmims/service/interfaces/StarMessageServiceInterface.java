package com.nmims.service.interfaces;

import java.util.List;

import com.nmims.model.StarMessage;

public interface StarMessageServiceInterface {

	public void starMessage(StarMessage message) throws Exception;
	
	public List<StarMessage> getStarMessageBySapid( String sapid )throws Exception;

	public void unstarMessage(String messageId) throws Exception;
}
