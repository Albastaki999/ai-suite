import axiosInstance from "./axiosInstance";

const sendEmail = async (
    to: string,
    subject: string,
    username: string,
    password: string,
    body: string
) => {

    try {
        const response = await axiosInstance.post("/send", {}, {
            params: { to, subject, username, password, body },
        });
        return response.data;
    } catch (error: any) {
        console.log(error);
        return { error: error.response?.data.error || "Unexpected error occured." };
    }
};
export default sendEmail;