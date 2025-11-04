
import React from 'react';

interface UploaderProps {
    onFileChange: (file: File) => void;
    imagePreviewUrl: string | null;
}

export const Uploader: React.FC<UploaderProps> = ({ onFileChange, imagePreviewUrl }) => {
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            onFileChange(event.target.files[0]);
        }
    };
    
    return (
        <div className="w-full">
            <label htmlFor="file-upload" className="cursor-pointer">
                <div className={`relative group w-full h-64 md:h-full min-h-[256px] border-2 border-dashed border-gray-600 rounded-xl flex items-center justify-center transition-all duration-300 hover:border-purple-500 hover:bg-gray-700/50 ${imagePreviewUrl ? 'p-0 border-solid' : 'p-4'}`}>
                    {imagePreviewUrl ? (
                        <img src={imagePreviewUrl} alt="Preview" className="w-full h-full object-cover rounded-xl" />
                    ) : (
                        <div className="text-center text-gray-400">
                             <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            <span className="font-semibold">Click to upload an image</span>
                            <p className="text-sm">PNG, JPG, or WEBP</p>
                        </div>
                    )}
                    <div className="absolute inset-0 bg-black/50 rounded-xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <span className="text-white font-bold text-lg">{imagePreviewUrl ? 'Change Image' : 'Select Image'}</span>
                    </div>
                </div>
            </label>
            <input
                id="file-upload"
                type="file"
                className="hidden"
                accept="image/png, image/jpeg, image/webp"
                onChange={handleInputChange}
            />
        </div>
    );
};
