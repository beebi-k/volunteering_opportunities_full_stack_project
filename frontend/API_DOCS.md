# VolunteerHub India - API Documentation

## Base URL
`http://localhost:3000/api`

## Authentication
- `POST /auth/register` - Register a new user
- `POST /auth/login` - Login and get JWT token

## Users
- `GET /users/profile` - Get current user profile (Auth required)
- `GET /users/stats` - Get volunteer stats and badges (Auth required)

## Organizations
- `GET /organizations` - List all verified NGOs (Filters: city, focus)
- `GET /organizations/:id` - Get NGO details

## Opportunities
- `GET /opportunities` - List all volunteer opportunities (Filters: category, city)
- `GET /opportunities/:id` - Get opportunity details

## Applications
- `POST /applications` - Apply for an opportunity (Auth required)
- `GET /applications/my-applications` - Get user's applications (Auth required)

## Admin (Internal)
- `GET /admin/stats` - System-wide analytics
- `POST /admin/approve-org/:id` - Approve an NGO
