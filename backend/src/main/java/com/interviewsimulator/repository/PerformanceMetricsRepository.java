package com.interviewsimulator.repository;

import com.interviewsimulator.model.PerformanceMetrics;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PerformanceMetricsRepository extends MongoRepository<PerformanceMetrics, String> {
    
    List<PerformanceMetrics> findByUserIdOrderByCreatedAtDesc(String userId);
    
    Optional<PerformanceMetrics> findBySessionId(String sessionId);
    
    List<PerformanceMetrics> findByUserIdAndExperienceLevel(String userId, String experienceLevel);
}