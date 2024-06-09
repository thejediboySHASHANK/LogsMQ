const amqp = require("amqplib");
const config = require("./config");

class Producer {
    constructor() {
        this.connection = null;
        this.channel = null;
    }

    async createChannel() {
        try {
            this.connection = await amqp.connect(config.rabbitMQ.url);
            this.channel = await this.connection.createChannel();
            this.channel.on('close', () => {
                console.log('Channel closed');
                this.channel = null;
            });
            this.channel.on('error', (err) => {
                console.error('Channel error:', err);
            });
        } catch (error) {
            console.error('Failed to create a channel:', error);
            throw error;
        }
    }

    async publishMessage(routingKey, message) {
        if (!this.channel) {
            await this.createChannel();
        }

        try {
            const exchangeName = config.rabbitMQ.exchangeName;
            await this.channel.assertExchange(exchangeName, "direct", { durable: true });

            const logDetails = {
                logType: routingKey,
                message: message,
                dateTime: new Date(),
            };

            const buffer = Buffer.from(JSON.stringify(logDetails)); // Convert to Buffer

            // Debugging: Log the type of 'buffer'
            console.log(`Buffer type: ${buffer instanceof Buffer}`);  // Should log 'true'

            this.channel.publish(
                exchangeName,
                routingKey,
                buffer
            );

            console.log(`The new ${routingKey} log is sent to exchange ${exchangeName}`);
        } catch (error) {
            console.error('Failed to publish message:', error);
            throw error;  // Ensure errors are thrown for higher-level handling
        }
    }

    async handleChannelError(error) {
        if (this.channel) {
            await this.channel.close();
        }
        this.channel = null; // Reset channel
        if (error.code === 406) { // Example error code handling
            console.log('Handling specific AMQP error:', error.message);
        }
        // Re-establish channel after a delay
        setTimeout(() => this.createChannel(), 5000);
    }

    async closeConnection() {
        if (this.connection) {
            await this.connection.close();
            this.connection = null;
            console.log('RabbitMQ connection closed');
        }
    }
}

module.exports = Producer;
