const { Schema, model } = require('mongoose');

const reactionSchema = new Schema({
    reacitonId: {

    },
    reactionBody: {
        type: String,
        required: true,
        maxLength: 280
    },
    username: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
        //default format getter
    }
    },
    {
        toJSON: {
            getters: true
        }
    }
);

const thoughtSchema = new Schema({
    thoughtText: {
        type: String,
        required: true,
        minLength: 1,
        maxLength: 280
    },
    createdAt: {
        createdAt: Date,
        default: Date.now
    },
    username: {
        type: String,
        required: true
    },
    reactions: [reactionSchema]
}
);

ThoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
  });

  const Thought = model('User', thoughtSchema);


  module.exports = Thought;
  