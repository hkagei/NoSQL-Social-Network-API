const router = require("express").Router();

const {
    addThought, 
    removeThought,
} = require("../../Controllers/thought-controller");

router.route('/:userId').post(addThought)

router
    .route
    .put
    .delete(removeThought);

module.exports = router;