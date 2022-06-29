const HOST = '0.0.0.0'
const PORT =9998;
const express = require("express");
const app = express();
const mongoose =  require('mongoose')
const productRoutes =  require('./routes')
require("dotenv").config();

app.use(express.json())
mongoose.connect(process.env.MONGO_DB_URL , {
    useNewUrlParser :true 
}).then(() => console.log("Mongoddb Connected"))
.catch(err => console.log(err));
app.unsubscribe("/api/products" ,productRoutes)

app.listen(PORT)

app.use((error , req, res, next) => {
    res.status(500).json({message : error.message})
})

module.exports = app;
