require("dotenv").config();

const port = process.env.PORT || 3000;

const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();

app.set("view engine", "ejs");
app.use(cookieParser());
app.use(express.static("static"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const dbConnect = require("./config/database");
dbConnect();

const { isUser,isDriver,isAdmin } = require('./middlewares/auth')

let authRoute = require('./routes/auth')
let userRoute = require('./routes/user')
let adminRoute = require('./routes/admin')
let driverRoute = require('./routes/driver')

app.use('/',authRoute)
app.use('/driver',isDriver,driverRoute)
app.use('/admin',isAdmin,adminRoute)
app.use('/',isUser,userRoute)


app.get('/error',(req,res)=>{
  return res.render('<h1>SORRY, SOMETHING WENT WRONG OR PAGE DOESNOT EXIST</h1>')
})
app.listen(port,'', () => {
  console.log("app running on port ", port);
});
