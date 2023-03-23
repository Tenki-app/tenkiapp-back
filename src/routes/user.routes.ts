const router = require('express').Router();
const { getUsers } = require('../controllers/user.controller');

router.route('/users').get(getUsers);
module.exports = router;
