const {Thought} = require('../models/Thought');
const User = require('../models/User');

const thoughtController = {
    createThought({params, body}, res) {
        Thought.create(body)
        .then(({_id}) => {
            return User.findOneAndUpdate(
                {_id: params.userId},
                {$push: {thoughts: _id}},
                {new: true}
            );
        })
        .then(dbUserData => {
            if(!dbUserData) {
                res.status(404).json({message: 'No User found with this username'})
            }
            res.json(dbUserData);
        })
        .catch(err => res.json(err));
    },

    getAllThoughts(req, res) {
        Thought.find()
        .select('-__v')
        .sort({createdAt: -1})
        .then(dbThoughtData => res.json(dbThoughtData))
        .catch(err => {
            console.log(err);
            res.status(400).json(err)
        })
    },

    getSingleThought(req, res) {
        Thought.findOne({ _id: req.params.thoughtId})
        .then((dbThoughtData) => {
            if(!dbThoughtData) {
                return res.status(404).json({message: 'No thought with this id!'})
            }
            res.json(dbThoughtData);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err)
        })
    },

    updateThought(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId}, 
            {$set: req.body},
            {runValidators: true, new: true}
        )
        .then((dbThoughtData) => {
            if(!dbThoughtData) {
                return res.status(404).json({message: 'No thought with this id!'})
            }
            res.json(dbThoughtData);
        }).catch((err) => {
            console.log(err);
            res.status(500).json(err)
        })
    },

    deleteThought(req, res) {
        Thought.findOneAndRemove({ _id: req.params.thoughtId})
        .then((dbThoughtData) => {
            if(!dbThoughtData) {
                return res.status(404).json({message: 'No thought with this id!'})
            }

            return User.findOneAndUpdate(
                {$thoughts: req.params.thoughtId},
                {$pull: {thoughts: req.params.thoughtId}},
                {new: true}
            )
        }).then((dbUserData) => {
            if(!dbUserData) {
                return res.status(404).json({message: 'No thought with this id associated with this user!'})
            }

            res.json({message: 'Thought Successfully deleted'})
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err)
        })
    },

    addReaction(req, res) {
        Thought.findOneAndUpdate(
            {_id: req.params.thoughtId},
            {$addToSet: {reactions: req.body}},
            {runValidators: true, new: true}
        )
        .then((dbThoughtData) => {
            if(!dbThoughtData) {
                return res.status(404).json({message: 'No Thought with this id!'})
            }
            res.json(dbThoughtData)
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err)
        })
    },

    removeReaction(req, res) {
        Thought.findOneAndUpdate(
            {_id: req.params.thoughtId},
            {$pull: {reactions: {reactionId: req.params.reactionId}}},
            {runValidators: true, new: true}
        )
        .then((dbThoughtData) => {
            if(!dbThoughtData) {
                return res.status(404).json({message: 'No Thought with this id!'})
            }
            res.json(dbThoughtData)
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err)
        })
    }
}

module.exports = thoughtController;