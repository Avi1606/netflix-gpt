import React from 'react';

const ErrorMessage = () => {
    return (
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50">
            <div className="bg-gray-900 p-6 sm:p-8 rounded-lg shadow-2xl max-w-md mx-4 text-center">
                <h2 className="text-red-500 text-xl sm:text-2xl font-bold mb-4">
                    API Access Error
                </h2>
                <p className="text-gray-300 mb-4">
                    Unable to fetch movie data. This might be due to network restrictions in your region.
                </p>
                <div className="bg-gray-800 p-4 rounded-lg mb-4">
                    <p className="text-yellow-400 font-semibold mb-2">Recommended Solutions:</p>
                    <ul className="text-gray-300 text-left list-disc list-inside space-y-2">
                        <li>Use a VPN service</li>
                        <li>Check your network connection</li>
                        <li>Try accessing from a different network</li>
                    </ul>
                </div>
                <button 
                    onClick={() => window.location.reload()}
                    className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg transition-colors duration-200"
                >
                    Try Again
                </button>
            </div>
        </div>
    );
};

export default ErrorMessage; 