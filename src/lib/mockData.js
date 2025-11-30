// GreenVerse Mock Data - Updated with Banana Fiber Products Theme

export const mockProducts = [
  {
    id: 1,
    name: "Banana Fiber Plate (10\")",
    category: "Tableware",
    price: 12.50,
    stock: 1500,
    status: "In Stock",
    description: "100% biodegradable plates made from banana stem fibers",
    image: "/placeholder.svg?key=plate",
  },
  {
    id: 2,
    name: "Eco-Bowl (500ml)",
    category: "Tableware",
    price: 8.00,
    stock: 850,
    status: "Low Stock",
    description: "Sustainable bowls perfect for eco-conscious dining",
    image: "/placeholder.svg?key=bowl",
  },
  {
    id: 3,
    name: "Biodegradable Cutlery Set",
    category: "Utensils",
    price: 5.00,
    stock: 3000,
    status: "In Stock",
    description: "Complete cutlery set from natural fibers",
    image: "/placeholder.svg?key=cutlery",
  },
  {
    id: 4,
    name: "Fiber Gift Box",
    category: "Packaging",
    price: 4.50,
    stock: 200,
    status: "Out of Stock",
    description: "Elegant packaging solution from banana fibers",
    image: "/placeholder.svg?key=box",
  },
  {
    id: 5,
    name: "Banana Fiber Tray",
    category: "Tableware",
    price: 15.00,
    stock: 600,
    status: "In Stock",
    description: "Sturdy serving trays for any occasion",
    image: "/placeholder.svg?key=tray",
  },
];

export const mockOrders = [
  {
    id: "ORD-001",
    client: "EcoCafe NYC",
    clientName: "EcoCafe NYC",
    date: "2023-10-25",
    total: 450.00,
    amount: 450.00,
    status: "Delivered",
    items: "1000x 10\" Plates",
  },
  {
    id: "ORD-002",
    client: "Green Hotels",
    clientName: "Green Hotels",
    date: "2023-10-26",
    total: 1200.50,
    amount: 1200.50,
    status: "Processing",
    items: "2000x Bowls, 500x Cutlery Sets",
  },
  {
    id: "ORD-003",
    client: "BioStore",
    clientName: "BioStore",
    date: "2023-10-27",
    total: 320.00,
    amount: 320.00,
    status: "Shipped",
    items: "500x Gift Boxes",
  },
  {
    id: "ORD-004",
    client: "Organic Deli",
    clientName: "Organic Deli",
    date: "2023-10-28",
    total: 680.00,
    amount: 680.00,
    status: "Pending",
    items: "800x 10\" Plates, 400x Bowls",
  },
];

export const mockClusters = [
  {
    id: 1,
    name: "Kerala Unit A",
    location: "Kerala Unit A",
    manager: "Rajesh K.",
    workers: 45,
    output: "98%",
    capacity: 5000,
    utilization: 98,
    materials: ["Banana Stems", "Natural Fibers"],
  },
  {
    id: 2,
    name: "Tamil Nadu Unit B",
    location: "Tamil Nadu Unit B",
    manager: "Priya S.",
    workers: 32,
    output: "92%",
    capacity: 4000,
    utilization: 92,
    materials: ["Banana Stems", "Coconut Fibers"],
  },
  {
    id: 3,
    name: "Karnataka Unit C",
    location: "Karnataka Unit C",
    manager: "Amit V.",
    workers: 28,
    output: "88%",
    capacity: 3500,
    utilization: 88,
    materials: ["Banana Stems", "Agricultural Waste"],
  },
];

export const mockUsers = [
  {
    id: 1,
    name: "John Smith",
    email: "john@ecocafe.com",
    role: "client",
    status: "active",
    joinDate: "2024-01-15",
    submissions: 24,
  },
  {
    id: 2,
    name: "Sarah Johnson",
    email: "sarah@greenhotels.com",
    role: "client",
    status: "active",
    joinDate: "2024-02-20",
    submissions: 18,
  },
  {
    id: 3,
    name: "Rajesh Kumar",
    email: "rajesh@greenverse.com",
    role: "cluster_manager",
    status: "active",
    joinDate: "2024-03-10",
    submissions: 0,
  },
];

