const router = require('express').Router();
const Users = require('../users/users-model');

router.get('/', (req, res) => {
    Users.find('users')
        .then((users) => {
            res.status(200).json(users);
        })
        .catch((err) => {
            res.status(500).json({ error: err.message });
        });
});

module.exports = router;