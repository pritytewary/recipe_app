import mongoose from "mongoose";

const User =
  mongoose.models.User ||
  mongoose.model(
    "User",
    new mongoose.Schema(
      {
        fullname: {
          type: String,
          required: true,
        },
        email: {
          type: String,
          required: true,
        },
        password: {
          type: String,
          required: true,
        },
      },
      { timestamps: true }
    )
  );

export default User;
