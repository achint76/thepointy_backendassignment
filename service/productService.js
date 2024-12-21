const Product = require('../models/products.model');

const ProductService = {
    // Create a product
    async createProduct(name, description, price, stock) {
        const newProduct = new Product({
            name,
            description,
            price,
            stock
        });

        await newProduct.save();
        return newProduct;
    },

    // Update product by ID
    async updateProduct(id, updateData) {
        const product = await Product.findById(id);
        if (!product || product.isDeleted) {
            return null; // Product not found or soft deleted
        }

        // Update fields
        Object.assign(product, updateData);
        await product.save();
        return product;
    },

    // Get all products with filters and pagination listing featuer of products done here 
    async getAllProducts(page, limit, priceRange, stockAvailability, search) {
        let query = {};

        if (priceRange) {
            const [min, max] = priceRange.split('-');
            query.price = { $gte: min, $lte: max };
        }

        if (stockAvailability !== undefined) {
            query.stock = { $gt: 0 };
        }

        if (search) {
            query.name = { $regex: search, $options: 'i' }; // Case-insensitive search
        }

        query.isDeleted = false; // Ensure we're not fetching deleted products

        const skip = (page - 1) * limit;
        const products = await Product.find(query)
            .skip(skip)
            .limit(Number(limit));

        const totalCount = await Product.countDocuments(query);
        const totalPages = Math.ceil(totalCount / limit);

        return { products, totalCount, totalPages };
    },

    // Soft delete product by ID
    async deleteProduct(id) {
        const product = await Product.findById(id);
        if (!product || product.isDeleted) {
            return null; // Product not found or already deleted
        }

        // Mark as deleted without actually removing from the database
        product.isDeleted = true;
        await product.save();
        return product;
    }
};

module.exports = ProductService;
