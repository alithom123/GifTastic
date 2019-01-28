$(document).ready(function() {
  // Api info
  var apiKey = "LkOgC0Tu9Sx4yjFXKSCDStyZKhdxBqq3";
  var apiDomain = "http://api.giphy.com/v1/gifs/search";
  var apiUrl = "";
  var apiQuery = "";
  var apiQueryParameters = [];

  //   console.log((apiUrl = createQueryParameters(apiQueryParameters)));

  //   api_key: string;
  //   q: string;
  //   limit: integer(int32);
  //   rating: string;

  var showNames = [
    "Golden Girls",
    "Curb Your Enthusiasm",
    "Arrested Development",
    "Peep Show",
    "Seinfeld"
  ];

  $.each(showNames, function(i, showName) {
    $("#topic-buttons").append(
      $("<button>")
        .attr("data-show", showName)
        .attr("class", "showButton")
        .text(showName)
    );
  });

  // Getting a CORS policy error on the api call. Not sure if we can resolve this without changing apis.
  //   $(".showButton").on("click", function() {
  $(document.body).on("click", ".showButton", function() {
    //<-- You will use this a lot probably.
    apiQueryParameters = [];
    apiQueryParameters.push("api_key=" + apiKey);
    apiQueryParameters.push("q=" + $(this).attr("data-show"));
    apiQueryParameters.push("limit=3");
    apiUrl = apiDomain + createQueryParameters(apiQueryParameters);
    console.log("Sending API GET request to: " + apiUrl);

    $.ajax({
      url: apiUrl,
      type: "GET",
      success: function(result) {
        $("#gifs-div").empty();
        $.each(result.data, function(index, gifObj) {
          //   var imageElement = $("<img>").attr("src", gifObj.url);
          var imageElement = $("<img>").attr(
            "src",
            // "http://giphy.com/embed/bznNJlqAi4pBC"
            gifObj.images.downsized.url
          );
          $("#gifs-div").append(imageElement);
        });

        console.log(result);
      }
    });
  });

  // When user clicks "Add" button, the show they've typed in is added as a button.
  $("#add-show-button").on("click", function() {
    addShowButton($("#add-show-text").val()); // How do I pass this function with arguments itself as the click handler.
    $("#add-show-text").val("");
  });
});

// Utility function to add a tv show button, given the tv show name.
function addShowButton(showName) {
  console.log("IN addShowButton");
  $("#topic-buttons").append(
    $("<button>")
      .attr("data-show", showName)
      .attr("class", "showButton")
      .text(showName)
  );
}

// Utility function to create the api parameters string.  Pass in array eg ["api_key=xxxyyyzzz","q=trump","limit=4"] receive: ?api_key=xxxyyyzzz&q=trump&limit=4
function createQueryParameters(parametersArray) {
  return (parameterString = "?" + parametersArray.join("&"));
}
