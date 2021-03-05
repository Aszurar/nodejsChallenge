const express = require("express");
const cors = require("cors");
const { v4: uuid, validate: isUuid } = require('uuid');

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

function validateRequestId(request, response, next) {
  const { id } = request.params;
 
  if (!isUuid(id)) {
    return response.status(400).json({erro: "Invalid Project id"});
  }

  return next();
}
app.use('/repositories/:id', validateRequestId)

app.get("/repositories", (request, response) => {
  return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  const { title, url, techs } = request.body 

   let repository = {
    id : uuid(),
    title,
    url,
    techs,
    likes: 0
  }
  repositories.push(repository)
  
  return response.json(repository) 
});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params
  const { title, url, techs } = request.body
  

  //buscando o índice
  const index = repositories.findIndex(repository => repository.id == id)
  
  if (index < 0) {
    return response.status(400).json({
      error: 'Repository not found'
    })
  }
  const likes = repositories[index].likes
  repository = {
    id,
    title,
    url,
    techs,
    likes
  }

  repositories[index] = repository

  return response.json(repository)
});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;
  
  const index = repositories.findIndex(repository => repository.id == id); //buscando o respositório a ser deletado
  
  if (index < 0) {
    return response.status(400).json({
      error: 'Repository not found'})    
  }

  repositories.splice(index, 1); // deletando o repositório

  return response.status(204).json();
});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params

  const index = repositories.findIndex(repository => repository.id == id)

  if (index < 0) {
    return response.status(400).json({error: 'Repository not found'})    
  }
  
  repositories[index].likes += 1

  return response.json(repositories[index])
});

module.exports = app;
