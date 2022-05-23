const mongooseMusic = require("../Models/music");
const mongooseAccount = require("../Models/account");

const vnmToAlphabet = require("vnm-to-alphabet");
const moment = require("moment");
const cloudinary = require("cloudinary");

class ApiFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }
  sorting() {
    this.query = this.query.sort("-createdAt");
    return this;
  }
}

const { CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } = process.env;

cloudinary.config({
  cloud_name: CLOUD_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET,
});

const musicControllers = {
  CREATE_MUSIC: async (req, res) => {
    
  }
};

module.exports = musicControllers;