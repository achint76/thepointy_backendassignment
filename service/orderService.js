const Order = require('../models/orders.model');
const Product = require('../models/products.model');

const OrderService = {
    async createOrder(userId, products) {
        if (!products || products.length === 0) {
            throw new Error('Products are required');
        }

        // Calculating the total amount of a user 
        let totalAmount = 0;
        for (const item of products) {
            const product = await Product.findById(item.productId);
            if (!product || product.isDeleted) {
                throw new Error(`Product not found: ${item.productId}`);
            }
            if (item.quantity > product.stock) {
                throw new Error(`Insufficient stock for product: ${product.name}`);
            }
            totalAmount += product.price * item.quantity;
        }

        // Creating order and saVING IT IN THE DB
        const order = new Order({ userId, products, totalAmount });
        return await order.save();
    },

    async getOrders(userId) {
        return await Order.find({ userId, isDeleted: false }).populate('products.productId', 'name price');
    },

    async updateOrderStatus(orderId, status) {
        if (!status) {
            throw new Error('Status is required');
        }

        const order = await Order.findById(orderId)
        .select('-isDeleted -createdAt -updatedAt -__v');;  //don't want to show this;
        if (!order || order.isDeleted) {
            throw new Error('Order not found');
        }

        order.status = status;
        return await order.save();
    },

    async deleteOrder(orderId) {
        const order = await Order.findById(orderId)
        .select('-isDeleted -createdAt -updatedAt -__v');;
        if (!order || order.isDeleted) {
            throw new Error('Order not found');
        }

        order.isDeleted = true;
        return await order.save();
    }
};

module.exports = OrderService;
