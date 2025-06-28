const axios = require('axios');

const testServerStatus = async () => {
  try {
    console.log('Testing server status...');
    
    // Test server health
    const healthResponse = await axios.get('https://medirural.onrender.com/');
    console.log('Server health response:', healthResponse.data);
    
    // Test login with admin credentials
    console.log('\nTesting login...');
    const loginResponse = await axios.post('https://medirural.onrender.com/api/users/login', {
      email: 'patil@medirural.com',
      password: '123456'
    }, {
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    console.log('Login response status:', loginResponse.status);
    console.log('Login response data:', loginResponse.data);
    
    if (loginResponse.data.success) {
      console.log('Login successful!');
      
      // Test profile with cookie
      const profileResponse = await axios.get('https://medirural.onrender.com/api/users/profile', {
        withCredentials: true,
        headers: {
          'Cookie': `token=${loginResponse.data.token}`
        }
      });
      
      console.log('Profile response:', profileResponse.data);
    }
    
  } catch (error) {
    console.error('Error details:');
    console.error('Status:', error.response?.status);
    console.error('Status Text:', error.response?.statusText);
    console.error('Data:', error.response?.data);
    console.error('Headers:', error.response?.headers);
    console.error('Message:', error.message);
  }
};

testServerStatus(); 