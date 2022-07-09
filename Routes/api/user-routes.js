const router = require("express").Router();

const { getAllUsers } = require("../../controllers/user-controller");

// Set up GET all and POST at /api/Users
router
.route('/')
.get(getAllUsers)

    


module.exports = router;
