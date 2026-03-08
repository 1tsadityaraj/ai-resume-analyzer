import axios from 'axios';

const API_BASE_URL = 'http://localhost:5001/api';

export const analyzeResume = async (file, jobDescription) => {
    const formData = new FormData();
    formData.append('resume', file);
    formData.append('jobDescription', jobDescription);

    const response = await axios.post(`${API_BASE_URL}/resume/analyze`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });

    return response.data;
};
