const { getUsers, postUsers } = require('../controllers/user.controller');
const router = require('express').Router();

router.route('/').get(getUsers).post(postUsers);

module.exports = router;
