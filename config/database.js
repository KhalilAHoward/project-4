const mongoose = require('mongoose');

mongoose.connect(
  'mongodb://localhost:27017/test12',
  process.env.DATABASE_URL,
  { useNewUrlParser: true,
    useUnifiedTopology: true,

  }
);

const db = mongoose.connection;

db.on('connected', function() {
  console.log(`Connected to MongoDB at ${db.host}:${db.port}`);
});