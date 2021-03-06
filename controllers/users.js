const User = require('../models/user');
const Game = require('../models/game')
const jwt = require('jsonwebtoken');
const SECRET = process.env.SECRET;

const { v4: uuidv4 } = require('uuid');
const S3 = require('aws-sdk/clients/s3');
const s3 = new S3(); 

const BUCKET = process.env.BUCKET;

module.exports = {
  signup,
  login,
  profile
};


async function profile(req, res){
  try {
    // First find the user using the params from the request
    // findOne finds first match, its useful to have unique usernames!
    const user = await User.findOne({username: req.params.username})
    // Then find all the posts that belong to that user
    if(!user) return res.status(404).json({err: 'User not found'})

    const games = await Game.find({user: user._id}).populate("user").exec();
    console.log(games, ' this posts')
    res.status(200).json({games: games, user: user})
  } catch(err){
    console.log(err)
    res.status(400).json({err})
  }
}

async function signup(req, res) {
  console.log(req.body, " <- req.body", req.file, " <-- req.file");
  // const user = new User(req.body);

  // define the fileName/Path on aws
  const filePath = `${uuidv4()}${req.file.originalname}`;
  const params = { Bucket: BUCKET, Key: filePath, Body: req.file.buffer };
  console.log(BUCKET)
  s3.upload(params, async function (err, data) {
    // data.Location, is the url on aws,
    // if you're getting aws problems, log out the err, or the data object
    console.log(err)
    console.log(data)
    const user = new User({ ...req.body, photoUrl: data.Location });
    console.log(user, "<---this is the user")
    try {
      await user.save();
      const token = createJWT(user);
      res.json({ token });
    } catch (err) {
      // Probably a duplicate email
      res.status(400).json(err);
    }
  });
}

async function login(req, res) {
  try {
    const user = await User.findOne({email: req.body.email});
    console.log(user, ' this user in login')
    if (!user) return res.status(401).json({err: 'bad credentials'});
    user.comparePassword(req.body.password, (err, isMatch) => { 
      if (isMatch) {
        const token = createJWT(user);
        res.json({token});
      } else {
        return res.status(401).json({err: 'bad credentials'});
      }
    });
  } catch (err) {
    return res.status(401).json(err);
  }
}


/*----- Helper Functions -----*/

function createJWT(user) {
  return jwt.sign(
    {user}, // data payload
    SECRET,
    {expiresIn: '24h'}
  );
}

