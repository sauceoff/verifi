const express = require("express");
const axios = require("axios");
require("dotenv").config();

const app = express();

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI;

app.get("/", (req, res) => {

const url =
`https://discord.com/api/oauth2/authorize?client_id=${CLIENT_ID}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&response_type=code&scope=identify guilds.join`;

res.send(`
<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8">
<title>ChupetaZ Verify</title>

<style>

*{
margin:0;
padding:0;
box-sizing:border-box;
font-family:Arial,sans-serif;
}

body{
height:100vh;
display:flex;
justify-content:center;
align-items:center;
background:url('https://i.imgur.com/UfslUBu.jpeg') center center/cover no-repeat;
overflow:hidden;
}

body::before{
content:'';
position:absolute;
inset:0;
background:rgba(0,0,0,.65);
backdrop-filter:blur(4px);
}

.box{
position:relative;
z-index:2;
width:550px;
padding:40px;
border-radius:20px;
background:rgba(15,15,15,.85);
border:1px solid #7d2cff;
box-shadow:0 0 40px rgba(125,44,255,.45);
text-align:center;
}

.logo{
width:220px;
margin-bottom:20px;
}

h1{
color:#fff;
margin-bottom:10px;
}

p{
color:#cfcfcf;
margin-bottom:25px;
}

.btn{
display:inline-block;
padding:15px 40px;
background:#7d2cff;
color:#fff;
text-decoration:none;
font-weight:bold;
font-size:18px;
border-radius:12px;
transition:.3s;
}

.btn:hover{
transform:scale(1.05);
}

</style>

</head>
<body>

<div class="box">

<img
src="https://i.imgur.com/DaHHeIZ.png"
class="logo"
>

<h1>CHUPETAZ VERIFY</h1>

<p>
Clique no botão abaixo para verificar sua conta.
</p>

<a class="btn" href="${url}">
✅ VERIFICAR
</a>

</div>

</body>
</html>
`);

});

app.get("/callback", async (req, res) => {

const code = req.query.code;

if (!code){
return res.send("Código inválido.");
}

try{

const token = await axios.post(
"https://discord.com/api/oauth2/token",
new URLSearchParams({
client_id: CLIENT_ID,
client_secret: CLIENT_SECRET,
grant_type: "authorization_code",
code: code,
redirect_uri: REDIRECT_URI
}),
{
headers:{
"Content-Type":"application/x-www-form-urlencoded"
}
}
);

const accessToken = token.data.access_token;

const user = await axios.get(
"https://discord.com/api/users/@me",
{
headers:{
Authorization:`Bearer ${accessToken}`
}
}
);

res.send(`
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">

<style>

body{
margin:0;
height:100vh;
display:flex;
justify-content:center;
align-items:center;
background:url('https://i.imgur.com/UfslUBu.jpeg') center center/cover no-repeat;
font-family:Arial,sans-serif;
}

.card{
background:rgba(15,15,15,.9);
padding:40px;
border-radius:20px;
border:1px solid #7d2cff;
width:550px;
text-align:center;
color:white;
box-shadow:0 0 40px rgba(125,44,255,.45);
}

.ok{
font-size:70px;
margin-bottom:20px;
}

</style>

</head>

<body>

<div class="card">

<div class="ok">✅</div>

<h1>Verificação concluída</h1>

<p>Bem-vindo ${user.data.username}</p>

<p>
Sua conta foi verificada com sucesso.
</p>

</div>

</body>
</html>
`);

}catch(err){

console.log(err.response?.data || err);
res.send("Erro na verificação.");

}

});

app.listen(3000, () => {
console.log("https://verifi-ai60.onrender.com/callback");
});