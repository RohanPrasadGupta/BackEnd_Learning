// Creating usre authentication below

import  express from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import bcrypt from 'bcrypt'

//Connect Database
mongoose.connect('mongodb://127.0.0.1:27017',{
    dbName: 'Users'
}).then(()=>{
    console.log('Database Connected Success')
}).catch((error)=>{
    console.log(`Data base connection failes ${error}`)
})

//Construct Schema for the data going to get
const UserSchema = new mongoose.Schema({
    name : String,
    email : String,
    password : String,
})

// // Construct Model for the collection to add
const User = mongoose.model('UserDetails',UserSchema);


const App = express();

//Set View engine
App.set('view engine','ejs')

//Reading data from the user side
App.use(express.urlencoded({encoded:true}))

// Use Cookie Parser
App.use(cookieParser()) 


// Authentication function

const authenticationCheck =(req,res,next)=>{

    const token = req.cookie;
    if (token){
        next()
    }else{
        res.render('login.ejs')
    }
}


App.get('/', authenticationCheck , (req,res)=>{
    res.render('logout.ejs')
})


App.post('/login',async(req,res)=>{

    // console.log(req.body.name, req.body.wemail)
    const {name , email} = req.body
    const password = await bcrypt.hash(req.body.password,10)
    const user = await User.create({name,email, password})
    
    res.cookie('token', 'IAmIn',{
        httpOnly:true,
        expires: new Date(Date.now()+60*1000)
    })
    res.render('logout.ejs')

})

App.get('/logout',(req,res)=>{
    res.cookie('token','IAmIn',{
        httpOnly: true,
        expires : new Date(0),
    })
    res.render('login.ejs')
})



App.listen(5000,()=>{
    console.log('App is running')
})





// ------------------------------------------------------------

// // MONGO DB below
// import express from 'express';

// // Cookie Parser Check 
// import cookieParser from 'cookie-parser';

// //TO handle mongo DB we need mongoose as a middle ware so install it using "npm i mongoose" and import it
// import mongoose from 'mongoose';

// // Import Path
// //import path  from 'path';

// mongoose.connect("mongodb://127.0.0.1:27017",{
//     dbName : 'backend' //According to the database name you have crated
// }).then(()=>{
//     //AS after connection is created successfully then
//     console.log("DataBase Connected")
// }).catch((error)=>{
//     console.log(`Error occured ${error}`)
// })


// //Construct Schema for the data going to get
// const msgSchema = new mongoose.Schema({
//     name : String,
//     email : String,
// })

// // Construct Model for the collection to add
// const Message = mongoose.model('message',msgSchema);

// const App = express();
// App.set("view engine","ejs")

// //Getting data from the user
// App.use(express.urlencoded({encoded:true}))
// // User Cookie Parser in App
// App.use(cookieParser())

// // //TO sreve the static file directly from the public folder
// // App.use(express.static(path.join(path.resolve(),'views')))

// // Make Authentication condition
// const isAuthenticated = (req,res,next)=>{
//     const { token } = req.cookie;
//     if (token){
//         next()
//     }else{
//         res.render('login.ejs')
//     }
// }

// App.get('/',isAuthenticated, (req,res)=>{
//     res.render("logout.ejs")
// })


// // Cookies example to add and delete when login
// App.post('/login',(req,res)=>{
//     res.cookie('token','IAmIn',{
//         httpOnly:true,
//         expires : new Date(Date.now()+60*1000)
//     })
//     res.render('logout.ejs') //redirect to logout page
    
// })


// App.get('/logout',(req,res)=>{
//     res.cookie('token',null,{
//         httpOnly: true,
//         expires : new Date(Date.now())
//     })
//     res.render('login.ejs')
// })





// App.get('/',(req,res)=>{
//     res.render('index' , {name : 'ROHAN'})
// })

// App.post('/',async(req,res)=>{
   
//     // Destructure the data received

//     const {name,email} = req.body
//     await Message.create({name , email })
//     res.send("redirect")

// })


// // Sample trial to add the data in MongoDB
// App.get('/add',async(req,res)=>{
//     await Message.create({name:'Rohwadwdaadawdwadn',email:"absadawddwadawd@gmail.com"})
//     res.send('okay added')
// }) 


// App.listen(5000,()=>{
//     console.log("App is running...")
// })



// ------------------------------------------


// // EXPRESS JS 
// // Insted of naming Server in Express we use App for Naming

// import path from 'path';
// import express  from "express";

// const app = express();


// // YOU have to get the engine view for ejs and name the file without extension i.e "index" or save the file to views and give the full name as "index.ejs"
// app.set("view engine","ejs")


// //TO sreve the static file directly from the public folder
// // app.use(express.static(path.join(path.resolve(),'public')))

// app.use(express.urlencoded({extended:true}))

// // console.log(path.join(path.resolve(),'public'))


// app.get('/',(req,res)=>{
    
//     res.render('index', {name : "Rohan"}) //By default it will search in view folder and render it

//     // This way we can get the file to read but more elegent way is using EJS up above
//     // const pathLocation = path.resolve()

//     // res.sendFile(path.join(pathLocation,'\index.html'))
    
    
//     // res.json({
//     //     success : true,
//     //     "Name" : "Rohan",
//     //     "Data" : ["Name","success",'Apple']
//     // })

// })

// const users = []

// app.post('/',(req,res)=>{
    
//     users.push({name : req.body.name , email : req.body.email })

//     console.log(req.body)
//     console.log(users)

//     res.redirect("/redirect");


// })


// // here we are redirecting but dont have any route for redirect file so create a get 
// app.get('/redirect',(req,res)=>{
//     res.render("redirect")
// })


// app.get('/users',(req,res)=>{
//     res.json({
//         users,
//     })
// })



// app.listen(5000,()=>{
//     console.log("App is working...")
// })




// --------------------------------------------------








// import http from 'http'


// const server = http.createServer((req,res)=>{
//     res.end('Home')
// })


// server.listen(5000,()=>{
//     console.log('server is working')
// })




// BELOW S THE CODE FOR URL CHECK AND SERVER CRATE using HTTP and access the data and function from other file to this one


// import http from 'http';
// // import {Name,Name2,Name3} from './Features.js'
// // or

// // import * as FeatureData from './Features.js'

// // console.log(FeatureData.Name,FeatureData.Name2,FeatureData.Name3)

// import { RandomNumber } from './Features.js';
// import fs from 'fs'


// fs.readFile()


// console.log(RandomNumber())

// const server = http.createServer((req,res)=>{
    
//     if(req.url === "/about"){
//         res.end('About Page')

//         // res.end(`About Page ${Name},${Name2},${Name3}`)
//         // or
//         // res.end(`About Page ${FeatureData.Name},${FeatureData.Name2},${FeatureData.Name3}`)
//     }
//     else if(req.url === "/"){
//         res.end("Home Page")
//     }
//     else{
//         res.end("Page Not Found")
//     }
        

// })


// server.listen(5000,()=>{
//     console.log("Server is working")
// })