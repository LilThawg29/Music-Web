const mongoose = require("mongoose");

const accountSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, minlength: 10, unique: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true, minlength: 6 },
    isActive: { type: Boolean, default: true },
    image: { type: String, default: null },
    role: { type: String, default: "user" },
    sum_comment: { type: Number, default: null },
    sum_list_music: { type: Number, default: null },
    sum_upload: { type: Number, default: null },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Account", accountSchema);
