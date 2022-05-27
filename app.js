const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
//const ejsLint = require('ejs-lint');
mongoose.connect("mongodb://localhost:27017/todoListDB", {
     useNewUrlParser: true,
});
const itemsSchema = new mongoose.Schema({
     name: String,
});
const Item = mongoose.model("Item", itemsSchema);
const item1 = new Item({
     name: "Welcome to your todo list",
});
const item2 = new Item({
     name: "hit the + button to add new item",
});
const item3 = new Item({
     name: "<--Hit this to delete an item",
});
const defautItems = [item1, item2, item3];

app.get("/", function (req, res) {
     // let day= date.getDay()

     Item.find({}, function (err, foundItems) {
          if (foundItems.length === 0) {
               Item.insertMany(defautItems, function (err) {
                    if (err) {
                         console.log(err);
                    } else {
                         console.log("successfully added !");
                    }
               });
               res.redirect("/");
          } else {
               res.render("list", {
                    ListTitle: "Today",
                    newListItems: foundItems
                    });
          }
     });
});
app.post("/", function (req, res){
     const itemName = req.body.ItemName;
     const item = new Item({
          name: itemName,
     });
     item.save();
     res.redirect("/");
});

app.get("/work", function (req, res) {
     res.render("list", { ListTitle: "Work List", newListItems: workItems });
});
app.get("/about", function (req, res) {
     res.render("about");
});
// app.post("/work",function(req,res){

// let item=req.body.ItemName;
// workItems.push(item);
// res.redirect("/work")
// })
app.listen(3000, function () {
     console.log("server running on port 3000");
});
