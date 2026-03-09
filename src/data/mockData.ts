export interface Vehicle {
  id: string;
  name: string;
  model: string;
  year: number;
  price: number;
  stockStatus: "In Stock" | "Low Stock" | "Sold";
  vin: string;
  color: string;
  image?: string;
}

export interface Appraisal {
  id: string;
  customerName: string;
  brand: string;
  model: string;
  year: number;
  condition: string;
  estimatedPrice: number;
}

export interface Lead {
  id: string;
  name: string;
  contact: string;
  vehicleInterested: string;
  source: "Web" | "Phone" | "Third Party";
  status: "New" | "Contacted" | "Qualified" | "Lost";
  assignedTo?: string;
}

export interface Deal {
  id: string;
  customerName: string;
  vehicle: string;
  type: "Lease" | "Purchase";
  price: number;
  taxRate: number;
  taxes: number;
  finalAmount: number;
}

export interface ServiceAppointment {
  id: string;
  customerName: string;
  vehicle: string;
  serviceType: string;
  date: string;
  technician: string;
  status: "Scheduled" | "In Progress" | "Completed" | "Cancelled";
}

export interface Part {
  id: string;
  name: string;
  partNumber: string;
  stockQuantity: number;
  supplier: string;
  price: number;
}

export interface Customer {
  id: string;
  name: string;
  phone: string;
  email: string;
  vehiclesOwned: string[];
}

export const mockVehicles: Vehicle[] = [
  { id: "v1", name: "Toyota Camry", model: "XSE", year: 2024, price: 32500, stockStatus: "In Stock", vin: "1HGBH41JXMN109186", color: "Midnight Black" },
  { id: "v2", name: "Honda Accord", model: "Sport", year: 2024, price: 31200, stockStatus: "In Stock", vin: "2HGFC2F59MH512345", color: "Platinum White" },
  { id: "v3", name: "Ford F-150", model: "Lariat", year: 2024, price: 52800, stockStatus: "Low Stock", vin: "1FTFW1E50MF123456", color: "Atlas Blue" },
  { id: "v4", name: "BMW 3 Series", model: "330i", year: 2024, price: 45900, stockStatus: "In Stock", vin: "WBA5R1C50MA123456", color: "Alpine White" },
  { id: "v5", name: "Tesla Model 3", model: "Long Range", year: 2024, price: 47500, stockStatus: "Sold", vin: "5YJ3E1EA1MF123456", color: "Deep Blue" },
  { id: "v6", name: "Chevrolet Silverado", model: "LTZ", year: 2024, price: 55200, stockStatus: "In Stock", vin: "3GCUYDED0MG123456", color: "Shadow Gray" },
  { id: "v7", name: "Audi Q5", model: "Premium Plus", year: 2024, price: 49800, stockStatus: "Low Stock", vin: "WA1BNAFY5M2123456", color: "Navarra Blue" },
  { id: "v8", name: "Mercedes-Benz C-Class", model: "C300", year: 2024, price: 47200, stockStatus: "In Stock", vin: "W1KWF8DB5MR123456", color: "Obsidian Black" },
];

export const mockLeads: Lead[] = [
  { id: "l1", name: "John Mitchell", contact: "john@email.com", vehicleInterested: "Toyota Camry XSE", source: "Web", status: "New" },
  { id: "l2", name: "Sarah Chen", contact: "(555) 234-5678", vehicleInterested: "BMW 3 Series 330i", source: "Phone", status: "Contacted" },
  { id: "l3", name: "Mike Rodriguez", contact: "mike.r@email.com", vehicleInterested: "Ford F-150 Lariat", source: "Third Party", status: "Qualified" },
  { id: "l4", name: "Emily Watson", contact: "(555) 876-5432", vehicleInterested: "Tesla Model 3", source: "Web", status: "New" },
  { id: "l5", name: "David Kim", contact: "d.kim@email.com", vehicleInterested: "Audi Q5", source: "Phone", status: "Lost" },
];

export const mockDeals: Deal[] = [
  { id: "d1", customerName: "James Carter", vehicle: "Toyota Camry XSE 2024", type: "Purchase", price: 32500, taxRate: 0.08, taxes: 2600, finalAmount: 35100 },
  { id: "d2", customerName: "Lisa Park", vehicle: "BMW 3 Series 330i 2024", type: "Lease", price: 45900, taxRate: 0.08, taxes: 3672, finalAmount: 49572 },
  { id: "d3", customerName: "Robert Singh", vehicle: "Ford F-150 Lariat 2024", type: "Purchase", price: 52800, taxRate: 0.08, taxes: 4224, finalAmount: 57024 },
];

