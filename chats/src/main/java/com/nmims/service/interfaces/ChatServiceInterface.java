package com.nmims.service.interfaces;

import java.util.List;

import com.nmims.bean.ChatBean;
import com.nmims.model.Students;

public interface ChatServiceInterface {

	public List<Students> findContacBySapid( ChatBean bean ) throws Exception; 
	
}
