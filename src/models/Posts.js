import mongoose from 'mongoose';
import slug from 'slug';

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
  photo: {
    type: String,
  },
  status: {
    type: Boolean,
    default: true,
  }
} , {
  timestamps: true,
});

posts.pre('save', function(next){
  if(this.isModified("title")){
    this.slug = slug(this.title, { lower: true });
  }
  next();
});

const Posts = mongoose.model('Posts', posts);

export { Posts };