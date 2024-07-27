package com.nmims.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

import javax.sql.DataSource;

import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.jdbc.core.BatchPreparedStatementSetter;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.PreparedStatementCreator;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.transaction.annotation.Transactional;

import com.nmims.bean.ChatBean;
import com.nmims.bean.StudentBean;
import com.nmims.bean.SubjectGroupBean;

public class QuickBloxDao {
	
	private JdbcTemplate jdbcTemplate;

	public void setDataSource(DataSource dataSource) {
		this.jdbcTemplate = new JdbcTemplate(dataSource);
	}
	
	@Value("${TEST_USER_SAPIDS}")
	private String TEST_USER_SAPIDS;
	
	@Value( "${CURRENT_MBAWX_ACAD_MONTH}" )
	private String CURRENT_MBAWX_ACAD_MONTH;

	@Value( "${CURRENT_MBAWX_ACAD_YEAR}" )
	private String CURRENT_MBAWX_ACAD_YEAR;
	
	@Transactional(readOnly = true)
	public List<SubjectGroupBean> getActiveSubjectDetailsList() throws Exception{

		List<SubjectGroupBean> subjectDetailList = new ArrayList<SubjectGroupBean>();				
		
		String query = "SELECT  "
				+ "    ssc.id AS student_subject_config_id,tum.userId,tum.id AS timebound_user_mapping_id,pss.subject, CONCAT('T', pss.sem) AS term, COALESCE(st.specializationType, '') AS specialisation, ssc.acadYear, ssc.acadMonth, "
				+ "    COALESCE(st.specializationInitials, '') AS specialisation_initials, b.name AS batchName, COUNT(tum.userId) AS count, "
				+ "    CASE "
				+ "        WHEN LOCATE('Batch', b.name) THEN "
				+ "            REPLACE(CONCAT('B', SUBSTRING(b.name, LOCATE('Batch', b.name) + CHAR_LENGTH('Batch'), CHAR_LENGTH(b.name))), ' ', '') "
				+ "        WHEN LOCATE('Quarter', b.name) THEN "
				+ "            REPLACE(CONCAT('B', SUBSTRING(b.name, LOCATE('Quarter', b.name) + CHAR_LENGTH('Quarter'), CHAR_LENGTH(b.name))), ' ', '') "
				+ "    END AS batch "
				+ "FROM "
				+ "    lti.student_subject_config ssc "
				+ "        INNER JOIN "
				+ "    exam.program_sem_subject pss ON ssc.prgm_sem_subj_id = pss.id "
				+ "        INNER JOIN "
				+ "    lti.timebound_user_mapping tum ON ssc.id = tum.timebound_subject_config_id "
				+ "        INNER JOIN "
				+ "    exam.batch b ON b.id = ssc.batchId "
				+ "        LEFT JOIN "
				+ "    exam.specialization_type AS st ON st.id = pss.specializationType "
				+ "WHERE "
				+ "    SYSDATE() BETWEEN startDate AND endDate "
				+ "        AND ssc.acadMonth = ? "
				+ "        AND ssc.acadYear = ? "
				+ "        AND tum.role IN ('Course Coordinator') "
				+ "        AND userId NOT LIKE '777777%' "
				+ "GROUP BY ssc.id;" ;
		
		subjectDetailList = (List<SubjectGroupBean>) jdbcTemplate.query( query, new Object[] { CURRENT_MBAWX_ACAD_MONTH, CURRENT_MBAWX_ACAD_YEAR }, 
				new BeanPropertyRowMapper<>(SubjectGroupBean.class));
		
		return subjectDetailList;

	}
	
	@Transactional(readOnly = true)
	public boolean checkIfChatGroupAlreadyCreated( int studentSubjectConfigId ) throws Exception
	{
		int count=0;
		String sql =  "SELECT count(*) FROM lti.quickblox_groups where student_subject_config_id=?";
		count = (int)jdbcTemplate.queryForObject(sql, new Object[] { studentSubjectConfigId },Integer.class);
		if(count>0)
			return true;
		else
			return false;
	}
	
