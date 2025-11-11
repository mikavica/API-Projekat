const mongo = require("mongoose");
const MONGO_URI = "mongodb://test:test@localhost:27017/todo?authSource=admin";

function connectToDB() {
  mongo
    .connect(MONGO_URI)
    .then(() => {
      console.log("povezao sam se");
    })
    .catch((err) => {
      console.error("nisam uspeo: ", err);
    });
}
module.exports = {
  connectToDB,
};
