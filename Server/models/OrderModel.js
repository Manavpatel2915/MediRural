const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required : true
    },
    items : [{
        medicine : {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'Medicine',
            required : true
        },
        quantity : {
            type : Number,
            required : true,
            min : 1
        },
        price : {
            type : Number,
            required : true,
            min : 0
        }
    }],
    totalAmount : {
        type : Number,
        required : true,
        min : 0
    },
    status :{
        type : String,
        enum : ['pending', 'confirmed', 'shipped', 'delivered', 'cancelled'],
        default : 'pending'
    },
    isSubscription : {
        type : Boolean,
        default : false
    }, 
    subscriptionDetails : {
        frequency : {
            type : String,
            enum : ['weekly', 'monthly'],
            default : 'daily'
        },
        nextDeliveryDate : {
            type : Date,
            required : ()=> this.isSubscription
        },
    } ,
    paymentDetails : {
        paymentMethod : {
            type : String,
            enum : ['card', 'cash', 'upi'],
            default : 'cash'
        },
    }
})

orderSchema.methods.isSubscriptionOrder = ()=> this.isSubscription ;

orderSchema.methods.cancelOrder = ()=>{
    if(this.status === "shipped" || this.status === "delivered"){
        throw new Error("Cannot cancel shipped or delivered orders");
    }
    this.status = "cancelled";
    return this.save();
}

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;