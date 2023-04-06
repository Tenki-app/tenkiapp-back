const { getUsers, getUser, postUser, putUser, deleteUser } = require('../controllers/user.controller');
const router = require('express').Router();

router.route('/').get(getUsers).post(postUser);
router.route('/:id').put(putUser).delete(deleteUser).get(getUser);

module.exports = router;
