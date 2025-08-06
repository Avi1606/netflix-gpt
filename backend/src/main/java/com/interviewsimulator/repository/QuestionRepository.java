package com.interviewsimulator.repository;

import com.interviewsimulator.model.Question;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface QuestionRepository extends MongoRepository<Question, String> {
    
    List<Question> findByCategoryAndDifficultyAndIsActiveTrue(String category, String difficulty);
    
    List<Question> findByJobRoleAndExperienceAndIsActiveTrue(String jobRole, String experience);
    
    List<Question> findByTagsContainingAndIsActiveTrue(String tag);
    
    List<Question> findByIsActiveTrueOrderByCreatedAtDesc();
}