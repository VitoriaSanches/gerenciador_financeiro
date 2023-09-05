const express = require('express');

const app = express();
app.use(express.json())
app.listen(55787,()=> console.log("Gatinho."));

// app.get('/', (req,res)=>{
//     res.send("minhau")
// })
// app.get('/cachorro', (req,res)=>{
//   res.send("AuAu")
// })
// app.get('/fim', (req,res)=>{ res.end() })

// const dados = ["Anderson"];
// app.get('/j', (req, res)=>{res.json({dados})})

const mysql = require('mysql2/promise')
const conection = mysql.createPool({
    host: 'localhost',
    port:3306,
    database:'testepessoa',
    user:'root',
    password:''
})

const getAllPessoas = async () =>{
  const[query] = await conection.execute('select * from pessoa')
  return query
}

app.get('/pessoa', async (req,res)=>{
  const resultado = await  getAllPessoas()
  return res.status(200).json(resultado)
})