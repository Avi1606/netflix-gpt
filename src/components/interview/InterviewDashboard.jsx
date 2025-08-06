import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Header from '../Header';
import { setQuestions } from '../../App/questionBankSlice';

const InterviewDashboard = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector((store) => store.user);
    const questionBank = useSelector((store) => store.questionBank);
    
    // Check if demo mode and handle accordingly
    const isDemoMode = import.meta.env.VITE_DEMO_MODE === 'true';
    const shouldShowDashboard = user || isDemoMode;
    
    const [interviewType, setInterviewType] = useState('TECHNICAL');
    const [difficulty, setDifficulty] = useState('INTERMEDIATE');
    const [jobRole, setJobRole] = useState('Software Engineer');
    const [sessionTitle, setSessionTitle] = useState('');

    useEffect(() => {
        // Initialize default questions if none exist
        if (questionBank.questions.length === 0) {
            const defaultQuestions = [
                {
                    id: '1',
                    category: 'TECHNICAL',
                    subcategory: 'DATA_STRUCTURES',
                    difficulty: 'INTERMEDIATE',
                    jobRoles: ['Software Engineer', 'Full Stack Developer'],
                    question: 'Explain the difference between Array and LinkedList and when would you use each?',
                    followUpQuestions: [
                        'What are the time complexities for common operations?',
                        'Can you implement a simple LinkedList in JavaScript?'
                    ],
                    expectedAnswerPoints: [
                        'Memory allocation differences',
                        'Time complexity for operations',
                        'Use cases and scenarios'
                    ],
                    timeLimit: 300,
                    tags: ['data-structures', 'arrays', 'linked-lists'],
                    isActive: true,
                    createdAt: new Date().toISOString()
                },
                {
                    id: '2',
                    category: 'BEHAVIORAL',
                    subcategory: 'TEAMWORK',
                    difficulty: 'INTERMEDIATE',
                    jobRoles: ['Software Engineer', 'Full Stack Developer', 'Product Manager'],
                    question: 'Tell me about a time when you had to work with a difficult team member. How did you handle the situation?',
                    followUpQuestions: [
                        'What was the outcome?',
                        'What would you do differently next time?'
                    ],
                    expectedAnswerPoints: [
                        'Clear communication',
                        'Problem-solving approach',
                        'Professional conflict resolution'
                    ],
                    timeLimit: 240,
                    tags: ['teamwork', 'conflict-resolution', 'communication'],
                    isActive: true,
                    createdAt: new Date().toISOString()
                },
                {
                    id: '3',
                    category: 'HR',
                    subcategory: 'MOTIVATION',
                    difficulty: 'BEGINNER',
                    jobRoles: [],
                    question: 'Why are you interested in this position and our company?',
                    followUpQuestions: [
                        'What do you know about our company culture?',
                        'How does this role align with your career goals?'
                    ],
                    expectedAnswerPoints: [
                        'Research about the company',
                        'Alignment with career goals',
                        'Genuine interest in the role'
                    ],
                    timeLimit: 180,
                    tags: ['motivation', 'company-fit', 'career-goals'],
                    isActive: true,
                    createdAt: new Date().toISOString()
                }
            ];
            dispatch(setQuestions(defaultQuestions));
        }
    }, [dispatch, questionBank.questions.length]);

    const handleStartInterview = () => {
        // Generate a unique session ID
        const sessionId = `session_${Date.now()}`;
        
        // Get filtered questions based on selections
        const filteredQuestions = questionBank.questions.filter(q => {
            const categoryMatch = q.category === interviewType;
            const difficultyMatch = q.difficulty === difficulty;
            const roleMatch = !q.jobRoles || q.jobRoles.length === 0 || q.jobRoles.includes(jobRole);
            return categoryMatch && difficultyMatch && roleMatch && q.isActive;
        });

        // If no specific questions found, use a broader selection
        const questions = filteredQuestions.length > 0 ? filteredQuestions : 
            questionBank.questions.filter(q => q.category === interviewType && q.isActive).slice(0, 5);

        if (questions.length === 0) {
            alert('No questions available for the selected criteria. Please adjust your selections.');
            return;
        }

        // Navigate to interview room with session data
        navigate(`/interview/room/${sessionId}`, {
            state: {
                sessionConfig: {
                    title: sessionTitle || `${interviewType} Interview - ${jobRole}`,
                    type: interviewType,
                    difficulty,
                    jobRole,
                    questions: questions.slice(0, 10) // Limit to 10 questions
                }
            }
        });
    };

    if (!shouldShowDashboard) {
        navigate('/');
        return null;
    }

    return (
        <div className="min-h-screen bg-black">
            <Header />
            
            <div className="pt-20 px-4 md:px-8 pb-8">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-8">
                        <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
                            Interview Simulator
                        </h1>
                        <p className="text-gray-300 text-lg">
                            Practice your interview skills with AI-powered feedback
                        </p>
                    </div>

                    <div className="bg-gray-900 rounded-lg p-6 md:p-8 mb-8">
                        <h2 className="text-2xl font-semibold text-white mb-6">
                            Configure Your Interview
                        </h2>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                            <div>
                                <label className="block text-white font-medium mb-2">
                                    Interview Type
                                </label>
                                <select 
                                    value={interviewType}
                                    onChange={(e) => setInterviewType(e.target.value)}
                                    className="w-full bg-gray-800 text-white border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="TECHNICAL">Technical</option>
                                    <option value="BEHAVIORAL">Behavioral</option>
                                    <option value="HR">HR</option>
                                    <option value="SITUATIONAL">Situational</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-white font-medium mb-2">
                                    Difficulty Level
                                </label>
                                <select 
                                    value={difficulty}
                                    onChange={(e) => setDifficulty(e.target.value)}
                                    className="w-full bg-gray-800 text-white border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="BEGINNER">Beginner</option>
                                    <option value="INTERMEDIATE">Intermediate</option>
                                    <option value="ADVANCED">Advanced</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-white font-medium mb-2">
                                    Job Role
                                </label>
                                <select 
                                    value={jobRole}
                                    onChange={(e) => setJobRole(e.target.value)}
                                    className="w-full bg-gray-800 text-white border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    {questionBank.jobRoles.map(role => (
                                        <option key={role} value={role}>{role}</option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block text-white font-medium mb-2">
                                    Session Title (Optional)
                                </label>
                                <input 
                                    type="text"
                                    value={sessionTitle}
                                    onChange={(e) => setSessionTitle(e.target.value)}
                                    placeholder="e.g., Frontend Engineer - Tech Corp"
                                    className="w-full bg-gray-800 text-white border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                        </div>

                        <div className="flex justify-center">
                            <button 
                                onClick={handleStartInterview}
                                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors text-lg"
                            >
                                Start Interview
                            </button>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-gray-900 rounded-lg p-6 text-center">
                            <div className="text-3xl mb-4">🎥</div>
                            <h3 className="text-white font-semibold mb-2">Video Recording</h3>
                            <p className="text-gray-400 text-sm">
                                Practice with webcam recording and review your performance
                            </p>
                        </div>

                        <div className="bg-gray-900 rounded-lg p-6 text-center">
                            <div className="text-3xl mb-4">❓</div>
                            <h3 className="text-white font-semibold mb-2">Smart Questions</h3>
                            <p className="text-gray-400 text-sm">
                                Curated questions based on role and difficulty level
                            </p>
                        </div>

                        <div className="bg-gray-900 rounded-lg p-6 text-center">
                            <div className="text-3xl mb-4">📊</div>
                            <h3 className="text-white font-semibold mb-2">AI Feedback</h3>
                            <p className="text-gray-400 text-sm">
                                Get insights on your communication and confidence
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InterviewDashboard;