package com.nmims.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.nmims.bean.ChatBean;
import com.nmims.bean.DashboardBean;
import com.nmims.model.StarMessage;
import com.nmims.model.Students;
import com.nmims.service.implementation.ChatService;
import com.nmims.service.implementation.DashboardService;
import com.nmims.service.implementation.StarMessageService;

@RestController
@RequestMapping("m")
public class ChatRestController {

	@Autowired
	ChatService chatService;
	
	@Autowired
	StarMessageService starService;
	
	@Autowired
	DashboardService dashboardService;
	
//	@PostMapping(value = "/getContactForChat")
//	public ResponseEntity<List<Students>> getContactForChat(@RequestBody ChatBean bean){
//
//		HttpHeaders headers = new HttpHeaders();
//		headers.add("Content-Type", "application/json");
//		
//		List<Students> students = new ArrayList<>();
//		
//		try {
//			students = chatService.findContacBySapid(bean);
//			System.out.println("students: "+students.size());
//		} catch (Exception e) {
//			// TODO Auto-generated catch block
//			e.printStackTrace();
//		}
//
//		return new ResponseEntity<List<Students>>(students, headers, HttpStatus.OK);
//		
//	}

	@PostMapping(value = "/starMessage")
	public ResponseEntity<String> starMessage(@RequestBody StarMessage message){

		HttpHeaders headers = new HttpHeaders();
		headers.add("Content-Type", "application/json");
		
		try{
			starService.starMessage(message);
			return new ResponseEntity<String>("Stared message successful.", headers, HttpStatus.OK);
		}catch (Throwable throwable) {
			// TODO: handle exception
			throwable.printStackTrace();
			return new ResponseEntity<String>(throwable.getMessage(), headers, HttpStatus.OK);
		}
		
		
	}

	@PostMapping(value = "/displayStarMessage")
	public ResponseEntity<List<StarMessage>> displayStarMessage(@RequestBody StarMessage strbean) {

		HttpHeaders headers = new HttpHeaders();
		headers.add("Content-Type", "application/json");

		List<StarMessage> userList = new ArrayList<>();
		
		try {
			userList = starService.getStarMessageBySapid(strbean.getSapid());
		}catch(Throwable throwable) {
			// TODO: handle exception
			throwable.printStackTrace();
		}
		
		return new ResponseEntity<List<StarMessage>>(userList, headers, HttpStatus.OK);

	}

	@PostMapping(value = "/unstarMessage")
	public ResponseEntity<StarMessage> unstarMessage(@RequestBody StarMessage messageBean) {

		HttpHeaders headers = new HttpHeaders();
		headers.add("Content-Type", "application/json");
		
		try{
			starService.unstarMessage(messageBean.getMessageId());
			return new ResponseEntity<>(messageBean, headers, HttpStatus.OK);
		}catch(Throwable throwable) {
			// TODO: handle exception
			throwable.printStackTrace();
			return new ResponseEntity<>(messageBean, headers, HttpStatus.INTERNAL_SERVER_ERROR); 

		}
	
	}

}
