const express = require('express');

const app = express();

app.listen(55787,()=> console.log("Gatinho."));

app.get('/', (req,res)=>{
    res.send("minhau")
})
app.get('/cachorro', (req,res)=>{
  res.send("AuAu")
})
app.get('/fim', (req,res)=>{ res.end() })

const dados = ["Anderson"];
app.get('/j', (req, res)=>{res.json({dados})})