const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const Producer = require('./producer')

// Invoking the Producer class
const producer = new Producer();

app.use(bodyParser.json("application/json"));

// Routes
app.post('/sendLog', async (req, res, next) => {
    try {
        await producer.publishMessage(req.body.logType, req.body.message);
        res.send();
    } catch (error) {
        // Log the error and send a server error response
        console.error("Failed to publish message:", error);
        res.status(500).send({ error: "Failed to process your request" });
    }
})


app.listen(3000, () => {
    console.log(`Server started on port ${3000}`);
})