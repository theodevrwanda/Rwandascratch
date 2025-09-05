# API Endpoints Documentation

This document outlines all the API endpoints required for the RwandaScratch website backend.

## Base URL
```
http://localhost:8000/api
```

## Authentication
All endpoints are public - no authentication required for content management APIs.

---

## About Content

### Get About Content
```http
GET /about
```

**Response:**
```json
{
  "id": 1,
  "story": "Our story content...",
  "mission": "Our mission statement...",
  "vision": "Our vision statement...",
  "created_at": "2024-01-01T00:00:00Z",
  "updated_at": "2024-01-01T00:00:00Z"
}
```

### Update About Content
```http
PUT /about
```

**Request Body:**
```json
{
  "story": "Updated story content...",
  "mission": "Updated mission statement...",
  "vision": "Updated vision statement..."
}
```

---

## Projects

### Get All Projects
```http
GET /projects
```

**Response:**
```json
[
  {
    "id": 1,
    "name": "Project Name",
    "type": "Web Application",
    "description": "Project description...",
    "technologies": ["React", "Node.js", "MongoDB"],
    "authors": ["John Doe", "Jane Smith"],
    "live_link": "https://example.com",
    "github_link": "https://github.com/example/project",
    "image": "https://example.com/image.jpg",
    "featured": true,
    "created_at": "2024-01-01T00:00:00Z",
    "updated_at": "2024-01-01T00:00:00Z"
  }
]
```

### Get Project by ID
```http
GET /projects/{id}
```

### Create Project
```http
POST /projects
```

**Request Body:**
```json
{
  "name": "Project Name",
  "type": "Web Application",
  "description": "Project description...",
  "technologies": ["React", "Node.js"],
  "authors": ["John Doe"],
  "live_link": "https://example.com",
  "github_link": "https://github.com/example/project",
  "image": "https://example.com/image.jpg",
  "featured": false
}
```

### Update Project
```http
PUT /projects/{id}
```

### Delete Project
```http
DELETE /projects/{id}
```

---

## Events

### Get All Events
```http
GET /events
```

**Response:**
```json
[
  {
    "id": 1,
    "name": "Event Name",
    "description": "Event description...",
    "image": "https://example.com/image.jpg",
    "date": "2024-12-25T00:00:00Z",
    "location": "Kigali, Rwanda",
    "authors": ["John Doe"],
    "created_at": "2024-01-01T00:00:00Z",
    "updated_at": "2024-01-01T00:00:00Z"
  }
]
```

### Create Event
```http
POST /events
```

**Request Body:**
```json
{
  "name": "Event Name",
  "description": "Event description...",
  "image": "https://example.com/image.jpg",
  "date": "2024-12-25T00:00:00Z",
  "location": "Kigali, Rwanda",
  "authors": ["John Doe"]
}
```

### Update Event
```http
PUT /events/{id}
```

### Delete Event
```http
DELETE /events/{id}
```

---

## Blog

### Get All Blog Posts
```http
GET /blog
```

**Response:**
```json
[
  {
    "id": 1,
    "title": "Blog Post Title",
    "content": "Blog post content...",
    "excerpt": "Short excerpt...",
    "image": "https://example.com/image.jpg",
    "author": "John Doe",
    "published": true,
    "created_at": "2024-01-01T00:00:00Z",
    "updated_at": "2024-01-01T00:00:00Z"
  }
]
```

### Create Blog Post
```http
POST /blog
```

**Request Body:**
```json
{
  "title": "Blog Post Title",
  "content": "Blog post content...",
  "excerpt": "Short excerpt...",
  "image": "https://example.com/image.jpg",
  "author": "John Doe",
  "published": true
}
```

### Update Blog Post
```http
PUT /blog/{id}
```

### Delete Blog Post
```http
DELETE /blog/{id}
```

---

## Team

### Get All Team Members
```http
GET /team
```

**Response:**
```json
[
  {
    "id": 1,
    "name": "John Doe",
    "username": "johndoe",
    "role": "Full Stack Developer",
    "bio": "Experienced developer...",
    "image": "https://example.com/avatar.jpg",
    "portfolio_link": "https://johndoe.dev",
    "github": "https://github.com/johndoe",
    "linkedin": "https://linkedin.com/in/johndoe",
    "twitter": "https://twitter.com/johndoe",
    "featured": true,
    "created_at": "2024-01-01T00:00:00Z",
    "updated_at": "2024-01-01T00:00:00Z"
  }
]
```

