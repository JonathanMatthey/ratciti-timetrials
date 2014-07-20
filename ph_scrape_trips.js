var page = new WebPage(), testindex = 0, loadInProgress = false;


page.onConsoleMessage = function(msg) {
  console.log(msg);
};

page.onLoadStarted = function() {
  loadInProgress = true;
  console.log(" > load started");
};

page.onLoadFinished = function() {
  loadInProgress = false;
  console.log(" > load finished");
};

var steps = [
  function() {
    var url = "http://www.citibikenyc.com/login";
    console.log("--> opening: "+url);
    page.open(url);
  },
  function() {
    //Enter Credentials
    console.log("--> ENTER CREDS");
    page.evaluate(function() {

      var arr = document.getElementsByTagName("form");
      var i;

      for (i=0; i < arr.length; i++) {
        if (arr[i].getAttribute('method') == "post") {
          arr[i].elements["subscriberUsername"].value= "mattheyj";
          arr[i].elements["subscriberPassword"].value= "mahakala8";
          return;
        }
      }
    });
  },
  function() {
    //Login
    console.log("--> LOGIN");
    page.evaluate(function() {
      var arr = document.getElementsByTagName("form");
      var i;

      for (i=0; i < arr.length; i++) {
        if (arr[i].getAttribute('method') == "post") {
          arr[i].submit();
          console.log('SUBMIT')
          return;
        }
      }
    });
  },
  function() {
    var url = "https://www.citibikenyc.com/member/trips";
    console.log("--> opening: "+url);
    page.open(url);
  },
  printTrip
  // ,
  // function() {
  //   var url = "https://www.citibikenyc.com/member/trips/2";
  //   console.log("--> opening: "+url);
  //   page.open(url);
  // },
  // printTrip,
  // function() {
  //   var url = "https://www.citibikenyc.com/member/trips/3";
  //   console.log("--> opening: "+url);
  //   page.open(url);
  // },
  // printTrip
];

function printTrip() {
  console.log("--> @ trips page ? ");
  page.evaluate(function() {
    console.log(document.querySelectorAll('title')[0].outerHTML);

    var tripTableRows = document.getElementsByClassName("trip");
    var i;

    // loop through trip rows
    for (i=0; i < tripTableRows.length; i++) {

      // loop through trip row table cells
      var tripTableCells = tripTableRows[i].getElementsByTagName("td");
      var j;

      if (tripTableCells[1].innerHTML == "DeKalb Ave &amp; S Portland Ave"){
        var trip = "";
        for (j=0; j < tripTableCells.length; j++) {
          trip += tripTableCells[j].innerHTML + " - ";
        }
        console.log(trip);
      }
    }
  });
}

function openPage(url) {
  console.log("--> opening: "+url);
  page.open(url);
}

interval = setInterval(function() {
  if (!loadInProgress && typeof steps[testindex] == "function") {
    console.log("step " + (testindex + 1));
    steps[testindex]();
    testindex++;
  }
  if (typeof steps[testindex] != "function") {
    console.log("test complete!");
    phantom.exit();
  }
}, 50);