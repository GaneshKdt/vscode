package com.nmims.controller;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

import com.nmims.bean.DashboardBean;
import com.nmims.service.implementation.DashboardService;

@Controller
public class DashboardController {

	@Autowired
	DashboardService dashboardService;

	@RequestMapping(value = "/broadcast", method = {RequestMethod.GET, RequestMethod.POST})
	public ModelAndView searchUser(HttpServletRequest request, HttpServletResponse response) {
		
		ModelAndView modelAndView = new ModelAndView("broadcast");

		List<DashboardBean> chatGroupList = dashboardService.getChatGroupList();

		modelAndView.addObject("chatbean", new DashboardBean() );
		modelAndView.addObject("chatGroupList", chatGroupList);
		return modelAndView;
		
	}
	
	
}
