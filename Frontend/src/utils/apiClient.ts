import axios from "axios"

export const apiClient = axios.create({
    baseURL: 'http://localhost:3000',
    withCredentials: true
})

apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        const status = error.response?.status;
        const message =
            error.response?.data?.message ||
            error.message ||
            "Something went wrong";

        // Global redirect if email is not verified
        if (status === 403 && message === "Email is not verified") {
            window.location.href = "/verify-email";
        }

        return Promise.reject(new Error(message));
    }
)