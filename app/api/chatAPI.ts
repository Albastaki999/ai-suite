import axiosInstance from "./axiosInstance";

// Utility to remove <think>...</think> tags
const stripThinkTag = (text: string): string => {
    return text.replace(/<think>.*?<\/think>/gs, '').trim();
};

const chatAPI = async (prompt: string): Promise<string | { error: string }> => {
    try {
        const response = await axiosInstance.get("/chat", {
            params: { message: prompt },
        });

        // Some models return a response object with a field, others just raw text
        const raw = response.data.response || response.data;

        const cleaned = stripThinkTag(raw);
        console.log("Raw model output:", raw);


        return cleaned;

    } catch (error: any) {
        console.log("chatAPI error:", error);
        return { error: error.response?.data.error || "Unexpected error occurred." };
    }
};

export default chatAPI;
