class UserController {
  login(request, response) {
    const data = {
      title: 'Login',
    }
    return response.render('users/login', data);
  };
}

export { UserController };