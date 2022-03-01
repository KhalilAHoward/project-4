const Game = require('../models/game')

module.exports = {
    create,
    index
}



function create(req, res){
    res.json({data: working})
}



async function index(req, res) {
	try {
	  // this populates the user when you find the posts
	  // so you'll have access to the users information
	  // when you fetch teh posts
	  const games = await Game.find({}).populate("user").exec();
	  res.status(200).json({ games: games });
	} catch (err) {
	  res.status(400).json({ err });
	}
  }