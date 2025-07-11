const mongoose = require('mongoose');
const cron = require('node-cron');
const Order = require('../models/OrderModel'); 
require('dotenv').config();

// Function to calculate next date
function getNextDeliveryDate(type) {
  const nextDate = new Date();
  if (type === 'weekly') nextDate.setDate(nextDate.getDate() + 7);
  if (type === 'monthly') nextDate.setMonth(nextDate.getMonth() + 1);
  nextDate.setHours(0, 0, 0, 0);
  return nextDate;
}

// MongoDB connect
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('MongoDB connected for CRON job');
  })
  .catch(err => console.error('Mongo connection failed:', err));

// Cron Job – Run every day at 00:01 AM
cron.schedule('1 0 * * *', async () => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  try {
    const dueOrders = await Order.find({
      isSubscription: true,
      'subscriptionDetails.status': 'active',
      'subscriptionDetails.nextDeliveryDate': today
    });

    for (const order of dueOrders) {
      const newOrder = new Order({
        user: order.user,
        items: order.items,
        totalAmount: order.totalAmount,
        status: 'pending', // fresh order
        shipping: order.shipping,
        isSubscription: true,
        subscriptionDetails: {
          frequency: order.subscriptionDetails.frequency,
          duration: order.subscriptionDetails.duration,
          status: 'active',
          nextDeliveryDate: getNextDeliveryDate(order.subscriptionDetails.frequency)
        },
        paymentDetails: {
          paymentMethod: order.paymentDetails.paymentMethod
        }
      });

      await newOrder.save();
    }

    console.log(`Auto-created ${dueOrders.length} subscription orders`);
  } catch (err) {
    console.error('Error processing subscription orders:', err);
  }
});
