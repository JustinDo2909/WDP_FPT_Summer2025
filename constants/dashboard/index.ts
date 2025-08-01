export const monthlyRevenueData = [
  { name: "Jan", revenue: 250000000, target: 100000000 },
  { name: "Feb", revenue: 350000000, target: 100000000 },
  { name: "Mar", revenue: 280000000, target: 100000000 },
  { name: "Apr", revenue: 320000000, target: 100000000 },
  { name: "May", revenue: 380000000, target: 100000000 },
  { name: "Jun", revenue: 0, target: 100000000 },
  { name: "Jul", revenue: 0, target: 100000000 },
  { name: "Aug", revenue: 0, target: 100000000 },
  { name: "Sep", revenue: 0, target: 100000000 },
  { name: "Oct", revenue: 0, target: 100000000 },
  { name: "Nov", revenue: 0, target: 100000000 },
  { name: "Dec", revenue: 0, target: 100000000 },
];

export const topProducts = [
  {
    id: 1,
    name: "La Roche-Posay Effaclar Duo",
    sold: 245,
    revenue: 12250000,
    image: "/placeholder.svg?height=40&width=40",
    trend: "up",
    change: 15.2,
  },
  {
    id: 2,
    name: "Cetaphil Gentle Skin Cleanser",
    sold: 198,
    revenue: 8910000,
    image: "/placeholder.svg?height=40&width=40",
    trend: "up",
    change: 8.7,
  },
  {
    id: 3,
    name: "The Ordinary Niacinamide 10%",
    sold: 167,
    revenue: 5010000,
    image: "/placeholder.svg?height=40&width=40",
    trend: "down",
    change: -2.1,
  },
  {
    id: 4,
    name: "Eucerin Sun Face Oil Control",
    sold: 134,
    revenue: 8040000,
    image: "/placeholder.svg?height=40&width=40",
    trend: "up",
    change: 12.3,
  },
  {
    id: 5,
    name: "Vichy Mineral 89",
    sold: 123,
    revenue: 7380000,
    image: "/placeholder.svg?height=40&width=40",
    trend: "up",
    change: 6.8,
  },
];

export const topCustomers = [
  {
    id: 1,
    name: "Nguyễn Thị Lan",
    email: "lan.nguyen@email.com",
    spent: 15600000,
    orders: 23,
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 2,
    name: "Trần Minh Hương",
    email: "huong.tran@email.com",
    spent: 12800000,
    orders: 18,
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 3,
    name: "Lê Thị Mai",
    email: "mai.le@email.com",
    spent: 11200000,
    orders: 15,
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 4,
    name: "Phạm Văn Đức",
    email: "duc.pham@email.com",
    spent: 9800000,
    orders: 12,
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 5,
    name: "Hoàng Thị Linh",
    email: "linh.hoang@email.com",
    spent: 8900000,
    orders: 14,
    avatar: "/placeholder.svg?height=40&width=40",
  },
];

export const recentOrders = [
  {
    id: "ORD-001",
    customer: "Nguyễn Thị Lan",
    date: "Apr 23, 2024",
    amount: 2300000,
    reference: "0047568936",
    paymentMethod: "mastercard",
    status: "completed",
  },
  {
    id: "ORD-002",
    customer: "Trần Minh Hương",
    date: "Apr 23, 2024",
    amount: -670000,
    reference: "0078568936",
    paymentMethod: "visa",
    status: "completed",
    isRefund: true,
  },
  {
    id: "ORD-003",
    customer: "Lê Thị Mai",
    date: "Apr 18, 2024",
    amount: 1234000,
    reference: "0088568934",
    paymentMethod: "visa",
    status: "cancelled",
  },
  {
    id: "ORD-004",
    customer: "Phạm Văn Đức",
    date: "Apr 15, 2024",
    amount: 5000000,
    reference: "0018568911",
    paymentMethod: "visa",
    status: "in_progress",
  },
  {
    id: "ORD-005",
    customer: "Hoàng Thị Linh",
    date: "Apr 15, 2024",
    amount: 2300000,
    reference: "0045568939",
    paymentMethod: "mastercard",
    status: "completed",
  },
];

export const overviewStats = [
  {
    title: "Total Revenue",
    icon: "DollarSign",
    gradient: "from-blue-500 to-blue-600",
    trend: "up",
    change: "12.5",
  },
  {
    title: "Orders",
    icon: "ShoppingCart",
    value: "1,234",
    gradient: "from-green-500 to-green-600",
    trend: "up",
    change: "8.2",
    period: "from last week",
  },
  {
    title: "Customers",
    icon: "Users",
    value: "8,945",
    gradient: "from-purple-500 to-purple-600",
    trend: "up",
    change: "156 new this week",
  },
  {
    title: "Reviews",
    icon: "Star",
    value: "4.8",
    gradient: "from-pink-500 to-pink-600",
    trend: "up",
    change: "23 new reviews",
  },
];
