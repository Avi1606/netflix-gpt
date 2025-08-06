package com.interviewsimulator.repository;

import com.interviewsimulator.model.InterviewSession;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface InterviewSessionRepository extends MongoRepository<InterviewSession, String> {
    
    List<InterviewSession> findByUserIdOrderByCreatedAtDesc(String userId);
    
    List<InterviewSession> findByUserIdAndStatus(String userId, InterviewSession.SessionStatus status);
    
    long countByUserId(String userId);
}