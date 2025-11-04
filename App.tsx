
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { generateVideo } from './services/geminiService';
import type { AspectRatio } from './types';
import { ApiKeySelector } from './components/ApiKeySelector';
import { Uploader } from './components/Uploader';
import { ResultDisplay } from './components/ResultDisplay';
import { Loader } from './components/Loader';
import { AspectRatioSelector } from './components/AspectRatioSelector';
import { GenerateButton } from './components/GenerateButton';

// FIX: Removed the `declare global` block for `window.aistudio` as it was causing a TypeScript
// type conflict. The necessary types are assumed to be provided by the global execution environment.
const App: React.FC = () => {
    const [apiKeySelected, setApiKeySelected] = useState<boolean>(false);
    const [isCheckingApiKey, setIsCheckingApiKey] = useState<boolean>(true);
    
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imageBase64, setImageBase64] = useState<string | null>(null);
    const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);
    
    const [aspectRatio, setAspectRatio] = useState<AspectRatio>('9:16');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [loadingMessage, setLoadingMessage] = useState<string>('');
    const [videoUrl, setVideoUrl] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    const prompt = useMemo(() => "buatkan gadis dalam image upload melaksanakan ritual persembahan di PURA BALI tepi pantai dan mempersiapkan segala sesembahan dengan rapi dan gemulai, memberi rasa khidmat atas persembahan yang dilaksanakan, gunakan audio GAMELAN JAWA BALI dalam iringan alur cinema.", []);

    const loadingMessages = useMemo(() => [
        "Connecting to the Veo model...",
        "Analyzing the image...",
        "Crafting the ritual scene...",
        "Adding the sounds of Gamelan...",
        "Rendering the video (this may take a few minutes)...",
        "Polishing the cinematic shots...",
        "Almost there, finalizing the masterpiece...",
    ], []);

    useEffect(() => {
        const checkApiKey = async () => {
            if (window.aistudio) {
                try {
                    const hasKey = await window.aistudio.hasSelectedApiKey();
                    setApiKeySelected(hasKey);
                } catch (e) {
                    console.error("Error checking API key status:", e);
                    setApiKeySelected(false);
                }
            } else {
                // For local development or if aistudio is not available
                setApiKeySelected(true); 
            }
            setIsCheckingApiKey(false);
        };
        checkApiKey();
    }, []);

    const handleSelectKey = useCallback(async () => {
        if (window.aistudio) {
            try {
                await window.aistudio.openSelectKey();
                setApiKeySelected(true); 
            } catch (e) {
                console.error("Error opening API key selection:", e);
                setError("Could not open the API key selection dialog. Please try again.");
            }
        }
    }, []);

    const handleFileChange = useCallback((file: File) => {
        setImageFile(file);
        setVideoUrl(null);
        setError(null);

        const reader = new FileReader();
        reader.onloadend = () => {
            const base64String = (reader.result as string).split(',')[1];
            setImageBase64(base64String);
            setImagePreviewUrl(URL.createObjectURL(file));
        };
        reader.readAsDataURL(file);
    }, []);

    const resetState = useCallback(() => {
        setImageFile(null);
        setImageBase64(null);
        setImagePreviewUrl(null);
        setVideoUrl(null);
        setError(null);
        setIsLoading(false);
    }, []);

    const handleGenerateVideo = useCallback(async () => {
        if (!imageBase64) {
            setError("Please upload an image first.");
            return;
        }

        setIsLoading(true);
        setError(null);
        setVideoUrl(null);
        
        let messageIndex = 0;
        setLoadingMessage(loadingMessages[messageIndex]);
        const interval = setInterval(() => {
            messageIndex = (messageIndex + 1) % loadingMessages.length;
            setLoadingMessage(loadingMessages[messageIndex]);
        }, 5000);

        try {
            const url = await generateVideo(imageBase64, prompt, aspectRatio, (msg) => setLoadingMessage(msg));
            setVideoUrl(url);
        } catch (e: any) {
            console.error(e);
            const errorMessage = e.message || "An unknown error occurred during video generation.";
            if (errorMessage.includes("Requested entity was not found")) {
                 setError("API Key is invalid. Please select a valid key.");
                 setApiKeySelected(false);
            } else {
                 setError(errorMessage);
            }
        } finally {
            setIsLoading(false);
            clearInterval(interval);
        }
    }, [imageBase64, prompt, aspectRatio, loadingMessages]);

    if (isCheckingApiKey) {
        return <div className="flex items-center justify-center min-h-screen"><Loader message="Verifying API Key..." /></div>;
    }

    if (!apiKeySelected) {
        return <ApiKeySelector onSelectKey={handleSelectKey} />;
    }

    return (
        <div className="min-h-screen bg-gray-900 text-gray-200 flex flex-col items-center p-4 sm:p-6 lg:p-8">
            <div className="w-full max-w-4xl mx-auto">
                <header className="text-center mb-8">
                    <h1 className="text-4xl sm:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
                        Pura Bali Video Generator
                    </h1>
                    <p className="mt-2 text-lg text-gray-400">
                        Transform your photo into a cinematic Balinese ritual.
                    </p>
                </header>

                <main className="bg-gray-800/50 p-6 rounded-2xl shadow-2xl backdrop-blur-sm border border-gray-700">
                    {isLoading ? (
                        <Loader message={loadingMessage} />
                    ) : videoUrl ? (
                        <ResultDisplay videoUrl={videoUrl} onReset={resetState} />
                    ) : (
                        <div className="flex flex-col md:flex-row gap-6">
                            <div className="flex-1">
                                <Uploader onFileChange={handleFileChange} imagePreviewUrl={imagePreviewUrl} />
                            </div>
                            <div className="flex-1 flex flex-col justify-between">
                                <div>
                                    <h2 className="text-xl font-semibold mb-4 text-purple-300">Configuration</h2>
                                    <AspectRatioSelector selectedRatio={aspectRatio} onSelectRatio={setAspectRatio} />
                                    {error && <div className="mt-4 text-red-400 bg-red-900/50 p-3 rounded-lg">{error}</div>}
                                </div>
                                <GenerateButton 
                                    onClick={handleGenerateVideo} 
                                    disabled={!imageFile || isLoading} 
                                />
                            </div>
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
};

export default App;