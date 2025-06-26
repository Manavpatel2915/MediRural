import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
    Package, 
    CheckCircle, 
    Clock, 
    TrendingUp, 
    DollarSign,
    Truck,
    AlertCircle,
    BarChart3
} from 'lucide-react';

const Stats = () => {
    const [stats, setStats] = useState({
        totalOrders: 0,
        pendingOrders: 0,
        deliveredOrders: 0,
        confirmedOrders: 0,
        shippedOrders: 0,
        cancelledOrders: 0,
        totalRevenue: 0,
        averageOrderValue: 0,
        todayOrders: 0,
        thisWeekOrders: 0
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchStats();
    }, []);

    const fetchStats = async () => {
        try {
            setLoading(true);
            const response = await axios.get('http://localhost:5000/api/orders/supplier/stats', {
                withCredentials: true
            });
            setStats(response.data);
        } catch (error) {
            console.error('Error fetching stats:', error);
            setError(error.response?.data?.message || error.message);
        } finally {
            setLoading(false);
        }
    };

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            minimumFractionDigits: 0
        }).format(amount);
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'pending': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
            case 'confirmed': return 'text-blue-600 bg-blue-50 border-blue-200';
            case 'shipped': return 'text-purple-600 bg-purple-50 border-purple-200';
            case 'delivered': return 'text-green-600 bg-green-50 border-green-200';
            case 'cancelled': return 'text-red-600 bg-red-50 border-red-200';
            default: return 'text-gray-600 bg-gray-50 border-gray-200';
        }
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case 'pending': return <Clock className="w-5 h-5" />;
            case 'confirmed': return <CheckCircle className="w-5 h-5" />;
            case 'shipped': return <Truck className="w-5 h-5" />;
            case 'delivered': return <CheckCircle className="w-5 h-5" />;
            case 'cancelled': return <AlertCircle className="w-5 h-5" />;
            default: return <Package className="w-5 h-5" />;
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-[400px]">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-700"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center items-center min-h-[400px] text-red-600">
                <div className="text-center">
                    <AlertCircle className="w-12 h-12 mx-auto mb-4" />
                    <p className="text-lg font-semibold">Error loading stats</p>
                    <p className="text-sm text-gray-600">{error}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="p-6 max-w-7xl mx-auto">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-blue-700 mb-2">Dashboard Statistics</h1>
                <p className="text-gray-600">Overview of your area-based order performance</p>
            </div>

            {/* Key Metrics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {/* Total Orders */}
                <div className="bg-white p-6 rounded-xl shadow-sm border">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600">Total Orders</p>
                            <p className="text-2xl font-bold text-gray-900">{stats.totalOrders}</p>
                        </div>
                        <div className="p-3 bg-blue-100 rounded-full">
                            <Package className="w-6 h-6 text-blue-600" />
                        </div>
                    </div>
                    <div className="mt-4">
                        <p className="text-sm text-gray-500">All time orders in your area</p>
                    </div>
                </div>

                {/* Total Revenue */}
                <div className="bg-white p-6 rounded-xl shadow-sm border">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                            <p className="text-2xl font-bold text-gray-900">{formatCurrency(stats.totalRevenue)}</p>
                        </div>
                        <div className="p-3 bg-green-100 rounded-full">
                            <DollarSign className="w-6 h-6 text-green-600" />
                        </div>
                    </div>
                    <div className="mt-4">
                        <p className="text-sm text-gray-500">Revenue from all orders</p>
                    </div>
                </div>

                {/* Average Order Value */}
                <div className="bg-white p-6 rounded-xl shadow-sm border">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600">Avg Order Value</p>
                            <p className="text-2xl font-bold text-gray-900">{formatCurrency(stats.averageOrderValue)}</p>
                        </div>
                        <div className="p-3 bg-purple-100 rounded-full">
                            <BarChart3 className="w-6 h-6 text-purple-600" />
                        </div>
                    </div>
                    <div className="mt-4">
                        <p className="text-sm text-gray-500">Average per order</p>
                    </div>
                </div>

                {/* Today's Orders */}
                <div className="bg-white p-6 rounded-xl shadow-sm border">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600">Today's Orders</p>
                            <p className="text-2xl font-bold text-gray-900">{stats.todayOrders}</p>
                        </div>
                        <div className="p-3 bg-orange-100 rounded-full">
                            <TrendingUp className="w-6 h-6 text-orange-600" />
                        </div>
                    </div>
                    <div className="mt-4">
                        <p className="text-sm text-gray-500">Orders received today</p>
                    </div>
                </div>
            </div>

            {/* Order Status Breakdown */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Order Status Cards */}
                <div className="bg-white p-6 rounded-xl shadow-sm border">
                    <h3 className="text-lg font-semibold text-gray-900 mb-6">Order Status Breakdown</h3>
                    <div className="space-y-4">
                        {[
                            { status: 'pending', count: stats.pendingOrders, label: 'Pending Orders' },
                            { status: 'confirmed', count: stats.confirmedOrders, label: 'Confirmed Orders' },
                            { status: 'shipped', count: stats.shippedOrders, label: 'Shipped Orders' },
                            { status: 'delivered', count: stats.deliveredOrders, label: 'Delivered Orders' },
                            { status: 'cancelled', count: stats.cancelledOrders, label: 'Cancelled Orders' }
                        ].map((item) => (
                            <div key={item.status} className="flex items-center justify-between p-4 rounded-lg border">
                                <div className="flex items-center space-x-3">
                                    <div className={`p-2 rounded-full ${getStatusColor(item.status).split(' ')[1]}`}>
                                        {getStatusIcon(item.status)}
                                    </div>
                                    <div>
                                        <p className="font-medium text-gray-900">{item.label}</p>
                                        <p className="text-sm text-gray-500">{item.status}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-xl font-bold text-gray-900">{item.count}</p>
                                    <p className="text-sm text-gray-500">
                                        {stats.totalOrders > 0 ? ((item.count / stats.totalOrders) * 100).toFixed(1) : 0}%
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Quick Stats */}
                <div className="bg-white p-6 rounded-xl shadow-sm border">
                    <h3 className="text-lg font-semibold text-gray-900 mb-6">Quick Statistics</h3>
                    <div className="space-y-6">
                        {/* Delivery Rate */}
                        <div className="text-center p-4 bg-green-50 rounded-lg">
                            <p className="text-sm font-medium text-green-600">Delivery Rate</p>
                            <p className="text-3xl font-bold text-green-700">
                                {stats.totalOrders > 0 ? ((stats.deliveredOrders / stats.totalOrders) * 100).toFixed(1) : 0}%
                            </p>
                            <p className="text-sm text-green-600">{stats.deliveredOrders} of {stats.totalOrders} orders delivered</p>
                        </div>

                        {/* This Week's Performance */}
                        <div className="text-center p-4 bg-blue-50 rounded-lg">
                            <p className="text-sm font-medium text-blue-600">This Week</p>
                            <p className="text-3xl font-bold text-blue-700">{stats.thisWeekOrders}</p>
                            <p className="text-sm text-blue-600">Orders this week</p>
                        </div>

                        {/* Pending vs Delivered */}
                        <div className="grid grid-cols-2 gap-4">
                            <div className="text-center p-3 bg-yellow-50 rounded-lg">
                                <p className="text-sm font-medium text-yellow-600">Pending</p>
                                <p className="text-2xl font-bold text-yellow-700">{stats.pendingOrders}</p>
                            </div>
                            <div className="text-center p-3 bg-green-50 rounded-lg">
                                <p className="text-sm font-medium text-green-600">Delivered</p>
                                <p className="text-2xl font-bold text-green-700">{stats.deliveredOrders}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Summary */}
            <div className="mt-8 bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-xl border">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance Summary</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="text-center">
                        <p className="text-2xl font-bold text-blue-600">{stats.totalOrders}</p>
                        <p className="text-sm text-gray-600">Total Orders</p>
                    </div>
                    <div className="text-center">
                        <p className="text-2xl font-bold text-green-600">{formatCurrency(stats.totalRevenue)}</p>
                        <p className="text-sm text-gray-600">Total Revenue</p>
                    </div>
                    <div className="text-center">
                        <p className="text-2xl font-bold text-purple-600">
                            {stats.totalOrders > 0 ? ((stats.deliveredOrders / stats.totalOrders) * 100).toFixed(1) : 0}%
                        </p>
                        <p className="text-sm text-gray-600">Success Rate</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Stats; 