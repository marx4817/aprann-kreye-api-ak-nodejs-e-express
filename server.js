//import express from 'express'
const express = require('express');
const post = require('./routes/post.js');
const pool = require("./db")
const app = express();

const cors = (req, res, next) => {
    const allowOrigin = ['http://localhost:3000','http://localhost:3001', 'http://localhost:8000', 'http://localhost:3001'];
    const origin = req.headers.origin; 
    allowOrigin.includes(origin) ? res.set("Access-Control-Allow-Origin", origin) : res.set("Access-Control-Allow-Origin", "*");//res.sendStatus(401);

    next();
};

const authorization = (req, res, next) => {
    const [schem, token] = req.headers.authorization.split();
    token === undefined ? res.sendStatus(401) : next();
}

app.use(cors);

app.get('/', (req, res) => {
    res.json({ tuto: 'Node.js | Express | PostgreSQL' })
});

//itilize routage
app.use('/v1/posts', post);

//rekipere done nan yon bazdone
const fetchUsers = async () => {
  try{
    const res = await pool.query('SELECT * FROM users ORDER BY id');
  }catch(error){
    return "Error";
  }
  return res.row;
}

//rekire yon usr gras ak id li 
const getUserById = async (id) => {
    try{
      const res = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
    }catch(error){
      return "Error";
    }
    return res.rows;
}

//kreye yon itilizate
const createUser = async ({ name, email}) => {
    try{
      const res = await pool.query('INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *', [name, email])
    }catch(error){
      return "Error"
    }
    return res.rows;
}

//endpoint
app.get('/users', async (req, res) => {
    const data = await fetchUsers();
    return res.status(200).json(data);
});

app.get('/users/:id', async (req, res) => {
    const id = parseInt(request.params.id);
  
    const data = await getUserById(id);
    return res.status(200).json(data);
});

app.post('/users', async (req, res) => {
    const  { name, email }  = request.body
  
    const data = await createUser({ name, email});
  
    // retounen id, itilizatè ki kreye a.
    return res.status(201).json({id: data[0].id});
});


app.listen(3001);