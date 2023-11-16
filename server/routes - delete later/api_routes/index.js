const router = require('express').Router();

const product_routes = require('./product_routes');

router.use('/products', product_routes)

module.exports = router;

