# Job Interview Simulator Repository Template

This document provides a complete template structure for creating a dedicated Job Interview Simulator repository.

## Repository Setup

### 1. Repository Creation
```bash
# Create new repository on GitHub
# Repository name: job-interview-simulator or ai-interview-coach
# Description: "AI-powered job interview simulator with emotion recognition and real-time feedback"
# Topics: interview, ai, react, springboot, mongodb, emotion-ai, career, job-preparation
```

### 2. Initial Repository Structure

```
job-interview-simulator/
├── .github/
│   ├── workflows/
│   │   ├── frontend-ci.yml
│   │   ├── backend-ci.yml
│   │   └── deploy.yml
│   ├── ISSUE_TEMPLATE/
│   │   ├── bug_report.md
│   │   ├── feature_request.md
│   │   └── question.md
│   └── pull_request_template.md
├── frontend/
│   ├── public/
│   │   ├── favicon.ico
│   │   ├── index.html
│   │   └── manifest.json
│   ├── src/
│   │   ├── components/
│   │   │   ├── interview/
│   │   │   │   ├── InterviewRoom.jsx
│   │   │   │   ├── VideoRecorder.jsx
│   │   │   │   ├── QuestionDisplay.jsx
│   │   │   │   ├── TimerComponent.jsx
│   │   │   │   └── EmotionAnalysis.jsx
│   │   │   ├── questions/
│   │   │   │   ├── QuestionManager.jsx
│   │   │   │   ├── QuestionBank.jsx
│   │   │   │   ├── QuestionEditor.jsx
│   │   │   │   └── CategoryFilter.jsx
│   │   │   ├── auth/
│   │   │   │   ├── Login.jsx
│   │   │   │   ├── Register.jsx
│   │   │   │   ├── Profile.jsx
│   │   │   │   └── ProtectedRoute.jsx
│   │   │   ├── dashboard/
│   │   │   │   ├── Dashboard.jsx
│   │   │   │   ├── InterviewHistory.jsx
│   │   │   │   ├── PerformanceAnalytics.jsx
│   │   │   │   └── ProgressTracker.jsx
│   │   │   ├── feedback/
│   │   │   │   ├── FeedbackSummary.jsx
│   │   │   │   ├── EmotionReport.jsx
│   │   │   │   ├── SpeechAnalysis.jsx
│   │   │   │   └── ImprovementSuggestions.jsx
│   │   │   └── common/
│   │   │       ├── Header.jsx
│   │   │       ├── Sidebar.jsx
│   │   │       ├── LoadingSpinner.jsx
│   │   │       └── ErrorBoundary.jsx
│   │   ├── pages/
│   │   │   ├── HomePage.jsx
│   │   │   ├── InterviewPage.jsx
│   │   │   ├── DashboardPage.jsx
│   │   │   ├── QuestionsPage.jsx
│   │   │   └── AnalyticsPage.jsx
│   │   ├── hooks/
│   │   │   ├── useAuth.js
│   │   │   ├── useInterview.js
│   │   │   ├── useRecording.js
│   │   │   ├── useEmotionAnalysis.js
│   │   │   └── useQuestions.js
│   │   ├── services/
│   │   │   ├── api.js
│   │   │   ├── authService.js
│   │   │   ├── interviewService.js
│   │   │   ├── questionsService.js
│   │   │   ├── emotionService.js
│   │   │   └── recordingService.js
│   │   ├── context/
│   │   │   ├── AuthContext.jsx
│   │   │   ├── InterviewContext.jsx
│   │   │   └── ThemeContext.jsx
│   │   ├── utils/
│   │   │   ├── constants.js
│   │   │   ├── helpers.js
│   │   │   ├── validation.js
│   │   │   └── dateUtils.js
│   │   ├── styles/
│   │   │   ├── globals.css
│   │   │   ├── components.css
│   │   │   └── animations.css
│   │   ├── assets/
│   │   │   ├── images/
│   │   │   ├── icons/
│   │   │   └── sounds/
│   │   ├── App.jsx
│   │   ├── index.js
│   │   └── setupTests.js
│   ├── package.json
│   ├── tailwind.config.js
│   ├── vite.config.js
│   ├── .env.example
│   └── README.md
├── backend/
│   ├── src/
│   │   └── main/
│   │       ├── java/
│   │       │   └── com/
│   │       │       └── interviewsimulator/
│   │       │           ├── InterviewSimulatorApplication.java
│   │       │           ├── controller/
│   │       │           │   ├── AuthController.java
│   │       │           │   ├── InterviewController.java
│   │       │           │   ├── QuestionController.java
│   │       │           │   ├── UserController.java
│   │       │           │   ├── AnalyticsController.java
│   │       │           │   └── FileUploadController.java
│   │       │           ├── service/
│   │       │           │   ├── AuthService.java
│   │       │           │   ├── InterviewService.java
│   │       │           │   ├── QuestionService.java
│   │       │           │   ├── UserService.java
│   │       │           │   ├── EmotionAnalysisService.java
│   │       │           │   ├── VideoProcessingService.java
│   │       │           │   └── EmailService.java
│   │       │           ├── repository/
│   │       │           │   ├── UserRepository.java
│   │       │           │   ├── InterviewRepository.java
│   │       │           │   ├── QuestionRepository.java
│   │       │           │   ├── FeedbackRepository.java
│   │       │           │   └── AnalyticsRepository.java
│   │       │           ├── model/
│   │       │           │   ├── User.java
│   │       │           │   ├── Interview.java
│   │       │           │   ├── Question.java
│   │       │           │   ├── Feedback.java
│   │       │           │   ├── EmotionData.java
│   │       │           │   └── Analytics.java
│   │       │           ├── dto/
│   │       │           │   ├── UserDTO.java
│   │       │           │   ├── InterviewDTO.java
│   │       │           │   ├── QuestionDTO.java
│   │       │           │   ├── FeedbackDTO.java
│   │       │           │   └── AnalyticsDTO.java
│   │       │           ├── config/
│   │       │           │   ├── WebConfig.java
│   │       │           │   ├── MongoConfig.java
│   │       │           │   ├── SecurityConfig.java
│   │       │           │   └── EmailConfig.java
│   │       │           ├── security/
│   │       │           │   ├── JwtAuthenticationFilter.java
│   │       │           │   ├── JwtTokenProvider.java
│   │       │           │   ├── UserPrincipal.java
│   │       │           │   └── CustomUserDetailsService.java
│   │       │           └── exception/
│   │       │               ├── GlobalExceptionHandler.java
│   │       │               ├── ResourceNotFoundException.java
│   │       │               └── BadRequestException.java
│   │       └── resources/
│   │           ├── application.yml
│   │           ├── application-dev.yml
│   │           ├── application-prod.yml
│   │           └── static/
│   ├── pom.xml
│   └── README.md
├── docs/
│   ├── API.md
│   ├── SETUP.md
│   ├── DEPLOYMENT.md
│   ├── ARCHITECTURE.md
│   ├── USER_GUIDE.md
│   └── images/
├── scripts/
│   ├── build.sh
│   ├── deploy.sh
│   ├── test.sh
│   └── backup.sh
├── .gitignore
├── README.md
├── LICENSE
├── CONTRIBUTING.md
├── CODE_OF_CONDUCT.md
└── CHANGELOG.md
```

