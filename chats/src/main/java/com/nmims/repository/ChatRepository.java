package com.nmims.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.nmims.model.Students;

@Repository
public interface ChatRepository extends JpaRepository<Students, Long> {

	@Query( nativeQuery = true, 
			value="SELECT  "
					+ "    s.firstName, s.lastName, s.sapId, s.imageUrl, s.program, b.name AS batch, pss.subject "
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
					+ "            userId = :userId) "
					+ "        AND tum.userId NOT IN ( :testUsers ) "
					+ "GROUP BY userId  "
					+ "UNION SELECT  "
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
					+ "                    userId = :userId ) "
					+ "        GROUP BY userId)")
	
	public List<Students> findContactBySapid( @Param(value = "userId") String userId, @Param(value = "testUsers") String testUsers );
	
}
