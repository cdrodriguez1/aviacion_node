const mongoose = require("mongoose");

const fileSchema = new mongoose.Schema({
  path: {
    type: String,
    trim: true,
  },
});

const File = mongoose.model("File", fileSchema);

module.exports = File;
