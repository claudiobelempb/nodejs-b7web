

class HomeController {
  index(request, response){
    const data = {
      title: 'Home',
      name: 'Cláudio Cardoso',
      idade: 44,
    }
    return response.render('home', data);
  }
}

export { HomeController };