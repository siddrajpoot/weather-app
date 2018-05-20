const express = require('express');
const axios = require('axios');
const router = express.Router();
const googleKey = 'AIzaSyDdm7uAJ3_SjWIRVcInUnQpzs1xILGqkDk';

router.get('/', (req, res, next) => {
  console.log('test');
  if (!req.query.userAddress) {
    res.json({ error: 'User Address was not provided' });
  }

  axios
    .get(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${
        req.query.userAddress
      }&key=${googleKey}`
    )
    .then(result => {
      res.send(result.data);
    });
});

module.exports = router;
