# Fix RLS Policy Error - Quick Guide

## Problem
Error: `new row violates row-level security policy for table "client_profiles"`

This occurs because the SQL file uses Supabase Auth's `auth.uid()`, but your app uses custom JWT authentication.

## Solution

### Option 1: Disable RLS (Simplest - Recommended for Development)

1. Open Supabase SQL Editor: https://app.supabase.com/project/YOUR_PROJECT/sql
2. Run the SQL file: `backend/database/fix_rls_policies.sql`
3. This disables RLS on `client_profiles` and `order_items` tables
4. Your backend JWT middleware handles all security

### Option 2: Use Service Role Key (For Production)

1. Add your Supabase Service Role Key to `.env`:
   ```env
   SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here
   ```
   
2. Find your service role key at:
   https://app.supabase.com/project/YOUR_PROJECT/settings/api

3. Backend code already updated to use `supabaseAdmin` which bypasses RLS

## Files Updated

✅ `backend/routes/profile.js` - Now uses `supabaseAdmin`
✅ `backend/routes/orders.js` - Now uses `supabaseAdmin` for profile checks
✅ `backend/database/fix_rls_policies.sql` - SQL script to disable RLS

## Test the Fix

1. **Stop your backend server** (Ctrl+C in the terminal)
2. **Run ONE of these options:**
   - **Option 1:** Run `fix_rls_policies.sql` in Supabase SQL Editor
   - **Option 2:** Add `SUPABASE_SERVICE_ROLE_KEY` to your `.env` file
3. **Restart backend:** `cd backend; node server.js`
4. **Test profile save:** Go to `/client/profile` and save your profile

## Expected Result

✅ No more RLS policy errors
✅ Profile saves successfully
✅ Can place orders with complete profile

## Security Note

- **Development:** Disabling RLS is fine since your backend API handles auth
- **Production:** Either keep RLS disabled (backend handles security) OR use service role key
- Your JWT `authenticateToken` middleware already protects all routes
- Only authenticated users with correct role can access their own data

## Next Steps

After fixing RLS:
1. Complete your profile at `/client/profile`
2. Test placing an order at `/client/place-order`
3. Verify order appears in `/client/my-orders`
