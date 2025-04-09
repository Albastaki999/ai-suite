import axiosInstance from "./axiosInstance";

const imageAPI = async (prompt: string) => {
    try {
        const response = await axiosInstance.get("/generate", {
            params: { prompt },
            responseType: "blob", // 👈 Ensure the response is treated as an image blob
        });
        return response.data;
    } catch (error: any) {
        console.error(error);
        return { error: error.response?.data?.error || "Unexpected error occurred." };
    }
};

export default imageAPI;
