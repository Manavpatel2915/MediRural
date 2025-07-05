import { auth, googleProvider } from '../config/firebase';

export const testFirebaseConfig = () => {
  try {
    // Check if Firebase is initialized
    if (!auth) {
      throw new Error('Firebase auth not initialized');
    }

    // Check if Google provider is configured
    if (!googleProvider) {
      throw new Error('Google provider not configured');
    }

    // Check environment variables
    const requiredEnvVars = [
      'VITE_FIREBASE_API_KEY',
      'VITE_FIREBASE_AUTH_DOMAIN',
      'VITE_FIREBASE_PROJECT_ID',
      'VITE_FIREBASE_STORAGE_BUCKET',
      'VITE_FIREBASE_MESSAGING_SENDER_ID',
      'VITE_FIREBASE_APP_ID'
    ];

    const missingVars = requiredEnvVars.filter(varName => !process.env[varName]);
    
    if (missingVars.length > 0) {
      throw new Error(`Missing environment variables: ${missingVars.join(', ')}`);
    }

    console.log('✅ Firebase configuration is valid');
    return true;
  } catch (error) {
    console.error('❌ Firebase configuration error:', error.message);
    return false;
  }
}; 