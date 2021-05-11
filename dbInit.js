const config = require("./config.json");
const mongoose = require("mongoose");

async function run() {
  mongoose
    .connect(config.dbSetting.uri, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    })
    .then(() => console.log("Db Connected Successfully "))
    .catch((err) => console.log(err));
}

module.exports = {
     run 
    };

function afterDb() {
  console.log("Db Connected Successfully");
  /*
    const book = new Book({
      title: "Learn to Survive",
      description: "You really should learn",
      rating: 5,
      price: 130,
      pagesCount: 250,
      reviewCount: 150,
      author: "Abdallh",
    });  
  */

  //  book
  //    .save()
  //    .then(results => console.log(book))
  //    .catch(err => console.log(err));
}
