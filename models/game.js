const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    photoUrl: String,
    description: String,
  })

module.exports = mongoose.model('Game', gameSchema);