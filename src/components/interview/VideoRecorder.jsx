import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setMediaStream, setRecording, addRecordedChunk, clearRecordedChunks } from '../../App/interviewSlice';

const VideoRecorder = ({ preview = false }) => {
    const dispatch = useDispatch();
    const interview = useSelector((store) => store.interview);
    
    const videoRef = useRef(null);
    const mediaRecorderRef = useRef(null);
    const recordedChunksRef = useRef([]);
    
    const [isInitialized, setIsInitialized] = useState(false);
    const [error, setError] = useState(null);
    const [permissionGranted, setPermissionGranted] = useState(false);

    useEffect(() => {
        initializeCamera();
        return () => {
            cleanup();
        };
    }, []);

    const initializeCamera = async () => {
        try {
            setError(null);
            
            const constraints = {
                video: {
                    width: { ideal: 1280 },
                    height: { ideal: 720 },
                    facingMode: 'user'
                },
                audio: {
                    echoCancellation: true,
                    noiseSuppression: true,
                    sampleRate: 44100
                }
            };

            const stream = await navigator.mediaDevices.getUserMedia(constraints);
            
            if (videoRef.current) {
                videoRef.current.srcObject = stream;
            }
            
            dispatch(setMediaStream(stream));
            setPermissionGranted(true);
            setIsInitialized(true);
            
            // Setup MediaRecorder for non-preview mode
            if (!preview) {
                setupMediaRecorder(stream);
            }
            
        } catch (err) {
            console.error('Error accessing media devices:', err);
            setError(getErrorMessage(err));
        }
    };

    const setupMediaRecorder = (stream) => {
        try {
            const options = { mimeType: 'video/webm;codecs=vp9' };
            
            // Fallback to webm if vp9 not supported
            if (!MediaRecorder.isTypeSupported(options.mimeType)) {
                options.mimeType = 'video/webm';
            }
            
            const mediaRecorder = new MediaRecorder(stream, options);
            mediaRecorderRef.current = mediaRecorder;
            
            mediaRecorder.ondataavailable = (event) => {
                if (event.data.size > 0) {
                    recordedChunksRef.current.push(event.data);
                    dispatch(addRecordedChunk(event.data));
                }
            };
            
            mediaRecorder.onstop = () => {
                console.log('Recording stopped, chunks:', recordedChunksRef.current.length);
            };
            
        } catch (err) {
            console.error('Error setting up MediaRecorder:', err);
            setError('Recording setup failed');
        }
    };

    const startRecording = () => {
        if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'inactive') {
            recordedChunksRef.current = [];
            dispatch(clearRecordedChunks());
            mediaRecorderRef.current.start(1000); // Collect data every 1 second
            dispatch(setRecording(true));
        }
    };

    const stopRecording = () => {
        if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
            mediaRecorderRef.current.stop();
            dispatch(setRecording(false));
        }
    };

    const cleanup = () => {
        if (interview.mediaStream) {
            interview.mediaStream.getTracks().forEach(track => track.stop());
        }
    };

    const getErrorMessage = (err) => {
        switch (err.name) {
            case 'NotAllowedError':
                return 'Camera and microphone access denied. Please allow permissions and refresh.';
            case 'NotFoundError':
                return 'No camera or microphone found. Please connect a device.';
            case 'NotReadableError':
                return 'Camera or microphone is already in use by another application.';
            case 'OverconstrainedError':
                return 'Camera does not support the required settings.';
            default:
                return 'An error occurred while accessing your camera and microphone.';
        }
    };

    const retryInitialization = () => {
        setError(null);
        setIsInitialized(false);
        setPermissionGranted(false);
        initializeCamera();
    };

    // Auto-start recording when interview starts (not in preview mode)
    useEffect(() => {
        if (!preview && interview.sessionStatus === 'in_progress' && !interview.isRecording && isInitialized) {
            startRecording();
        } else if (!preview && interview.sessionStatus !== 'in_progress' && interview.isRecording) {
            stopRecording();
        }
    }, [preview, interview.sessionStatus, interview.isRecording, isInitialized]);

    if (error) {
        return (
            <div className="bg-gray-900 rounded-lg p-6 text-center">
                <div className="text-red-400 mb-4">
                    <svg className="w-16 h-16 mx-auto mb-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    <h3 className="text-lg font-semibold mb-2">Camera Access Error</h3>
                    <p className="text-sm text-gray-300 mb-4">{error}</p>
                    <button 
                        onClick={retryInitialization}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
                    >
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-gray-900 rounded-lg overflow-hidden">
            <div className="relative">
                <video
                    ref={videoRef}
                    autoPlay
                    muted
                    playsInline
                    className="w-full h-auto bg-black"
                    style={{ minHeight: '300px' }}
                />
                
                {!isInitialized && (
                    <div className="absolute inset-0 flex items-center justify-center bg-gray-800">
                        <div className="text-center text-white">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
                            <p>Initializing camera...</p>
                        </div>
                    </div>
                )}

                {/* Recording indicator */}
                {!preview && interview.isRecording && (
                    <div className="absolute top-4 left-4 flex items-center bg-red-600 text-white px-3 py-1 rounded-full text-sm">
                        <div className="w-2 h-2 bg-white rounded-full mr-2 animate-pulse"></div>
                        Recording
                    </div>
                )}

                {/* Permission status */}
                {permissionGranted && (
                    <div className="absolute top-4 right-4 flex items-center bg-green-600 text-white px-3 py-1 rounded-full text-sm">
                        <div className="w-2 h-2 bg-white rounded-full mr-2"></div>
                        Connected
                    </div>
                )}
            </div>
            
            {preview && (
                <div className="p-4 bg-gray-800">
                    <p className="text-gray-300 text-sm text-center">
                        Camera preview - Make sure you can see and hear yourself clearly
                    </p>
                </div>
            )}
        </div>
    );
};

export default VideoRecorder;