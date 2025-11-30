# 🚀 Quick Start Guide

Follow these steps to get GreenVerse up and running in 15 minutes!

## ⚡ Step 1: Install Dependencies

### Frontend Dependencies
```powershell
npm install
```

### Backend Dependencies
```powershell
cd backend
npm install
cd ..
```

## 🗄️ Step 2: Set Up Supabase Database

1. **Create Supabase Account**
   - Go to https://supabase.com
   - Sign up for a free account
   - Click "New Project"

2. **Create Project**
   - Name: `greenverse`
   - Database Password: Choose a strong password
   - Region: Select closest to you
   - Click "Create new project"
   - Wait 2-3 minutes for setup

3. **Run Database Schema**
   - In Supabase dashboard, click "SQL Editor" in left sidebar
   - Click "New query"
   - Open `backend/database/schema.sql` in VS Code
   - Copy ALL the content (Ctrl+A, Ctrl+C)
   - Paste into Supabase SQL Editor
   - Click "Run" button
   - You should see success message

## 🔑 Step 3: Get Supabase Credentials

1. In Supabase dashboard, click "Settings" (gear icon in left sidebar)
2. Click "API" in the settings menu
3. Copy these values:
   - **Project URL** (looks like: https://xxxxx.supabase.co)
   - **anon public** key
   - **service_role** key (click "Reveal" to see it)

## ⚙️ Step 4: Configure Environment Variables

### Frontend .env (create in root folder)
Create a file named `.env` in the root folder with:
```bash
VITE_API_URL=http://localhost:5000/api
```

### Backend .env (create in backend folder)
Create a file named `.env` in the `backend` folder with:
```bash
SUPABASE_URL=your_project_url_here
SUPABASE_ANON_KEY=your_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
JWT_SECRET=generate_random_32_character_string
PORT=5000
FRONTEND_URL=http://localhost:5173
```

**Generate JWT Secret:**
Run this command in PowerShell:
```powershell
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```
Copy the output and paste as JWT_SECRET

## 🏃 Step 5: Start the Servers

### Terminal 1 - Backend Server
```powershell
cd backend
npm run dev
```
✅ You should see: "Server running on http://localhost:5000"

### Terminal 2 - Frontend Server (open new terminal)
```powershell
npm run dev
```
✅ You should see: "Local: http://localhost:5173"

## 🎉 Step 6: Test the Application

1. **Open Browser**
   - Go to http://localhost:5173

2. **Test Login**
   - Click "Login" in navigation
   - Use default admin account:
     - Email: `admin@greenverse.com`
     - Password: `admin123`
   - You should be redirected to Admin Dashboard

3. **Test Signup**
   - Click "Sign Up"
   - Create a new client account
   - Check if you receive success message

## 🔧 Troubleshooting

### "Cannot connect to database"
- Verify Supabase credentials in `backend/.env`
- Check if schema.sql ran successfully in Supabase SQL Editor

### "CORS error"
- Ensure `FRONTEND_URL` in backend .env matches your frontend URL
- Restart backend server after changing .env

### "Token expired" or "Unauthorized"
- Check if JWT_SECRET is set in backend .env
- Try logging out and logging in again

### Backend won't start
- Make sure you're in the `backend` folder when running `npm run dev`
- Check if port 5000 is not already in use

### Frontend won't start
- Delete `node_modules` folder and run `npm install` again
- Clear browser cache (Ctrl+Shift+Delete)

## 📊 What's Included in Sample Data

After running the schema, you'll have:
- 1 Admin user (admin@greenverse.com / admin123)
- 5 Products (banana fiber plates and packaging)
- 3 Cluster locations
- Sample impact metrics

## 🔐 Default Accounts

Only the admin account is pre-created. You need to sign up for client and cluster accounts.

**Admin:**
- Email: admin@greenverse.com
- Password: admin123

## 🎯 Next Steps

1. **Explore Admin Dashboard**
   - View products, orders, users
   - Check sales analytics
   - Monitor impact metrics

2. **Create Client Account**
   - Sign up as a client
   - Browse products
   - Place test orders

3. **Customize**
   - Update company info in About page
   - Add more products via Admin Dashboard
   - Update impact metrics

## 📁 Important Files

- `backend/server.js` - Backend entry point
- `backend/.env` - Backend configuration (create this)
- `.env` - Frontend configuration (create this)
- `backend/database/schema.sql` - Database structure
- `src/services/api.js` - Frontend API calls

## 💡 Tips

- Keep both terminals running (backend and frontend)
- Use VS Code's split terminal feature (click + icon in terminal)
- Check browser console (F12) for any errors
- Backend logs will show API requests in real-time

## 🆘 Need Help?

If you encounter issues:
1. Check the `backend/SETUP.md` for detailed setup instructions
2. Review the main `README.md` for complete documentation
3. Ensure all environment variables are correctly set
4. Verify Supabase project is running (green status in dashboard)

---

**Ready to go! Your GreenVerse application should now be running!** 🌱✨
