const Product = require('../models/product')
const Category = require('../models/category')
const Cart = require('../models/cart')

exports.createProduct = async (req, res) => {
    try {
        const { name, description, image, priceL, priceM, priceS, categoryId } = req.body

        if(!categoryId) {
            return res.status(400).json({ status: false, message: 'Category ID is required' });
        }
        const category = await Category.findById(categoryId);

        if(!category) {
            return res.status(400).json({ status: false, message: 'Invalid category ID' });
        }

        if(!name || !description || !image || !priceL || !priceM || !priceS) {
            return res.status(400).json({ status: false, message: 'All fields are required' })
        }
        const product = await Product.create({ name: name, description: description, image: image, priceL, priceM, priceS, category:  categoryId});
        return res.status(201).json({ status: true, message: 'Product created successfully', data: product })
    } catch (error) {
        console.error(error)
        return res.status(500).json({ status: false, message: 'Internal server error' })
    }
}

exports.updateProduct = async (req, res) => {
    try {
        const { productId, name, description, categoryId, priceL, priceM, priceS, image } = req.body;
        if(!productId) {
            return res.status(400).json({ status: false, message: 'Product ID is required' });
        }
        let product = await Product.findById(productId).populate('category')
        if(!product) {
            return res.status(404).json({ status: false, message: 'Product not found' });
        }
        if(name) {
            product.name = name;
        }
        if(description) {
            product.description = description;
        }
        if(priceL) {
            product.priceL = priceL;
        }
        if(priceM) {
            product.priceM = priceM;
        }
        if(priceS) {
            product.priceS = priceS;
        }
        if(image) {
            product.image = image;
        }
        if(categoryId) {
            const category = await Category.findById(categoryId);
            if(!category) {
                return res.status(400).json({ status: false, message: 'Invalid category ID' });
            }
            product.category = categoryId;
        }
        product.updatedAt = new Date();
        const updatedProduct = await product.save();
        return res.status(200).json({ status: true, message: 'Product updated successfully', data: updatedProduct });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ status: false, message: 'Internal server error' });   
    }
}


exports.deleteProduct = async (req, res) => {
    try {
        const { productId } = req.body;
        if(!productId) {
            return res.status(400).json({ status: false, message: 'Product ID is required' });
        }
        let product = await Product.findById(productId).populate('category');
        if(!product) {
            return res.status(404).json({ status: false, message: 'Product not found' });
        }
        const deletedCarts = await Cart.deleteMany({ product: productId })
        product.isDeleted = true;
        const deletedProduct = await product.save();
        return res.status(200).json({ status: true, message: 'Product deleted successfully', data: deletedProduct });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ status: false, message: 'Internal server error' });
    }
}


exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.find({ isDeleted: false }).populate('category');
        return res.status(200).json({ status: true, message: 'Products fetched successfully', data: products });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ status: false, message: 'Internal server error' });
    }
}


exports.getProductsByCategory = async (req, res) => {
    try {
        const { categoryId } = req.params;
    
        if(!categoryId) {
            return res.status(400).json({ status: false, message: 'Category ID is required' });
        }
        const category = await Category.findById(categoryId);
        if(!category) {
            return res.status(404).json({ status: false, message: 'Invalid category ID' });
        }
        const products = await Product.find({ isDeleted: false, category: categoryId }).populate('category');
        return res.status(200).json({ status: true, message: 'Products fetched successfully', data: products });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ status: false, message: 'Internal server error' });
    }
}


exports.search = async (req, res) => {
    try {
        let { query } = req.query;
        if(!query) {
            return res.status(400).json({ status: false, message: 'Search query is required' });
        }
        query = query.trim();
        const products = await Product.find({
            $or: [
                { name: { $regex: query, $options: 'i' } },
                { description: { $regex: query, $options: 'i' } },
            ],
            isDeleted: false,
        }).populate('category');
        
        return res.status(200).json({ status: true, message: 'Products fetched successfully', data: products });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ status: false, message: 'Internal server error' });
    }
}


exports.getProductDetails = async ( req, res ) => {
    try {
        const { productId } = req.query
        if(!productId) {
            return res.status(400).json({ status: false, message: 'Product ID is required' });
        }
        const product = await Product.findById(productId).populate('category');
        if(product.isDeleted) {
            return res.status(404).json({ status: false, message: 'This product was deleted' });
        }
        if(!product) {
            return res.status(404).json({ status: false, message: 'Product not found' });
        }
        return res.status(200).json({ status: true, message: 'Product fetched successfully', data: product });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ status: false, message: 'Internal server error' });
    }
}
