const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https")
const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/",function(req,res)
{
  res.sendFile(__dirname + "/signup.html");
}
);

app.post("/",function(req,res)
{
  var firstName = req.body.fName;
  var lastName = req.body.lName;
  var email = req.body.email;
var data = {
  members:[
    {
      email_address:email,
      status:"subscribed",
      merge_fields:
      {
        FNAME:firstName,
        LNAME:lastName
      }
    }
  ]
};
const jsonData = JSON.stringify(data);

const url = "https://us10.api.mailchimp.com/3.0/lists/d9672b2e00";
const options = {
  method:"POST",
  auth: "Firdavs:5c771b089928e85c1ba0cb66218eb622-us10"
}

const request = https.request(url,options, function(response)
{
  if(response.statusCode === 200)
  {
    res.sendFile(__dirname + "/success.html");
  }
  else
  {
    res.sendFile(__dirname + "/failure.html");
  }

  response.on("data",function(data)
  {
  console.log(JSON.parse(data));
   })
})

    //request.write(jsonData);
    request.end();
});

app.post("/failure",function(req,res)
{
  res.redirect("/")
})


app.listen(3000,function()
{
  console.log("It is running");
});

// API 9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc-us10
// LIST id
// d9672b2e00
