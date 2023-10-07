import { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
  email: {
    type: String,
    unique: true,
    required: [true, "Email is required"],
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Invalid email address"]
  },
  username: {
    type: String,
    unique: true,
    minLength: [4, "Username should have been at least 4 characters"],
    maxLength: [30, "Username should have been less than 30 characters"]
  }
})

const OAuthUser = models.User || model("User", UserSchema)

export default OAuthUser