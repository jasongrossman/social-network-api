const { Thought, Thought } = require('../models');

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
        Thought.findOne({ _id: params.id })
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
                { _id: params.userId},
                { $push: { thoughts: _id } },
                { new: true }
            )
        })
        .then(dbThoughtData => {
            if(!dbUserData) {
                res.status(404).json({ message: 'No user found with this id!' });
            }
        res.json(dbThoughtData)
        })
        .catch(err => res.json(400).json(err));
    },
    
    //PUT update a Thought by ID
    updateThought({ params, body }, res) {
        Thought.findOneAndUpdate({ _id: params.id}, body, {new: true, runValidators: true})
        .then(dbThoughtData => {
            if(!dbThoughtData) {
                res.status(404).json({ message: 'No Thought found with that id!'});
                return;
            }
            res.json(dbThoughtData);
        })
        .catch(err => res.status(400).json(err));
    },

    //DELETE Thought by ID
    removeThought({ params }, res) {
        Thought.findOneAndDelete({ _id: params.thoughtId })
        .then(deletedThought => {
            if (!deletedThought) {
            return res.status(404).json({ message: 'No thought with this id!' });
            }
            return User.findOneAndUpdate(
            { _id: params.userId },
            { $pull: { comments: params.thoughtId } },
            { new: true }
            );
        })
        .then(dbUserData => {
            if (!dbUserData) {
            res.status(404).json({ message: 'No user found with this id!' });
            return;
            }
            res.json(dbUserData);
        })
        .catch(err => res.json(err));
    },
}
