var fs = require('fs');
var https = require("https");

fs.writeFile(__dirname + "/index.html","<h1> html is great </h1>", function(error) {
  if (error){
    return console.log(error);
  }else {
    return console.log("congrats");
  }
});
var myphotolocation = "https://raw.githubusercontent.com/dsanchez123/travel-site-udemy/master/app/assets/images/testimonial-cat.jpg"
https.get(myphotolocation,function(response){
  response.pipe(fs.createWriteStream(__dirname + "/mycat.jpg"));
})
