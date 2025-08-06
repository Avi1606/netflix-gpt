# Environment Configuration Template

This file provides templates for environment configuration files that would be needed for different project types.

## Netflix GPT Environment (.env.example)

```env
# OpenAI Configuration
VITE_OPENAI_API_KEY=your_openai_api_key_here

# Firebase Configuration
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=your-app-id

# TMDB API (for movie data)
VITE_TMDB_API_KEY=your_tmdb_api_key
VITE_TMDB_BASE_URL=https://api.themoviedb.org/3

# Application Configuration
VITE_APP_NAME=NetflixGPT
VITE_APP_VERSION=1.0.0
VITE_API_BASE_URL=http://localhost:3000

# Development
VITE_DEBUG_MODE=true
VITE_LOG_LEVEL=debug
```

## Job Interview Simulator Environment (.env.example)

```env
# Application Configuration
VITE_APP_NAME=Job Interview Simulator
VITE_APP_VERSION=1.0.0
VITE_API_BASE_URL=http://localhost:8080/api

# Authentication
VITE_JWT_SECRET=your_jwt_secret_key
VITE_JWT_EXPIRATION=86400

# Firebase Configuration (if using Firebase Auth)
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=interview-sim.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=interview-simulator
VITE_FIREBASE_STORAGE_BUCKET=interview-sim.appspot.com

# MongoDB Configuration
VITE_MONGODB_URI=mongodb://localhost:27017/interview_simulator
VITE_MONGODB_DATABASE=interview_simulator

# AWS S3 Configuration (for video storage)
VITE_AWS_ACCESS_KEY_ID=your_aws_access_key
VITE_AWS_SECRET_ACCESS_KEY=your_aws_secret_key
VITE_AWS_S3_BUCKET=interview-recordings
VITE_AWS_REGION=us-east-1

# Emotion Recognition API
VITE_EMOTION_API_KEY=your_emotion_api_key
VITE_EMOTION_API_URL=https://api.emotionrecognition.com/v1
VITE_EMOTION_PROVIDER=azure_cognitive_services

# Video Recording Configuration
VITE_MAX_RECORDING_DURATION=300000
VITE_VIDEO_QUALITY=720p
VITE_AUDIO_QUALITY=high

# Email Configuration (for notifications)
VITE_MAIL_HOST=smtp.gmail.com
VITE_MAIL_PORT=587
VITE_MAIL_USERNAME=your_email@gmail.com
VITE_MAIL_PASSWORD=your_app_password

# Analytics
VITE_GOOGLE_ANALYTICS_ID=GA-XXXXXXXX
VITE_MIXPANEL_TOKEN=your_mixpanel_token

# Development Configuration
VITE_DEBUG_MODE=true
VITE_LOG_LEVEL=debug
VITE_ENABLE_MOCK_DATA=false
```

## Backend Spring Boot Configuration (application.yml template)

```yaml
# Netflix GPT Backend (if needed)
server:
  port: 8080
  servlet:
    context-path: /api

spring:
  application:
    name: netflix-gpt-backend
  
  datasource:
    url: ${DATABASE_URL:jdbc:h2:mem:testdb}
    username: ${DATABASE_USERNAME:sa}
    password: ${DATABASE_PASSWORD:password}
  
  jpa:
    hibernate:
      ddl-auto: update
    show-sql: ${SHOW_SQL:false}

openai:
  api:
    key: ${OPENAI_API_KEY}
    url: https://api.openai.com/v1

tmdb:
  api:
    key: ${TMDB_API_KEY}
    url: https://api.themoviedb.org/3

logging:
  level:
    com.netflixgpt: ${LOG_LEVEL:INFO}
```

