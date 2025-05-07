import { app } from "./app.js";

const startServer = async () => {
  try {
    app.listen(8000, () => {
      console.log("App started at port:", PORT);
    });
  } catch (error) {
    console.error("Error in starting the server:", error.message);
  }
};

startServer();
