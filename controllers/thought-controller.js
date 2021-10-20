const { Thought, User } = require('../models');

const thoughtController = {
    //GET all thoughts
    getAllThoughts(req, res) {
        Thought.find({})
        .then(dbThoughtData => res.json(dbThoughtData))
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    },

    //GET a single Thought by ID
    getThoughtById({ params }, res) {
        Thought.findOne({ _id: params.thoughtId })
        .then(dbThoughtData => {
            if(!dbThoughtData) {
                res.status(404).json({ message: 'No Thought found with this id!'});
                return;
            }
            res.json(dbThoughtData);
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    },

    //POST a new Thought
    createThought({ params, body }, res) {
        console.log(body);
        Thought.create(body)
        .then(({ _id}) => {
            return User.findOneAndUpdate(
                { _id: body.userId},
                { $push: { thoughts: _id } },
                { new: true }
            )
        })
        .then(dbUserData => {
            if(!dbUserData) {
                res.status(404).json({ message: 'No user found with this id!' });
            }
        res.json(dbUserData)
        })
        .catch(err => res.json(400).json(err));
    },

    //create reaction to a thought
    addReaction({ params, body }, res) {
        Thought.findOneAndUpdate(
          { _id: params.thoughtId },
          { $push: { reactions: body } },
          { new: true, runValidators: true }
        )
          .then(dbThoughtData => {
            if (!dbThoughtData) {
              res.status(404).json({ message: 'No thought found with this id!' });
              return;
            }
            res.json(dbThoughtData);
          })
          .catch(err => res.json(err));
      },

    
    //PUT update a Thought by ID
    updateThought({ params, body }, res) {
        Thought.findOneAndUpdate({ _id: params.thoughtId}, body, {new: true, runValidators: true})
        .then(dbThoughtData => {
            if(!dbThoughtData) {
                res.status(404).json({ message: 'No Thought found with that id!'});
                return;
            }
            res.json(dbThoughtData);
        })
        .catch(err => res.status(400).json(err));
    },

    //DELETE reaction to a thought
    removeReaction({ params }, res) {
        Thought.findOneAndUpdate(
          { _id: params.ThoughtId },
          { $pull: { reactions: { reactionId: params.reactionId } } },
          { new: true }
        )
          .then(dbUserData => res.json(dbUserData))
          .catch(err => res.json(err));
      },

    //DELETE Thought by ID
    removeThought({ params }, res) {
        Thought.findOneAndDelete({ _id: params.thoughtId })
        .then(deletedThought => {
            console.log(deletedThought);
            if (!deletedThought) {
            return res.status(404).json({ message: 'No thought with this id!' });
            }
            return User.findOneAndUpdate(
            { _id: params.userId },
            { $pull: { thoughts: params.thoughtId } },
            { new: true }
            );
        })

        .then(dbUserData => {
          
            if (!dbUserData) {
            res.status(202).json({ message: 'Deleted!' });
            return;
            }
     
        })
        .catch(err => res.json(err));
    },
}

module.exports = thoughtController;