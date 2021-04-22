const express = require("express");
const port = process.env.PORT || 3000;
const host = "0.0.0.0";

// City data
const cities = require("./cities.json");


let app = express();

app.set("view engine", "ejs");

app.use(express.static(__dirname + "/public"));

app.get("/", (req, res) => {
    res.render("index", {
        cities: cities
    });
})


app.listen(port, host, () => {
    console.log("Server is running...");
})