```yaml
# Job Interview Simulator Backend
server:
  port: 8080
  servlet:
    context-path: /api

spring:
  application:
    name: interview-simulator-backend
  
  data:
    mongodb:
      uri: ${MONGODB_URI:mongodb://localhost:27017/interview_simulator}
      database: ${MONGODB_DATABASE:interview_simulator}
  
  servlet:
    multipart:
      max-file-size: 100MB
      max-request-size: 100MB
  
  mail:
    host: ${MAIL_HOST:smtp.gmail.com}
    port: ${MAIL_PORT:587}
    username: ${MAIL_USERNAME}
    password: ${MAIL_PASSWORD}
    properties:
      mail:
        smtp:
          auth: true
          starttls:
            enable: true

jwt:
  secret: ${JWT_SECRET}
  expiration: ${JWT_EXPIRATION:86400}

aws:
  credentials:
    access-key: ${AWS_ACCESS_KEY_ID}
    secret-key: ${AWS_SECRET_ACCESS_KEY}
  s3:
    bucket: ${AWS_S3_BUCKET}
    region: ${AWS_REGION:us-east-1}

emotion:
  api:
    key: ${EMOTION_API_KEY}
    url: ${EMOTION_API_URL}
    provider: ${EMOTION_PROVIDER:azure_cognitive_services}

recording:
  max-duration: ${MAX_RECORDING_DURATION:300000}
  video-quality: ${VIDEO_QUALITY:720p}
  audio-quality: ${AUDIO_QUALITY:high}

analytics:
  google:
    tracking-id: ${GOOGLE_ANALYTICS_ID}
  mixpanel:
    token: ${MIXPANEL_TOKEN}

logging:
  level:
    com.interviewsimulator: ${LOG_LEVEL:INFO}
  file:
    name: ${LOG_FILE:logs/interview-simulator.log}
```

## Docker Configuration

### Netflix GPT Dockerfile
```dockerfile
# Frontend Dockerfile
FROM node:18-alpine

WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=0 /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

### Interview Simulator Dockerfile
```dockerfile
# Frontend Dockerfile
FROM node:18-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

# Backend Dockerfile
FROM openjdk:17-jdk-slim
WORKDIR /app
COPY target/interview-simulator-backend-*.jar app.jar
EXPOSE 8080
CMD ["java", "-jar", "app.jar"]
```

## Development Scripts

### package.json scripts section
```json
{
  "scripts": {
    "dev": "vite --port 3000",
    "build": "vite build",
    "preview": "vite preview",
    "test": "vitest",
    "test:ui": "vitest --ui",
    "test:coverage": "vitest --coverage",
    "lint": "eslint src --ext js,jsx,ts,tsx",
    "lint:fix": "eslint src --ext js,jsx,ts,tsx --fix",
    "format": "prettier --write \"src/**/*.{js,jsx,ts,tsx,json,css,md}\"",
    "type-check": "tsc --noEmit",
    "docker:build": "docker build -t app-name .",
    "docker:run": "docker run -p 3000:80 app-name"
  }
}
```

## CI/CD Configuration

### GitHub Actions (.github/workflows/ci.yml)
```yaml
name: CI/CD Pipeline

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main ]

jobs:
  frontend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Run tests
        run: npm test
      
      - name: Build application
        run: npm run build
      
      - name: Deploy to staging
        if: github.ref == 'refs/heads/develop'
        run: echo "Deploy to staging"
      
      - name: Deploy to production
        if: github.ref == 'refs/heads/main'
        run: echo "Deploy to production"

  backend:
    runs-on: ubuntu-latest
    services:
      mongodb:
        image: mongo:5.0
        ports:
          - 27017:27017
    
    steps:
      - uses: actions/checkout@v3
      
      - name: Set up JDK 17
        uses: actions/setup-java@v3
        with:
          java-version: '17'
          distribution: 'temurin'
      
      - name: Run tests
        run: ./mvnw test
      
      - name: Build application
        run: ./mvnw clean package
      
      - name: Build Docker image
        run: docker build -t backend .
```

## Security Configuration

### CORS Configuration
```java
@Configuration
@EnableWebSecurity
public class SecurityConfig {
    
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOriginPatterns(Arrays.asList("*"));
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        configuration.setAllowedHeaders(Arrays.asList("*"));
        configuration.setAllowCredentials(true);
        
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/api/**", configuration);
        return source;
    }
}
```

---

*These templates provide comprehensive configuration examples for different project types and deployment scenarios.*