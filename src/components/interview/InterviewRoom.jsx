import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import Header from '../Header';
import VideoRecorder from './VideoRecorder';
import QuestionDisplay from './QuestionDisplay';
import InterviewControls from './InterviewControls';
import SessionTimer from './SessionTimer';
import { 
    createSession, 
    startSession, 
    completeSession, 
    resetSession,
    nextQuestion,
    previousQuestion,
    addResponse
} from '../../App/interviewSlice';

const InterviewRoom = () => {
    const { sessionId } = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    const user = useSelector((store) => store.user);
    const interview = useSelector((store) => store.interview);
    
    const [showPreview, setShowPreview] = useState(true);
    const [currentResponse, setCurrentResponse] = useState('');
    const [questionStartTime, setQuestionStartTime] = useState(null);

    useEffect(() => {
        if (!user && import.meta.env.VITE_DEMO_MODE !== 'true') {
            navigate('/');
            return;
        }

        // Initialize session from navigation state
        if (location.state?.sessionConfig && !interview.currentSession) {
            const config = location.state.sessionConfig;
            dispatch(createSession({
                id: sessionId,
                ...config
            }));
        }

        return () => {
            // Cleanup on component unmount
            if (interview.sessionStatus === 'in_progress') {
                dispatch(completeSession());
            }
        };
    }, [user, sessionId, location.state, interview.currentSession, dispatch, navigate]);

    useEffect(() => {
        // Start question timer when question changes
        if (interview.currentQuestion) {
            setQuestionStartTime(Date.now());
            setCurrentResponse('');
        }
    }, [interview.currentQuestion]);

    const handleStartInterview = () => {
        setShowPreview(false);
        dispatch(startSession());
    };

    const handleEndInterview = () => {
        dispatch(completeSession());
        navigate('/interview', { 
            state: { 
                completedSession: interview.currentSession,
                responses: interview.responses
            } 
        });
    };

    const handleNextQuestion = () => {
        // Save current response if any
        if (currentResponse.trim() && interview.currentQuestion) {
            const timeSpent = questionStartTime ? (Date.now() - questionStartTime) / 1000 : 0;
            dispatch(addResponse({
                questionId: interview.currentQuestion.id,
                response: currentResponse.trim(),
                timeSpent,
                confidence: 0.7 // Default confidence level
            }));
        }
        
        dispatch(nextQuestion());
    };

    const handlePreviousQuestion = () => {
        dispatch(previousQuestion());
    };

    const isLastQuestion = interview.currentQuestionIndex === interview.questions.length - 1;
    const isFirstQuestion = interview.currentQuestionIndex === 0;

    // Handle demo mode authentication
    if (!user && import.meta.env.VITE_DEMO_MODE === 'true') {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center">
                <Header />
                <div className="text-center text-white">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
                    <p>Loading interview room...</p>
                </div>
            </div>
        );
    }

    if (!user) {
        return null;
    }

    if (!interview.currentSession) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center">
                <Header />
                <div className="text-center">
                    <h2 className="text-2xl text-white mb-4">Session not found</h2>
                    <button 
                        onClick={() => navigate('/interview')}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg"
                    >
                        Back to Dashboard
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black">
            <Header />
            
            <div className="pt-16">
                {showPreview ? (
                    // Pre-interview setup and camera test
                    <div className="max-w-4xl mx-auto px-4 py-8">
                        <div className="text-center mb-8">
                            <h1 className="text-3xl font-bold text-white mb-2">
                                {interview.currentSession.title}
                            </h1>
                            <p className="text-gray-300">
                                Get ready for your interview. Test your camera and audio.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            <div>
                                <VideoRecorder preview={true} />
                            </div>
                            
                            <div className="bg-gray-900 rounded-lg p-6">
                                <h3 className="text-xl font-semibold text-white mb-4">
                                    Interview Details
                                </h3>
                                <div className="space-y-3 text-gray-300">
                                    <div>
                                        <span className="font-medium">Type:</span> {interview.currentSession.type}
                                    </div>
                                    <div>
                                        <span className="font-medium">Role:</span> {interview.currentSession.jobRole}
                                    </div>
                                    <div>
                                        <span className="font-medium">Questions:</span> {interview.questions.length}
                                    </div>
                                    <div>
                                        <span className="font-medium">Estimated Time:</span> {Math.ceil(interview.questions.length * 5)} minutes
                                    </div>
                                </div>

                                <div className="mt-6 p-4 bg-gray-800 rounded-lg">
                                    <h4 className="font-medium text-white mb-2">Tips:</h4>
                                    <ul className="text-sm text-gray-400 space-y-1">
                                        <li>• Ensure good lighting on your face</li>
                                        <li>• Test your microphone and camera</li>
                                        <li>• Find a quiet, professional environment</li>
                                        <li>• Maintain eye contact with the camera</li>
                                    </ul>
                                </div>

                                <button 
                                    onClick={handleStartInterview}
                                    className="w-full mt-6 bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg transition-colors"
                                >
                                    Start Interview
                                </button>
                            </div>
                        </div>
                    </div>
                ) : (
                    // Main interview interface
                    <div className="flex flex-col h-screen pt-16">
                        {/* Top bar with timer and progress */}
                        <div className="bg-gray-900 px-6 py-4 flex justify-between items-center">
                            <SessionTimer />
                            <div className="text-white">
                                Question {interview.currentQuestionIndex + 1} of {interview.questions.length}
                            </div>
                        </div>

                        {/* Main content area */}
                        <div className="flex-1 flex">
                            {/* Video section */}
                            <div className="w-1/2 p-4">
                                <VideoRecorder preview={false} />
                            </div>

                            {/* Question and response section */}
                            <div className="w-1/2 p-4 flex flex-col">
                                <QuestionDisplay 
                                    question={interview.currentQuestion}
                                />
                                
                                <div className="flex-1 mt-4">
                                    <label className="block text-white font-medium mb-2">
                                        Your Response (Optional - for notes):
                                    </label>
                                    <textarea
                                        value={currentResponse}
                                        onChange={(e) => setCurrentResponse(e.target.value)}
                                        placeholder="You can take notes here while speaking your response..."
                                        className="w-full h-40 bg-gray-800 text-white border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                                    />
                                </div>

                                {/* Navigation buttons */}
                                <div className="flex justify-between mt-6">
                                    <button
                                        onClick={handlePreviousQuestion}
                                        disabled={isFirstQuestion}
                                        className={`px-6 py-2 rounded-lg font-medium ${
                                            isFirstQuestion 
                                                ? 'bg-gray-600 text-gray-400 cursor-not-allowed' 
                                                : 'bg-gray-700 hover:bg-gray-600 text-white'
                                        }`}
                                    >
                                        Previous
                                    </button>
                                    
                                    {isLastQuestion ? (
                                        <button
                                            onClick={handleEndInterview}
                                            className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg font-medium"
                                        >
                                            End Interview
                                        </button>
                                    ) : (
                                        <button
                                            onClick={handleNextQuestion}
                                            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium"
                                        >
                                            Next Question
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Bottom controls */}
                        <InterviewControls />
                    </div>
                )}
            </div>
        </div>
    );
};

export default InterviewRoom;