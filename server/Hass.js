const mongoose = require("mongoose");

const HassSchema = new mongoose.Schema({
  name: String,
  dplayer: Array,
});

mongoose.model("hass", HassSchema);
