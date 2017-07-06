const express = require("express");
const hbs = require("hbs");
const fs = require("fs");

var app = express();

hbs.registerPartials(__dirname+'/views/partials')

app.set('view engine','hbs');

 

//middle
app.use((req, res , next) => {
    var now = new Date().toString();
    var log = now + " "+req.method + " "+req.url;
    console.log(log);
    fs.appendFile('Server.log', log +'\n' , (err) => {
       if(err){
           console.log("unable to append to server.log.");
       } 
    });
    
    next();
});

// app.use((req,res,next) => {
//     res.render('maintence.hbs');
// });

app.use(express.static(__dirname+'/public'));

hbs.registerHelper("getCurrentYear", () => {
    return new Date().getFullYear()
});

hbs.registerHelper("scream", (text) => {
    // console.log(typeof text);
    return text;
});


app.get("/", (req , res) => {
    // res.send("<h1>Hello Express !</h1>");
    // res.send({
    //   name:"ola",
    //   likes: [
    //       'walk',
    //       'food'
    //       ]
    // });
    
    res.render('home.hbs',{
        pageTitle: "Home page",
        name:"ola",    
        likes: [
            'walk',
            'food'
            ],
        currentYear: new Date().getFullYear()
        
    });
    
});

app.get('/about', (req,res) => {
    res.render('about.hbs',{
        pageTitle: "About page",
        currentYear: new Date().getFullYear()
    });
});

app.get("/bad", (req,res) => {
    res.send({
        errorMessage: "Error"
    });
    
});

app.listen(process.env.PORT, ()=> {
    console.log("Server up on port ",process.env.PORT);
});