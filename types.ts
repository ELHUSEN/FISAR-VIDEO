
export type AspectRatio = '16:9' | '9:16';

// This is a simplified type for the Veo operation.
// The actual type from the SDK might be more complex.
export interface VeoOperation {
    done: boolean;
    response?: {
        generatedVideos?: {
            video?: {
                uri: string;
            };
        }[];
    };
    // Add other properties as needed from the actual SDK type
    [key: string]: any;
}
