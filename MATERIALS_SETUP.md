# Materials Management Setup

## Database Setup

To enable the Materials Management feature, you need to create the `materials` table in your Supabase database.

### Steps:

1. Go to your Supabase project dashboard
2. Navigate to the SQL Editor
3. Copy and paste the contents of `backend/sql/create_materials_table.sql`
4. Run the SQL script

This will create:
- The `materials` table with columns:
  - `id` (primary key)
  - `cluster_id` (foreign key to clusters table)
  - `name` (material name)
  - `quantity` (amount in stock)
  - `unit` (measurement unit: kg, tons, liters, etc.)
  - `quality` (quality grade, optional)
  - `supplier` (supplier name, optional)
  - `cost_per_unit` (cost per unit, optional)
  - `created_at` and `updated_at` timestamps

- Row Level Security (RLS) policies for secure access
- Indexes for improved query performance
- Automatic `updated_at` timestamp trigger

## Features

The Materials Management page allows cluster users to:

- **View** all materials in their inventory (filtered by cluster_id)
- **Add** new materials with name, quantity, unit, quality, supplier, and cost
- **Edit** existing material information
- **Delete** materials from inventory

All operations are automatically filtered by the authenticated cluster's ID for security.

## API Endpoints

- `GET /api/materials` - Get all materials (filtered by cluster)
- `POST /api/materials` - Create new material
- `PUT /api/materials/:id` - Update material
- `DELETE /api/materials/:id` - Delete material

All endpoints require authentication and cluster role authorization.
