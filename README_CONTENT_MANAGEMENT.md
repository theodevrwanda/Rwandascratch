# Content Management Guide - RwandaScratch Website

This guide helps you manage content through the Firebase admin dashboard.

## Firebase Collections Structure

### 1. about_content
Manages About page content:
```json
{
  "story": "Our Story content...",
  "mission": "Our Mission statement...",
  "vision": "Our Vision statement...",
  "updatedAt": "timestamp",
  "updatedBy": "user_id"
}
```

### 2. projects
Manages portfolio projects:
```json
{
  "title": "Project Name",
  "description": "Project description...",
  "imageUrl": "https://example.com/image.jpg",
  "techStack": ["React", "Node.js", "MongoDB"],
  "category": "web-app",
  "links": {
    "live": "https://project.com",
    "github": "https://github.com/user/project"
  },
  "featured": true,
  "isActive": true,
  "createdAt": "timestamp"
}
```

### 3. services
Manages service offerings:
```json
{
  "title": "Service Name",
  "description": "Service description...",
  "icon": "Code",
  "price": 500000,
  "currency": "RWF",
  "features": [
    {
      "name": "Feature 1",
      "included": true
    },
    {
      "name": "6 months support",
      "included": true
    }
  ],
  "popular": false,
  "isActive": true,
  "category": "development"
}
```

### 4. events
Manages events and workshops:
```json
{
  "title": "Event Name",
  "description": "Event description...",
  "date": "2024-12-01",
  "time": "10:00 AM",
  "location": "Kigali, Rwanda",
  "imageUrl": "https://example.com/event.jpg",
  "type": "workshop",
  "isActive": true,
  "featured": false
}
```

### 5. blog_posts
Manages blog content:
```json
{
  "title": "Blog Post Title",
  "excerpt": "Short description...",
  "content": "Full blog content...",
  "author": "Author Name",
  "imageUrl": "https://example.com/blog.jpg",
  "category": "technology",
  "tags": ["react", "javascript"],
  "published": true,
  "publishedAt": "timestamp",
  "readTime": 5
}
```

### 6. contact_messages
Stores contact form submissions:
```json
{
  "name": "Contact Name",
  "email": "contact@email.com",
  "subject": "Message Subject",
  "message": "Message content...",
  "submittedAt": "timestamp",
  "status": "unread"
}
```

### 7. website_requests
Stores website project requests:
```json
{
  "name": "Client Name",
  "email": "client@email.com",
  "company": "Company Name",
  "projectType": "Business Website",
  "budget": "100,000 - 250,000 RWF",
  "description": "Project description...",
  "submittedAt": "timestamp",
  "status": "pending"
}
```

### 8. website_info
Manages AI chat context data:
```json
{
  "companyName": "RwandaScratch",
  "description": "Company description...",
  "services": ["Web Development", "Mobile Apps"],
  "contact": {
    "email": "hello@rwandascratch.com",
    "phone": "+250 788 123 456",
    "address": "Kigali, Rwanda"
  },
  "updatedAt": "timestamp"
}
```

## How to Add/Update Content

### Through Admin Dashboard:
1. Login to admin dashboard at `/admin`
2. Navigate to the relevant section
3. Use the forms to add/edit content
4. Content is automatically saved to Firebase

### Manual Firebase Console:
1. Go to Firebase Console
2. Select your project
3. Navigate to Firestore Database
4. Find the collection you want to update
5. Add/edit documents following the structure above

## Environment Variables Setup

Create a `.env` file with:
```
VITE_FIREBASE_API_KEY=your-firebase-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=your-app-id

VITE_EMAILJS_SERVICE_ID=your-emailjs-service-id
VITE_EMAILJS_TEMPLATE_ID=your-emailjs-template-id
VITE_EMAILJS_PUBLIC_KEY=your-emailjs-public-key

VITE_GEMINI_API_KEY=your-gemini-api-key
```

## Features Management

### Service Features
Each service can have multiple features with toggle options:
- ✅ Included features (green checkmark)
- ❌ Not included features (red X)
- Popular services can be marked with a badge

### Content Status
- All content has `isActive` or `published` flags
- Inactive content won't show on public pages
- Content shows "not yet" when missing or inactive

## AI Chat Context
The website info collection provides context for the AI chat:
- Company information
- Available services
- Contact details
- Recent updates

Update this through the admin dashboard to keep AI responses current.