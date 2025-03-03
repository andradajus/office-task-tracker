import consumer from "./consumer";

const OverviewChannel = consumer.subscriptions.create(
  { channel: "OverviewChannel" },
  {
    connected() {
      console.log("Connected to the OverviewChannel");
    },

    disconnected() {
      console.log("Disconnected from the OverviewChannel");
    },

    received(data) {
      console.log("Received data:", data);
      alert(`Received: ${JSON.stringify(data)}`);
    }
  }
);

window.OverviewChannel = OverviewChannel;

export default OverviewChannel;
