const { Schema, model } = require('mongoose');

const reactionSchema = new Schema({
    //reactionId: {

    //},
    // reactionBody: {
    //     type: String,
    //     required: true,
    //     maxLength: 280
    // },
    username: {
        type: String,
        required: true
    },
    createdAt: {
        type: String,
        default: new Date().toISOString()//Date.now,
        // get: timeStamp => dateFormat(timeStamp)
        // default format getter
    }
    },
    {
        toJSON: {
            getters: true
        }
    }
);

const ThoughtSchema = new Schema({
    thoughtText: {
        type: String,
        required: true,
        minLength: 1,
        maxLength: 280
    },
    // createdAt: {
    //     createdAt: Date,
    //     default: Date.now
    // },
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

  const Thought = model('Thought', ThoughtSchema);


  module.exports = Thought;
  