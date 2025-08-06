package com.interviewsimulator.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@Document(collection = "interview_sessions")
public class InterviewSession {
    
    @Id
    private String id;
    
    private String userId;
    private String interviewType; // TECHNICAL, BEHAVIORAL, GENERAL, CUSTOM
    private String jobRole;
    private String experience; // ENTRY, MID, SENIOR
    private String difficulty; // EASY, MEDIUM, HARD
    
    private SessionStatus status; // SCHEDULED, IN_PROGRESS, COMPLETED, CANCELLED
    
    private LocalDateTime scheduledAt;
    private LocalDateTime startedAt;
    private LocalDateTime completedAt;
    
    private Integer durationMinutes;
    private List<String> questionIds;
    private List<InterviewResponse> responses;
    
    // Performance metrics
    private Double overallScore;
    private Map<String, Double> categoryScores; // e.g., "technical": 85.5, "communication": 90.0
    private Map<String, Object> emotionAnalysis;
    private Map<String, Object> speechAnalysis;
    
    private String feedback;
    private List<String> strengths;
    private List<String> improvementAreas;
    private List<String> recommendations;
    
    @CreatedDate
    private LocalDateTime createdAt;
    
    // Constructors
    public InterviewSession() {}
    
    public InterviewSession(String userId, String interviewType, String jobRole) {
        this.userId = userId;
        this.interviewType = interviewType;
        this.jobRole = jobRole;
        this.status = SessionStatus.SCHEDULED;
        this.createdAt = LocalDateTime.now();
    }
    
    // Getters and Setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    
    public String getUserId() { return userId; }
    public void setUserId(String userId) { this.userId = userId; }
    
    public String getInterviewType() { return interviewType; }
    public void setInterviewType(String interviewType) { this.interviewType = interviewType; }
    
    public String getJobRole() { return jobRole; }
    public void setJobRole(String jobRole) { this.jobRole = jobRole; }
    
    public String getExperience() { return experience; }
    public void setExperience(String experience) { this.experience = experience; }
    
    public String getDifficulty() { return difficulty; }
    public void setDifficulty(String difficulty) { this.difficulty = difficulty; }
    
    public SessionStatus getStatus() { return status; }
    public void setStatus(SessionStatus status) { this.status = status; }
    
    public LocalDateTime getScheduledAt() { return scheduledAt; }
    public void setScheduledAt(LocalDateTime scheduledAt) { this.scheduledAt = scheduledAt; }
    
    public LocalDateTime getStartedAt() { return startedAt; }
    public void setStartedAt(LocalDateTime startedAt) { this.startedAt = startedAt; }
    
    public LocalDateTime getCompletedAt() { return completedAt; }
    public void setCompletedAt(LocalDateTime completedAt) { this.completedAt = completedAt; }
    
    public Integer getDurationMinutes() { return durationMinutes; }
    public void setDurationMinutes(Integer durationMinutes) { this.durationMinutes = durationMinutes; }
    
    public List<String> getQuestionIds() { return questionIds; }
    public void setQuestionIds(List<String> questionIds) { this.questionIds = questionIds; }
    
    public List<InterviewResponse> getResponses() { return responses; }
    public void setResponses(List<InterviewResponse> responses) { this.responses = responses; }
    
    public Double getOverallScore() { return overallScore; }
    public void setOverallScore(Double overallScore) { this.overallScore = overallScore; }
    
    public Map<String, Double> getCategoryScores() { return categoryScores; }
    public void setCategoryScores(Map<String, Double> categoryScores) { this.categoryScores = categoryScores; }
    
    public Map<String, Object> getEmotionAnalysis() { return emotionAnalysis; }
    public void setEmotionAnalysis(Map<String, Object> emotionAnalysis) { this.emotionAnalysis = emotionAnalysis; }
    
    public Map<String, Object> getSpeechAnalysis() { return speechAnalysis; }
    public void setSpeechAnalysis(Map<String, Object> speechAnalysis) { this.speechAnalysis = speechAnalysis; }
    
    public String getFeedback() { return feedback; }
    public void setFeedback(String feedback) { this.feedback = feedback; }
    
    public List<String> getStrengths() { return strengths; }
    public void setStrengths(List<String> strengths) { this.strengths = strengths; }
    
    public List<String> getImprovementAreas() { return improvementAreas; }
    public void setImprovementAreas(List<String> improvementAreas) { this.improvementAreas = improvementAreas; }
    
    public List<String> getRecommendations() { return recommendations; }
    public void setRecommendations(List<String> recommendations) { this.recommendations = recommendations; }
    
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
    
    public enum SessionStatus {
        SCHEDULED, IN_PROGRESS, COMPLETED, CANCELLED
    }
    
    public static class InterviewResponse {
        private String questionId;
        private String answer;
        private String audioUrl;
        private String videoUrl;
        private Integer responseTimeSeconds;
        private Double confidenceScore;
        private Map<String, Object> emotionData;
        private LocalDateTime answeredAt;
        
        // Constructors
        public InterviewResponse() {}
        
        public InterviewResponse(String questionId, String answer) {
            this.questionId = questionId;
            this.answer = answer;
            this.answeredAt = LocalDateTime.now();
        }
        
        // Getters and Setters
        public String getQuestionId() { return questionId; }
        public void setQuestionId(String questionId) { this.questionId = questionId; }
        
        public String getAnswer() { return answer; }
        public void setAnswer(String answer) { this.answer = answer; }
        
        public String getAudioUrl() { return audioUrl; }
        public void setAudioUrl(String audioUrl) { this.audioUrl = audioUrl; }
        
        public String getVideoUrl() { return videoUrl; }
        public void setVideoUrl(String videoUrl) { this.videoUrl = videoUrl; }
        
        public Integer getResponseTimeSeconds() { return responseTimeSeconds; }
        public void setResponseTimeSeconds(Integer responseTimeSeconds) { this.responseTimeSeconds = responseTimeSeconds; }
        
        public Double getConfidenceScore() { return confidenceScore; }
        public void setConfidenceScore(Double confidenceScore) { this.confidenceScore = confidenceScore; }
        
        public Map<String, Object> getEmotionData() { return emotionData; }
        public void setEmotionData(Map<String, Object> emotionData) { this.emotionData = emotionData; }
        
        public LocalDateTime getAnsweredAt() { return answeredAt; }
        public void setAnsweredAt(LocalDateTime answeredAt) { this.answeredAt = answeredAt; }
    }
}