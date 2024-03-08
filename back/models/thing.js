const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema.Types

const thingSchema = mongoose.Schema({
  userId: { type: String, required: true },
  name: { type: String, required: true },
  manufacturer: { type: String, required: true },
  description: { type: String, required: true },
  mainPepper: { type: String, required: true },
  imageUrl: { type: String, required: true },
  heat: { type: Number, required: true },
  // likes: [{ type: ObjectId, ref: "User" }],
  //  postedBy: { type: ObjectId, ref: "User"}   ,
  // dislikes: { type: Number, required: true },
  // usersLiked: { type: Array, required: true },
  // usersDisliked: { type: Array, required: true },
});

module.exports = mongoose.model('Thing', thingSchema);