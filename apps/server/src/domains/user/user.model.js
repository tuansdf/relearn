const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const { AccountRoles } = require("./account-roles.constant");

const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    username: {
      type: String,
      minlength: [4, "Username must be longer than 4 characters"],
      maxlength: [128, "Username must be shorter than 128 characters"],
      required: true,
    },
    password: {
      type: String,
      minlength: [8, "Password must be longer than 8 characters"],
      maxlength: [128, "Password must be shorter than 128 characters"],
      required: true,
    },
    role: {
      type: String,
      enum: [AccountRoles.ADMIN, AccountRoles.USER],
      default: AccountRoles.USER,
    },
  },
  { timestamps: true }
);

UserSchema.pre("save", async function () {
  if (this.isModified("password")) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
});

UserSchema.static({
  validatePassword: async function ({ oldPassword, newPassword }) {
    return bcrypt.compare(newPassword, oldPassword);
  },
});

UserSchema.method({
  validatePassword: async function (newPassword) {
    return this.model("User").validatePassword({
      oldPassword: this.password,
      newPassword,
    });
  },
});

module.exports = mongoose.model("User", UserSchema);
