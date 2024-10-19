//Import modules
import bodyParser from "body-parser";
import express from "express";
import pg from "pg";
import env from "dotenv";

env.config()
//constant declarations
const port = 4000
const app = express()
const db = new pg.Client({
  user: process.env.DB_USER,
  database: process.env.DB_DATABASE,
  host: process.env.DB_HOST,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  ssl: {
    rejectUnauthorized: false,
    required: true,
  },
})

//middleware
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());
db.connect()


//get homepage
app.get("/posts", async (req, res) => {
  try {
    const response = await db.query("select * from posts");
    const result = response.rows
    res.json(result)
  } catch (err) {
    console.log(err)
    res.json(postList)
  }
})

//get specific post
app.get("/posts/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const response = await db.query("select * from posts where id=$1", [id]);
    const result = response.rows[0]
    res.json(result)
  } catch (err) {
    console.log(err)
    res.sendStatus(400)
  }
})


//modify post
app.patch("/edit/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const {title: newTitle, content: newContent, author: newAuthor} = req.body
  try {
    const response = await db.query("select * from posts where id=$1", [id]);
    const result = response.rows[0]
    const {title: oldTitle, author: oldAuthor, content: oldContent} = result
    await db.query("update posts set title=$1, content=$2, author=$3 where id=$4", [(newTitle || oldTitle), (newContent || oldContent), (newAuthor || oldAuthor), id]);
    res.sendStatus(201)
  } catch(err) {
    res.sendStatus(400)
  }
})

//create new post
app.patch("/new", async (req, res) => {
  const {title, content, author} = req.body;
  const date = new Date();
  await db.query("insert into posts (title, author, content, date) values ($1, $2, $3, $4)", [title, author, content, date])
  res.sendStatus(201);
})

//delete a post
app.delete("/delete/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    await db.query("delete from posts where id=$1", [id]);
    res.sendStatus(200)
  } catch (err) {
    res.sendStatus(401)
  }
})




app.listen(port, () => {
  console.log(`API server running on port ${port}`)
})
