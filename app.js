// set variables for environment
var express = require('express');
var app = express();
var path = require('path');
var port = 4000;

// views as directory for all template files
app.set('views', path.join(__dirname, 'views'));
// use either 'jade' or 'ejs'
app.set('view engine', 'jade');

// instruct express to server up static assets
app.use(express.static('public'));

// Displays server log in the CLI
app.use(express.logger());

// Set server port
app.listen(port);
console.log("Server is running at => http://localhost:" + port + "/\nCTRL + C to shutdown");

// set routes
app.get('/', function(req, res) {
  res.render('index');
});

var phantom = require('phantom');

phantom.create(function (ph) {
  ph.createPage(function (page) {

    page.onConsoleMessage = function(msg) {
      console.log(msg);
    };

    page.onLoadStarted = function() {
      loadInProgress = true;
      console.log("load started");
    };

    page.onLoadFinished = function() {
      loadInProgress = false;
      console.log("load finished");
    };

        page.open("http://www.citibikenyc.com/login", function (status) {
          console.log("opened citibikenyc? ", status);
          setTimeout(function(){
            page.evaluate(function () {

              var form = document.getElementById("login-form").children[0];
              var i;

              form.elements["subscriberUsername"].value="mylogin";
              form.elements["subscriberPassword"].value="mypassword";
              form.submit();

          setTimeout(function(){
            return document.title;
          },2000);

            }, function (result) {
              console.log('document.getElementById');
              console.log('result: ' + result);
              ph.exit();
            });
          },2000);
        });


    var steps = [
    function() {
        //Load Login Page
        page.open("http://www.citibikenyc.com/login", function (status) {
          console.log("opened citibikenyc? ", status);
          setTimeout(function(){
            page.evaluate(function () {

              return document.getElementById("login-form");
              // var form = document.getElementById("login-form").children[0];
              // var i;

              // form.elements["subscriberUsername"].value="mylogin";
              // form.elements["subscriberPassword"].value="mypassword";
              // return ' loggedin?';

            }, function (result) {
              console.log('document.getElementById');
              console.log('result: ' + result);
              ph.exit();
            });
          },2000);
        });
      },
      // function() {
      //   //Login
      //   page.evaluate(function() {
      //     var form = document.getElementById("login-form");
      //     var i;

      //     if (form.getAttribute('method') == "POST") {
      //       form.submit();
      //       return;
      //     }

      //   });
      // },
      // function() {
      //   // Output content of page to stdout after form has been submitted
      //   page.evaluate(function() {
      //     console.log(document.querySelectorAll('html')[0].outerHTML);
      //   });
      // }
      ];


      // interval = setInterval(function() {
      //   if (!loadInProgress && typeof steps[testindex] == "function") {
      //     console.log("step " + (testindex + 1));
      //     steps[testindex]();
      //     testindex++;
      //   }
      //   if (typeof steps[testindex] != "function") {
      //     console.log("test complete!");
      //     ph.exit();
      //     return;
      //   }
      // }, 200);

    });
});

var testindex = 0, loadInProgress = false;
