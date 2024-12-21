

const userSchema = require('../models/users.model');
const bcrypt = require('bcrypt');
const UserController = require('../controller/authController');
const jwt = require('jsonwebtoken');

const UserService = {
    async register(username, email, password) {
        try {
            //const { username, password, email } = data;
            
            // Check if the email already exists in MongoDB
            const existingUser = await userSchema.findOne({ email });
            if (existingUser) {
                throw new Error('Email already exists');
            }
            console.log("service working");
            const hashedPassword = await bcrypt.hash(password, 10);
            const newUser = new userSchema({
                username,
                email,
                password: hashedPassword
            });

            await newUser.save();
            //console.log(newUser);
            return newUser;
        } catch (error) {
            throw new Error(error.message || 'Failed to egister user!');
        }
    },

    async login(email, password) {
        try {
            const user = await userSchema.findOne({ email });
            if (!user) {
                throw new Error('User not found with this email');
            }

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                throw new Error('Invalid credentials');
            }

            //returning jwt token
            const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
            return { token, email: user.email };
        } catch (error) {
            throw new Error(error.message || 'Failed to login user!');
        }
    }
}

module.exports = UserService;