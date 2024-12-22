const OrderService = require('../service/orderService');

const OrderController = {
    async createOrder(req, res) {
        try {
            const { userId } = req.user;//it is coming from jwt
            const { products } = req.body;
            const order = await OrderService.createOrder(userId, products);

            //this i have used for showing only the required data not all unnecessary data
            const responseData = {
                message: 'Order created successfully',            
                order: {
                    id: order._id,
                    totalAmount: order.totalAmount,
                    status: order.status,
                    products: order.products.map(product => ({
                        productId: product.productId,
                        quantity: product.quantity
                    })),
                }
            }
            return res.status(201).json({ message: 'Order created successfully', responseData });
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    },

    async getOrders(req, res) {
        try {
            const { userId } = req.user;//it is coming from jwt
            console.log(userId,"USERIID");
            const orders = await OrderService.getOrders(userId);
            console.log(orders,"33");

            const formattedOrders = orders.map(order => ({  //only showing necessary resul
                id: order._id,
                totalAmount: order.totalAmount,
                status: order.status,
                createdAt: order.createdAt,
                updatedAt: order.updatedAt,
                products: order.products.map(p => ({
                    productId: p.productId._id,
                    name: p.productId.name, 
                    price: p.productId.price,
                    quantity: p.quantity
                }))
            }));
            return res.status(200).json({ formattedOrders });
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    },

    async updateOrderStatus(req, res) {
        try {
            const { id } = req.params;
            const { status } = req.body;
            const orders = await OrderService.updateOrderStatus(id, status)
            // .select('-isDeleted -createdAt -updatedAt -__v');;  //don't want to show this
            
            return res.status(200).json({ message: 'Order status updated', orders });
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    },

    async deleteOrder(req, res) {
        try {
            const { id } = req.params;
            const orders = await OrderService.deleteOrder(id);

            
            return res.status(200).json({ message: 'Order deleted successfully', orders });
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    }
};

module.exports = OrderController;
