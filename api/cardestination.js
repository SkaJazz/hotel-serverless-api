const url = require("url");
const mongoose = require("mongoose");
const fetch = require("node-fetch");

mongoose.connect(
  process.env.MONGODB_URI_CARDS,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (e) => e && console.log(e)
);

const cardSchema = new mongoose.Schema({
  name: String,
  _id: String,
  link: String,
  owner: Object,
  createdAt: String,
  likes: Array,
});

const Card = mongoose.model("Card", cardSchema, "cards");

module.exports = (req, res) => {
  function runUpdate(e) {
    return new Promise((resolve, reject) => {
      Card.findOneAndUpdate(
        { _id: e._id },
        { $set: e },
        {
          new: true,
          useFindAndModify: false,
          upsert: true,
        }
      )
        .then((result) => resolve(result))
        .catch((err) => reject(err));
    });
  }

  fetch("https://mesto.nomoreparties.co/v1/cohort-24/cards", {
    method: "GET",
    headers: {
      authorization: process.env.YAP_API_KEY,
    },
  })
    .then((resp) => resp.json())
    .then((data) => {
      let promiseArr = [];
      data.forEach((e) => promiseArr.push(runUpdate(e)));
      Promise.all(promiseArr)
        .then((rest) => res.json(rest))
        .catch((err) => console.log(err));
    });
};
