# Component Migration Guide

This guide helps you update existing pages and components to use the new GreenVerse design system.

## Quick Start

### 1. Import the Updated Components

```jsx
import Button from "../../components/Button"
import Card from "../../components/Card"
import StatCard from "../../components/StatCard"
import Navbar from "../../components/navbar"
import Footer from "../../components/footer"
import Sidebar from "../../components/sidebar"
```

### 2. Import Icons (when needed)

```jsx
import { Leaf, Recycle, Users, BarChart3, ShoppingBag } from "lucide-react"
```

### 3. Use New Color Classes

Replace old color references with new ones:

**Old → New Mappings:**
- `bg-primary` → `bg-[#3AA174]`
- `text-primary` → `text-[#3AA174]`
- `bg-card` → `bg-white`
- `bg-background` → `bg-[#FDFBF7]`
- `bg-muted` → `bg-[#F6F3EB]`

### 4. Update Button Usage

**Old Style:**
```jsx
<Button variant="primary">Click Me</Button>
```

**New Style (same API, enhanced design):**
```jsx
<Button variant="primary">Click Me</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="ghost">Ghost</Button>
```

## Page Layout Pattern

### Public Pages

```jsx
export default function YourPage() {
  return (
    <div className="min-h-screen bg-[#FDFBF7]">
      <Navbar />
      
      {/* Your content here */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          {/* Content */}
        </div>
      </section>
      
      <Footer />
    </div>
  )
}
```

### Dashboard Pages

```jsx
export default function DashboardPage() {
  return (
    <div className="flex min-h-screen bg-[#F6F3EB]">
      <Sidebar role="admin" /> {/* or "client" or "cluster" */}
      
      <main className="flex-1 ml-64 p-8">
        <div className="space-y-6 animate-fade-in">
          {/* Dashboard content */}
        </div>
      </main>
    </div>
  )
}
```

## Common Patterns

### Hero Section

```jsx
<section className="min-h-screen flex items-center relative bg-[#F6F3EB] overflow-hidden pt-20">
  <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
    <div className="space-y-6 animate-fade-in">
      <h1 className="text-5xl md:text-7xl font-bold text-[#0F5132] font-poppins">
        Your Title
      </h1>
      <p className="text-xl text-stone-600">Your description</p>
      <Button>Get Started</Button>
    </div>
    {/* Image/Graphic */}
  </div>
</section>
```

### Stats Grid

```jsx
<div className="grid md:grid-cols-4 gap-6">
  <StatCard 
    title="Total Revenue" 
    value="$45,231" 
    icon={DollarSign} 
    trend={12} 
  />
  <StatCard 
    title="Active Orders" 
    value="1,234" 
    icon={ShoppingBag} 
    trend={5} 
    color="text-blue-600" 
  />
</div>
```

### Feature Cards

```jsx
<div className="grid md:grid-cols-3 gap-8">
  <Card className="text-center">
    <div className="w-16 h-16 bg-[#3AA174]/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
      <Leaf size={32} className="text-[#3AA174]" />
    </div>
    <h3 className="text-xl font-bold text-[#0F5132] mb-2">Feature Title</h3>
    <p className="text-stone-600">Feature description...</p>
  </Card>
</div>
```

### Data Table

```jsx
<Card className="overflow-hidden">
  <div className="p-6 border-b border-stone-100 flex justify-between items-center">
    <h3 className="font-bold text-[#0F5132]">Table Title</h3>
  </div>
  <div className="overflow-x-auto">
    <table className="w-full text-left">
      <thead className="bg-stone-50 text-stone-500 text-sm uppercase">
        <tr>
          <th className="p-4">Column 1</th>
          <th className="p-4">Column 2</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-stone-100">
        <tr className="hover:bg-stone-50 transition-colors">
          <td className="p-4">Data</td>
          <td className="p-4">Data</td>
        </tr>
      </tbody>
    </table>
  </div>
</Card>
```

### Status Badges

```jsx
<span className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
  Active
</span>
<span className="px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-700">
  Pending
</span>
<span className="px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-700">
  Cancelled
</span>
```

## Animation Classes

Add these to your elements for smooth entrance animations:

```jsx
<div className="animate-fade-in">...</div>
<div className="animate-slide-up">...</div>
```

## Spacing Guidelines

- **Section padding**: `py-24` (top/bottom)
- **Container max-width**: `max-w-7xl`
- **Container padding**: `px-6`
- **Card spacing**: `p-6`
- **Grid gaps**: `gap-6` or `gap-8`

## Color Usage Guide

### When to use each color:

**Primary Green (#3AA174)**
- Main CTAs
- Active states
- Important highlights
- Icons (primary actions)

**Dark Green (#0F5132)**
- Headings
- Important text
- Sidebar background
- Dark sections

**Eco Beige (#F6F3EB)**
- Section backgrounds
- Hover states
- Icon backgrounds
- Subtle cards

**Accent Colors**
- Gold (#C8A656): Premium features, charts
- Brown (#C6A477): Secondary charts, decorative elements

## Responsive Design

Use Tailwind's responsive prefixes:

```jsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
  {/* Responsive grid */}
</div>

<h1 className="text-3xl md:text-5xl lg:text-7xl">
  {/* Responsive typography */}
</h1>
```

## Icon Integration

```jsx
import { Leaf, Users, Package } from "lucide-react"

<Leaf size={24} className="text-[#3AA174]" />
<Users size={20} />
<Package size={32} className="text-blue-600" />
```

## Common Mistakes to Avoid

❌ Don't use old color variables without checking
❌ Don't forget mobile responsiveness
❌ Don't mix old and new button styles
❌ Don't forget to add animations to new sections

✅ Use the cn() utility for conditional classes
✅ Import icons from lucide-react
✅ Use max-w-7xl for consistent container width
✅ Add hover states to interactive elements

## Example: Complete Page Conversion

**Before:**
```jsx
<div className="page">
  <h1>Title</h1>
  <button>Click</button>
</div>
```

**After:**
```jsx
import Button from "../../components/Button"
import Navbar from "../../components/navbar"
import Footer from "../../components/footer"
import { Leaf } from "lucide-react"

export default function Page() {
  return (
    <div className="min-h-screen bg-[#FDFBF7]">
      <Navbar />
      
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <h1 className="text-4xl font-bold text-[#0F5132] font-poppins mb-6">
            Title
          </h1>
          <Button>
            <Leaf size={20} />
            Click
          </Button>
        </div>
      </section>
      
      <Footer />
    </div>
  )
}
```

## Need Help?

Refer to:
- `DESIGN_UPDATE_README.md` - Complete design system documentation
- `src/app/(public)/home.jsx` - Reference implementation
- `src/components/` - Updated component examples
- `src/lib/mockData.js` - Data structure examples

---

Happy migrating! 🚀