	@Transactional(readOnly = true)
	public List<StudentBean> getGroupMembers(int studentSubjectConfigId) throws Exception
	{	
		List<StudentBean> memberList = new ArrayList<StudentBean>();
		
		String query = "select id,userId from lti.timebound_user_mapping where timebound_subject_config_id= ? and role='Student' and userid not like '777777%'";
		
		memberList = (List<StudentBean>)jdbcTemplate.query( query, new Object[] { studentSubjectConfigId }, 
				new BeanPropertyRowMapper<>(StudentBean.class));
		
		return memberList;
		
	}
	
	@Transactional(readOnly = true)
	public List<StudentBean> getNewGroupMembers(int studentSubjectConfigId) throws Exception
	{	
		List<StudentBean> memberList = new ArrayList<StudentBean>();
		
		String query = "select id,userid from lti.timebound_user_mapping where timebound_subject_config_id=? and role='Student' and userid not like '777777%'  "
				+"and id not in(select qgm.timebound_user_mapping_id from lti.quickblox_group_members qgm inner join lti.quickblox_groups qg on qgm.quickblox_group_id=qg.id where qg.student_subject_config_id= ?) ";
		
		memberList = (List<StudentBean>)jdbcTemplate.query( query, new Object[] { studentSubjectConfigId,studentSubjectConfigId }, 
				new BeanPropertyRowMapper<>(StudentBean.class));
		
		return memberList;
	}
	
	@Transactional(readOnly = true)
	public String getFullName(String sapid) throws Exception
	{
		String fullName="";
		String query = "SELECT firstName,lastName FROM exam.students s where "
					 + "s.sapid = ?  and s.sem = (Select max(sem) from exam.students where sapid = ? )  ";
		StudentBean student=(StudentBean)jdbcTemplate.queryForObject(query, new Object[] { sapid,sapid }, new BeanPropertyRowMapper<>(StudentBean.class));
		if(!student.getLastName().equalsIgnoreCase("."))
		{
			fullName=student.getFirstName()+" "+student.getLastName();
			return fullName;
		}
		else
		{
			fullName=student.getFirstName();
			return fullName;
		}
	}
	
	@Transactional(readOnly = true)
	public String getGroupId(int studentSubjectConfigId) throws Exception
	{
		String groupId="";
		String query="select groupId from lti.quickblox_groups where student_subject_config_id=?";
		groupId=(String)jdbcTemplate.queryForObject(query, new Object[] {studentSubjectConfigId}, String.class);
		return groupId;
	}
	
	@Transactional(readOnly = false)
	public void insertUserDetails(final ArrayList<String>quickBloxUserIdsList,final ArrayList<StudentBean> sucessfullUserCreationList,final SubjectGroupBean subjectDetailBean,final int quickBloxPrimaryId) throws Exception
	{
		String sql = "INSERT INTO lti.quickblox_group_members ( timebound_user_mapping_id, quickblox_group_id, "
				+ "term, specialisation, specialisation_initials, subject, subject_initials, createdBy, "
				+ "createdDate, lastModifiedBy, lastModifiedDate,batch,quickblox_user_id) "
				+ "VALUES( ?,?,?,?,?,?,?,?,sysdate(),?,sysdate(),?,?) ";

		jdbcTemplate.batchUpdate(sql, new BatchPreparedStatementSetter() {

			@Override
			public void setValues(PreparedStatement ps, int i) throws SQLException {
				ps.setInt( 1, Integer.parseInt(sucessfullUserCreationList.get(i).getId()) );
				ps.setInt( 2, quickBloxPrimaryId);
				ps.setString( 3,subjectDetailBean.getTerm() );
				ps.setString( 4,subjectDetailBean.getSpecialisation() );
				ps.setString( 5,subjectDetailBean.getSpecialisation_initials() );
				ps.setString( 6,subjectDetailBean.getSubject() );
				ps.setString( 7,subjectDetailBean.getSubject_initials() );
				ps.setString( 8,sucessfullUserCreationList.get(i).getUserId() );
				ps.setString( 9,sucessfullUserCreationList.get(i).getUserId());
				ps.setString(10, subjectDetailBean.getBatch());
				ps.setString(11, quickBloxUserIdsList.get(i));
				
			}

			@Override
			public int getBatchSize() {
				return sucessfullUserCreationList.size();
			}
		});

	}
	
