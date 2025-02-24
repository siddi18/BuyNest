import { motion } from "framer-motion";
import { ShoppingBag, Users, TrendingUp } from "lucide-react";
import { Card, CardContent } from "./Card";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Mock Data
const mockStats = {
  userCount: Math.floor(Math.random() * 1000) + 500,
  orderCount: Math.floor(Math.random() * 500) + 200,
  totalRevenue: Math.floor(Math.random() * 100000) + 50000,
};

const mockChartData = [
  { name: 'Jan', orders: 4, users: 8, revenue: 400 },
  { name: 'Feb', orders: 7, users: 12, revenue: 700 },
  { name: 'Mar', orders: 10, users: 15, revenue: 1000 },
  { name: 'Apr', orders: 15, users: 20, revenue: 1500 },
  { name: 'May', orders: 20, users: 25, revenue: 2000 },
];

function StatCard({ icon: Icon, label, value, prefix = "" }) {
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-6">
        <div className="flex items-center gap-4">
          <div className="rounded-full p-3 bg-primary/10">
            <Icon className="h-6 w-6 text-primary" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">{label}</p>
            <motion.h3 
              className="text-2xl font-bold"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {prefix}{value.toLocaleString()}
            </motion.h3>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 p-6">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center">
          <motion.h1 
            className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600 mb-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            E-Commerce Analytics Dashboard
          </motion.h1>
          <p className="text-lg text-muted-foreground">
            Real-time insights into your business performance
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-6 md:grid-cols-3">
          <StatCard 
            icon={Users} 
            label="Registered Users" 
            value={mockStats.userCount}
          />
          <StatCard 
            icon={ShoppingBag} 
            label="Orders Placed" 
            value={mockStats.orderCount}
          />
          <StatCard 
            icon={TrendingUp} 
            label="Total Revenue" 
            value={mockStats.totalRevenue} 
            prefix="$"
          />
        </div>

        {/* Growth Chart */}
        <Card>
          <CardContent className="pt-6">
            <h2 className="text-xl font-semibold mb-4">Growth Overview</h2>
            <div className="h-[400px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={mockChartData}
                  margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Area 
                    type="monotone" 
                    dataKey="revenue" 
                    stackId="1" 
                    stroke="#8b5cf6" 
                    fill="#8b5cf680" 
                    name="Revenue ($)"
                  />
                  <Area 
                    type="monotone" 
                    dataKey="orders" 
                    stackId="2" 
                    stroke="#3b82f6" 
                    fill="#3b82f680" 
                    name="Orders"
                  />
                  <Area 
                    type="monotone" 
                    dataKey="users" 
                    stackId="3" 
                    stroke="#6366f1" 
                    fill="#6366f180" 
                    name="Users"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
