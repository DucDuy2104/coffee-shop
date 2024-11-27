const Category = require('../models/category')
const Product = require('../models/product')
const Cart = require('../models/cart')

exports.createCategory = async (req, res) => {
    try {
        const { name } = req.body;
        if (!name) {
            return res.status(400).json({ status: false, message: 'Category name is required' });
        }
        const category = await Category.create({ name: name });
        return res.status(200).json({ status: true, message: 'Category created successfully', category: category });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ status: false, message: 'Internal server error' });
    }
}


exports.getAllCategory = async (req, res) => {
    try {
        const categories = await Category.find({ isDeleted: false });
        return res.status(200).json({ status: true, message: 'Categories fetched successfully', data: categories });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ status: false, message: 'Internal server error' });
    }
}


exports.getCategoryWithProducts = async (req, res) => {
    try {
        const categories = await Category.find({ isDeleted: false });
        const categoriesWithProductsPromise = categories.map(async (category) => {
            const products = await Product.find({ category: category._id, isDeleted: false }).populate('category')
            return { ...category._doc, products: products }
        })
        const returnedData = await Promise.all(categoriesWithProductsPromise);
        return res.status(200).json({ status: true, message: 'Categories fetched successfully', data: returnedData });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ status: false, message: 'Internal server error' });
    }
}

exports.update = async (req, res) => {
    try {
        const { categoryId, name } = req.body;
        if (!name) {
            return res.status(400).json({ status: false, message: 'Nothing to update' });
        }
        const category = await Category.findByIdAndUpdate(categoryId, { name: name }, { new: true });
        if (!category) {
            return res.status(404).json({ status: false, message: 'Category not found' });
        }
        return res.status(200).json({ status: true, message: 'Category updated successfully', category: category });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ status: false, message: 'Internal server error' });
    }
}

exports.deleteCategory = async (req, res) => {
    try {
        const { categoryId } = req.body;
        if (!categoryId) {
            return res.status(400).json({ status: false, message: 'Category ID is required' });
        }
        const category = await Category.findById(categoryId);
        if (!category) {
            return res.status(404).json({ status: false, message: 'Category not found' });
        }
        var products = await Product.find({ category: categoryId });
        const productIds = products.map(product => product._id)
        await Product.updateMany({ category: categoryId, isDeleted: false }, { isDeleted: true });
        const deletedCart = await Cart.deleteMany({ product: {$in : productIds} });
        category.isDeleted = true;
        const deletedCategory =  await category.save();
        return res.status(200).json({ status: true, message: 'Category and related products were deleted successfully', data: deletedCategory });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ status: false, message: 'Internal server error' });

    }
}




