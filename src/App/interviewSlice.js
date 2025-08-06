import { createSlice } from "@reduxjs/toolkit";

const interviewSlice = createSlice({
    name: 'interview',
    initialState: {
        currentSession: null,
        sessionStatus: 'idle', // idle, starting, in_progress, paused, completed
        currentQuestion: null,
        currentQuestionIndex: 0,
        questions: [],
        responses: [],
        startTime: null,
        endTime: null,
        duration: 0,
        isRecording: false,
        mediaStream: null,
        recordedChunks: [],
        settings: {
            videoQuality: '720p',
            audioQuality: 'high',
            practiceMode: true,
            timePerQuestion: 300 // 5 minutes default
        }
    },
    reducers: {
        createSession: (state, action) => {
            state.currentSession = {
                id: action.payload.id,
                title: action.payload.title,
                type: action.payload.type,
                difficulty: action.payload.difficulty,
                jobRole: action.payload.jobRole,
                company: action.payload.company || 'Practice',
                createdAt: new Date().toISOString()
            };
            state.sessionStatus = 'starting';
            state.questions = action.payload.questions || [];
            state.currentQuestionIndex = 0;
            state.currentQuestion = state.questions[0] || null;
        },
        startSession: (state) => {
            state.sessionStatus = 'in_progress';
            state.startTime = new Date().toISOString();
        },
        pauseSession: (state) => {
            state.sessionStatus = 'paused';
        },
        resumeSession: (state) => {
            state.sessionStatus = 'in_progress';
        },
        completeSession: (state) => {
            state.sessionStatus = 'completed';
            state.endTime = new Date().toISOString();
            if (state.startTime) {
                state.duration = new Date(state.endTime) - new Date(state.startTime);
            }
        },
        nextQuestion: (state) => {
            if (state.currentQuestionIndex < state.questions.length - 1) {
                state.currentQuestionIndex += 1;
                state.currentQuestion = state.questions[state.currentQuestionIndex];
            }
        },
        previousQuestion: (state) => {
            if (state.currentQuestionIndex > 0) {
                state.currentQuestionIndex -= 1;
                state.currentQuestion = state.questions[state.currentQuestionIndex];
            }
        },
        addResponse: (state, action) => {
            const response = {
                questionId: action.payload.questionId,
                questionIndex: state.currentQuestionIndex,
                response: action.payload.response,
                timeSpent: action.payload.timeSpent,
                confidence: action.payload.confidence || 0.5,
                timestamp: new Date().toISOString()
            };
            const existingIndex = state.responses.findIndex(r => r.questionIndex === state.currentQuestionIndex);
            if (existingIndex >= 0) {
                state.responses[existingIndex] = response;
            } else {
                state.responses.push(response);
            }
        },
        setMediaStream: (state, action) => {
            state.mediaStream = action.payload;
        },
        setRecording: (state, action) => {
            state.isRecording = action.payload;
        },
        addRecordedChunk: (state, action) => {
            state.recordedChunks.push(action.payload);
        },
        clearRecordedChunks: (state) => {
            state.recordedChunks = [];
        },
        updateSettings: (state, action) => {
            state.settings = { ...state.settings, ...action.payload };
        },
        resetSession: (state) => {
            state.currentSession = null;
            state.sessionStatus = 'idle';
            state.currentQuestion = null;
            state.currentQuestionIndex = 0;
            state.questions = [];
            state.responses = [];
            state.startTime = null;
            state.endTime = null;
            state.duration = 0;
            state.isRecording = false;
            state.mediaStream = null;
            state.recordedChunks = [];
        }
    }
});

export const {
    createSession,
    startSession,
    pauseSession,
    resumeSession,
    completeSession,
    nextQuestion,
    previousQuestion,
    addResponse,
    setMediaStream,
    setRecording,
    addRecordedChunk,
    clearRecordedChunks,
    updateSettings,
    resetSession
} = interviewSlice.actions;

export default interviewSlice.reducer;