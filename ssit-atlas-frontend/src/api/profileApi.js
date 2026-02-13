import api from './axios';

// Get current user's profile
export const getProfile = async () => {
    const response = await api.get('/profile');
    return response.data;
};

// Update user profile
export const updateProfile = async (data) => {
    const response = await api.put('/profile', data);
    return response.data;
};

// Upload profile photo
export const uploadProfilePhoto = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    const response = await api.post('/profile/photo', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
    });
    return response.data;
};

// Delete profile photo
export const deleteProfilePhoto = async () => {
    await api.delete('/profile/photo');
};

// Get profile completion status
export const getCompletionStatus = async () => {
    const response = await api.get('/profile/completion-status');
    return response.data;
};
