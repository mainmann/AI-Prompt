import { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
  email: {
    type: String,
    unique: [true, "Email already exsists~"],
    required: [true, "Email is required"],
  },
  username: {
    type: String,
    required: true,
    unique: true,
    minLength: 8,
    maxLength: 29,
    // Allow alphanumeric characters and spaces
    match: /^[a-zA-Z0-9/s]+$/, // This pattern allows alphanumeric characters and spaces
    // Other validations...
  },
  // Other fields in schema...

  image: {
    type: String,
  },
});

const User = models.User || model("User", UserSchema);

export default User;
