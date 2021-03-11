const express = require('express');
const {addOrder,orderlistener} = require('../controllers/orders');

const router = express.Router({ mergeParams: true });

router
  // .route('/')
  .post('/',addOrder)
  .put('/pull',orderlistener);

module.exports = router;
