const request = require("request");
const routes = require("express").Router();
const Photo = require("../models/photo");

const baseUrl = "https://api.flickr.com/services/rest";

routes.get("/photos", (req, res) => {
  request({
    url: baseUrl +
          "?&method=flickr.photos.search&tags=featured" +
          "&api_key=" + process.env.FLICKR_API_KEY +
          "&user_id=" + process.env.FLICKR_USER_ID +
          "&format=json&nojsoncallback=1",
    json: true
  }, (error, response, body) => {
    res.json(response.body.photos.photo);
  });
});

routes.get("/photos/:id", (req, res) => {
  request({
    url: baseUrl +
          "?&method=flickr.photos.getInfo" +
          "&photo_id=" + req.params.id +
          "&api_key=" + process.env.FLICKR_API_KEY +
          "&user_id=" + process.env.FLICKR_USER_ID +
          "&format=json&nojsoncallback=1",
    json: true
  }, (error, response, body) => {
    const photo = new Photo(response.body.photo);
    res.json(photo.toJson());
  });
});

module.exports = routes;
