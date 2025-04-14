import axiosInstance from "./axiosInstance";

const genEmail = async (prompt: string) => {

    try {
        const response = await axiosInstance.get("/generate-email-prompt", {
            params: { prompt: prompt }, // Correct way to send query parameters
        }); 
        return response.data;
    } catch (error: any) {
        console.log(error);
        return { error: error.response?.data.error || "Unexpected error occured." };
    }
};
export default genEmail;