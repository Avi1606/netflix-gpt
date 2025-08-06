import React, { useState, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import Webcam from 'react-webcam';
import { useAuth } from '../context/AuthContext';

const InterviewRoom = () => {
  const { user, logout } = useAuth();
  const webcamRef = useRef(null);
  const [isRecording, setIsRecording] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [interviewStarted, setInterviewStarted] = useState(false);

  // Sample questions for demo
  const sampleQuestions = [
    "Tell me about yourself and your background.",
    "What are your greatest strengths and weaknesses?",
    "Why do you want to work for our company?",
    "Describe a challenging project you've worked on.",
    "Where do you see yourself in 5 years?"
  ];

  const handleLogout = () => {
    logout();
  };

  const startInterview = () => {
    setInterviewStarted(true);
    setCurrentQuestion(0);
  };

  const nextQuestion = () => {
    if (currentQuestion < sampleQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const previousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const startRecording = () => {
    setIsRecording(true);
    // In a real implementation, this would start audio/video recording
    console.log('Started recording...');
  };

  const stopRecording = () => {
    setIsRecording(false);
    // In a real implementation, this would stop recording and process the data
    console.log('Stopped recording...');
  };

  const endInterview = () => {
    setInterviewStarted(false);
    setIsRecording(false);
    setCurrentQuestion(0);
    // In a real implementation, this would save the interview data
    alert('Interview completed! Results will be available shortly.');
  };

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    console.log('Captured screenshot:', imageSrc);
  }, [webcamRef]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Link to="/dashboard">
                  <h1 className="text-2xl font-bold text-blue-600">InterviewAI</h1>
                </Link>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                to="/dashboard"
                className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors"
              >
                Dashboard
              </Link>
              <Link
                to="/profile"
                className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors"
              >
                Profile
              </Link>
              <button
                onClick={handleLogout}
                className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {!interviewStarted ? (
            // Pre-Interview Setup
            <div className="bg-white shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Interview Setup</h2>
                
                {/* Camera Test */}
                <div className="mb-8">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Camera & Audio Test</h3>
                  <div className="bg-gray-100 rounded-lg p-4">
                    <div className="flex justify-center mb-4">
                      <div className="w-96 h-72 bg-black rounded-lg overflow-hidden">
                        <Webcam
                          audio={true}
                          ref={webcamRef}
                          screenshotFormat="image/jpeg"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                    <div className="text-center">
                      <button
                        onClick={capture}
                        className="mr-4 inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      >
                        Test Camera
                      </button>
                      <p className="mt-2 text-sm text-gray-500">
                        Make sure your camera and microphone are working properly.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Interview Settings */}
                <div className="mb-8">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Interview Configuration</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Interview Type
                      </label>
                      <select className="block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm">
                        <option>General Interview</option>
                        <option>Technical Interview</option>
                        <option>Behavioral Interview</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Difficulty Level
                      </label>
                      <select className="block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm">
                        <option>Beginner</option>
                        <option>Intermediate</option>
                        <option>Advanced</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Duration
                      </label>
                      <select className="block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm">
                        <option>15 minutes</option>
                        <option>30 minutes</option>
                        <option>45 minutes</option>
                        <option>60 minutes</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Job Role
                      </label>
                      <select className="block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm">
                        <option>Software Engineer</option>
                        <option>Product Manager</option>
                        <option>Data Scientist</option>
                        <option>Marketing Manager</option>
                        <option>Other</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Start Interview */}
                <div className="text-center">
                  <button
                    onClick={startInterview}
                    className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    <svg className="-ml-1 mr-3 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h8m-10-9h12a2 2 0 012 2v12a2 2 0 01-2 2H4a2 2 0 01-2-2V7a2 2 0 012-2z" />
                    </svg>
                    Start Interview
                  </button>
                </div>
              </div>
            </div>
          ) : (
            // Active Interview
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Video Feed */}
              <div className="lg:col-span-2">
                <div className="bg-white shadow rounded-lg p-6">
                  <div className="mb-4">
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-medium text-gray-900">Interview in Progress</h3>
                      <div className="flex items-center">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                          isRecording ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-800'
                        }`}>
                          {isRecording ? (
                            <>
                              <span className="w-2 h-2 bg-red-500 rounded-full mr-2 animate-pulse"></span>
                              Recording
                            </>
                          ) : (
                            'Paused'
                          )}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-black rounded-lg overflow-hidden mb-4">
                    <Webcam
                      audio={true}
                      ref={webcamRef}
                      screenshotFormat="image/jpeg"
                      className="w-full h-96 object-cover"
                    />
                  </div>

                  {/* Recording Controls */}
                  <div className="flex justify-center space-x-4">
                    <button
                      onClick={isRecording ? stopRecording : startRecording}
                      className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                        isRecording 
                          ? 'bg-red-600 hover:bg-red-700 focus:ring-red-500' 
                          : 'bg-green-600 hover:bg-green-700 focus:ring-green-500'
                      }`}
                    >
                      {isRecording ? (
                        <>
                          <svg className="-ml-1 mr-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 10h6v4H9z" />
                          </svg>
                          Stop Recording
                        </>
                      ) : (
                        <>
                          <svg className="-ml-1 mr-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h8m-10-9h12a2 2 0 012 2v12a2 2 0 01-2 2H4a2 2 0 01-2-2V7a2 2 0 012-2z" />
                          </svg>
                          Start Recording
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {/* Question Panel */}
              <div className="lg:col-span-1">
                <div className="bg-white shadow rounded-lg p-6">
                  <div className="mb-4">
                    <h3 className="text-lg font-medium text-gray-900">Current Question</h3>
                    <p className="text-sm text-gray-500">
                      Question {currentQuestion + 1} of {sampleQuestions.length}
                    </p>
                  </div>
                  
                  <div className="mb-6">
                    <div className="bg-blue-50 rounded-lg p-4">
                      <p className="text-gray-900 font-medium">
                        {sampleQuestions[currentQuestion]}
                      </p>
                    </div>
                  </div>

                  {/* Navigation */}
                  <div className="flex justify-between mb-6">
                    <button
                      onClick={previousQuestion}
                      disabled={currentQuestion === 0}
                      className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Previous
                    </button>
                    <button
                      onClick={nextQuestion}
                      disabled={currentQuestion === sampleQuestions.length - 1}
                      className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Next
                    </button>
                  </div>

                  {/* Tips */}
                  <div className="mb-6">
                    <h4 className="text-sm font-medium text-gray-900 mb-2">Tips:</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Look directly at the camera</li>
                      <li>• Speak clearly and at a steady pace</li>
                      <li>• Use the STAR method for examples</li>
                      <li>• Take your time to think</li>
                    </ul>
                  </div>

                  {/* End Interview */}
                  <div className="text-center">
                    <button
                      onClick={endInterview}
                      className="w-full inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                    >
                      End Interview
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default InterviewRoom;