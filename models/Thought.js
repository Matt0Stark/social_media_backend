const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction');


const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      min_length: 1,
      max_length: 280
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (time)=>{
        return new Date (time).toLocaleDateString()
      }
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    reactions: [reactionSchema],
  },
  {
    toJSON: {
      getters: true,
      virtuals: true
    },
  }
);

thoughtSchema.virtual("reactionCount").get(function (){
  return this.reactions.length
});

const Thought = model('Thought', thoughtSchema);

module.exports = Thought;
