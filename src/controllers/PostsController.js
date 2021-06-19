import { Posts } from '../models/Posts';

class PostsController {

  async index(request, response) {
    const posts = await Posts.find();
    return response.render('posts', { posts });
  }

  async store(request, response) {

    return response.render('posts/add');

  }

  async save(request, response) {
    const { title, body } = request.body;

    const existsTitle = await Posts.findOne({title});

    if(existsTitle){
      request.flash('error', 'Post already exists!');
      return response.redirect('/posts/add');
    }

    const post = {
      title, 
      body,
    }

    await Posts.create(post);
    request.flash('success', 'Post create in success!');

    return response.redirect('/posts/add');

  }
}

export { PostsController };