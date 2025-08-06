# Job Interview Simulator with Emotion AI

An advanced AI-powered job interview simulation platform that helps candidates practice and improve their interview skills through real-time feedback and analysis.

## 🚀 Features

- **AI-Powered Questions**: Industry-specific questions tailored to your role and experience level
- **Real-time Analysis**: Instant feedback on speech patterns, confidence level, and body language
- **Emotion Detection**: Advanced AI analyzes facial expressions and emotional state during interviews
- **Performance Tracking**: Comprehensive analytics to track improvement over time
- **Secure Authentication**: JWT-based authentication with user profile management
- **Responsive Design**: Works seamlessly on desktop and mobile devices

## 🏗️ Architecture

### Frontend (React + Tailwind CSS)
- Modern React application with Vite
- Responsive UI with Tailwind CSS
- JWT-based authentication
- Real-time webcam and audio recording
- Context API for state management

### Backend (Spring Boot + JWT)
- Spring Boot 3.x with Java 17
- JWT authentication and authorization
- RESTful API design
- Input validation and error handling
- CORS configuration for frontend integration

### Database (MongoDB)
- User profiles and authentication data
- Interview session records
- Question bank with categories
- Performance metrics and analytics

## 📋 Project Structure

```
job-interview-simulator/
├── frontend/                 # React application
│   ├── src/
│   │   ├── components/      # React components
│   │   ├── context/         # Context providers
│   │   ├── services/        # API services
│   │   ├── hooks/           # Custom hooks
│   │   └── utils/           # Utility functions
│   ├── package.json
│   └── tailwind.config.js
├── backend/                 # Spring Boot application
│   ├── src/main/java/
│   │   └── com/interviewsimulator/
│   │       ├── controller/  # REST controllers
│   │       ├── service/     # Business logic
│   │       ├── repository/  # Data access layer
│   │       ├── model/       # Entity models
│   │       ├── dto/         # Data transfer objects
│   │       ├── config/      # Configuration classes
│   │       └── security/    # Security configuration
│   ├── pom.xml
│   └── application.yml
└── README.md
```

## 🛠️ Technology Stack

### Frontend
- **React 19** - UI framework
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **React Webcam** - Camera integration

### Backend
- **Spring Boot 3.2** - Application framework
- **Spring Security** - Authentication and authorization
- **Spring Data MongoDB** - Database integration
- **JWT** - Token-based authentication
- **Maven** - Dependency management

### Database
- **MongoDB Atlas** - Cloud database service

## 🚀 Getting Started

### Prerequisites
- Node.js 16+ and npm
- Java 17+
- Maven 3.8+
- MongoDB Atlas account (or local MongoDB)

### Backend Setup

1. **Navigate to backend directory**
   ```bash
   cd backend
   ```

2. **Configure MongoDB connection**
   Update `src/main/resources/application.yml`:
   ```yaml
   spring:
     data:
       mongodb:
         uri: mongodb+srv://username:password@cluster.mongodb.net/interview-simulator
   ```

3. **Set environment variables**
   ```bash
   export JWT_SECRET=your-jwt-secret-key
   ```

4. **Build and run**
   ```bash
   mvn clean install
   mvn spring-boot:run
   ```

   The backend will start on `http://localhost:8080`

### Frontend Setup

1. **Navigate to frontend directory**
   ```bash
   cd frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

   The frontend will start on `http://localhost:5173`

## 📡 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/refresh` - Refresh JWT token

### User Management
- `GET /api/user/profile` - Get user profile
- `PUT /api/user/profile` - Update user profile

### Health Check
- `GET /api/health` - Application health status

## 🔒 Security Features

- **JWT Authentication**: Secure token-based authentication
- **Password Hashing**: BCrypt password encryption
- **Input Validation**: Comprehensive request validation
- **CORS Configuration**: Cross-origin resource sharing setup
- **Secure Headers**: Security headers configuration

## 🧪 Testing

### Backend Tests
```bash
cd backend
mvn test
```

### Frontend Tests
```bash
cd frontend
npm test
```

## 🚀 Deployment

### Backend Deployment
1. Package the application:
   ```bash
   mvn clean package
   ```

2. Deploy the generated JAR file to your preferred platform

### Frontend Deployment
1. Build the application:
   ```bash
   npm run build
   ```

2. Deploy the `dist` folder to your static hosting service

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🔮 Future Enhancements

- **Phase 2**: Interview simulation with AI question generation
- **Phase 3**: Advanced emotion detection and speech analysis
- **Phase 4**: Multi-language support and interview coaching
- **Phase 5**: Integration with job boards and ATS systems

## 📞 Support

For support, email support@interviewsimulator.com or create an issue in this repository.
