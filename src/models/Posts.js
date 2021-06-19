import mongoose from 'mongoose';
mongoose.Promise = global.Promise;

const posts = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
    required: true,
  },
  body: {
    type: String,
    trim: true,
    required: true,
  },
  slug: {
    type: String,
  },
  tags: {
    type: [String],
  },
  status: {
    type: Boolean,
    default: true,
  }
} , {
  timestamps: true,
});

const Posts = mongoose.model('Posts', posts);

export { Posts };