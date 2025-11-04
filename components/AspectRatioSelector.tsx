
import React from 'react';
import type { AspectRatio } from '../types';

interface AspectRatioSelectorProps {
    selectedRatio: AspectRatio;
    onSelectRatio: (ratio: AspectRatio) => void;
}

export const AspectRatioSelector: React.FC<AspectRatioSelectorProps> = ({ selectedRatio, onSelectRatio }) => {
    return (
        <div>
            <p className="mb-2 font-medium text-gray-300">Aspect Ratio</p>
            <div className="flex gap-4">
                <button
                    onClick={() => onSelectRatio('9:16')}
                    className={`flex-1 flex items-center justify-center gap-2 p-3 rounded-lg border-2 transition-all ${selectedRatio === '9:16' ? 'bg-purple-600 border-purple-500 text-white' : 'bg-gray-700 border-gray-600 hover:border-purple-500'}`}
                >
                    <div className="w-4 h-7 border-2 rounded-sm"></div>
                    <span>9:16 (Portrait)</span>
                </button>
                <button
                    onClick={() => onSelectRatio('16:9')}
                    className={`flex-1 flex items-center justify-center gap-2 p-3 rounded-lg border-2 transition-all ${selectedRatio === '16:9' ? 'bg-purple-600 border-purple-500 text-white' : 'bg-gray-700 border-gray-600 hover:border-purple-500'}`}
                >
                    <div className="w-7 h-4 border-2 rounded-sm"></div>
                    <span>16:9 (Landscape)</span>
                </button>
            </div>
        </div>
    );
};
