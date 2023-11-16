const Product = require('../models/Product');

module.exports = {
  async getAll(req, res) {
    try {
      const products = await Product.find().populate('category');

      res.json(products)

    } catch (err) {
      console.log(err.message);

      res.status(403).json({
        message: err.message
      })
    }
  }
}