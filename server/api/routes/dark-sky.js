const express = require('express');
const router = express.Router();
const darkSkySecretKey = '70f1caef39504c6b97276a7f2bc5d49b';

router.get('/', (req, res, next) => {
  res.send({message: 'working'});
})

module.exports = router;