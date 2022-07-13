const router = require("express").Router();

const { 
    getAllUsers,
    getSingleUser,
    createUser,
    updateUser,
    deleteUser
 } = require("../../controllers/user-controller");

// Set up GET all and POST at /api/Users
router
.route('/')
.get(getAllUsers)
.post(createUser);

router
.route('/:id')
.get(getSingleUser)
.put(updateUser)
.delete(deleteUser);    


module.exports = router;
