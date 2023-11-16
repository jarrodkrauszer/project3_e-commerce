const router = require('express').Router();

const { getAll } = require('../../controllers/product_controller');

router.route('/')
  .get(getAll);


module.exports = router;