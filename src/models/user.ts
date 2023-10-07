import { Schema, model, models } from "mongoose";

export enum UserRoles {
  USER = 'user', // items are in inventory
  ADMIN = 'admin', // items are in inventory
}

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
  },
  image: String,
  password: {
    type: String,
    select: false,
  },
  role: {
    type: String,
    default: UserRoles.USER,
    enum: UserRoles
  }
})

const User = models.User || model("User", UserSchema)
export default User