## Configuration Files

### Frontend package.json
```json
{
  "name": "job-interview-simulator-frontend",
  "version": "1.0.0",
  "description": "Frontend for AI-powered job interview simulator",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "test": "vitest",
    "preview": "vite preview",
    "lint": "eslint src --ext js,jsx,ts,tsx"
  },
  "dependencies": {
    "react": "^18.0.0",
    "react-dom": "^18.0.0",
    "react-router-dom": "^6.0.0",
    "@reduxjs/toolkit": "^1.9.0",
    "react-redux": "^8.0.0",
    "axios": "^1.0.0",
    "tailwindcss": "^3.0.0",
    "@headlessui/react": "^1.7.0",
    "@heroicons/react": "^2.0.0",
    "framer-motion": "^10.0.0",
    "react-webcam": "^7.0.0",
    "recordrtc": "^5.6.0",
    "chart.js": "^4.0.0",
    "react-chartjs-2": "^5.0.0"
  }
}
```

### Backend pom.xml (excerpt)
```xml
<groupId>com.interviewsimulator</groupId>
<artifactId>interview-simulator-backend</artifactId>
<version>1.0.0</version>
<packaging>jar</packaging>

<dependencies>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-web</artifactId>
    </dependency>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-data-mongodb</artifactId>
    </dependency>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-security</artifactId>
    </dependency>
    <dependency>
        <groupId>io.jsonwebtoken</groupId>
        <artifactId>jjwt</artifactId>
    </dependency>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-mail</artifactId>
    </dependency>
</dependencies>
```

## Environment Configuration

### Frontend .env.example
```
VITE_API_BASE_URL=http://localhost:8080/api
VITE_EMOTION_API_KEY=your_emotion_api_key
VITE_FIREBASE_API_KEY=your_firebase_key
VITE_FIREBASE_AUTH_DOMAIN=your_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_AWS_S3_BUCKET=your_s3_bucket
VITE_AWS_REGION=your_aws_region
```

### Backend application.yml
```yaml
server:
  port: 8080

spring:
  data:
    mongodb:
      uri: ${MONGODB_URI:mongodb://localhost:27017/interview_simulator}
  
  mail:
    host: ${MAIL_HOST:smtp.gmail.com}
    port: ${MAIL_PORT:587}
    username: ${MAIL_USERNAME}
    password: ${MAIL_PASSWORD}

jwt:
  secret: ${JWT_SECRET}
  expiration: 86400

aws:
  s3:
    bucket: ${AWS_S3_BUCKET}
    region: ${AWS_REGION}
  
emotion:
  api:
    key: ${EMOTION_API_KEY}
    url: ${EMOTION_API_URL}
```

## Documentation Template

### Main README.md
```markdown
# Job Interview Simulator with Emotion AI

An AI-powered job interview simulator that provides real-time emotion analysis and personalized feedback to help candidates improve their interview skills.

## Features
- Live video interviews with AI feedback
- Emotion recognition and analysis
- Question bank management
- Performance analytics
- Progress tracking
- Multi-category interview preparation

## Tech Stack
- Frontend: React, Tailwind CSS, Vite
- Backend: Spring Boot, MongoDB
- AI: Emotion recognition APIs
- Storage: AWS S3
- Authentication: JWT + Spring Security

## Quick Start
[Installation and setup instructions]

## Documentation
- [API Documentation](docs/API.md)
- [Setup Guide](docs/SETUP.md)
- [Architecture Overview](docs/ARCHITECTURE.md)
- [User Guide](docs/USER_GUIDE.md)
```

## Migration Checklist

When creating the new repository:
- [ ] Set up repository with proper name and description
- [ ] Create initial directory structure
- [ ] Copy relevant code from netflix-gpt
- [ ] Update all import paths and references
- [ ] Configure package.json and pom.xml
- [ ] Set up environment variables
- [ ] Create comprehensive documentation
- [ ] Set up CI/CD pipelines
- [ ] Configure deployment
- [ ] Test all functionality
- [ ] Remove code from netflix-gpt repository

---

*This template provides a complete foundation for the Job Interview Simulator project migration.*