import mongoose from 'mongoose';
import { Posts } from '../models/Posts';

class PostsController {

  async index(request, response) {
    return response.render('posts');
  }

  async store(request, response) {

    return response.render('posts/add');

  }

  async save(request, response) {
    const { title, body } = request.body;

    const post = {
      title, 
      body,
    }

    console.log(post);

    return response.json(post);

    // await Posts.create(post);

  }
}

export { PostsController };