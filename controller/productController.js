const ProductService = require('../service/productService');

const ProductController = {
    // Creating a product with post method in postman
    async createProduct(req, res) {
        try {
            const { name, description, price, stock } = req.body;
            if (!name || !description || !price || !stock) {
                return res.status(400).json({ message: 'All fields are required' });
            }
            const result = await ProductService.createProduct(name, description, price, stock);
            return res.status(201).json({ message: 'Product created successfully', product: result });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // Update product by ID
    async updateProduct(req, res) {
        try {
            const { id } = req.params;
            const { description, price, stock } = req.body;

            const result = await ProductService.updateProduct(id, { description, price, stock });
            if (!result) {
                return res.status(404).json({ message: 'Product not found' });
            }

            return res.status(200).json({ message: 'Product updated successfully', product: result });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // Get all products with pagination and filters(listing feature)
    async getAllProducts(req, res) {
        try {
            const { page = 1, limit = 5, priceRange, stockAvailability, searchName } = req.query;
            const result = await ProductService.getAllProducts(page, limit, priceRange, stockAvailability, searchName);
            return res.status(200).json(result);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // Soft delete product by ID
    async deleteProduct(req, res) {
        try {
            const { id } = req.params;
            const result = await ProductService.deleteProduct(id);
            if (!result) {
                return res.status(404).json({ message: 'Product not found' });
            }
            return res.status(200).json({ message: 'Product deleted successfully' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
};

module.exports = ProductController;
