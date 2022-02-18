const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const https = require("https");

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app
  .get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
  })
  .post("/", (req, res) => {
    var city = req.body.city;
    var url =
      "https://api.openweathermap.org/data/2.5/weather?q=" +
      city +
      "&units=metric&appid=94f02d3f078b20901b1c370a2e5ba121";
    https.get(url, (response) => {
      console.log(response);
      response.on("data", (recData) => {
        var data = JSON.parse(recData);
        var desc = data.weather[0].description;
        var temp = data.main.temp;
        var place = data.name;
        var icon = data.weather[0].icon;

        var imgUrl = "http://openweathermap.org/img/wn/" + icon + "@2x.png";

        // // res.write(`the temprature today in ${place} is ${temp}`)
        // res.write("<h1>The temperature today in "  + place + " is " + temp +"</h1>")
        // // res.write(`The weather is ${desc}`)
        // res.write("The weather is " + desc)
        // res.write("<img src=" + imgUrl +" />")
        // res.send()
        res.render("weather", {
          temp: temp,
          desc: desc,
          place: place,
          icon: icon,
          imgUrl: imgUrl,
        });
      });
    });
  });

app.listen(3000 || process.env.PORT, function () {
  console.log("server started on port :  3000");
});
