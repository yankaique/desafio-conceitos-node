const express = require("express");
const cors = require("cors");

const { v4: uuid } = require('uuid');

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  const {title,url,techs} = request.body;

  const items = {id:uuid(),title,url,techs,likes:0}
  repositories.push(items)
  return response.json(items);
});

app.put("/repositories/:id", (request, response) => {
  const {id} = request.params;
  const {title,url,techs} = request.body;

  const itemIndex = repositories.findIndex(item=>item.id === id);

  if(itemIndex<0){
    return response.status(400).json("Repositories not found.")
  } 

  if(itemIndex === -1){
    return response.status(400).json({error: 'Repository does not exist'});
  }

  const items = {id,title,url,techs,likes:repositories[itemIndex].likes}

  repositories[itemIndex] = items;

  return response.json(items);
});

app.delete("/repositories/:id", (request, response) => {
  const {id} = request.params;

  const itemIndex = repositories.findIndex(item=>item.id === id);

  if(itemIndex<0){
    return response.status(400).json("Repositories not found.")
  }

  repositories.splice(itemIndex,1);

  return response.status(204).send()
});

app.post("/repositories/:id/like", (request, response) => {
  const {id} = request.params;

  const itemIndex = repositories.findIndex(item=>item.id===id); 

  if(itemIndex<0){
    return response.status(400).json("Repositories not found.")
  };

  repositories[itemIndex].likes++


  return response.json(repositories[itemIndex]);
});

module.exports = app;
