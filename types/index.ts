export interface User {
  id: string
  name: string
  email: string
  role: "client" | "admin" | "cluster"
  company: string
}

export interface Submission {
  id: string
  material: string
  quantity: string
  status: "pending" | "matched" | "in-transit" | "processing" | "completed"
  cluster?: string
  revenue?: number
  date: string
}

export interface RecoveryCluster {
  id: string
  name: string
  location: string
  materials: string[]
  status: "active" | "inactive"
  capacity: number
}

export interface Order {
  id: string
  producer: string
  material: string
  quantity: string
  price: number
  status: "pending" | "in-progress" | "completed"
}
