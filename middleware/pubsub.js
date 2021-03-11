const {PubSub} = require('@google-cloud/pubsub');
const pubSubClient = new PubSub();

module.exports = {
    publishMessage: async (topicName,payload) => {
        console.log('in publish middleware');
        console.log(`publish payalod: ${JSON.stringify(payload)}`);
        const dataBuffer = Buffer.from(JSON.stringify(payload));
        const messageId = await pubSubClient
                            .topic(topicName, {enableMessageOrdering: true})
                            .publish(dataBuffer);
       //await publisherClient.publish(request, { retry: retrySettings, });                     
        console.log(`Message ${messageId} published.`);
        return messageId;
    },

    SubscriberToMessages: async (topicName,subscriptionName) => {
        console.log('in SubscriberToMessages  middleware');
        const subscription = pubSubClient.topic(topicName).subscription(subscriptionName);
        const messageHandler = message => {
            console.log(`Received message ${message.id}:`);
            console.log(`Data: ${message.data}`);
            console.log(`Attributes: ${message.attributes}`);
            message.ack();
            return message.data;
        };
        // Receive callbacks for new messages on the subscription
        subscription.on('message',messageHandler);

        // Receive callbacks for errors on the subscription
        subscription.on('error', error => {
            console.error('Received error:', error);
            process.exit(1);
        });  
    },

    getSubscription: async (topicName,subscriptionName) => {
        console.log('in getSubscription  middleware');
        // Gets the metadata for the subscription
        const [metadata] = await pubSubClient
          .subscription(subscriptionName)
          .getMetadata();
    
        console.log(`Subscription: ${metadata.name}`);
        console.log(`Topic: ${metadata.topic}`);
        console.log(`Push config: ${metadata.pushConfig.pushEndpoint}`);
        console.log(`Ack deadline: ${metadata.ackDeadlineSeconds}s`);
    }
    
};