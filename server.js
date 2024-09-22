//Import modules
import bodyParser from "body-parser";
import express from "express";

//constant declarations
const port = 4000
const app = express()
let currentLength = 3;

//middleware
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());


//get homepage
app.get("/posts", (req, res) => {
  res.json(postList)
})

//get specific post
app.get("/posts/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const currentPostIndex = postList.findIndex((post) => post.id === id);
  res.json(postList[currentPostIndex]);
})


//modify post
app.patch("/edit/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const currentPost = postList.find((x) => x.id === id);
  const newPost = {
    id: id,
    title: req.body.title || currentPost.title,
    content: req.body.content || currentPost.content,
    author: req.body.author || currentPost.author,
    date: currentPost.date
  };
  const searchIndex = postList.findIndex((post) => post.id === id);
  postList[searchIndex] = newPost;
  res.json(postList[searchIndex]);

})

//create new post
app.patch("/new", (req, res) => {
  const newPost ={
    id: currentLength + 1,
    title: req.body.title,
    content: req.body.content,
    author: req.body.author,
    date: new Date()
  };
  postList.push(newPost);
  res.json(newPost);
  currentLength += 1;
})

//delete a post
app.delete("/delete/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const searchIndex = postList.findIndex((x) => x.id === id);
  postList.splice(searchIndex, 1);
  res.sendStatus(200);
})




app.listen(port, () => {
  console.log(`API server running on port ${port}`)
})


var postList = [
  {
    id: 1,
    title: 'First Post',
    author: 'Amin Abdulkabir',
    content: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software ike Aldus PageMaker including versions of Lorem Ipsum',
    date: new Date(),
  },
  {
    id: 2,
    title: 'Second Post',
    author: 'Amin Abdulkabir',
    content: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software ike Aldus PageMaker including versions of Lorem Ipsum',
    date: new Date(),
  },
  {
    id: 3,
    title: 'third Post',
    author: 'Amin Abdulkabir',
    content: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software ike Aldus PageMaker including versions of Lorem Ipsum',
    date: new Date(),
  },

    
]