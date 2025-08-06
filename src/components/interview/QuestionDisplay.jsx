const QuestionDisplay = ({ question }) => {
    if (!question) {
        return (
            <div className="bg-gray-900 rounded-lg p-6 text-center">
                <p className="text-gray-400">No question available</p>
            </div>
        );
    }

    return (
        <div className="bg-gray-900 rounded-lg p-6">
            <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                    <span className="text-sm bg-blue-600 text-white px-2 py-1 rounded">
                        {question.category}
                    </span>
                    <span className="text-sm text-gray-400">
                        {Math.floor(question.timeLimit / 60)}:{(question.timeLimit % 60).toString().padStart(2, '0')} suggested
                    </span>
                </div>
                
                {question.subcategory && (
                    <span className="text-xs bg-gray-700 text-gray-300 px-2 py-1 rounded">
                        {question.subcategory.replace('_', ' ')}
                    </span>
                )}
            </div>

            <h3 className="text-xl font-semibold text-white mb-4">
                {question.question}
            </h3>

            {question.followUpQuestions && question.followUpQuestions.length > 0 && (
                <div className="mb-4">
                    <h4 className="text-sm font-medium text-gray-300 mb-2">Follow-up questions:</h4>
                    <ul className="text-sm text-gray-400 space-y-1">
                        {question.followUpQuestions.map((followUp, index) => (
                            <li key={index} className="flex items-start">
                                <span className="text-blue-400 mr-2">•</span>
                                {followUp}
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {question.expectedAnswerPoints && question.expectedAnswerPoints.length > 0 && (
                <div className="mt-4 p-4 bg-gray-800 rounded-lg">
                    <h4 className="text-sm font-medium text-gray-300 mb-2">Key points to consider:</h4>
                    <ul className="text-sm text-gray-400 space-y-1">
                        {question.expectedAnswerPoints.map((point, index) => (
                            <li key={index} className="flex items-start">
                                <span className="text-green-400 mr-2">✓</span>
                                {point}
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            <div className="mt-4 text-center">
                <p className="text-gray-400 text-sm">
                    Take your time to think and provide a comprehensive answer
                </p>
            </div>
        </div>
    );
};

export default QuestionDisplay;