import axiosInstance from "./axiosInstance";

const questionsAPI = async (topic: string, no: number, difficulty: string) => {

    try {
        const response = await axiosInstance.get("/generate-questions", {
            params: { topic: topic, no: no, difficulty: difficulty }, // Correct way to send query parameters
        });
        return response.data;
    } catch (error: any) {
        console.log(error);
        return { error: error.response?.data.error || "Unexpected error occured." };
    }
};
export default questionsAPI;