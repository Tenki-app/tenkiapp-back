const router = require('express').Router();
const { getUsers, postUsers } = require('../controllers/user.controller');

router.route('/').get(getUsers).post(postUsers);
module.exports = router;
