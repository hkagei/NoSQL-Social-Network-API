const { User, Thought } = require("../Models");

const userController = {
  getAllUsers(req, res) {
    User.find({})
    .populate({
      path: 'thoughts',
      select: '-__v'
    })
    .select('-__v')
    .sort({ _id: -1 })
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },
  getSingleUser(req, res) {
    User.findOne({ _id: req.params.userId }).select('-__v')
    .populate("thoughts").then((dbUserData) => { if(!dbUserData){

      return res.status(404).json({ message: 'No user found'});
    } res.json(dbUserData);
  }) .catch((err) => {
    console.log(err);
    res.status(400).json(err);
  })
},
createUser(req, res) {
  User.create(req.body)
  .then((dbUserData) =>
  { if(!dbUserData) {
    return res.status(500).json({ message: 'Internal Server Error'});
  } res.json(dbUserData);   
}).catch((err) => {
  console.log(err);
  res.status(400).json(err);
})
},
updateUser(req, res) {
  User.findOneAndUpdate({ _id: req.params.userId }, { $set: req.body }, { new: true, runValidators: true })
  .then(dbUserData => {
    if(!dbUserData) {
      res.status(404).json({ message: 'No user found with this ID'});
      return;
    }
    res.json(userData)
  })
  .catch(err => res.status(400).json(err));
},
deleteUser(req, res) {
  User.findOneAndDelete({ _id: req.params.userId })
  .then(dbUserData => {
    if(!dbUserData) {
      return res.status(404).json({ message: 'No user found with this ID'})
    }
    return Thought.deleteMany({ _id: { $in: dbUserData.thoughts}});
  }).then(() => {
    res.json({ message: 'user and their thoughts have been deleted muahahahah!'})
  })
  .catch(err => res.status(500).json(err));
}
};

module.exports = userController;
