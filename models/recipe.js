import mongoose from "mongoose";

const Recipe =
  mongoose.models.Recipe ||
  mongoose.model(
    "Recipe",
    new mongoose.Schema(
      {
        recipeName: {
          type: String,
          required: true,
        },
        ingredients: {
          type: String,
          required: true,
        },
        procedure: {
          type: String,
          required: true,
        },
        userEmail: {
          type: String,
          required: true,
        },
      },
      { timestamps: true }
    )
  );

export default Recipe;
