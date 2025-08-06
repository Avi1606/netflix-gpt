import { createSlice } from "@reduxjs/toolkit";

const questionBankSlice = createSlice({
    name: 'questionBank',
    initialState: {
        questions: [],
        categories: [
            { id: 'TECHNICAL', name: 'Technical', subcategories: ['DATA_STRUCTURES', 'ALGORITHMS', 'SYSTEM_DESIGN', 'CODING'] },
            { id: 'BEHAVIORAL', name: 'Behavioral', subcategories: ['LEADERSHIP', 'TEAMWORK', 'PROBLEM_SOLVING', 'COMMUNICATION'] },
            { id: 'HR', name: 'HR', subcategories: ['BACKGROUND', 'MOTIVATION', 'CAREER_GOALS', 'COMPANY_FIT'] },
            { id: 'SITUATIONAL', name: 'Situational', subcategories: ['CONFLICT_RESOLUTION', 'DECISION_MAKING', 'PRESSURE', 'ADAPTABILITY'] }
        ],
        difficulties: ['BEGINNER', 'INTERMEDIATE', 'ADVANCED'],
        jobRoles: ['Software Engineer', 'Full Stack Developer', 'Frontend Developer', 'Backend Developer', 'Data Scientist', 'Product Manager'],
        selectedCategory: null,
        selectedDifficulty: null,
        selectedJobRole: null,
        filteredQuestions: [],
        loading: false,
        error: null
    },
    reducers: {
        setQuestions: (state, action) => {
            state.questions = action.payload;
            state.filteredQuestions = action.payload;
        },
        addQuestion: (state, action) => {
            state.questions.push({
                ...action.payload,
                id: Date.now().toString(),
                createdAt: new Date().toISOString(),
                isActive: true
            });
            state.filteredQuestions = state.questions;
        },
        updateQuestion: (state, action) => {
            const index = state.questions.findIndex(q => q.id === action.payload.id);
            if (index >= 0) {
                state.questions[index] = { ...state.questions[index], ...action.payload };
            }
        },
        deleteQuestion: (state, action) => {
            state.questions = state.questions.filter(q => q.id !== action.payload);
            state.filteredQuestions = state.filteredQuestions.filter(q => q.id !== action.payload);
        },
        setSelectedCategory: (state, action) => {
            state.selectedCategory = action.payload;
            questionBankSlice.caseReducers.filterQuestions(state);
        },
        setSelectedDifficulty: (state, action) => {
            state.selectedDifficulty = action.payload;
            questionBankSlice.caseReducers.filterQuestions(state);
        },
        setSelectedJobRole: (state, action) => {
            state.selectedJobRole = action.payload;
            questionBankSlice.caseReducers.filterQuestions(state);
        },
        filterQuestions: (state) => {
            let filtered = state.questions.filter(q => q.isActive);
            
            if (state.selectedCategory) {
                filtered = filtered.filter(q => q.category === state.selectedCategory);
            }
            
            if (state.selectedDifficulty) {
                filtered = filtered.filter(q => q.difficulty === state.selectedDifficulty);
            }
            
            if (state.selectedJobRole) {
                filtered = filtered.filter(q => 
                    !q.jobRoles || q.jobRoles.length === 0 || q.jobRoles.includes(state.selectedJobRole)
                );
            }
            
            state.filteredQuestions = filtered;
        },
        clearFilters: (state) => {
            state.selectedCategory = null;
            state.selectedDifficulty = null;
            state.selectedJobRole = null;
            state.filteredQuestions = state.questions.filter(q => q.isActive);
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        }
    }
});

export const {
    setQuestions,
    addQuestion,
    updateQuestion,
    deleteQuestion,
    setSelectedCategory,
    setSelectedDifficulty,
    setSelectedJobRole,
    filterQuestions,
    clearFilters,
    setLoading,
    setError
} = questionBankSlice.actions;

export default questionBankSlice.reducer;