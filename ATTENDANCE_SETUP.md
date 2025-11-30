# Attendance Feature Setup Guide

## Database Setup

Run this SQL in your Supabase SQL Editor:

```sql
-- Add employee_id column to attendance table
ALTER TABLE attendance ADD COLUMN IF NOT EXISTS employee_id UUID REFERENCES employees(id) ON DELETE CASCADE;

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_attendance_employee_id ON attendance(employee_id);
CREATE INDEX IF NOT EXISTS idx_attendance_date ON attendance(date);
CREATE INDEX IF NOT EXISTS idx_attendance_cluster_date ON attendance(cluster_id, date);

-- Update status constraint to include 'Leave'
ALTER TABLE attendance DROP CONSTRAINT IF EXISTS attendance_status_check;
ALTER TABLE attendance ADD CONSTRAINT attendance_status_check 
  CHECK (status IN ('Present', 'Absent', 'Leave', 'Half Day'));
```

Or run the file: `backend/database/update_attendance_schema.sql`

## Features

✅ **Fetch employees** from database by cluster
✅ **Mark attendance** with Present/Absent/Leave options
✅ **Date selection** for attendance marking
✅ **Real-time statistics**: Total, Present, Absent, Leave counts
✅ **Present percentage** calculation
✅ **Color-coded status badges**
✅ **Today's attendance display**
✅ **Update existing attendance** for same date

## API Endpoints

- `GET /api/employees` - Get all employees in cluster
- `POST /api/attendance/bulk` - Mark attendance for multiple employees
- `GET /api/attendance/date/:date` - Get attendance for specific date
- `GET /api/attendance/stats?date=YYYY-MM-DD` - Get attendance statistics

## Usage

1. Navigate to Cluster Dashboard → Attendance
2. View today's attendance statistics and employee list
3. Click "Mark Attendance" button
4. Select date (defaults to today)
5. Set status for each employee (Present/Absent/Leave)
6. Review summary statistics
7. Click "Submit Attendance"

The page will refresh automatically with the updated data!
