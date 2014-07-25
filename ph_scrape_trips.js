var page = new WebPage(), testindex = 0, loadInProgress = false;

page.onConsoleMessage = function(msg) {
  console.log(msg);
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
  ,
  function() {
    var url = "https://www.citibikenyc.com/member/trips/2";
    page.open(url);
  },
  printTrip,
  function() {
    var url = "https://www.citibikenyc.com/member/trips/3";
    page.open(url);
  },
  printTrip
];

function printTrip() {
  page.evaluate(function() {
    var tripTableRows = document.getElementsByClassName("trip");
    var i;

    // loop through trip rows
    for (i=0; i < tripTableRows.length; i++) {

      // loop through trip row table cells
      var tripTableCells = tripTableRows[i].getElementsByTagName("td");
      var j;

      var trip = "";
      for (j=0; j < tripTableCells.length; j++) {
        trip += tripTableCells[j].innerHTML + "|||";
      }
      trip = trip.slice(0, - 3);
      trip += "~~~";
      console.log(trip.replace(/&amp;/g,'&'));
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
  }
  if (typeof steps[testindex] != "function") {
    phantom.exit();
  }
}, 200);