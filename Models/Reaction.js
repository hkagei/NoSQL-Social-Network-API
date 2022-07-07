const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const ReactionSchema = new Schema(
    {
        reactionId: {

        },
        reactionBody: {
            type: String,
            required: true,
            max: [280]
        },
        username: {
            type: String,
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: createdAtVal => dateFormat(createdAtVal)
        }
      },
      {
        toJSON: {
          getters: true
        }
      }
);

const Reaction = model('Reaction', ReactionSchema);

module.exports = Reaction;