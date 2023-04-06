const { getUsers, getUser, postUsers, putUser, deleteUser } = require('../controllers/user.controller');
const router = require('express').Router();

router.route('/').get(getUsers).post(postUsers);
router.route('/:id').put(putUser).delete(deleteUser).get(getUser);

module.exports = router;
