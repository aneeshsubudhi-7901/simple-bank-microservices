const amqp = require("amqplib");
var connection, channel;
var exchange = "logs";

(async function connectQueue() {
  try {
    connection = await amqp.connect("amqp://localhost:5672");
    console.log(`Publisher Application connected to RabbitMQ`);
    channel = await connection.createChannel();
    await channel.assertExchange(exchange, "fanout", {
      durable: false,
    });
  } catch (error) {
    console.log(error);
  }
})();

async function sendData(data) {
  await channel.publish(exchange, "", Buffer.from(JSON.stringify(data)));
}

module.exports = {
  sendData,
};
