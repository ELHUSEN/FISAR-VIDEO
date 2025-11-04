
import { GoogleGenAI } from "@google/genai";
import type { AspectRatio, VeoOperation } from '../types';

// Utility to introduce a delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const generateVideo = async (
    imageBase64: string,
    prompt: string,
    aspectRatio: AspectRatio,
    updateLoadingMessage: (message: string) => void
): Promise<string> => {
    
    if (!process.env.API_KEY) {
        throw new Error("API key is not available. Please select a key.");
    }
    
    // Create a new instance right before the call to ensure the latest key is used.
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

    try {
        updateLoadingMessage("Initiating video generation with Veo...");
        let operation: VeoOperation = await ai.models.generateVideos({
            model: 'veo-3.1-fast-generate-preview',
            prompt: prompt,
            image: {
                imageBytes: imageBase64,
                mimeType: 'image/jpeg', // Assuming jpeg, could be png as well
            },
            config: {
                numberOfVideos: 1,
                resolution: '720p',
                aspectRatio: aspectRatio
            }
        });

        updateLoadingMessage("Video processing has started. This may take several minutes...");
        
        let pollCount = 0;
        while (!operation.done) {
            pollCount++;
            await delay(10000); // Poll every 10 seconds
            updateLoadingMessage(`Checking video status (Attempt ${pollCount})...`);
            operation = await ai.operations.getVideosOperation({ operation: operation });
        }

        if (operation.response?.generatedVideos?.[0]?.video?.uri) {
            updateLoadingMessage("Video generated successfully! Fetching file...");
            const downloadLink = operation.response.generatedVideos[0].video.uri;
            
            // The download URI needs the API key appended
            const videoResponse = await fetch(`${downloadLink}&key=${process.env.API_KEY}`);

            if (!videoResponse.ok) {
                throw new Error(`Failed to download video file. Status: ${videoResponse.statusText}`);
            }

            const videoBlob = await videoResponse.blob();
            updateLoadingMessage("Video is ready to play!");
            return URL.createObjectURL(videoBlob);

        } else {
            throw new Error("Video generation completed, but no video URI was found.");
        }

    } catch (error: any) {
        console.error("Error in generateVideo service:", error);
        if (error.message && error.message.includes("API key not valid")) {
            throw new Error("The selected API Key is not valid. Please choose another one.");
        }
        throw error;
    }
};
