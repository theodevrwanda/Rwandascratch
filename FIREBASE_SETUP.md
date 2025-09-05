# Firebase Setup Guide for RwandaScratch Website

This guide will help you set up Firebase Authentication and Firestore Database for your website's content management system.

## Prerequisites
- A Google account
- Access to Firebase Console

## Step 1: Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Click "Create a project"
3. Enter project name: `rwandascratch-website`
4. Continue and optionally enable Google Analytics
5. Click "Create project"

## Step 2: Configure Authentication

1. In Firebase Console, navigate to **Authentication**
2. Click "Get started"
3. Go to **Sign-in method** tab
4. Enable **Email/Password** provider
5. Enable **Google** provider and add your authorized domain
6. Add your website domain to authorized domains list

## Step 3: Setup Firestore Database

1. Navigate to **Firestore Database**
2. Click "Create database"
3. Start in **Test mode** (we'll configure security rules later)
4. Select your preferred location
5. Click "Done"

## Step 4: Get Configuration Keys

1. Go to **Project Settings** (gear icon)
2. Scroll to "Your apps" section
3. Click **Web app** icon (`</>`)
4. Register app with nickname: `rwandascratch-web`
5. Copy the configuration object
6. Replace values in `src/lib/firebase.ts`:

```javascript
const firebaseConfig = {
  apiKey: "your-api-key-here",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "your-app-id"
};
```

## Step 5: Create Admin User

### Method 1: Through Firebase Console
1. Go to **Authentication** > **Users**
2. Add user with your email
3. Note the User UID

### Method 2: Self-register then promote
1. Use the login form on your website
2. It will fail but create the auth user
3. Follow Method 1 to get the UID

### Create User Document in Firestore
1. Go to **Firestore Database**
2. Create collection: `users`
3. Create document with User UID as document ID
4. Add fields:
   ```json
   {
     "email": "your-email@example.com",
     "displayName": "Your Name",
     "role": "admin",
     "isActive": true,
     "createdAt": "current timestamp"
   }
   ```

## Step 6: Initialize Collections

Create these collections in Firestore with sample documents:

### 1. `site_content` Collection
```json
{
  "section": "hero",
  "title": "Building the Future of African Tech",
  "subtitle": "Empowering Innovation",
  "description": "RwandaScratch empowers students, businesses, and entrepreneurs...",
  "imageUrl": "https://your-image-url.jpg",
  "isActive": true,
  "updatedAt": "current timestamp",
  "updatedBy": "admin-uid"
}
```

### 2. `services` Collection
```json
{
  "title": "Web Development",
  "description": "Modern websites and web applications",
  "features": ["Responsive Design", "SEO Ready"],
  "icon": "globe",
  "price": "150000",
  "currency": "RWF",
  "isActive": true,
  "order": 1
}
```

### 3. `projects` Collection
```json
{
  "title": "Mbox",
  "description": "Movie streaming platform",
  "techStack": ["PHP", "MySQL"],
  "imageUrl": "https://project-image.jpg",
  "liveDemo": "#",
  "github": "#",
  "category": "web",
  "isActive": true,
  "order": 1
}
```

## Step 7: Configure Security Rules

Replace default Firestore rules with:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can read their own user document
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
      allow read: if request.auth != null && 
        resource.data.role == 'admin' || 
        request.auth.uid in resource.data.admins;
    }
    
    // Public read access to content
    match /{collection}/{document} {
      allow read: if true;
      allow write: if request.auth != null && 
        exists(/databases/$(database)/documents/users/$(request.auth.uid)) &&
        get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
    }
  }
}
```

## Step 8: Test the System

1. Open your website
2. Click the "Login" button in the navbar
3. Use your configured admin email and password
4. You should be redirected and see "Admin Dashboard" in the user menu
5. Navigate to `/admin` to access the dashboard

## Troubleshooting

### Authentication Issues
- Check if your domain is in authorized domains
- Verify Firebase config keys are correct
- Ensure user document exists in Firestore

### Permission Issues
- Verify user role is set to "admin"
- Check Firestore security rules
- Ensure user document has isActive: true

### Database Issues
- Check Firestore rules syntax
- Verify collection names match the code
- Ensure proper document structure

## Features Included

### Authentication
- ✅ Email/Password login
- ✅ Google OAuth login
- ✅ User existence validation
- ✅ Role-based access control
- ✅ Login state persistence

### Admin Dashboard
- ✅ Content management system
- ✅ Analytics overview
- ✅ User management
- 🔄 Services management (coming soon)
- 🔄 Projects management (coming soon)
- 🔄 Events management (coming soon)
- 🔄 Blog management (coming soon)

### Content Management
- ✅ Site content sections (hero, about, etc.)
- ✅ Image URL management
- ✅ Active/inactive content control
- ✅ Real-time updates

## Next Steps

Once Firebase is configured and working:

1. **Populate Content**: Use the admin dashboard to manage your website content
2. **Add Team Members**: Create additional admin users as needed
3. **Customize Sections**: Modify the content sections to match your needs
4. **Implement Remaining Features**: The framework is ready for services, projects, events, and blog management

## Support

If you encounter issues:
1. Check the browser console for error messages
2. Verify Firebase configuration
3. Test with the Firebase Console to ensure data is being saved
4. Review the troubleshooting section above

The system is now ready for full content management!