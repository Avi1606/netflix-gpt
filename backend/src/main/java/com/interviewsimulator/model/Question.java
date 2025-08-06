package com.interviewsimulator.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.index.Indexed;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@Document(collection = "questions")
public class Question {
    
    @Id
    private String id;
    
    private String questionText;
    private String category; // TECHNICAL, BEHAVIORAL, GENERAL, SITUATIONAL
    private String subcategory; // Programming, System Design, Leadership, Problem Solving, etc.
    private String jobRole; // SOFTWARE_ENGINEER, DATA_SCIENTIST, PRODUCT_MANAGER, etc.
    private String difficulty; // EASY, MEDIUM, HARD
    private String experience; // ENTRY, MID, SENIOR
    
    @Indexed
    private List<String> tags; // java, python, leadership, communication, etc.
    
    private String expectedAnswerGuideline;
    private List<String> keyPoints; // Important points that should be covered in the answer
    private Map<String, Object> evaluationCriteria; // Scoring criteria
    
    private Integer timeLimit; // Expected answer time in seconds
    private boolean isActive = true;
    
    @CreatedDate
    private LocalDateTime createdAt;
    
    // Constructors
    public Question() {}
    
    public Question(String questionText, String category, String difficulty) {
        this.questionText = questionText;
        this.category = category;
        this.difficulty = difficulty;
        this.createdAt = LocalDateTime.now();
    }
    
    // Getters and Setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    
    public String getQuestionText() { return questionText; }
    public void setQuestionText(String questionText) { this.questionText = questionText; }
    
    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }
    
    public String getSubcategory() { return subcategory; }
    public void setSubcategory(String subcategory) { this.subcategory = subcategory; }
    
    public String getJobRole() { return jobRole; }
    public void setJobRole(String jobRole) { this.jobRole = jobRole; }
    
    public String getDifficulty() { return difficulty; }
    public void setDifficulty(String difficulty) { this.difficulty = difficulty; }
    
    public String getExperience() { return experience; }
    public void setExperience(String experience) { this.experience = experience; }
    
    public List<String> getTags() { return tags; }
    public void setTags(List<String> tags) { this.tags = tags; }
    
    public String getExpectedAnswerGuideline() { return expectedAnswerGuideline; }
    public void setExpectedAnswerGuideline(String expectedAnswerGuideline) { this.expectedAnswerGuideline = expectedAnswerGuideline; }
    
    public List<String> getKeyPoints() { return keyPoints; }
    public void setKeyPoints(List<String> keyPoints) { this.keyPoints = keyPoints; }
    
    public Map<String, Object> getEvaluationCriteria() { return evaluationCriteria; }
    public void setEvaluationCriteria(Map<String, Object> evaluationCriteria) { this.evaluationCriteria = evaluationCriteria; }
    
    public Integer getTimeLimit() { return timeLimit; }
    public void setTimeLimit(Integer timeLimit) { this.timeLimit = timeLimit; }
    
    public boolean isActive() { return isActive; }
    public void setActive(boolean active) { isActive = active; }
    
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}