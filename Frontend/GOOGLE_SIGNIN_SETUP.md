# Google Sign-In Setup Instructions

## Prerequisites
- Firebase project with Google Authentication enabled
- Firebase configuration details

## Setup Steps

### 1. Update Firebase Configuration
Replace the placeholder values in `src/config/firebase.js` with your actual Firebase configuration:

```javascript
const firebaseConfig = {
  apiKey: "YOUR_ACTUAL_API_KEY",
  authDomain: "YOUR_ACTUAL_AUTH_DOMAIN",
  projectId: "YOUR_ACTUAL_PROJECT_ID",
  storageBucket: "YOUR_ACTUAL_STORAGE_BUCKET",
  messagingSenderId: "YOUR_ACTUAL_MESSAGING_SENDER_ID",
  appId: "YOUR_ACTUAL_APP_ID"
};
```

### 2. Firebase Console Setup
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project
3. Go to Authentication > Sign-in method
4. Enable Google as a sign-in provider
5. Add your authorized domains (localhost for development, your domain for production)

### 3. Backend Setup
The backend routes have been updated to handle Google authentication:
- `/api/users/google-auth` - Handles Google authentication
- `/api/users/complete-google-profile` - Completes user profile with phone number

### 4. Database Changes
The User model has been updated to:
- Make phone number optional for Google users
- Add `googleId` field for Google users
- Add `profilePicture` field
- Make password optional for Google users

## How It Works

### Flow for New Google Users:
1. User clicks "Sign in with Google"
2. Google authentication popup appears
3. User authenticates with Google
4. Backend creates new user account with Google data
5. If user doesn't have phone number, mobile number modal appears
6. User enters phone number
7. Profile is completed and user is logged in

### Flow for Existing Google Users:
1. User clicks "Sign in with Google"
2. Google authentication popup appears
3. User authenticates with Google
4. Backend finds existing user and logs them in
5. User is redirected to appropriate page

### Flow for Users with Existing Email:
1. User clicks "Sign in with Google"
2. Google authentication popup appears
3. User authenticates with Google
4. Backend finds user by email and links Google account
5. User is logged in

## Features

- ✅ Seamless Google Sign-In
- ✅ Automatic account creation for new users
- ✅ Mobile number collection for new Google users
- ✅ Account linking for existing email users
- ✅ Maintains existing email/password login
- ✅ Responsive design with loading states
- ✅ Error handling and user feedback

## Security Features

- JWT token-based authentication
- Secure cookie handling
- Google ID token verification
- Input validation and sanitization
- CSRF protection through same-site cookies

## Testing

1. Test with new Google accounts
2. Test with existing email accounts
3. Test mobile number collection flow
4. Test error scenarios (network issues, invalid tokens)
5. Test on different devices and browsers

## Troubleshooting

### Common Issues:
1. **"Firebase not initialized"** - Check Firebase config values
2. **"Google sign-in failed"** - Verify Google provider is enabled in Firebase
3. **"Invalid domain"** - Add your domain to authorized domains in Firebase
4. **"Token not found"** - Check localStorage and cookie settings

### Debug Steps:
1. Check browser console for errors
2. Verify Firebase configuration
3. Check network requests in browser dev tools
4. Verify backend routes are accessible
5. Check database connection and user model

## Production Deployment

1. Update Firebase config with production values
2. Add production domain to Firebase authorized domains
3. Update backend URL in frontend code
4. Test all authentication flows in production environment
5. Monitor authentication logs in Firebase console 