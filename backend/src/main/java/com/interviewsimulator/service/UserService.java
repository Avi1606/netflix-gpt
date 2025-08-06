package com.interviewsimulator.service;

import com.interviewsimulator.dto.UserProfileResponse;
import com.interviewsimulator.model.User;
import com.interviewsimulator.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class UserService {
    
    @Autowired
    private UserRepository userRepository;
    
    public UserProfileResponse getCurrentUserProfile() {
        String email = getCurrentUserEmail();
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
        
        return convertToUserProfileResponse(user);
    }
    
    public UserProfileResponse updateUserProfile(UserProfileResponse profileUpdate) {
        String email = getCurrentUserEmail();
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
        
        // Update user fields
        if (profileUpdate.getFirstName() != null) {
            user.setFirstName(profileUpdate.getFirstName());
        }
        if (profileUpdate.getLastName() != null) {
            user.setLastName(profileUpdate.getLastName());
        }
        if (profileUpdate.getPhoneNumber() != null) {
            user.setPhoneNumber(profileUpdate.getPhoneNumber());
        }
        if (profileUpdate.getCompany() != null) {
            user.setCompany(profileUpdate.getCompany());
        }
        if (profileUpdate.getPosition() != null) {
            user.setPosition(profileUpdate.getPosition());
        }
        if (profileUpdate.getExperienceYears() != null) {
            user.setExperienceYears(profileUpdate.getExperienceYears());
        }
        if (profileUpdate.getSkills() != null) {
            user.setSkills(profileUpdate.getSkills());
        }
        if (profileUpdate.getBio() != null) {
            user.setBio(profileUpdate.getBio());
        }
        if (profileUpdate.getProfilePictureUrl() != null) {
            user.setProfilePictureUrl(profileUpdate.getProfilePictureUrl());
        }
        
        user.setUpdatedAt(LocalDateTime.now());
        User updatedUser = userRepository.save(user);
        
        return convertToUserProfileResponse(updatedUser);
    }
    
    private String getCurrentUserEmail() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return authentication.getName();
    }
    
    private UserProfileResponse convertToUserProfileResponse(User user) {
        UserProfileResponse response = new UserProfileResponse();
        response.setId(user.getId());
        response.setFirstName(user.getFirstName());
        response.setLastName(user.getLastName());
        response.setEmail(user.getEmail());
        response.setPhoneNumber(user.getPhoneNumber());
        response.setProfilePictureUrl(user.getProfilePictureUrl());
        response.setCompany(user.getCompany());
        response.setPosition(user.getPosition());
        response.setExperienceYears(user.getExperienceYears());
        response.setSkills(user.getSkills());
        response.setBio(user.getBio());
        response.setEmailVerified(user.isEmailVerified());
        response.setCreatedAt(user.getCreatedAt());
        return response;
    }
}