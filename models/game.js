const mongoose = require('mongoose');

const likesSchema = mongoose.Schema({

  username: String,
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
})



const gameSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    photoUrl: String,
    description: String,
    likes: [likesSchema]
  })

module.exports = mongoose.model('Game', gameSchema);