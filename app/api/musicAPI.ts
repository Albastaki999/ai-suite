import axiosInstance from "./axiosInstance";

const musicAPI = async (prompt: string) => {
    try {
        const response = await axiosInstance.get("/generate-music", {
            params: { prompt },
            responseType: "blob", // 👈 Important: tells Axios to treat response as binary data (audio)
        });

        return response.data; // This will be a Blob representing the WAV audio
    } catch (error: any) {
        console.error(error);
        return { error: error.response?.data?.error || "Unexpected error occurred." };
    }
};

export default musicAPI;
