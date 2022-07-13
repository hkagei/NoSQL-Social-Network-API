const router = require("express").Router();

const {
    addThought,
    getThought,
    getSingleThought,
    updateThought,
    deleteThought,
} = require("../../Controllers/thought-controller");

router
.route('/')
.get(getThought)
.post(addThought)

router
    .route('/:id')
    .get(getSingleThought)
    .put(updateThought)
    .delete(deleteThought);

module.exports = router;