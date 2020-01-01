const express = require("express");
const fetch = require("node-fetch");
const router = express.Router();

router.get("/:platform/:gamertag", async function(req, res) {
  const headers = {
    Authorization: process.env.API_KEY,
    Accept: "application/json"
  };
  try {
    const response = await fetch(
      `${process.env.API_URL}${req.params.platform}/players?filter[playerNames]=${req.params.gamertag}`,
      { headers }
    );

    const data = await response.json();
    if (data.errors) {
      return res.status(404).json("Player does not exist");
    }
    console.log(
      "sending... " + data.data[0].id + " " + data.data[0].attributes.name
    );

    const response2 = await fetch(
      `${process.env.API_URL}${req.params.platform}/players/${data.data[0].id}/seasons/lifetime`,
      { headers }
    );
    const data2 = await response2.json();
    return res.json(data2);
  } catch (err) {
    console.log(err);
    return res.status(500).json("server Error");
  }
});

module.exports = router;
