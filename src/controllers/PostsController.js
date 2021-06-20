import { Posts } from '../models/Posts';

class PostsController {

  async index(request, response) {
    const posts = await Posts.find();
    const data = {
      title: 'Post',
    }
    return response.render('posts', { posts } );
  }

  async store(request, response) {

    const data = {
      title: 'Post add'
    }
    return response.render('posts/add', data);
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

    try{
      await Posts.create(post);
      request.flash('success', 'Post create in success!');
      return response.redirect('/posts/add');
    }catch(error){
      request.flash('error', `Error: ${error.message}`);
      return response.redirect('/posts/add');
    }

  }
}

export { PostsController };