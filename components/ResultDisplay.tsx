
import React from 'react';

interface ResultDisplayProps {
    videoUrl: string;
    onReset: () => void;
}

export const ResultDisplay: React.FC<ResultDisplayProps> = ({ videoUrl, onReset }) => {
    return (
        <div className="flex flex-col items-center">
            <h2 className="text-2xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-green-300 to-blue-400">Video Generated Successfully!</h2>
            <div className="w-full max-w-2xl rounded-xl overflow-hidden shadow-lg border border-purple-500/50">
                <video src={videoUrl} controls autoPlay loop className="w-full" />
            </div>
            <button
                onClick={onReset}
                className="mt-6 flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-purple-500/50"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h5M20 20v-5h-5" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 11a8 8 0 0114.53-3.03l-1.5 1.5A6 6 0 006 12.03V11zm16-1a8 8 0 01-14.53 3.03l1.5-1.5A6 6 0 0018 11.97V13z" />
                </svg>
                Create Another Video
            </button>
        </div>
    );
};