### Create Team Member
```http
POST /team
```

**Request Body:**
```json
{
  "name": "John Doe",
  "username": "johndoe",
  "role": "Full Stack Developer",
  "bio": "Experienced developer...",
  "image": "https://example.com/avatar.jpg",
  "portfolio_link": "https://johndoe.dev",
  "github": "https://github.com/johndoe",
  "linkedin": "https://linkedin.com/in/johndoe",
  "twitter": "https://twitter.com/johndoe",
  "featured": false
}
```

### Update Team Member
```http
PUT /team/{id}
```

### Delete Team Member
```http
DELETE /team/{id}
```

---

## Contact

### Submit Contact Message
```http
POST /contact
```

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "subject": "Inquiry about services",
  "message": "I'm interested in your web development services..."
}
```

### Get All Contact Messages (Admin)
```http
GET /contact
```

**Response:**
```json
[
  {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "subject": "Inquiry about services",
    "message": "I'm interested in your web development services...",
    "status": "unread",
    "created_at": "2024-01-01T00:00:00Z",
    "updated_at": "2024-01-01T00:00:00Z"
  }
]
```

### Update Contact Message Status
```http
PUT /contact/{id}
```

**Request Body:**
```json
{
  "status": "read"
}
```

---

## Website Requests

### Submit Website Request
```http
POST /website-requests
```

**Request Body:**
```json
{
  "first_name": "John",
  "last_name": "Doe",
  "email": "john@example.com",
  "phone": "+250123456789",
  "company": "Example Corp",
  "website": "https://example.com",
  "description": "I need a new website...",
  "budget": "$5000-$10000",
  "timeline": "3-6 months",
  "features": ["E-commerce", "Blog", "Contact Forms"],
  "images": ["https://example.com/ref1.jpg", "https://example.com/ref2.jpg"]
}
```

### Get All Website Requests (Admin)
```http
GET /website-requests
```

**Response:**
```json
[
  {
    "id": 1,
    "first_name": "John",
    "last_name": "Doe",
    "email": "john@example.com",
    "phone": "+250123456789",
    "company": "Example Corp",
    "website": "https://example.com",
    "description": "I need a new website...",
    "budget": "$5000-$10000",
    "timeline": "3-6 months",
    "features": ["E-commerce", "Blog", "Contact Forms"],
    "images": ["https://example.com/ref1.jpg", "https://example.com/ref2.jpg"],
    "status": "pending",
    "created_at": "2024-01-01T00:00:00Z",
    "updated_at": "2024-01-01T00:00:00Z"
  }
]
```

### Update Website Request Status
```http
PUT /website-requests/{id}
```

**Request Body:**
```json
{
  "status": "in-progress"
}
```

---

## File Upload

### Upload Single Image
```http
POST /upload/image
```

**Request:** `multipart/form-data`
- `image`: File

**Response:**
```json
{
  "url": "https://example.com/uploads/image.jpg",
  "filename": "image.jpg",
  "size": 1024576
}
```

### Upload Multiple Images
```http
POST /upload/multiple
```

**Request:** `multipart/form-data`
- `images`: File[] (multiple files)

**Response:**
```json
{
  "urls": [
    "https://example.com/uploads/image1.jpg",
    "https://example.com/uploads/image2.jpg"
  ],
  "count": 2
}
```

---

## Error Responses

All endpoints return appropriate HTTP status codes:

- `200` - Success
- `201` - Created
- `400` - Bad Request
- `404` - Not Found
- `500` - Internal Server Error

**Error Response Format:**
```json
{
  "error": "Error message",
  "details": "Detailed error information"
}
```

---

## Notes

1. All dates are in ISO 8601 format (UTC)
2. Images should be publicly accessible URLs
3. Arrays in JSON should be properly formatted
4. File uploads support common image formats (jpg, png, gif, webp)
5. Maximum file size for uploads: 10MB per file
6. For website requests, the `status` field can be: `pending`, `in-progress`, `completed`, `cancelled`
7. For contact messages, the `status` field can be: `unread`, `read`, `replied`