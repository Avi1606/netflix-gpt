package com.interviewsimulator.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.Map;

@Document(collection = "performance_metrics")
public class PerformanceMetrics {
    
    @Id
    private String id;
    
    private String userId;
    private String sessionId;
    
    // Overall performance metrics
    private Double overallScore;
    private Double technicalScore;
    private Double communicationScore;
    private Double behavioralScore;
    private Double problemSolvingScore;
    
    // Detailed analysis
    private Map<String, Double> skillScores; // e.g., "java": 85.5, "leadership": 90.0
    private Map<String, Object> emotionMetrics; // Confidence, stress, enthusiasm levels
    private Map<String, Object> speechMetrics; // Pace, clarity, filler words, etc.
    
    // Progress tracking
    private Integer totalInterviews;
    private Double averageScore;
    private Map<String, Double> improvementTrends; // Score changes over time
    
    // Comparative analysis
    private Double percentileRank; // Compared to other users
    private String experienceLevel;
    private String industryComparison;
    
    @CreatedDate
    private LocalDateTime createdAt;
    
    // Constructors
    public PerformanceMetrics() {}
    
    public PerformanceMetrics(String userId, String sessionId) {
        this.userId = userId;
        this.sessionId = sessionId;
        this.createdAt = LocalDateTime.now();
    }
    
    // Getters and Setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    
    public String getUserId() { return userId; }
    public void setUserId(String userId) { this.userId = userId; }
    
    public String getSessionId() { return sessionId; }
    public void setSessionId(String sessionId) { this.sessionId = sessionId; }
    
    public Double getOverallScore() { return overallScore; }
    public void setOverallScore(Double overallScore) { this.overallScore = overallScore; }
    
    public Double getTechnicalScore() { return technicalScore; }
    public void setTechnicalScore(Double technicalScore) { this.technicalScore = technicalScore; }
    
    public Double getCommunicationScore() { return communicationScore; }
    public void setCommunicationScore(Double communicationScore) { this.communicationScore = communicationScore; }
    
    public Double getBehavioralScore() { return behavioralScore; }
    public void setBehavioralScore(Double behavioralScore) { this.behavioralScore = behavioralScore; }
    
    public Double getProblemSolvingScore() { return problemSolvingScore; }
    public void setProblemSolvingScore(Double problemSolvingScore) { this.problemSolvingScore = problemSolvingScore; }
    
    public Map<String, Double> getSkillScores() { return skillScores; }
    public void setSkillScores(Map<String, Double> skillScores) { this.skillScores = skillScores; }
    
    public Map<String, Object> getEmotionMetrics() { return emotionMetrics; }
    public void setEmotionMetrics(Map<String, Object> emotionMetrics) { this.emotionMetrics = emotionMetrics; }
    
    public Map<String, Object> getSpeechMetrics() { return speechMetrics; }
    public void setSpeechMetrics(Map<String, Object> speechMetrics) { this.speechMetrics = speechMetrics; }
    
    public Integer getTotalInterviews() { return totalInterviews; }
    public void setTotalInterviews(Integer totalInterviews) { this.totalInterviews = totalInterviews; }
    
    public Double getAverageScore() { return averageScore; }
    public void setAverageScore(Double averageScore) { this.averageScore = averageScore; }
    
    public Map<String, Double> getImprovementTrends() { return improvementTrends; }
    public void setImprovementTrends(Map<String, Double> improvementTrends) { this.improvementTrends = improvementTrends; }
    
    public Double getPercentileRank() { return percentileRank; }
    public void setPercentileRank(Double percentileRank) { this.percentileRank = percentileRank; }
    
    public String getExperienceLevel() { return experienceLevel; }
    public void setExperienceLevel(String experienceLevel) { this.experienceLevel = experienceLevel; }
    
    public String getIndustryComparison() { return industryComparison; }
    public void setIndustryComparison(String industryComparison) { this.industryComparison = industryComparison; }
    
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}