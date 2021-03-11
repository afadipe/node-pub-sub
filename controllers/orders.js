const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const { publishMessage, SubscriberToMessages} = require('../middleware/pubsub')
const orderTopicName = process.env.TopicName;
const orderSubscriptionName= process.env.SubscriptionName;

const deliveryTopicName = process.env.TopicName;
const packingTopicName = process.env.TopicName;

// @desc      Add order
// @route     POST /api/v1/order/
// @access    Public
exports.addOrder = asyncHandler(async (req, res, next) => {
  console.log('in add order');
  const messageId = await publishMessage(orderTopicName,req.body);
  res.status(200).json({
    success: true,
    data: `Message ${messageId} published `
  });
});


// @desc      Add order listener
// @route     POST /api/v1/order/
// @access    Public
exports.orderlistener = asyncHandler(async (req, res, next) => {
  let messageResponse = await SubscriberToMessages(orderTopicName,orderSubscriptionName);
  res.status(200).json({
    success: true,
    message: "Message received successfully",
    data: messageResponse
  });
});


