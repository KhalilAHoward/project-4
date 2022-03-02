const Game = require('../models/game');

module.exports = {
    create,
    deleteLike
}

async function create(req, res){
 
    try {
        const game = await Game.findById(req.params.id);
        game.likes.push({username: req.user.username, userId: req.user._id}); //mutating a document
        await game.save()
        res.status(201).json({data: 'like added'})
    } catch(err){
       
        res.status(400).json({err})
    }
    
}

async function deleteLike(req, res){
    try {
        
        const game = await Game.findOne({'likes._id': req.params.id, 'likes.username': req.user.username});
        game.likes.remove(req.params.id) 
		console.log(game, " <-= post in delete!")
        await game.save() 
        res.json({data: 'like removed'})
    } catch(err){
        res.status(400).json({err})
    }
}