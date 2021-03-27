require("dotenv").config();

const app = require("./app");
require("./database");

const port = app.get("port");

async function main() {
  await app.listen(port);
  console.log(`Server up and running on port ${port}`);
}

main();
