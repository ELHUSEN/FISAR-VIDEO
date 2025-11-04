
import React from 'react';

interface ApiKeySelectorProps {
    onSelectKey: () => void;
}

export const ApiKeySelector: React.FC<ApiKeySelectorProps> = ({ onSelectKey }) => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center bg-gray-900">
            <div className="max-w-md p-8 bg-gray-800 rounded-2xl shadow-xl border border-gray-700">
                 <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto mb-4 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H5v-2H3v-2H1v-4a6 6 0 017.743-5.743z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H5v-2H3v-2H1v-4a6 6 0 017.743-5.743z" />
                </svg>
                <h2 className="text-2xl font-bold text-white mb-2">API Key Required</h2>
                <p className="text-gray-400 mb-6">
                    This application requires a Google AI API key to generate videos with Veo. Please select a key to continue.
                </p>
                <button
                    onClick={onSelectKey}
                    className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-purple-500/50"
                >
                    Select Your API Key
                </button>
                <p className="text-xs text-gray-500 mt-4">
                    Video generation may incur costs. For more details, please see the{' '}
                    <a
                        href="https://ai.google.dev/gemini-api/docs/billing"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-purple-400 hover:underline"
                    >
                        billing documentation
                    </a>.
                </p>
            </div>
        </div>
    );
};
