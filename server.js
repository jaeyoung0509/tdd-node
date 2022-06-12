const HOST = '0.0.0.0'
const PORT =5000;
const express = require("express");
const app = express();

app.use(express.json())

app.get("/" ,(req ,res)=>{
    req.send("hello world");
})

app.listen(PORT)
