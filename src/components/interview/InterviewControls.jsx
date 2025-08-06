import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { pauseSession, resumeSession, completeSession } from '../../App/interviewSlice';

const InterviewControls = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const interview = useSelector((store) => store.interview);

    const handlePause = () => {
        dispatch(pauseSession());
    };

    const handleResume = () => {
        dispatch(resumeSession());
    };

    const handleEndInterview = () => {
        if (window.confirm('Are you sure you want to end the interview? This action cannot be undone.')) {
            dispatch(completeSession());
            navigate('/interview', { 
                state: { 
                    completedSession: interview.currentSession,
                    responses: interview.responses
                } 
            });
        }
    };

    return (
        <div className="bg-gray-800 px-6 py-4">
            <div className="flex justify-center items-center space-x-4">
                {interview.sessionStatus === 'in_progress' ? (
                    <button
                        onClick={handlePause}
                        className="flex items-center space-x-2 bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                    >
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        <span>Pause</span>
                    </button>
                ) : interview.sessionStatus === 'paused' ? (
                    <button
                        onClick={handleResume}
                        className="flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                    >
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                        </svg>
                        <span>Resume</span>
                    </button>
                ) : null}

                <button
                    onClick={handleEndInterview}
                    className="flex items-center space-x-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8 7a1 1 0 00-1 1v4a1 1 0 001 1h4a1 1 0 001-1V8a1 1 0 00-1-1H8z" clipRule="evenodd" />
                    </svg>
                    <span>End Interview</span>
                </button>

                {/* Recording status indicator */}
                <div className="flex items-center space-x-2 text-gray-300">
                    {interview.isRecording ? (
                        <>
                            <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                            <span className="text-sm">Recording</span>
                        </>
                    ) : (
                        <>
                            <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
                            <span className="text-sm">Not Recording</span>
                        </>
                    )}
                </div>
            </div>

            {interview.sessionStatus === 'paused' && (
                <div className="mt-4 text-center">
                    <p className="text-yellow-400 text-sm">
                        Interview is paused. Click Resume to continue or End Interview to finish.
                    </p>
                </div>
            )}
        </div>
    );
};

export default InterviewControls;