export const mockImpactData = {
  plasticSaved: 12500, // kg
  wasteProcessed: 15000,
  co2Reduced: 4500, // kg
  co2Saved: 4500,
  farmersSupported: 120,
  treesPlanted: 350,
  landfillDiverted: 12000,
  revenue: 75000,
  clusters: 12,
  activeUsers: 156,
};

export const mockProduction = [
  { day: "Mon", quantity: 1200 },
  { day: "Tue", quantity: 1450 },
  { day: "Wed", quantity: 1100 },
  { day: "Thu", quantity: 1600 },
  { day: "Fri", quantity: 1800 },
  { day: "Sat", quantity: 900 },
  { day: "Sun", quantity: 1200 },
];

export const mockRevenue = [
  { month: "Jan", amount: 15000 },
  { month: "Feb", amount: 18000 },
  { month: "Mar", amount: 16000 },
  { month: "Apr", amount: 22000 },
  { month: "May", amount: 26000 },
  { month: "Jun", amount: 30000 },
];

export const mockOrdersTrend = [
  { month: "Jan", orders: 145 },
  { month: "Feb", orders: 168 },
  { month: "Mar", orders: 152 },
  { month: "Apr", orders: 189 },
  { month: "May", orders: 210 },
  { month: "Jun", orders: 234 },
];

export const mockRevenueByCluster = [
  { name: "Kerala A", revenue: 12000 },
  { name: "Tamil Nadu B", revenue: 9500 },
  { name: "Karnataka C", revenue: 8000 },
];

export const mockProductionData = [
  { date: "Nov 15", plates: 1200, bowls: 850, cutlery: 1500 },
  { date: "Nov 16", plates: 1350, bowls: 920, cutlery: 1650 },
  { date: "Nov 17", plates: 1180, bowls: 880, cutlery: 1420 },
  { date: "Nov 18", plates: 1450, bowls: 1050, cutlery: 1800 },
  { date: "Nov 19", plates: 1520, bowls: 1100, cutlery: 1920 },
  { date: "Nov 20", plates: 1400, bowls: 980, cutlery: 1700 },
  { date: "Nov 21", plates: 1300, bowls: 900, cutlery: 1600 },
];

export const mockMachineStatus = [
  { id: "M-001", name: "Fiber Extractor 1", status: "operational", efficiency: 98, lastMaintenance: "2024-11-15" },
  { id: "M-002", name: "Pressing Unit 2", status: "operational", efficiency: 95, lastMaintenance: "2024-11-18" },
  { id: "M-003", name: "Drying Chamber 1", status: "maintenance", efficiency: 0, lastMaintenance: "2024-11-20" },
  { id: "M-004", name: "Molding Press 3", status: "operational", efficiency: 92, lastMaintenance: "2024-11-10" },
];

export const mockAttendance = [
  { id: 1, name: "Rajesh K.", role: "Operator", status: "present", checkIn: "08:15 AM", shift: "Morning" },
  { id: 2, name: "Priya M.", role: "Supervisor", status: "present", checkIn: "08:00 AM", shift: "Morning" },
  { id: 3, name: "Amit V.", role: "Technician", status: "absent", checkIn: "-", shift: "Morning" },
  { id: 4, name: "Sunita R.", role: "Quality Check", status: "present", checkIn: "08:30 AM", shift: "Morning" },
  { id: 5, name: "Kumar S.", role: "Operator", status: "present", checkIn: "08:10 AM", shift: "Morning" },
];

export const mockDailyTargets = [
  { product: "Banana Fiber Plate", target: 1500, achieved: 1420, unit: "pieces" },
  { product: "Eco-Bowl", target: 1000, achieved: 980, unit: "pieces" },
  { product: "Cutlery Set", target: 2000, achieved: 1950, unit: "pieces" },
];

// Legacy export for compatibility
export const MOCK_DATA = {
  products: mockProducts,
  orders: mockOrders,
  impactStats: mockImpactData,
  production: mockProduction,
  revenue: mockRevenue,
  clusters: mockClusters,
};
