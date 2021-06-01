const url = require("url");
const mongoose = require("mongoose");
const fetch = require("node-fetch");

let cachedDb = null;

const hotelSchema = new mongoose.Schema({
  name: String,
  userRating: Number,
  mapLink: String,
  address: String,
  description: String,
});

const Hotel = mongoose.model("Hotel", hotelSchema, "hotels");

mongoose.connect(
  process.env.MONGODB_URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (e) => e && console.log(e)
);

module.exports = (req, res) => {
  const weee = fetch("https://mesto.nomoreparties.co/v1/cohort-24/cards", {
    method: "GET",
    headers: {
      authorization: process.env.YAP_API_KEY,
    },
  })
    .then((resp) => resp.json())
    .then((data) => res.status(200).json(data));

  // Hotel.find().then((people) => {
  //   console.log(people);
  //   return res.status(200).json(weee);
  // });
};
