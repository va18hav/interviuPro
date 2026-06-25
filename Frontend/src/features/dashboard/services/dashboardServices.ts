import axios from "axios"
import { apiClient } from "../../../utils/apiClient";

export const getProfile = async () => {
    try {
        const response = await apiClient.get('/profile/getProfile')
        return response.data
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            return error.response.data
        }
        else {
            return { success: false, message: 'An Unexpected error occured' }
        }
    }
}

