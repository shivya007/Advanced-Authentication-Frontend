import axios from 'axios';

const API_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

export const signupUser = async (data) => {
    try {
        const response = await axios.post(`${API_URL}/api/users/register`, data, {
            withCredentials: true,
        });

        return response.data;
    } catch (error) {
        throw error.response || { message: "Signup failed" };
    }
}

export const loginUser = async (data) =>{
    try {
        const response = await axios.post(`${API_URL}/api/users/login`, data);
        return response.data;
    } catch (error) {
        throw error.response || { message: "Login failed" };
    }
}

export const verifyOtp = async (data) =>{
    try {
        const response = await axios.post(`${API_URL}/api/users/verify-otp`, data, {
            withCredentials: true,
        });
        return response.data;
    } catch (error) {
        throw error.response || { message: "OTP verification failed" };
        
    }
}


export const getProfile = async () =>{
    try {
        const response = await axios.get(`${API_URL}/api/users/profile`, {
            withCredentials: true,
        });
        return response;

    } catch (error) {
        throw { 
            message: error?.response?.data?.message || error.message,
            status: error?.response?.status || 500,
        };
        
    }
}

export const logoutUser = async () =>{
    try{
        const response = await axios.post(`${API_URL}/api/users/logout`, {}, {
            withCredentials: true,
        });

        return response;
    }
    catch(error){
        throw new Error(error || "Logout failed");
    }
}

export const refreshAccessToken = async() =>{
    try {
        const response = await axios.post(`${API_URL}/api/users/refresh-token`, {}, {
            withCredentials: true,
        });
        return response;
    } catch (error) {
        throw new Error(error || "Generating new access token failed");
    }
}


export const forgotPassword = async (data) =>{
    try {
        const response = await axios.post(`${API_URL}/api/users/forgot-password`, data);
        return response.data;
    } catch (error) {
        throw error.response.data || { message: "Failed to send reset link" };

    }
}

export const verifyOTPPassword = async (data) =>{
    try {
        const response = await axios.post(`${API_URL}/api/users/verify-reset-otp`, data);
        return response.data;
    } catch (error) {
        throw error.response.data || { message: "Failed to verify OTP" };    
    }
}


export const resetPassword = async (data) =>{
    try {
        const response = await axios.post(`${API_URL}/api/users/reset-password`, data);
        return response.data;
    } catch (error) {
        throw error.response.data || { message: "Failed to reset password" };
    }
}