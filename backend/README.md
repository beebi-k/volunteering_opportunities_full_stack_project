# Volunteer Opportunities Hub - Backend API

## Project Overview

This is the backend API for the Volunteer Opportunities Hub application. It provides RESTful endpoints for managing users, organizations, opportunities, applications, and user progress tracking.

## Tech Stack

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **Supabase** - Database and authentication
- **JWT** - Authentication tokens
- **bcryptjs** - Password hashing
- **CORS** - Cross-origin resource sharing

## Features

- User authentication (register, login, profile management)
- Organization management
- Opportunity listing and filtering
- Application tracking
- User progress and statistics
- Badge system
- Daily schedule management
- Reviews and ratings

## Database Schema

### Tables

1. **users** - User accounts and profiles
2. **organizations** - Volunteer organizations
3. **opportunities** - Volunteer opportunities
4. **applications** - User applications for opportunities
5. **user_progress** - Track user volunteer hours and progress
6. **badges** - Available badges
7. **user_badges** - Badges earned by users
8. **daily_schedules** - User daily schedules
9. **reviews** - Organization reviews

## Installation

1. Clone the repository
```bash
git clone <repository-url>
cd volunteer-hub/backend
```

2. Install dependencies
```bash
npm install
```

3. Configure environment variables
```bash
cp .env.example .env
```

Edit `.env` file with your Supabase credentials:
```
SUPABASE_URL=your_supabase_project_url
SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRE=7d
PORT=5001
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
```

4. Setup Supabase database
- Create a new project on [Supabase](https://supabase.com)
- Run the SQL schema from `config/supabase-schema.sql` in the Supabase SQL editor
- Run the seed data from `config/seed-data.sql` to populate sample data

5. Start the server
```bash
npm run dev
```

The API will be available at `http://localhost:5001`

## API Documentation

### Authentication Endpoints

#### Register User
```http
POST /api/auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123",
  "full_name": "John Doe",
  "phone": "+91-9876543210",
  "bio": "Passionate about volunteering",
  "location": "Mumbai, Maharashtra",
  "skills": ["Teaching", "Communication"],
  "interests": ["Education", "Environment"]
}
```

#### Login User
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}
```

#### Get Current User
```http
GET /api/auth/me
Authorization: Bearer <token>
```

#### Update Profile
```http
PUT /api/auth/profile
Authorization: Bearer <token>
Content-Type: application/json

{
  "full_name": "John Doe",
  "phone": "+91-9876543210",
  "bio": "Updated bio",
  "location": "Mumbai, Maharashtra",
  "skills": ["Teaching", "Communication", "Leadership"],
  "interests": ["Education", "Environment", "Child Welfare"]
}
```

### Organization Endpoints

#### Get All Organizations
```http
GET /api/organizations?category=Education&city=Mumbai&search=teach
```

#### Get Single Organization
```http
GET /api/organizations/:id
```

#### Get Categories
```http
GET /api/organizations/categories
```

### Opportunity Endpoints

#### Get All Opportunities
```http
GET /api/opportunities?category=Education&city=Mumbai&is_remote=false&search=teaching
```

#### Get Single Opportunity
```http
GET /api/opportunities/:id
```

#### Apply for Opportunity
```http
POST /api/opportunities/:id/apply
Authorization: Bearer <token>
Content-Type: application/json

{
  "cover_letter": "I am passionate about this cause...",
  "motivation": "I want to make a difference...",
  "availability": "Weekends, 4 hours per week"
}
```

#### Get User Applications
```http
GET /api/opportunities/user/applications?status=accepted
Authorization: Bearer <token>
```

### User Endpoints

#### Get Dashboard Stats
```http
GET /api/users/dashboard
Authorization: Bearer <token>
```

#### Get User Badges
```http
GET /api/users/badges
Authorization: Bearer <token>
```

#### Get User Progress
```http
GET /api/users/progress
Authorization: Bearer <token>
```

#### Get User Schedule
```http
GET /api/users/schedule?start_date=2024-02-01&end_date=2024-02-29
Authorization: Bearer <token>
```

#### Create Schedule
```http
POST /api/users/schedule
Authorization: Bearer <token>
Content-Type: application/json

{
  "date": "2024-02-05",
  "opportunity_id": "uuid",
  "task_title": "Teaching Session",
  "task_description": "Conduct reading session",
  "start_time": "10:00:00",
  "end_time": "12:00:00",
  "notes": "Bring reading materials"
}
```

#### Update Schedule
```http
PUT /api/users/schedule/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "status": "completed",
  "notes": "Session completed successfully"
}
```

#### Delete Schedule
```http
DELETE /api/users/schedule/:id
Authorization: Bearer <token>
```

## Database Schema Explanation

### Users Table
- Stores user account information
- Includes skills, interests, and volunteer statistics
- Tracks total hours and opportunities completed

### Organizations Table
- Stores organization details
- Includes location data for Google Maps integration
- Categories and subcategories for filtering
- Rating and review system

### Opportunities Table
- Links to organizations
- Detailed opportunity information
- Location and remote work options
- Application tracking (positions available/filled)

### Applications Table
- Links users to opportunities
- Tracks application status
- Stores cover letters and motivation

### User Progress Table
- Tracks volunteer hours contributed
- Links to opportunities and organizations
- Status tracking (in_progress, completed)
- Feedback and ratings

### Badges Table
- Available badges for users
- Requirements for earning badges
- Categories and colors

### User Badges Table
- Links users to earned badges
- Timestamp of when badge was earned

### Daily Schedules Table
- User's daily volunteer schedule
- Links to opportunities
- Time tracking and status

### Reviews Table
- User reviews for organizations
- Rating system (1-5 stars)
- Anonymous option

## Deployment

### Deploy to Render

1. Create a new Web Service on Render
2. Connect your GitHub repository
3. Configure build settings:
   - Build Command: `npm install`
   - Start Command: `node server.js`
4. Add environment variables in Render dashboard
5. Deploy

The API will be available at: `https://your-app-name.onrender.com`

## Demo User

Email: `demo@volunteerhub.com`
Password: `demo123`

## Error Handling

All errors follow this format:
```json
{
  "success": false,
  "message": "Error message",
  "stack": "Error stack trace (development only)",
  "details": "Additional error details"
}
```

## License

MIT License