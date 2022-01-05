const mongoose = require("mongoose");
const Poll = new mongoose.Schema({
  users: Number,
  pollTitle: {
    type: String,
    required: true,
    unique: true,
  },
  //  options:{  type : Array , "default" : [] ,required:true}
  data: [
    {
      question: String,
      options: [
        {
          value: { type: String }, // to do: change to a list
          votes: { type: Number },
          isRequired: { type: Boolean },
        },
      ],
      isRequired: { type: Boolean },
    },
  ],
  // options: [
  //   {
  //     optionTitle: { type: String }, // to do: change to a list
  //     count: { type: Number },
  //   },
  // ],
});
module.exports = mongoose.model("Poll", Poll);
