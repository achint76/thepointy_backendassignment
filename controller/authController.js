
const mongoose = require('mongoose');
const UserService = require('../service/authService');

const UserController = {
    async register(req, res) {
        try {
            const { username, password, email, role } = req.body;
            if (!username || !password || !email) {
                return res.status(400).json({ message: 'All fields are required' });
            }
            const result = await UserService.register(username, email, password, role);


            return res.status(201).json({ message: 'User registered successfully',
                user: { id: result._id, username: result.username, email: result.email } });

        } catch (error) {
            res.status(500).json({ error: error.message });

        }
    },


    async login(req, res) {
        try {
            const { email, password } = req.body;
            if (!email || !password) {
                return res.status(400).json({ message: 'All fields are required' });
            }
            const result = await UserService.login(email, password);
            
            return res.status(200).json({ message: 'Login successful', token: result.token, email: result.email, role: result.role });
            
        } catch (error) {
            res.status(400).json({ error: error.message });

        }
    }


}

module.exports = UserController;