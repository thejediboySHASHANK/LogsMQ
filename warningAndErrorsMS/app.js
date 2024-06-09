const amqp = require("amqplib");

//step 1 : Connect to the rabbitmq server
//step 2 : Create a new channel
//step 3 : Create the exchange
//step 4 : Create the queue
//step 5 : Bind the queue to the exchange
//step 6 : Consume messages from the queue

async function consumeMessages() {
    const connection = await amqp.connect("amqp://localhost");
    const channel = await connection.createChannel();

    await channel.assertExchange("logExchange", "direct", { durable: true });

    const q = await channel.assertQueue("warningAndErrorsQueue");

    await channel.bindQueue(q.queue, "logExchange", "Warning");
    await channel.bindQueue(q.queue, "logExchange", "Error");

    channel.consume(q.queue, (msg) => {
        const data = JSON.parse(msg.content);
        console.log(data);
        channel.ack(msg); // we need to acknowledge the message for it to be removed from queue
    });
}

consumeMessages();