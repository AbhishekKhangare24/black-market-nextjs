import mongoose from "mongoose";

export const connectDB = () => {
  mongoose
    .connect("mongodb://localhost:27017/", {
      dbName: "black_market",
    })
    .then((c) => console.log(`DB Connected!`))
    .catch((e) => console.log(e));
};

// import mongoose from "mongoose";

// const connectDB = async () => {
//   if (mongoose.connections[0].readyState) {
//     return;
//   }

//   await mongoose.connect(process.env.MONGO_URI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   });
// };

// export default connectDB;
