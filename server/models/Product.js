const { Schema, model } = require('mongoose');
const Category = require('./Category');

const productSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  imageUrl: {
    type: String
  },
  description: {
    type: String
  },
  price: {
    type: Number,
    required: true,
    min: 0.00
  },
  quantity: {
    type: Number,
    min: 0,
    default: 0
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
    required: true
  }
}, {
  timestamps: true
});

const Product = model('Product', productSchema);

module.exports = Product;