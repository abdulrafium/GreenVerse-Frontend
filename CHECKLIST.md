# ✅ GreenVerse Setup Checklist

Use this checklist to track your setup progress.

## 📦 Installation

- [ ] Node.js installed (v18 or higher)
- [ ] npm or pnpm installed
- [ ] Cloned repository
- [ ] Frontend dependencies installed (`npm install`)
- [ ] Backend dependencies installed (`cd backend && npm install`)

## 🗄️ Database Setup

- [ ] Created Supabase account at https://supabase.com
- [ ] Created new Supabase project
- [ ] Waited for project to be ready (2-3 minutes)
- [ ] Opened SQL Editor in Supabase dashboard
- [ ] Copied content from `backend/database/schema.sql`
- [ ] Pasted and ran SQL in Supabase SQL Editor
- [ ] Verified tables created successfully
- [ ] Checked sample data loaded (users, products, clusters)

## 🔑 Supabase Credentials

- [ ] Navigated to Settings → API in Supabase
- [ ] Copied Project URL
- [ ] Copied `anon public` key
- [ ] Revealed and copied `service_role` key
- [ ] Generated JWT secret using: `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`

## ⚙️ Environment Configuration

### Frontend (.env in root folder)
- [ ] Created `.env` file in root folder
- [ ] Added: `VITE_API_URL=http://localhost:5000/api`

### Backend (backend/.env)
- [ ] Created `.env` file in `backend` folder
- [ ] Added `SUPABASE_URL=your_project_url`
- [ ] Added `SUPABASE_ANON_KEY=your_anon_key`
- [ ] Added `SUPABASE_SERVICE_ROLE_KEY=your_service_role_key`
- [ ] Added `JWT_SECRET=your_generated_secret`
- [ ] Added `PORT=5000`
- [ ] Added `FRONTEND_URL=http://localhost:5173`

## 🚀 Server Startup

### Backend
- [ ] Opened terminal
- [ ] Navigated to backend folder: `cd backend`
- [ ] Started server: `npm run dev`
- [ ] Verified message: "Server running on http://localhost:5000"
- [ ] Verified message: "Connected to Supabase"
- [ ] Tested health endpoint: http://localhost:5000/api/health

### Frontend
- [ ] Opened new terminal (keep backend running)
- [ ] In root folder, ran: `npm run dev`
- [ ] Verified message: "Local: http://localhost:5173"
- [ ] Opened browser to http://localhost:5173

## 🧪 Testing

### Home Page
- [ ] Home page loads successfully
- [ ] Statistics display (even if default values)
- [ ] No console errors (F12)

### Authentication
- [ ] Clicked "Login" button
- [ ] Entered admin credentials:
  - Email: `admin@greenverse.com`
  - Password: `admin123`
- [ ] Successfully logged in
- [ ] Redirected to admin dashboard
- [ ] Checked localStorage has `token` (F12 → Application → Local Storage)

### Sign Up
- [ ] Clicked "Sign Up"
- [ ] Filled registration form
- [ ] Selected account type (Client or Cluster)
- [ ] Successfully registered
- [ ] Received success message
- [ ] Redirected to login page

### Dashboard
- [ ] Admin dashboard displays
- [ ] Can navigate between dashboard pages
- [ ] Statistics load from database
- [ ] Charts render properly

## 🔍 Troubleshooting

If any step fails, check:

### Backend Issues
- [ ] Port 5000 not in use
- [ ] `.env` file exists in backend folder
- [ ] All environment variables set correctly
- [ ] Supabase credentials valid
- [ ] Schema ran successfully in Supabase

### Frontend Issues
- [ ] Port 5173 not in use
- [ ] `.env` file exists in root folder
- [ ] `VITE_API_URL` points to backend
- [ ] Backend server is running

### Database Issues
- [ ] Supabase project status is green
- [ ] SQL schema ran without errors
- [ ] Tables visible in Table Editor
- [ ] Sample data present in tables

### Authentication Issues
- [ ] JWT_SECRET is set in backend .env
- [ ] Token stored in localStorage after login
- [ ] Backend logs show successful authentication

## 📚 Documentation Review

- [ ] Read QUICKSTART.md
- [ ] Reviewed README.md
- [ ] Checked IMPLEMENTATION_SUMMARY.md
- [ ] Backend SETUP.md for detailed API docs

## 🎯 Optional: Advanced Setup

- [ ] Updated company information in About page
- [ ] Added more products via Admin Dashboard
- [ ] Created test client accounts
- [ ] Placed test orders
- [ ] Explored all dashboard features
- [ ] Customized color scheme
- [ ] Updated impact metrics

## 🚢 Deployment (Optional)

### Backend Deployment
- [ ] Created account on Railway/Render/Heroku
- [ ] Created new project
- [ ] Connected Git repository
- [ ] Set environment variables
- [ ] Deployed backend
- [ ] Verified deployment URL works

### Frontend Deployment
- [ ] Created account on Vercel/Netlify
- [ ] Imported repository
- [ ] Set build command: `npm run build`
- [ ] Set output directory: `dist`
- [ ] Added environment variable: `VITE_API_URL=<backend-url>/api`
- [ ] Deployed frontend
- [ ] Tested production site

## ✅ Setup Complete!

Once all checkboxes are marked, your GreenVerse application is fully operational!

### Default Admin Access
- Email: admin@greenverse.com
- Password: admin123

### Support
- Email: greenverse@gmail.com
- Phone: +92 333 3886321

---

**Congratulations! You've successfully set up GreenVerse! 🌱🎉**
