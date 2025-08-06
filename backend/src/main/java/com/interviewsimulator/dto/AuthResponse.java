package com.interviewsimulator.dto;

public class AuthResponse {
    
    private String token;
    private String refreshToken;
    private String type = "Bearer";
    private UserProfileResponse user;
    
    // Constructors
    public AuthResponse() {}
    
    public AuthResponse(String token, String refreshToken, UserProfileResponse user) {
        this.token = token;
        this.refreshToken = refreshToken;
        this.user = user;
    }
    
    // Getters and Setters
    public String getToken() { return token; }
    public void setToken(String token) { this.token = token; }
    
    public String getRefreshToken() { return refreshToken; }
    public void setRefreshToken(String refreshToken) { this.refreshToken = refreshToken; }
    
    public String getType() { return type; }
    public void setType(String type) { this.type = type; }
    
    public UserProfileResponse getUser() { return user; }
    public void setUser(UserProfileResponse user) { this.user = user; }
}