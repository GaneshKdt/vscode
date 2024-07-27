package com.nmims.service.implementation;

import java.text.SimpleDateFormat;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.nmims.model.StarMessage;
import com.nmims.repository.StarMessageRepository;
import com.nmims.service.interfaces.StarMessageServiceInterface;

@Service
public class StarMessageService implements StarMessageServiceInterface {

	@Autowired
	StarMessageRepository starRepository;
	
	@Override
	public void starMessage(StarMessage message) throws Exception{
		// TODO Auto-generated method stub
		SimpleDateFormat parseFormat = new SimpleDateFormat("MM/dd/yyyy, hh:mm:s a");
		SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		
		message.setDate( simpleDateFormat.format( parseFormat.parse( message.getDate() ) ) );
		
		starRepository.save(message);
	}

	@Override
	public List<StarMessage> getStarMessageBySapid(String sapid) throws Exception {
		// TODO Auto-generated method stub
		List<StarMessage> messages = starRepository.findBySapid(sapid);
		return messages;
	}

	@Override
	public void unstarMessage(String messageId) throws Exception {
		// TODO Auto-generated method stub
		starRepository.deleteById(messageId);
	}

}
