const app = require("./server");

const { connectDatabase } = require("./db/connection");
const CONFIG = require("./config/config");

const start = async () => {
  try {
    await connectDatabase();
    app.listen(CONFIG.port || 4000, () => {
      console.log(`Server connected to the port ${CONFIG.port}`);
    });
  } catch (error) {
    console.error(error);
  }
};

start();
