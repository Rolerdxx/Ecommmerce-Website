const http = require("http");
const mongoose = require("mongoose");

const app = require("./app");
const PORT = 5000;

const server = http.createServer(app);

mongoose.connection.once("open", () => {
  console.log("mongodb cn");
});
mongoose.connection.on("error", (err) => {
  console.error(err);
});

async function LoadServer() {
  await mongoose.connect(process.env.MONGO, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  server.listen(PORT, () => {
    console.log(`listening on ${PORT}`);
  });
}

LoadServer();
