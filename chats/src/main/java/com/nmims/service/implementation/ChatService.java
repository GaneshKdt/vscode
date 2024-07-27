package com.nmims.service.implementation;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.nmims.bean.ChatBean;
import com.nmims.model.Students;
import com.nmims.repository.ChatRepository;
import com.nmims.service.interfaces.ChatServiceInterface;

@Service
public class ChatService  {

	@Autowired
	ChatRepository chatRepository;

	@Value("${TEST_USER_SAPIDS}")
	private String TEST_USER_SAPIDS;
	
//	@Override
//	public List<Students> findContacBySapid(ChatBean bean) throws Exception{
//		// TODO Auto-generated method stub
//		
//		List<Students> contactList = chatRepository.findContactBySapid( bean.getUserId(), TEST_USER_SAPIDS );
//		
//		return contactList;
//	}

}
