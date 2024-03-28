const mongoose = require("mongoose");

// Create a new MongoClient
const connectionParams = {
  useNewUrlParser: true,
  // useCreateIndex: true,
  useUnifiedTopology: true,
};

const connectDB = async () => {
  try {
    const con = await mongoose
      .connect(
        "mongodb+srv://selectmydeal1:riko1234@cluster0.jubuapk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
        connectionParams
      )
      .then(() => {
        console.log("Connected to the database ");
      })
      .catch((err) => {
        console.error(`Error connecting to the database. n${err}`);
      });
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

module.exports = connectDB;
