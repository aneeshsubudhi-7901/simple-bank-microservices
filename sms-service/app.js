require("dotenv").config();
const express = require("express");
const amqp = require("amqplib");
const app = express();
const port = process.env.PORT || 4004;

const client = require("twilio")(process.env.accountSid, process.env.authToken);

var connection, channel;
var exchange = "logs";

async function connectQueue() {
  try {
    connection = await amqp.connect("amqp://localhost:5672");
    console.log(`Reciever Application connected to RabbitMQ`);
    channel = await connection.createChannel();
    await channel.assertExchange(exchange, "fanout", {
      durable: false,
    });
    var q = await channel.assertQueue("", { exclusive: true });
    console.log(
      " [*] Waiting for messages in %s. To exit press CTRL+C",
      q.queue
    );
    channel.bindQueue(q.queue, exchange, "");

    channel.consume(q.queue, (data) => {
      client.messages
        .create({
          messagingServiceSid: process.env.messagingServiceSid,
          to: "+917666549867",
        })
        .then((message) => console.log(message.sid))
        .done();

      console.log(`${Buffer.from(data.content)}`);
      channel.ack(data);
    });
  } catch (error) {
    console.log(error);
  }
}

app.listen(port, () => {
  console.log(`Reciever Application started on port ${port}`);
  connectQueue();
});
