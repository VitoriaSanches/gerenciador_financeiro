const express = require('express');
const res = require('express/lib/response');
const app = express();
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.listen(2302,()=> console.log("Epa neném!"));

const mysql = require('mysql2/promise');
const conection = mysql.createPool({
    host:'localhost',
    port:3306,
    database:'TestePessoa',
    user:'root',
    password:''
})

const getAllPessoas = async () =>{
    const [query] = await conection.execute('select * from pessoa')
    return query
}
//buscar pessoas
app.get('/pessoa',async (req,res)=>{
    const resultado = await getAllPessoas()
    return res.status(200).json(resultado)
})

//buscar id
app.get('/pessoa/:id', async (req,res)=>{
    const {id} = req.params;
    const [query] = await conection.execute('select * from pessoa where id = ?', [id]);
    if (query.length===0) return res.status(400).json({mensagem: 'essa pessoa não foi encontrada :( '});
    return res.status(200).json(query)

}) 

//buscar nome
app.get('/pessoa/buscarnome/:nome', async (req,res)=>{
    const {nome} = req.params;
    const [query] = await conection.execute('select * from pessoa where nome like ?', ['%'+nome+'%']);
    if (query.length===0) return res.status(400).json({mensagem: 'nenhuma pessoa foi encontrada :( '});
    return res.status(200).json(query)

})

//buscar o email
app.get('/pessoa/buscaremail/:email', async (req,res)=>{
    const {email} = req.params;
    const [query] = await conection.execute('select * from pessoa where email like ?', ['%'+email+'%']);
    if (query.length===0) return res.status(400).json({mensagem: 'nenhuma pessoa com esse email foi encontrada :('});
    return res.status(200).json(query)

}) 

//criar pessoa
app.post('/pessoa', async (req,res)=>{
    const {nome, email} = req.body;
    const [query] = await conection.execute('insert into pessoa (nome, email) values (?, ?)',[nome, email]);
    return res.json(query);
})

//atualizar pessoa
app.put('/pessoa/:id', async (req,res)=>{
    const {id} = req.params;
    const {nome, email} = req.body;

    const [query] = await conection
    .execute('update pessoa set nome = ?, email = ? where id = ?',[nome, email, id]);
    return res.json(query);
})

//deletar pessoa
app.delete('/pessoa/:id', async(req,res) =>{
    const {id} = req.params
    const [query] = await conection.execute('delete from pessoa where id = ?', [id])
    return res.json(query)
})

