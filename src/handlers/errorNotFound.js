const errorNotFound = (request, response, next) => {
  
  response.render('errorNotfound/index');
}

export { errorNotFound };