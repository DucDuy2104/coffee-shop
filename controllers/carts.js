const Cart = require('../models/cart');
const User = require('../models/user');
const Product = require('../models/product');

const getTotalPricePerCart = (product, size, quantity) => {
    let price = product.priceL;
    if(size === 'M') {
        price = product.priceM;
    }
    if(size === 'S') {
        price = product.priceS;
    }
    return price * quantity;
}

exports.addToCart = async (req, res) => {
    try {
        const { userId, productId, size, quantity } = req.body;
        if(!userId) {
            return res.status(400).json({ status: false, message: 'User ID is required' });
        }
        if(!productId) {
            return res.status(400).json({ status: false, message: 'Product ID is required' });
        }
        if(!size) {
            return res.status(400).json({ status: false, message: 'Size is required' });
        }
        if(!quantity || quantity <= 0) {
            return res.status(400).json({ status: false, message: 'Quantity must be a positive number' });
        }
        const user = await User.findById(userId);
        if(!user) {
            return res.status(404).json({ status: false, message: 'User not found' });
        }
        const product = await Product.findById(productId);
        if(!product) {
            return res.status(404).json({ status: false, message: 'Product not found' });
        }
        // Note: Thêm số lượng nếu sản phẩm tương tự đã tồn tại trong giỏ hàng
        const existingCartItem = await Cart.findOne({ user: userId, product: productId, size: size });
        if(existingCartItem) {
            existingCartItem.quantity += quantity;
            await existingCartItem.save();
            return res.status(200).json({ status: true, message: 'Updated quantity in cart successfully!', data: existingCartItem });
        }

        const total = getTotalPricePerCart(product, size, quantity);
        const cart = await Cart.create({
            user: userId,
            product: productId,
            size: size,
            quantity,
            total: total
        })
        return res.status(200).json({status: true, message: 'Added to cart successfully!', data: cart})
    } catch (error) {
        console.error(error);
        return res.status(500).json({ status: false, message: 'Internal server error' });
    }
}

exports.getCarts = async (req, res) => {
    try {
        const { userId } = req.query;
        if(!userId) {
            return res.status(400).json({ status: false, message: 'User ID is required' });
        }
        const user = await User.findById(userId);
        if(!user) {
            return res.status(404).json({ status: false, message: 'User not found' });
        }
        const carts = await Cart.find({user: userId}).populate('product');
        return res.status(200).json({ status: true, message: 'Carts retrieved successfully!', data: carts });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ status: false, message: 'Internal server error' });
    }
}


exports.deleteCart = async (req, res) => {
    try {
        const { cartId } = req.body;
        if(!cartId) {
            return res.status(400).json({ status: false, message: 'Cart ID is required' });
        }
        const cart = await Cart.findById(cartId).populate('product');
        if(!cart) {
            return res.status(404).json({ status: false, message: 'Cart not found' });
        }
        await cart.remove();
        return res.status(200).json({ status: true, message: 'Cart deleted successfully!', data: cart });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ status: false, message: 'Internal server error' });
    }
}

exports.increQuantity = async (req, res) => {
    try {
        const { cartId } = req.body;
        if(!cartId) {
            return res.status(400).json({ status: false, message: 'Cart ID is required' });
        }
        const cart = await Cart.findById(cartId).populate('product');
        if(!cart) {
            return res.status(404).json({ status: false, message: 'Cart not found' });
        }
        cart.quantity += 1;
        cart.total = getTotalPricePerCart(cart.product, cart.size, cart.quantity);
        await cart.save();
        return res.status(200).json({ status: true, message: 'Quantity increased successfully!', data: cart });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ status: false, message: 'Internal server error' });
    }
}

exports.decreQuantity = async (req, res) => {
    try {
        const {cartId} = req.body;
        if(!cartId) {
            return res.status(400).json({ status: false, message: 'Cart ID is required' });
        }
        const cart = await Cart.findById(cartId).populate('product');
        if(!cart) {
            return res.status(404).json({ status: false, message: 'Cart not found' });
        }
        if(cart.quantity <= 1) {
            return res.status(400).json({ status: false, message: 'Cannot decrease quantity to 0' });
        }
        cart.quantity -= 1;
        cart.total = getTotalPricePerCart(cart.product, cart.size, cart.quantity);
        await cart.save();
        return res.status(200).json({ status: true, message: 'Quantity decreased successfully!', data: cart });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ status: false, message: 'Internal server error' });
    }
}


exports.clearCart = async (req, res) => {
    try {
        const { userId } = req.params;
        if(!userId) {
            return res.status(400).json({ status: false, message: 'User ID is required' });
        }
        const user = await User.findById(userId);
        if(!user) {
            return res.status(404).json({ status: false, message: 'User not found' });
        }
        await Cart.deleteMany({ user: userId });
        return res.status(200).json({ status: true, message: 'Cart cleared successfully!' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ status: false, message: 'Internal server error' });
    }
}