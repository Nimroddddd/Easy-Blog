import bodyParser from 'body-parser';
import express from 'express';
import axios from 'axios';
import env from "dotenv";

env.config()
const app = express();
const port = 3000;
const api = process.env.API_URL


app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

//laod homepage
app.get("/", async (req, res) => {
  try {
    const response = await axios.get(api + '/posts');
    const result = response.data;
    res.render("index.ejs", {data: result});
  } catch(error) {
    console.log(error.message);
    // res.redirect("/");
  }
})

//enter editing page
app.get("/modify/:id", async (req, res) => {
  try {
    const response = await axios.get(api + '/posts/' + req.params.id);
    const result = response.data;
    res.render("modify.ejs", {data: result});
    
  } catch(error) {
    console.log(error.message);
    res.redirect("/");
  }
})


//process edit request
app.post("/edit/:id", async (req, res) => {
  try {
    const response = await axios.patch(api + '/edit/' + req.params.id, req.body);
    res.redirect("/");
  } catch(error) {
    console.log(error.message);
  }
})

//handle new get request to create new post
app.get("/create", (req, res) => {
  res.render("modify.ejs");
})

//handle request to create new post
app.post("/new", async (req, res) => {
  try {
    const response = await axios.patch(`${api}/new`, req.body);
    console.log(response.data)
    res.redirect("/")
  } catch(error) {
    console.log(error.message)
  }

})

//handle delete post
app.get("/delete/:id", async (req, res) => {
  try{
    const result = await axios.delete(`${api}/delete/${req.params.id}`)
    res.redirect("/")
  } catch(error) {
    console.log(console.log)
  }
  
})

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})