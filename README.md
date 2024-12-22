# BACKEND ASSIGNMENT

## Description
An Ecommerce Management System to handle user registrations, logins, product management, orders, and email notifications for various actions. The system includes features like:

- **User Registration and Login**: Secure user registration with password hashing and JWT-based authentication.
- **Product Management**: Create, update, get, and delete products (soft deletion).
- **Order Management**: Create orders, view orders, update order status, and soft delete orders.
- **Cron Jobs**: 
  - Product Stock Monitoring: Sends email alerts to admin if stock falls below 10.
  - Order Fulfillment Reminder: Sends email reminders for pending orders older than 24 hours.

## Features
- **JWT Authentication**: Secure routes for registered users.
- **Email Notifications**: Uses Nodemailer for email notifications.
- **Cron Jobs**: Automated tasks for stock monitoring and order reminders.

## Installation

### Prerequisites
- Node.js
- MongoDB
- Email service (Gmail, for example)

### Steps to Run
1. Download the ZIP file of the project from the provided link.
2. Extract the ZIP file to a folder of your choice.
3. Navigate to the project folder in your terminal:
   ```bash
   cd <path-to-extracted-folder>
   ```
4. Install the required dependencies:
   ```bash
   npm install
   ```
5. Create a `.env` file in the root directory and add the following environment variables:
   ```env
   DB_URI=mongodb://localhost:27017/thepointybackendassignment
   JWT_SECRET=your_secret_key
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASS=your-email-password
   ADMIN_EMAIL=adminexampleboss@yopmail.com
   ```
6. Start the server:
   ```bash
   npm start
   ```

## API Endpoints

### User Authentication
- **POST /api/users/register**: Register a new user.
- **POST /api/users/login**: Login a user.

### Product Management
- **POST /api/products/add-products**: Create a new product.
- **PUT /api/products/update-products/:id**: Update a product by ID.
- **GET /api/products/listing-products**: Get all products with pagination and filters.
- **PUT /api/products/delete-products/:id**: Soft delete a product by ID.

### Order Management
- **POST /api/orders/creating-order**: Create a new order.
- **GET /api/orders/listing-order**: Get all orders for the logged-in user.
- **PUT /api/orders/update-order/:id**: Update order status by ID.
- **PUT /api/orders/delete-order/:id**: Soft delete an order by ID.

## Cron Jobs
- **Product Stock Monitoring**: Runs daily at midnight to check product stock and send email alerts if stock falls below 10.
- **Order Fulfillment Reminder**: Runs every hour to send email reminders for pending orders older than 24 hours.

## License
This project is licensed under the ISC License.