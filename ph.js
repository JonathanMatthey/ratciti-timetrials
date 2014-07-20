var page = new WebPage(), testindex = 0, loadInProgress = false;

page.onConsoleMessage = function(msg) {
  // console.log(msg);
};

page.onLoadStarted = function() {
  loadInProgress = true;
};

page.onLoadFinished = function() {
  loadInProgress = false;
};

var steps = [
  function() {
    var url = "http://www.citibikenyc.com/login";
    page.open(url);
  },
  function() {
    //Enter Credentials
  console.log('Credentials');
  console.log(document.documentElement.innerHTML);
    page.evaluate(function() {
  console.log('Credentials');
  console.log(document.documentElement.innerHTML);

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
  console.log('Login');
  console.log(document.documentElement.innerHTML);
    page.evaluate(function() {
      var arr = document.getElementsByTagName("form");
      var i;

      for (i=0; i < arr.length; i++) {
        if (arr[i].getAttribute('method') == "post") {
          arr[i].submit();
          return;
        }
      }
    });
  },
  function() {
    var url = "https://www.citibikenyc.com/member/trips";
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
  console.log('printtrip');
  console.log(document.documentElement.innerHTML);
  page.evaluate(function() {
    var tripTableRows = document.getElementsByClassName("trip");
    var i;
    // loop through trip rows
    for (i=0; i < tripTableRows.length; i++) {

      // loop through trip row table cells
      var tripTableCells = tripTableRows[i].getElementsByTagName("td");
      var j;
      console.log(tripTableCells);
      // if (tripTableCells[1].innerHTML == "DeKalb Ave &amp; S Portland Ave"){
      var trip = "";
      for (j=0; j < tripTableCells.length; j++) {
        trip += tripTableCells[j].innerHTML + ";";
      }
      console.log(trip);
      // }
    }
  });
}

function openPage(url) {
  page.open(url);
}

interval = setInterval(function() {
  if (!loadInProgress && typeof steps[testindex] == "function") {
    steps[testindex]();
    testindex++;
    console.log(testindex);
  }
  if (typeof steps[testindex] != "function") {
    phantom.exit();
  }
}, 50);