import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import { Calendar, Clock, Package, Pause, Play, X, RefreshCw } from 'lucide-react';

const MySubscriptions = () => {
  const [subscriptions, setSubscriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { user } = useAuth();

  useEffect(() => {
    fetchSubscriptions();
  }, []);

  const fetchSubscriptions = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const response = await axios.get('https://medirural.onrender.com/api/orders/user/subscriptions', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.data.success) {
        setSubscriptions(response.data.subscriptions);
      }
    } catch (err) {
      console.error('Error fetching subscriptions:', err);
      setError('Failed to load subscriptions');
    } finally {
      setLoading(false);
    }
  };

  const updateSubscriptionStatus = async (orderId, newStatus) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put(
        `https://medirural.onrender.com/api/orders/${orderId}`,
        { 
          subscriptionDetails: {
            status: newStatus
          }
        },
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );

      if (response.data.success) {
        // Update the local state
        setSubscriptions(prev => 
          prev.map(sub => 
            sub._id === orderId 
              ? { 
                  ...sub, 
                  subscriptionDetails: {
                    ...sub.subscriptionDetails,
                    status: newStatus
                  }
                }
              : sub
          )
        );
      }
    } catch (err) {
      console.error('Error updating subscription:', err);
      setError('Failed to update subscription status');
    }
  };

  const getStatusColor = (subscriptionDetails) => {
    const status = subscriptionDetails?.status || 'active';
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'paused':
        return 'bg-yellow-100 text-yellow-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (subscriptionDetails) => {
    const status = subscriptionDetails?.status || 'active';
    switch (status) {
      case 'active':
        return <Play className="w-4 h-4" />;
      case 'paused':
        return <Pause className="w-4 h-4" />;
      case 'cancelled':
        return <X className="w-4 h-4" />;
      default:
        return <Package className="w-4 h-4" />;
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getFrequencyText = (frequency) => {
    return frequency === 'weekly' ? 'Weekly' : 'Monthly';
  };

  const getSubscriptionStatusText = (subscriptionDetails) => {
    const status = subscriptionDetails?.status || 'active';
    switch (status) {
      case 'active':
        return 'Active';
      case 'paused':
        return 'Paused';
      case 'cancelled':
        return 'Cancelled';
      default:
        return 'Active';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex items-center justify-center">
            <RefreshCw className="w-8 h-8 animate-spin text-blue-600" />
            <span className="ml-2 text-gray-600">Loading subscriptions...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Subscriptions</h1>
          <p className="text-gray-600">Manage your recurring medicine deliveries</p>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}

        {subscriptions.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-8 text-center">
            <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No Active Subscriptions</h3>
            <p className="text-gray-600 mb-6">
              You don't have any active subscriptions yet. Start a subscription when placing your next order.
            </p>
            <button
              onClick={() => window.history.back()}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Browse Medicines
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {subscriptions.map((subscription) => (
              <div key={subscription._id} className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">
                      Subscription #{subscription._id.slice(-6)}
                    </h3>
                                         <div className="flex items-center space-x-4 text-sm text-gray-600">
                       <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(subscription.subscriptionDetails)}`}>
                         {getStatusIcon(subscription.subscriptionDetails)}
                         <span className="ml-1 capitalize">{subscription.subscriptionDetails?.status || 'active'}</span>
                       </span>
                      <span className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        {getFrequencyText(subscription.subscriptionDetails?.frequency)}
                      </span>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <p className="text-2xl font-bold text-gray-900">
                      ₹{subscription.totalAmount}
                    </p>
                    <p className="text-sm text-gray-600">per delivery</p>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Medicines</h4>
                    <div className="space-y-1">
                      {subscription.items.map((item, index) => (
                        <div key={index} className="flex justify-between text-sm">
                          <span className="text-gray-600">{item.medicine?.name || 'Medicine'}</span>
                          <span className="text-gray-900">Qty: {item.quantity}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Delivery Details</h4>
                    <div className="space-y-1 text-sm text-gray-600">
                      <p>{subscription.shipping.name}</p>
                      <p>{subscription.shipping.address}</p>
                      <p>{subscription.shipping.city}, {subscription.shipping.state} - {subscription.shipping.pincode}</p>
                    </div>
                  </div>
                </div>

                {subscription.subscriptionDetails?.nextDeliveryDate && (
                  <div className="bg-blue-50 rounded-lg p-4 mb-4">
                    <div className="flex items-center">
                      <Calendar className="w-5 h-5 text-blue-600 mr-2" />
                      <span className="font-medium text-blue-900">Next Delivery:</span>
                      <span className="ml-2 text-blue-800">
                        {formatDate(subscription.subscriptionDetails.nextDeliveryDate)}
                      </span>
                    </div>
                  </div>
                )}

                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                  <div className="text-sm text-gray-600">
                    Started on {formatDate(subscription.createdAt)}
                  </div>
                  
                                     <div className="flex space-x-2">
                     {subscription.subscriptionDetails?.status === 'active' && (
                       <>
                         <button
                           onClick={() => updateSubscriptionStatus(subscription._id, 'paused')}
                           className="px-4 py-2 text-sm font-medium text-yellow-700 bg-yellow-100 rounded-lg hover:bg-yellow-200 transition-colors"
                         >
                           Pause
                         </button>
                         <button
                           onClick={() => updateSubscriptionStatus(subscription._id, 'cancelled')}
                           className="px-4 py-2 text-sm font-medium text-red-700 bg-red-100 rounded-lg hover:bg-red-200 transition-colors"
                         >
                           Cancel
                         </button>
                       </>
                     )}
                     
                     {subscription.subscriptionDetails?.status === 'paused' && (
                       <>
                         <button
                           onClick={() => updateSubscriptionStatus(subscription._id, 'active')}
                           className="px-4 py-2 text-sm font-medium text-green-700 bg-green-100 rounded-lg hover:bg-green-200 transition-colors"
                         >
                           Resume
                         </button>
                         <button
                           onClick={() => updateSubscriptionStatus(subscription._id, 'cancelled')}
                           className="px-4 py-2 text-sm font-medium text-red-700 bg-red-100 rounded-lg hover:bg-red-200 transition-colors"
                         >
                           Cancel
                         </button>
                       </>
                     )}
                   </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MySubscriptions; 