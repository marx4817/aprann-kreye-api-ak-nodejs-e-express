// post.js - post route module.

const express = require('express');
const router = express.Router();

router.get("/", (req, res)=>{
    
    res.send("Ou rekipe tout post yo", 200);
});

//To create a new post
router.post("/", (req, res)=>{
   
    
    res.send("Hi wap kreye yon post", 200);
});

//To create a new post
router.delete("/", (req, res)=>{
    res.set("Access-Control-Allow-Origin", "*");
    res.send("Wap siprime yon post", 200);
});

router.put("/", (req, res)=>{
    res.set("Access-Control-Allow-Origin", "*");
    res.send("Wap siprime yon post", 200);
});

module.exports = router;