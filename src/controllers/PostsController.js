import slugPost from 'slug';
import { Posts } from '../models/Posts';

class PostsController {

  async index(request, response) {
    const posts = await Posts.find();
    const data = {
      title: 'Post',
      posts: posts,
    }

    return response.render('posts', data );
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

  async update(request, response) {
    const { slug } = request.params;
    const post = await Posts.findOne({slug}, '_id title body slug createdAt updatedAt');
    const data = {
      title: 'Posts Edit',
      post,
    }
    
    return response.render('posts/edit', data);
  }

  async updateAction(request, response){
    
    try{
      const { title, body } = request.body;
      const { slug } = request.params;

      const data = {
        title,
        body,
        slug: slugPost(title, { lower: true }),
      }

      await Posts.updateOne({slug}, data);

      request.flash('success', 'Post update in success!');
      return response.status(201).redirect('/posts');

    }catch(error){

      request.flash('error', `Error: ${error}`);
      return response.status(400).redirect('/posts/:slug/edit');

    }
  }
}

export { PostsController };