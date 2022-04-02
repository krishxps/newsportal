const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const https = require('https');
const { response } = require('express');

const app = express();
app.use(express.static("static"));
app.use(bodyParser.urlencoded({extended:true}));
app.get("/",function(req,res){
    res.sendFile(__dirname + "/signup.html")
})

app.post("/", function(req ,res){
    const firstName = req.body.fname;
    const lastName = req.body.lname;
    const email = req.body.email;
    const data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields:{
                    FNAME : firstName,
                    LNAME : lastName ,
                }
            }
        ]
    };

    const jsonData = JSON.stringify(data);
    const url = "https://us14.api.mailchimp.com/3.0/lists/d0e1846736"
    const options = {
        method: "POST",
        auth: "krish350:21c491a98c0305f376a554114b7a7be8-us14",
    }
   
    const reqest = https.request(url, options , function(response){

        if(response.statusCode === 200){
            res.sendFile(__dirname + "/success.html");
        }else{
            res.sendFile(__dirname + "/failure.html");
        }

        response.on("data",function(data){
            console.log(JSON.parse(data));
        });
    });
    reqest.write(jsonData);
    reqest.end();
});

app.post("/fail", function(req , res){
    res.redirect("/");
});

app.listen(process.env.PORT || 3000 ,function(){
    console.log("server is running in port 3000");
});

// res.send("<h1><br>Fastname:"+firstName+"<br>Lastname:"+lastName+"<br>Email:"+email+"</h1>")
// audiance Id
// d0e1846736

// api key
// 21c491a98c0305f376a554114b7a7be8-us14