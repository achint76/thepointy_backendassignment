const cron = require('node-cron');
const Product = require('../models/products.model');
const Order = require('../models/orders.model');
const sendEmail = require('../utils/nodemailer');  // Import the sendEmail function
require('dotenv').config();

// Product Stock Monitoring Cron Job (runs daily at midnight)
cron.schedule('0 0 * * *', async () => {
    try {
        const products = await Product.find({ stock: { $lt: 10 } });

        if (products.length > 0) {
            const productNames = products.map(product => product.name).join(', ');

            // Send email to admin if stock is below 10
            const subject = 'Product Stock Alert';
            const text = `The following products have stock below 10: ${productNames}. Please restock them.`;
            
            await sendEmail(process.env.ADMIN_EMAIL, subject, text);  // Use sendEmail from utils
            console.log('Stock alert email sent!');
        }
    } catch (error) {
        console.error('Error checking stock or sending email:', error.message);
    }
});

// Order Fulfillment Reminder Cron Job (runs every hour)
cron.schedule('0 * * * *', async () => {
    try {
        const orders = await Order.find({
            status: 'Pending',
            createdAt: { $lt: new Date(Date.now() - 24 * 60 * 60 * 1000) } // Orders older than 24 hours
        });

        if (orders.length > 0) {
            const orderIds = orders.map(order => order._id).join(', ');

            // Send email reminder for pending orders
            const subject = 'Order Fulfillment Reminder';
            const text = `The following orders are still pending after 24 hours: ${orderIds}. Please process them.`;

            await sendEmail(process.env.ADMIN_EMAIL, subject, text);  // Use sendEmail from utils
            console.log('Order fulfillment reminder email sent!');
        }
    } catch (error) {
        console.error('Error checking orders or sending email:', error.message);
    }
});
