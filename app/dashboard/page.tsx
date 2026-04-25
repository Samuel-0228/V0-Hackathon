'use client';

import { Navigation } from '@/components/navigation';
import { supabase, type SalesData } from '@/lib/supabase';
import { useEffect, useState } from 'react';
import { TrendingUp, DollarSign, ShoppingCart, Users } from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend,
} from 'recharts';

export default function DashboardPage() {
  const [salesData, setSalesData] = useState<SalesData[]>([]);
  const [stats, setStats] = useState({
    totalRevenue: 0,
    totalOrders: 0,
    averageOrderValue: 0,
    activeCustomers: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      // Fetch sales data
      const { data: sales, error: salesError } = await supabase
        .from('sales_data')
        .select('*')
        .order('date', { ascending: true });

      if (!salesError && sales) {
        setSalesData(sales);

        // Calculate stats
        const totalRevenue = sales.reduce((sum, item) => sum + item.total_revenue, 0);
        const totalOrders = sales.reduce((sum, item) => sum + item.total_orders, 0);
        const averageOrderValue =
          totalOrders > 0 ? totalRevenue / totalOrders : 0;

        setStats({
          totalRevenue,
          totalOrders,
          averageOrderValue,
          activeCustomers: 3, // From sample data
        });
      }

      // Fetch active conversations (customers)
      const { data: conversations } = await supabase
        .from('conversations')
        .select('*')
        .eq('status', 'active');

      if (conversations) {
        setStats((prev) => ({
          ...prev,
          activeCustomers: conversations.length,
        }));
      }

      setLoading(false);
    };

    fetchDashboardData();
  }, []);

  const StatCard = ({
    icon: Icon,
    label,
    value,
    format = 'text',
  }: {
    icon: React.ReactNode;
    label: string;
    value: number;
    format?: 'text' | 'currency' | 'decimal';
  }) => (
    <div className="bg-white border border-gray-200 rounded-lg p-6">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-gray-600 mb-1">{label}</p>
          <p className="text-3xl font-bold text-black">
            {format === 'currency' && '$'}
            {format === 'decimal'
              ? value.toFixed(2)
              : format === 'currency'
              ? value.toLocaleString('en-US', { maximumFractionDigits: 0 })
              : value}
          </p>
        </div>
        <div className="p-3 bg-black text-white rounded-lg">{Icon}</div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* Header */}
      <div className="pt-24 pb-12 px-4 sm:px-6 lg:px-8 bg-gray-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold text-black mb-2">Owner Dashboard</h1>
          <p className="text-gray-600">
            Track sales, customers, and business performance
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {loading ? (
            <div className="text-center py-16">
              <div className="inline-block p-3 bg-gray-100 rounded-lg">
                <div className="w-8 h-8 border-2 border-gray-300 border-t-black rounded-full animate-spin" />
              </div>
            </div>
          ) : (
            <>
              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                <StatCard
                  icon={<DollarSign size={24} />}
                  label="Total Revenue"
                  value={stats.totalRevenue}
                  format="currency"
                />
                <StatCard
                  icon={<ShoppingCart size={24} />}
                  label="Total Orders"
                  value={stats.totalOrders}
                />
                <StatCard
                  icon={<TrendingUp size={24} />}
                  label="Avg Order Value"
                  value={stats.averageOrderValue}
                  format="currency"
                />
                <StatCard
                  icon={<Users size={24} />}
                  label="Active Customers"
                  value={stats.activeCustomers}
                />
              </div>

              {/* Charts */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Revenue Trend */}
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <h2 className="text-lg font-bold text-black mb-6">Revenue Trend</h2>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={salesData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                      <XAxis
                        dataKey="date"
                        tick={{ fill: '#6b7280', fontSize: 12 }}
                      />
                      <YAxis tick={{ fill: '#6b7280', fontSize: 12 }} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: '#fff',
                          border: '1px solid #e5e7eb',
                          borderRadius: '8px',
                        }}
                        formatter={(value) => [
                          `$${(value as number).toLocaleString()}`,
                        ]}
                      />
                      <Line
                        type="monotone"
                        dataKey="total_revenue"
                        stroke="#000"
                        dot={{ fill: '#000', r: 4 }}
                        strokeWidth={2}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>

                {/* Orders vs Average */}
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <h2 className="text-lg font-bold text-black mb-6">
                    Orders & Average Value
                  </h2>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={salesData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                      <XAxis
                        dataKey="date"
                        tick={{ fill: '#6b7280', fontSize: 12 }}
                      />
                      <YAxis tick={{ fill: '#6b7280', fontSize: 12 }} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: '#fff',
                          border: '1px solid #e5e7eb',
                          borderRadius: '8px',
                        }}
                      />
                      <Legend />
                      <Bar dataKey="total_orders" fill="#000" radius={[4, 4, 0, 0]} />
                      <Bar
                        dataKey="average_order_value"
                        fill="#d4d4d8"
                        radius={[4, 4, 0, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Sales Table */}
              <div className="bg-white border border-gray-200 rounded-lg p-6 mt-12">
                <h2 className="text-lg font-bold text-black mb-6">Daily Sales</h2>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                          Date
                        </th>
                        <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700">
                          Revenue
                        </th>
                        <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700">
                          Orders
                        </th>
                        <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700">
                          Avg Order Value
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {salesData.map((item) => (
                        <tr
                          key={item.id}
                          className="border-b border-gray-100 hover:bg-gray-50"
                        >
                          <td className="py-3 px-4 text-sm text-gray-900">
                            {new Date(item.date).toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric',
                              year: 'numeric',
                            })}
                          </td>
                          <td className="py-3 px-4 text-sm text-right font-medium text-gray-900">
                            ${item.total_revenue.toLocaleString()}
                          </td>
                          <td className="py-3 px-4 text-sm text-right text-gray-700">
                            {item.total_orders}
                          </td>
                          <td className="py-3 px-4 text-sm text-right text-gray-700">
                            ${item.average_order_value.toFixed(2)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
