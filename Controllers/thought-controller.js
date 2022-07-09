const { Thought, User } = require('../models');

const thoughtController = {
    
    addThought({ params, body }, res) {
        console.log(body);
        Thought.create(body)
        .then(({ _id }) => {
            return User.findOneAndUpdate(
                // { _id: }

            )
        })
    }
}

module.exports = thoughtController;