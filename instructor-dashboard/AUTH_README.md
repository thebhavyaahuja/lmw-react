# Authentication System

This application now includes a complete authentication system with the following features:

## Features Implemented

### 1. User Management

- **User Types**: Instructor and Learner roles
- **User Data**: First name, last name, email, password, and user type
- **JSON Storage**: Simple file-based storage in `data/users.json`

### 2. Authentication Flow

- **Signup**: Create new accounts with user type selection
- **Login**: Email/password authentication
- **Logout**: Secure logout with confirmation dialog
- **Session Management**: Client-side session storage with localStorage

### 3. Route Protection

- **Protected Routes**: Dashboard (instructor-only), Chat (both types)
- **Automatic Redirects**: Users redirected based on their role
- **Landing Page**: Shows auth modals for unauthenticated users

### 4. UI Components

- **Auth Modal**: Combined login/signup modal with role selection
- **Route Guard**: Component for protecting routes
- **User Display**: Shows user info and type in header
- **Logout Confirmation**: Alert dialog for secure logout

## API Endpoints

- `POST /api/auth/signup` - Create new user account
- `POST /api/auth/login` - Authenticate user
- `POST /api/auth/logout` - Logout user

## Usage

### Test Accounts

You can use these test credentials:

**Instructor Account:**

- Email: hrishirajmitra@gmail.com
- Password: Hrishiraj007

**Create New Account:**

- Visit the landing page
- Click "Sign Up"
- Fill in your details and select user type
- Choose between "Instructor" or "Learner"

### User Flow

1. **Unauthenticated users** see the landing page with login/signup buttons
2. **Instructors** are redirected to `/dashboard` after login
3. **Learners** are redirected to `/chat` after login
4. **All authenticated users** can access the chat page
5. **Only instructors** can access dashboard, courses, editor, etc.

### Logout

- Click on your profile in the header
- Select "Sign out"
- Confirm in the dialog that appears
- You'll be redirected to the landing page

## File Structure

```
lib/
  auth.ts                 # User management functions
hooks/
  use-auth.tsx           # Authentication context and hooks
components/
  auth-modal.tsx         # Login/signup modal
  route-guard.tsx        # Route protection component
  app-header.tsx         # Updated with user info and logout
app/
  api/auth/
    login/route.ts       # Login API
    signup/route.ts      # Signup API
    logout/route.ts      # Logout API
data/
  users.json            # User storage file
```

## Security Notes

⚠️ **This is a development/MVP implementation:**

- Passwords are stored in plain text
- No encryption or hashing
- File-based storage is not production-ready
- No session validation on server side

For production, consider:

- Password hashing (bcrypt)
- JWT tokens
- Database storage
- Server-side session validation
- Rate limiting
- HTTPS enforcement
