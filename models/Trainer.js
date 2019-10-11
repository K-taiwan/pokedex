const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Badge = require('./Badge');

const TrainerSchema = new Schema({
  name: String,
  age: Number,
  hometown: String,
  // reference by ID of pokemon
  pokemon: [{
    type: Schema.Types.ObjectId,
    ref: 'Pokemon'
  }],
  // embedded
  badges:[Badge.schema]
});

const Trainer = mongoose.model('Trainer', TrainerSchema);

module.exports = Trainer;