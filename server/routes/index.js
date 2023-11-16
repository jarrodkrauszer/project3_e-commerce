const router = require('express').Router();

const auth_routes = require('./auth_routes');
const api_routes = require('./api_routes');

router.use('/auth', auth_routes);
router.use('/api', api_routes);

module.exports = router;