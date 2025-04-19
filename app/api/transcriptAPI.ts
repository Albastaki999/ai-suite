import axiosInstance from "./axiosInstance";

const transcriptAPI = async (url: string) => {

    try {
        const response = await axiosInstance.get("/summarize", {
            params: { url: url }, // Correct way to send query parameters
        }); 
        return response.data;
    } catch (error: any) {
        console.log(error);
        return { error: error.response?.data.error || "Unexpected error occured." };
    }
};
export default transcriptAPI;