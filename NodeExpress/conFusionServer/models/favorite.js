const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var favoriteSchema = new Schema({
  user: {
    type: Schema.Types.ObjectID,
    ref: "User",
    required: true,
    unique: true,
  },
  dishes: [
    {
      type: Schema.Types.ObjectID,
      ref: "Dishes",
      required: true,
      unique: true,
    },
  ],
});
var Favorite = mongoose.model("Favorite", favoriteSchema);

module.exports = Favorite;
