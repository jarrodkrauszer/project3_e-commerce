const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://jk:password123AGAIN@cluster0.u1xl7wy.mongodb.net/?retryWrites=true&w=majority' || 'mongodb://127.0.0.1:27017/clothing_store_db');

module.exports = mongoose.connection;
