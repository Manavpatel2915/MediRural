import React from 'react';
import { useEffect, useState } from "react"
import axios from 'axios';
import { toast } from 'react-toastify';

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/orders', { withCredentials: true });
                setOrders(response.data.orders);
                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        };
        fetchOrders();
    }, []);
    if (loading) {
        return <div className='flex justify-center items-center min-h-[200px] text-lg font-semibold'>Loading...</div>;
    }
    if (error) {
        return <div className='flex justify-center items-center min-h-[200px] text-red-600 font-semibold'>Error: {error}</div>;
    }
    if (orders.length === 0) {
        return <div className='flex justify-center items-center min-h-[200px] text-gray-600 font-semibold'>No orders found</div>;
    }
    const handleUpdateStatus = async (id, newStatus) => {
        try {
            const response = await axios.put(`http://localhost:5000/api/orders/${id}`, { status: newStatus }, { withCredentials: true });
            setOrders(orders.map((order) => order._id === id ? { ...order, status: newStatus } : order));
            toast.success('Status updated successfully');
        } catch (error) {
            toast.error('Status update failed');
        }
    }
    return (
        <div className="p-6 max-w-6xl mx-auto">
            <h1 className="text-3xl font-bold mb-6 text-blue-700">All Orders</h1>
            <div className="overflow-x-auto rounded-lg shadow">
                <table className="min-w-full bg-white border border-gray-200">
                    <thead className="bg-blue-600 text-white">
                        <tr>
                            <th className="py-2 px-2 text-left">Order ID</th>
                            
                            <th className="py-2 px-2 text-left">Created At</th>
                            <th className="py-2 px-2 text-left">Status</th>
                            <th className="py-2 px-2 text-left">Total Amount</th>
                            <th className="py-2 px-2 text-left">Payment Method</th>
                            <th className="py-2 px-2 text-left">Address</th>
                            <th className="py-2 px-2 text-left">Phone No</th>
                            <th className="py-2 px-2 text-left">Subscription</th>
                            <th className="py-2 px-2 text-left">Frequency</th>
                            <th className="py-2 px-2 text-left">Next Delivery</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order) => (
                            <tr key={order._id} className="border-b hover:bg-blue-50 transition">
                                <td className="py-2 px-2 text-left font-medium">{order._id}</td>
                                
                                <td className="py-2 px-2 text-left">{order.createdAt}</td>
                                <td className="py-2 px-2 text-left">
                                    {/* Status badge with icon and dropdown */}
                                    <div className="flex items-center gap-2">
                                        {order.status === 'pending' && (
                                            <span className="flex items-center gap-1 text-yellow-600 font-semibold">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                                <span className="h-2 w-2 rounded-full bg-yellow-400 inline-block"></span>Pending
                                            </span>
                                        )}
                                        {order.status === 'confirmed' && (
                                            <span className="flex items-center gap-1 text-blue-600 underline font-semibold">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2l4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                                <span className="h-2 w-2 rounded-full bg-blue-400 inline-block"></span>Confirmed
                                            </span>
                                        )}
                                        {order.status === 'shipped' && (
                                            <span className="flex items-center gap-1 text-purple-700 font-bold">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17V5a1 1 0 011-1h5a1 1 0 011 1v12m-1 0a2 2 0 104 0m-4 0a2 2 0 11-4 0m4 0H5a2 2 0 01-2-2V7a2 2 0 012-2h2" /></svg>
                                                <span className="h-2 w-2 rounded-full bg-purple-400 inline-block"></span>Shipped
                                            </span>
                                        )}
                                        {order.status === 'delivered' && (
                                            <span className="flex items-center gap-1 text-green-600 font-bold">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2l4-4m1-5a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                                <span className="h-2 w-2 rounded-full bg-green-400 inline-block"></span>Delivered
                                            </span>
                                        )}
                                        {order.status === 'cancelled' && (
                                            <span className="flex items-center gap-1 text-red-600 line-through font-semibold">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                                                <span className="h-2 w-2 rounded-full bg-red-500 inline-block"></span>Cancelled
                                            </span>
                                        )}
                                        <select
                                            value={order.status}
                                            onChange={e => handleUpdateStatus(order._id, e.target.value)}
                                            className="ml-2 bg-white border border-blue-400 text-blue-700 px-2 py-1 rounded-full shadow-sm font-semibold focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 transition"
                                        >
                                            <option value="pending">Pending</option>
                                            <option value="confirmed">Confirmed</option>
                                            <option value="shipped">Shipped</option>
                                            <option value="delivered">Delivered</option>
                                            <option value="cancelled">Cancelled</option>
                                        </select>
                                    </div>
                                </td>
                                <td className="py-2 px-2 text-left">₹{order.totalAmount}</td>
                                <td className="py-2 px-2 text-left">{order.paymentMethod}</td>
                                <td className="py-2 px-2 text-left">{order.shipping?.address || "N/A"}</td>
                                <td className="py-2 px-2 text-left">{order.shipping?.phone || "N/A"}</td>
                                <td className="py-2 px-2 text-left">
                                    {order.isSubscription ? (
                                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                            <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                            </svg>
                                            Subscription
                                        </span>
                                    ) : (
                                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                                            <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                            </svg>
                                            One-time
                                        </span>
                                    )}
                                </td>
                                <td className="py-2 px-2 text-left">
                                    {order.subscriptionDetails?.frequency ? (
                                        <span className="capitalize font-medium text-blue-600">
                                            {order.subscriptionDetails.frequency}
                                        </span>
                                    ) : (
                                        <span className="text-gray-500">N/A</span>
                                    )}
                                </td>
                                <td className="py-2 px-2 text-left">
                                    {order.subscriptionDetails?.nextDeliveryDate ? (
                                        <span className="font-medium text-purple-600">
                                            {new Date(order.subscriptionDetails.nextDeliveryDate).toLocaleDateString()}
                                        </span>
                                    ) : (
                                        <span className="text-gray-500">N/A</span>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Orders;


        
       

    





