const Review = require('../models/review');
const User = require('../models/user');
const Product = require('../models/product');
const OrderDetail = require('../models/order_detail');

exports.createReview = async (req, res) => {
    try {
        const { userId, productId, content, rating, assets } = req.body;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ status: false, message: 'User not found' });
        }
        if(!userId ||!productId || !content || !rating) {
            return res.status(400).json({ status: false, message: 'User ID, product ID, content, and rating are required' });
        }
        let orderDetails = await OrderDetail.find().populate('order')
        orderDetails = orderDetails.filter((detail) => detail.order.status == 'completed')
        orderDetails = orderDetails.filter((detail) => detail.product == productId);
        if(orderDetails.length == 0) {
            return res.status(400).json({ status: false, message: 'User has not completed any orders on this product' });
        }
        const savedReview = await Review.create({
            user: userId,
            product: productId,
            content: content,
            rating: rating,
            assets: assets
        })
        return res.status(200).json({ status: true, message: 'Review created successfully', data: savedReview });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ status: false, message: 'Internal server error' });
    }
}


exports.getReviewsByProduct = async (req, res) => {
    try {
        const {productId} = req.params;
        if(!productId) {
            return res.status(400).json({ status: false, message: 'Product ID is required' });
        }
        const reviews = await Review.find({ product: productId }).populate('user');
        return res.status(200).json({ status: true, message: 'Reviews retrieved successfully', data: reviews });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ status: false, message: 'Internal server error' });
    }
}


exports.getReviewsByUser = async (req, res) => {
    try {
        const {userId} = req.params;
        if(!userId) {
            return res.status(400).json({ status: false, message: 'User ID is required' });
        }
        const reviews = await Review.find({ user: userId }).populate('product');
        return res.status(200).json({ status: true, message: 'Reviews retrieved successfully', data: reviews });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ status: false, message: 'Internal server error' });
    }
}

exports.deleteReview = async (req, res) => {
    try {
        const {reviewId} = req.body;
        if(!reviewId) {
            return res.status(400).json({ status: false, message: 'Review ID is required' });
        }
        const review = await Review.findByIdAndDelete(reviewId);
        if(!review) {
            return res.status(404).json({ status: false, message: 'Review not found' });
        }
        return res.status(200).json({ status: true, message: 'Review deleted successfully', data: review });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ status: false, message: 'Internal server error' });
    }
}