export const mockAppointments: ServiceAppointment[] = [
  { id: "s1", customerName: "Anna Lopez", vehicle: "Honda Civic 2022", serviceType: "Oil Change", date: "2026-03-10", technician: "Mike Johnson", status: "Scheduled" },
  { id: "s2", customerName: "Tom Brady", vehicle: "Ford F-150 2023", serviceType: "Brake Inspection", date: "2026-03-10", technician: "Sarah Williams", status: "In Progress" },
  { id: "s3", customerName: "Jessica Lee", vehicle: "Toyota RAV4 2021", serviceType: "Tire Rotation", date: "2026-03-11", technician: "Mike Johnson", status: "Scheduled" },
  { id: "s4", customerName: "Chris Evans", vehicle: "BMW X3 2023", serviceType: "Full Service", date: "2026-03-12", technician: "David Chen", status: "Scheduled" },
  { id: "s5", customerName: "Maria Garcia", vehicle: "Audi A4 2022", serviceType: "AC Repair", date: "2026-03-09", technician: "Sarah Williams", status: "Completed" },
];

export const mockParts: Part[] = [
  { id: "p1", name: "Brake Pads (Front)", partNumber: "BP-2024-F", stockQuantity: 45, supplier: "AutoParts Pro", price: 89.99 },
  { id: "p2", name: "Oil Filter", partNumber: "OF-STD-100", stockQuantity: 120, supplier: "FilterMax", price: 12.50 },
  { id: "p3", name: "Spark Plugs (Set of 4)", partNumber: "SP-IR-400", stockQuantity: 3, supplier: "IgnitionTech", price: 34.99 },
  { id: "p4", name: "Air Filter", partNumber: "AF-UNI-200", stockQuantity: 67, supplier: "FilterMax", price: 22.00 },
  { id: "p5", name: "Transmission Fluid (1L)", partNumber: "TF-SYN-1L", stockQuantity: 8, supplier: "LubriCorp", price: 18.75 },
  { id: "p6", name: "Headlight Bulb (LED)", partNumber: "HL-LED-H7", stockQuantity: 2, supplier: "BrightLite", price: 45.00 },
  { id: "p7", name: "Wiper Blades (Pair)", partNumber: "WB-ALL-22", stockQuantity: 30, supplier: "ClearView", price: 28.99 },
];

export const mockCustomers: Customer[] = [
  { id: "c1", name: "James Carter", phone: "(555) 111-2233", email: "james.carter@email.com", vehiclesOwned: ["Toyota Camry 2024"] },
  { id: "c2", name: "Lisa Park", phone: "(555) 222-3344", email: "lisa.park@email.com", vehiclesOwned: ["BMW 3 Series 2024", "Honda CR-V 2021"] },
  { id: "c3", name: "Robert Singh", phone: "(555) 333-4455", email: "r.singh@email.com", vehiclesOwned: ["Ford F-150 2024"] },
  { id: "c4", name: "Anna Lopez", phone: "(555) 444-5566", email: "a.lopez@email.com", vehiclesOwned: ["Honda Civic 2022"] },
  { id: "c5", name: "Tom Brady", phone: "(555) 555-6677", email: "t.brady@email.com", vehiclesOwned: ["Ford F-150 2023", "Tesla Model Y 2023"] },
  { id: "c6", name: "Jessica Lee", phone: "(555) 666-7788", email: "j.lee@email.com", vehiclesOwned: ["Toyota RAV4 2021"] },
];

export const monthlyRevenue = [
  { month: "Jan", revenue: 245000, sales: 12 },
  { month: "Feb", revenue: 312000, sales: 15 },
  { month: "Mar", revenue: 287000, sales: 14 },
  { month: "Apr", revenue: 356000, sales: 18 },
  { month: "May", revenue: 401000, sales: 20 },
  { month: "Jun", revenue: 378000, sales: 19 },
  { month: "Jul", revenue: 425000, sales: 22 },
  { month: "Aug", revenue: 398000, sales: 21 },
  { month: "Sep", revenue: 367000, sales: 18 },
  { month: "Oct", revenue: 445000, sales: 23 },
  { month: "Nov", revenue: 412000, sales: 20 },
  { month: "Dec", revenue: 489000, sales: 25 },
];

export const inventoryByCategory = [
  { name: "Sedans", value: 35, fill: "hsl(207, 90%, 54%)" },
  { name: "SUVs", value: 28, fill: "hsl(38, 92%, 55%)" },
  { name: "Trucks", value: 18, fill: "hsl(152, 69%, 45%)" },
  { name: "Luxury", value: 12, fill: "hsl(280, 65%, 60%)" },
  { name: "Electric", value: 7, fill: "hsl(340, 75%, 55%)" },
];

export const servicePerformance = [
  { month: "Jan", completed: 45, scheduled: 52 },
  { month: "Feb", completed: 52, scheduled: 58 },
  { month: "Mar", completed: 49, scheduled: 55 },
  { month: "Apr", completed: 61, scheduled: 65 },
  { month: "May", completed: 58, scheduled: 62 },
  { month: "Jun", completed: 67, scheduled: 70 },
];
