package com.nmims.service.implementation;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.nmims.bean.DashboardBean;
import com.nmims.model.ApplozicGroups;
import com.nmims.model.Batch;
import com.nmims.model.ConsumerType;
import com.nmims.model.StudentSubjectConfig;
import com.nmims.model.SubjectGroups;
import com.nmims.model.TimeboundUserMapping;
import com.nmims.repository.ApplozicGroupRepository;
import com.nmims.repository.BatchRepository;
import com.nmims.repository.ConsumerTypeRepository;
import com.nmims.repository.StudentSubjectConfigRepository;
import com.nmims.repository.SubjectGroupsRepository;
import com.nmims.repository.TimeboundUserMappingRepository;
import com.nmims.service.interfaces.DashboardServiceInterface;

@Service
public class DashboardService implements DashboardServiceInterface {

	@Autowired
	private ApplozicGroupRepository applozicGroupRepository;
	
	@Autowired
	private BatchRepository batchRepository;
	
	@Autowired
	private StudentSubjectConfigRepository studentSubjectConfigRepository;
	
	@Autowired
	private SubjectGroupsRepository subjectGroupsRepository;
	
	@Autowired
	private TimeboundUserMappingRepository timeboundUserMappingRepository;
	
	@Override
	public List<DashboardBean> getChatGroupList() {
		// TODO Auto-generated method stub
		
		List<DashboardBean> chatGroupList = new ArrayList<>();
		
		List<ApplozicGroups> applozicGroup = applozicGroupRepository.findAll();
		
		List<Batch> batchs = batchRepository.findAll();
		Map<Integer, Batch> batchMap = batchs.stream()
		         .collect(Collectors.toMap(Batch::getId, Function.identity()));
		
		List<StudentSubjectConfig> studentSubjectConfig = studentSubjectConfigRepository.findAll();
		Map<Integer, StudentSubjectConfig> studentSubjectConfigMap = studentSubjectConfig.stream()
		         .collect(Collectors.toMap(StudentSubjectConfig::getId, Function.identity()));
		
		List<SubjectGroups> subjectGroups = subjectGroupsRepository.findAllGroupByApplozicGroupId();
		Map<String, SubjectGroups> subjectGroupsMap = subjectGroups.stream()
		         .collect(Collectors.toMap(SubjectGroups::getApplozicAroupId, Function.identity()));
		
		List<TimeboundUserMapping> timeboundUserMappings = timeboundUserMappingRepository.findAll();
		Map<String, TimeboundUserMapping> timeboundUserMappingsMap = timeboundUserMappings.stream()
		         .collect(Collectors.toMap(TimeboundUserMapping::getId, Function.identity()));
		
		chatGroupList = applozicGroup.stream()
                .map(chatGroup -> {
                	DashboardBean bean = new DashboardBean();
                	
                	try {

                    	String timeboundUserMappingId = subjectGroupsMap.get( chatGroup.getId() ).getTimeboundUserMappingId();
                    	int timeboundSubjectConfigId = timeboundUserMappingsMap.get( timeboundUserMappingId ).getTimeboundSubjectConfigId();
                    	int batchId = studentSubjectConfigMap.get( timeboundSubjectConfigId ).getBatchId();
                    	
                    	bean.setChatGroupName( chatGroup.getChatGroupName() );
                    	bean.setGroupId( chatGroup.getGroupId() );
                    	bean.setSubject( subjectGroupsMap.get( chatGroup.getId() ).getSubject() );
                    	bean.setBatchName( batchMap.get( batchId ).getName() );
                    	bean.setAcadYear( studentSubjectConfigMap.get( timeboundSubjectConfigId ).getAcadMonth() );
                    	bean.setAcadMonth( studentSubjectConfigMap.get( timeboundSubjectConfigId ).getAcadYear() );
                    	
                	}catch (Exception e) {
						// TODO: handle exception
					}
                	
                	return bean;
                })
                .collect(Collectors.toList());

		return chatGroupList;
	}
	
	/*
	@Autowired
	ConsumerTypeRepository consumerTypeRepository;

	@Override
	public List<ConsumerType> getConsumerTypeList() {
		// TODO Auto-generated method stub
		
		List<ConsumerType> consumerTypeList = consumerTypeRepository.findAll();
		
		return consumerTypeList;
	}
	 */
	
}
