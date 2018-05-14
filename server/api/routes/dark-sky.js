const express = require('express');
const axios = require('axios');
const router = express.Router();
const darkSkySecretKey = '70f1caef39504c6b97276a7f2bc5d49b';

router.get('/', (req, res, next) => {
  axios
    .get(
      `https://api.darksky.net/forecast/${darkSkySecretKey}/${req.query.lat},${
        req.query.lng
      }`
    )
    .then(result => {
      res.send(result.data);
    });
});

module.exports = router;
