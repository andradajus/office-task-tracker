import { createConsumer } from "@rails/actioncable";

const baseURL = import.meta.env.VITE_BACKEND_BASE_URL;

const consumer = createConsumer(`ws://${baseURL}/cable`);

console.log(`Connecting to WebSocket at: ws://${baseURL}/cable`);

export default consumer;