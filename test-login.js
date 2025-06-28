const axios = require('axios');

const testLogin = async () => {
  try {
    console.log('Testing login functionality...');
    
    // Create axios instance with cookie handling
    const api = axios.create({
      baseURL: 'https://medirural.onrender.com',
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    // Test admin login
    const adminLoginResponse = await api.post('/api/users/login', {
      email: 'patil@medirural.com',
      password: '123456'
    });
    
    console.log('Admin login response:', adminLoginResponse.data);
    
    // Wait a moment for cookie to be set
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Test profile retrieval
    const profileResponse = await api.get('/api/users/profile');
    
    console.log('Profile response:', profileResponse.data);
    
  } catch (error) {
    console.error('Test failed:', error.response?.data || error.message);
  }
};

testLogin(); 