	@Transactional(readOnly = false)
	public long insertQuickBloxGroups(final String groupId,final String chatGroupName,final int studentSubjectConfigId) throws Exception
	{
		GeneratedKeyHolder holder = new GeneratedKeyHolder();
		long primaryKey = 0;

		final String sql =  "INSERT INTO lti.quickblox_groups (groupId, chat_group_name, createdBy, createdDate, lastModifiedBy, "
				+ "lastModifiedDate,student_subject_config_id) VALUES (?, ?, ?, sysdate(), ?, sysdate(),?)" ;

		jdbcTemplate.update(new PreparedStatementCreator() {

			@Override
			public PreparedStatement createPreparedStatement(Connection con) throws SQLException {
				PreparedStatement statement = con.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);

				statement.setString(1,groupId);
				statement.setString(2,chatGroupName);
				statement.setString(3, "Chat Group Creator Scheduler");
				statement.setString(4, "Chat Group Creator Scheduler");
				statement.setInt(5, studentSubjectConfigId);
				return statement;
			}

		}, holder);
		
		primaryKey = holder.getKey().longValue();
		
		return primaryKey;

	}
	
	@Transactional(readOnly = true)
	public int getQuickBloxPrimaryKey(String groupId) throws Exception
	{
		int id=0;
		String query="select id from lti.quickblox_groups where groupId=?";
		id=(int)jdbcTemplate.queryForObject(query, new Object[] {groupId}, Integer.class);
		return id;
	}
	
	@Transactional(readOnly=true)
	public boolean checkIfUserAlreadyCreated(String sapid)
	{
		int count=0;
		String sql="SELECT count(*) FROM lti.quickblox_group_members where createdBy=?";
		count = (Integer)jdbcTemplate.queryForObject(sql, new Object[] {sapid},Integer.class);
		if(count>0)
			return true;
		else
			return false;
	}
	
	@Transactional(readOnly = true)
	public String getQuickBloxUserId(String sapid)
	{
		String quickBloxId="";
		String sql="select quickblox_user_id from lti.quickblox_group_members where createdBy=? limit 1";
		quickBloxId=(String)jdbcTemplate.queryForObject(sql, new Object[] {sapid},String.class);
		return quickBloxId;
	}
	
	@Transactional(readOnly = true)
	public List<ChatBean> getContactsForChatBasedOnBatch(String sapId) {
		
		List<ChatBean> listOfContacts = new ArrayList<ChatBean>();
		try 
		{
			
			String sql = "SELECT "
					+ "    s.firstName, s.lastName, s.sapid, s.imageUrl, s.program, b.name as batch, pss.subject "
					+ "FROM "
					+ "    lti.timebound_user_mapping tum "
					+ "        INNER JOIN "
					+ "    lti.student_subject_config ssc ON tum.timebound_subject_config_id = ssc.id "
					+ "        INNER JOIN "
					+ "    exam.program_sem_subject pss ON ssc.prgm_sem_subj_id = pss.id "
					+ "        INNER JOIN "
					+ "    exam.batch b ON ssc.batchId = b.id "
					+ "        INNER JOIN "
					+ "    exam.students s ON tum.userId = s.sapid "
					+ "WHERE "
					+ "    timebound_subject_config_id IN (SELECT  "
					+ "            timebound_subject_config_id "
					+ "        FROM "
					+ "            lti.timebound_user_mapping "
					+ "        WHERE "
					+ "            userId = ?) AND tum.userId NOT IN ( ? )"
					+ "GROUP BY userId "
					+ "UNION "
					+ "SELECT  "
					+ "    'Course', 'Coordinator', userId, '', '', '', '' "
					+ "FROM "
					+ "    portal.user_authorization "
					+ "WHERE "
					+ "    userId IN (SELECT  "
					+ "            userid "
					+ "        FROM "
					+ "            lti.timebound_user_mapping "
					+ "        WHERE "
					+ "            timebound_subject_config_id IN (SELECT  "
					+ "                    timebound_subject_config_id "
					+ "                FROM "
					+ "                    lti.timebound_user_mapping "
					+ "                WHERE "
					+ "                    userId = ?) "
					+ "        GROUP BY userId)";
			
			listOfContacts=(List<ChatBean>)jdbcTemplate.query(sql, new Object[] {sapId,TEST_USER_SAPIDS,sapId} ,new BeanPropertyRowMapper<>(ChatBean.class));
			
		}
		catch (Exception e) 
		{
			e.printStackTrace();
			return null;
		}
		return listOfContacts;
	}
}
