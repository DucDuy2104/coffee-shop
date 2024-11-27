const Order = require('../models/order')
const OrderDetail = require('../models/order_detail')
const Address = require('../models/address')
const Voucher = require('../models/voucher');
const Cart = require('../models/cart');
const User = require('../models/user');

exports.createOrder = async (req, res) => {
    try {
        const { userId, voucherCode, addressId } = req.body;
        if(!userId || !addressId) {
            return res.status(400).json({ status: false, message: 'User ID and address ID are required' });
        }
        const user = await User.findById(userId);
        if(!user) {
            return res.status(404).json({ status: false, message: 'User not found' });
        }
        const address = await Address.findById(addressId);
        if(!address) {
            return res.status(404).json({ status: false, message: 'Address not found' });
        }
        const voucher = await Voucher.findOne({code : voucherCode});
        if(!voucher || voucher.isDeleted) {
            return res.status(404).json({ status: false, message: 'Invalid or deleted voucher' });
        }
        const carts = await Cart.find({ user: userId });
        if(!carts || carts.length === 0) {
            return res.status(400).json({ status: false, message: 'Cart is empty' });
        }
        const order = new Order();
        const orderDetailsPromise = carts.map(async (cart) => {
            return await OrderDetail.create({
                ...cart._doc,
                order: order._id,
            })
        })
        await Promise.all(orderDetailsPromise)

        let totalPrice  = carts.reduce((total, cart) => total + (cart.product.price * cart.quantity), 0);

        if(voucher) {
            totalPrice = totalPrice - voucher.discount;
            totalPrice = totalPrice < 0 ? 0 : totalPrice;
         }

        order.user = userId;
        order.address = addressId;
        order.voucher = voucher._id;
        order.total = totalPrice;

        const savedOrder = await order.save();

        await Cart.deleteMany({ user: userId });
        return res.status(200).json({ status: true, message: 'Order created successfully', data: savedOrder });
         
    } catch (error) {
        console.error(error);
        return res.status(500).json({ status: false, message: 'Internal server error' });
    }
}

exports.getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find().populate('voucher address');
        const ordersPromise = orders.map(async (order) => {
            const orderDetails = await OrderDetail.find({order: order._id}).populate('product')
            return {
                ...order._doc,
                details: orderDetails
            }
        }) 
        const returnedData = await Promise.all(ordersPromise);
        return res.status(200).json({ status: true, message: 'Orders retrieved successfully', data: returnedData });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ status: false, message: 'Internal server error' });
    }
}

exports.getOrdersByUser = async (req, res) => {
    try {
        const { userId } = req.query
        if(!userId) {
            return res.status(400).json({ status: false, message: 'User ID is required' });
        }
        const orders = await Order.find({user: userId}).populate('voucher address');
        const ordersPromise = orders.map(async (order) => {
            const orderDetails = await OrderDetail.find({order: order._id}).populate('product')
            return {
               ...order._doc,
                details: orderDetails
            }
        })
        const returnedData = await Promise.all(ordersPromise);
        return res.status(200).json({ status: true, message: 'Orders retrieved successfully', data: returnedData });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ status: false, message: 'Internal server error' });
    }
}

exports.getOrderDetail = async (req, res) => {
    try {
        const { orderId } = req.params;
        if(!orderId) {
            return res.status(400).json({ status: false, message: 'Order details are required' });
        }
        const order = await Order.findById(orderId).populate('voucher address');
        if(!order) {
            return res.status(404).json({ status: false, message: 'Order not found' });
        }
        const orderDetails = await OrderDetail.find({order: orderId}).populate('product');
        const data = {
            ...order,
            details: orderDetails
        }
        return res.status(200).json({ status: true, message: 'Order details retrieved successfully', data: data });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ status: false, message: 'Internal server error' });
    }
}

exports.confirmOrder = async (req, res) => {
    try {
        const { orderId } = req.body;
        if(!orderId) {
            return res.status(400).json({ status: false, message: 'Order ID is required' });
        }
        const order = await Order.findById(orderId);
        if(!order) {
            return res.status(404).json({ status: false, message: 'Order not found' });
        }
        if(order.status != 'ordered') {
            return res.status(400).json({ status: false, message: 'Invalid order status. Only ordered orders can be confirmed.' });
        }
        order.status = 'preparing';
        const updatedOrder = await order.save();
        return res.status(200).json({ status: true, message: 'Order confirmed successfully', data: updatedOrder });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ status: false, message: 'Internal server error' });
    }
}

exports.shipOrder = async (req, res) => {
    try {
        const { orderId } = req.body;
        if(!orderId) {
            return res.status(400).json({ status: false, message: 'Order ID is required' });
        }
        const order = await Order.findById(orderId);
        if(!order) {
            return res.status(404).json({ status: false, message: 'Order not found' });
        }
        if(order.status!= 'preparing') {
            return res.status(400).json({ status: false, message: 'Invalid order status. Only preparing orders can be shipped.' });
        }
        order.status ='shipping';
        const updatedOrder = await order.save();
        return res.status(200).json({ status: true, message: 'Order shipped successfully', data: updatedOrder });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ status: false, message: 'Internal server error' });
        
    }
}

exports.completeOrder = async (req, res) => {
    try {
        const { orderId } = req.body;
        if(!orderId) {
            return res.status(400).json({ status: false, message: 'Order ID is required' });
        }
        const order = await Order.findById(orderId);
        if(!order) {
            return res.status(404).json({ status: false, message: 'Order not found' });
        }
        if(order.status!= 'shipping') {
            return res.status(400).json({ status: false, message: 'Invalid order status. Only shipping orders can be completed.' });
        }
        order.status ='completed';
        const updatedOrder = await order.save();
        return res.status(200).json({ status: true, message: 'Order completed successfully', data: updatedOrder });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ status: false, message: 'Internal server error' });
    }
}

exports.cancelOrder = async (req, res) => {
    try {
        const { orderId } = req.body;
        if(!orderId) {
            return res.status(400).json({ status: false, message: 'Order ID is required' });
        }
        const order = await Order.findById(orderId);
        if(!order) {
            return res.status(404).json({ status: false, message: 'Order not found' });
        }
        if(order.status !== 'ordered') {
            return res.status(400).json({ status: false, message: 'Invalid order status. Only ordered orders can be cancelled.' });
        }
        order.status ='cancelled';
        const updatedOrder = await order.save();
        return res.status(200).json({ status: true, message: 'Order cancelled successfully', data: updatedOrder });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ status: false, message: 'Internal server error' });
    }
}


exports.getOrderByStatus = async (req, res) => {
    try {
        const { status, userId } = req.body;
        if(!status || (status!= 'ordered' && status!= 'preparing' && status!='shipping' && status!= 'completed' && status!= 'cancelled')) {
            return res.status(400).json({ status: false, message: 'Invalid order status' });
        }
        const query = userId? { user: userId, status: status } : { status: status };
        const orders = await Order.find(query).populate('voucher address');
        const ordersPromise = orders.map(async (order) => {
            const details = await OrderDetail.find({order: order._id})
            return {...order._doc, details: details }
        })
        const data = await Promise.all(ordersPromise);
        return res.status(200).json({ status: true, message: 'Orders retrieved successfully', data: data });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ status: false, message: 'Internal server error' });
    }
}