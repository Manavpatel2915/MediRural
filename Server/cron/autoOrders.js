// utils/autoOrderRunner.js

const Order = require('../models/OrderModel');

function getNextDeliveryDate(type) {
  const date = new Date();
  if (type === 'weekly') date.setDate(date.getDate() + 7);
  else if (type === 'monthly') date.setMonth(date.getMonth() + 1);
  date.setHours(0, 0, 0, 0);
  return date;
}

async function runAutoOrders() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

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
      status: 'pending',
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

  return dueOrders.length;
}

module.exports = runAutoOrders;
