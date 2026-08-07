
import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ["saleExcutive", "admin"],
    default: "saleExcutive",
    required: true
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: false
 },

}, { timestamps: true });

const UserModel = mongoose.model("UserModel", UserSchema);

export default UserModel;

