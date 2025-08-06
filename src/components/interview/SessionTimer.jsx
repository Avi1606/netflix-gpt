import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const SessionTimer = () => {
    const interview = useSelector((store) => store.interview);
    const [elapsedTime, setElapsedTime] = useState(0);

    useEffect(() => {
        let interval = null;
        
        if (interview.sessionStatus === 'in_progress' && interview.startTime) {
            interval = setInterval(() => {
                const now = new Date();
                const start = new Date(interview.startTime);
                const elapsed = Math.floor((now - start) / 1000);
                setElapsedTime(elapsed);
            }, 1000);
        } else if (interview.sessionStatus === 'completed' && interview.duration) {
            setElapsedTime(Math.floor(interview.duration / 1000));
        }
        
        return () => {
            if (interval) clearInterval(interval);
        };
    }, [interview.sessionStatus, interview.startTime, interview.duration]);

    const formatTime = (seconds) => {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;
        
        if (hours > 0) {
            return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
        }
        return `${minutes}:${secs.toString().padStart(2, '0')}`;
    };

    const getStatusColor = () => {
        switch (interview.sessionStatus) {
            case 'in_progress':
                return 'text-green-400';
            case 'paused':
                return 'text-yellow-400';
            case 'completed':
                return 'text-blue-400';
            default:
                return 'text-gray-400';
        }
    };

    const getStatusText = () => {
        switch (interview.sessionStatus) {
            case 'in_progress':
                return 'In Progress';
            case 'paused':
                return 'Paused';
            case 'completed':
                return 'Completed';
            default:
                return 'Not Started';
        }
    };

    return (
        <div className="flex items-center space-x-4">
            <div className="flex items-center">
                <div className={`w-2 h-2 rounded-full mr-2 ${
                    interview.sessionStatus === 'in_progress' ? 'bg-green-400 animate-pulse' : 
                    interview.sessionStatus === 'paused' ? 'bg-yellow-400' : 
                    'bg-gray-400'
                }`}></div>
                <span className={`font-medium ${getStatusColor()}`}>
                    {getStatusText()}
                </span>
            </div>
            
            <div className="text-white font-mono text-lg">
                {formatTime(elapsedTime)}
            </div>
            
            {interview.questions.length > 0 && (
                <div className="text-gray-300 text-sm">
                    Progress: {interview.currentQuestionIndex + 1}/{interview.questions.length}
                </div>
            )}
        </div>
    );
};

export default SessionTimer;