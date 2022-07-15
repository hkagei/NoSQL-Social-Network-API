const { Thought, User } = require('../Models');

const thoughtController = {
    
    addThought(req, res) {
        // console.log(body);
        Thought.create(req.body)
        .then((dbThoughtData) => {
            return User.findOneAndUpdate(
                { _id: req.body.userId },
                { $push: { thoughts: dbThoughtData._id }},
                { new: true }
            )
        }) .then((dbUserData) => {
            if (!dbUserData) {
               return res.status(404).json({ message: "no user found" })
            }
            res.json({ message: 'thought has been added'})
        }).catch(err => res.status(400).json(err));
    },
    getThought(req, res) {
        // console.log(body);
        Thought.find({}).sort({ createdAt: -1 })
        .then((dbThoughtData) => {
            res.json(dbThoughtData)
        }).catch(err => res.status(400).json(err));
    },
    getSingleThought(req, res) {
        // console.log(body);
        Thought.findOne( req.params.id ).select('-__v')
        .populate("thoughts").then((dbThoughtData) => { if(!dbThoughtData){
    
          return res.status(404).json({ message: 'No user found'});
        } res.json(dbThoughtData);
      }) .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      })
    },
    updateThought(req, res) {
        // console.log(body);
        Thought.findOneAndUpdate({ _id: req.params.thoughtId }, { $set: req.body }, { new: true, runValidators: true })
        .then(dbUserData => {
          if(!dbUserData) {
            res.status(404).json({ message: 'No user found with this ID'});
            return;
          }
          res.json(userData)
        })
        .catch(err => res.status(400).json(err));
    },
    deleteThought(req, res) {
        User.findOneAndDelete( req.params.id )
    .then(dbThoughtData => {
    if(!dbThoughtData) {
      return res.status(404).json({ message: 'No user found with this ID'})
    }
    }).then(() => {
    res.json({ message: 'user and their thoughts have been deleted muahahahah!'})
    })
    .catch(err => res.status(500).json(err));
}
}

module.exports = thoughtController;