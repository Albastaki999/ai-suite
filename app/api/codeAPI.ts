import axiosInstance from "./axiosInstance";

// Utility to remove <think>...</think> tags
const stripThinkTag = (text: string): string => {
    return text.replace(/<think>.*?<\/think>/gs, '').trim();
};

const codeAPI = async (prompt: string): Promise<string | { error: string }> => {
    try {
        const response = await axiosInstance.get("/code", {
            params: { message: prompt },
        });

        const raw = response.data.response || response.data;
        const cleaned = stripThinkTag(raw);

        return cleaned;

    } catch (error: any) {
        console.log("codeAPI error:", error);
        return { error: error.response?.data.error || "Unexpected error occurred." };
    }
};

export default codeAPI;
