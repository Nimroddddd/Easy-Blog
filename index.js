import bodyParser from 'body-parser';
import express from 'express';
import axios from 'axios';

const app = express();
const port = 3000;
const api = 'http://localhost:4000';


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
    res.redirect("/");
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
  console.log(req.body)
  try {
    const response = await axios.patch(api + '/edit/' + req.params.id, req.body);
    console.log(response.data)
    res.redirect("/");
  } catch(error) {
    console.log(error.message);
  }
})


app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})