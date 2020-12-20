function getBathValue() {
  var uiBathrooms = document.getElementsByName("uiBathrooms");
  for(var i in uiBathrooms) {
    if(uiBathrooms[i].checked) {
        return parseInt(i)+1;
    }
  }
  return -1; // Invalid Value
}

function getBHKValue() {
  var uiBHK = document.getElementsByName("uiBHK");
  for(var i in uiBHK) {
    if(uiBHK[i].checked) {
        return parseInt(i)+1;
    }
  }
  return -1; // Invalid Value
}

function onClickedEstimatePrice() {
  console.log("Estimate price button clicked");
  var sqft = document.getElementById("uiSqft");
  var bhk = getBHKValue();
  var bathrooms = getBathValue();
  var location = document.getElementById("uiLocations");
  var estPrice = document.getElementById("uiEstimatedPrice");

  var url = "http://127.0.0.1:5000/predict_home_price";

  var regex = new RegExp(/[^0-9]/, 'g');
  let message = document.getElementById('message');
  if(sqft.value == "") {
   message.innerHTML = `<div class="mess">
                        <div class="alert alert-danger">
                        <strong>Message: </strong> Please! Enter some value in "Area (Square Feet)"
                        </div>
                        </div>`;
  } else if(sqft.value.match(regex)) {
   message.innerHTML = `<div class="mess" >
                        <div class="alert alert-danger">
                        <strong>Message: </strong> Please! Enter a numeric a value.
                        </div>
                        </div>`;
  }
    setTimeout(function () {
        message.innerHTML = "";
    }, 2000)

  $.post(url, {
      total_sqft: parseFloat(sqft.value),
      bhk: bhk,
      bath: bathrooms,
      location: location.value
  },function(data, status) {
      console.log(data.estimated_price);
      estPrice.innerHTML = "<div class='btn btn-dark btn-lg'>" + data.estimated_price.toString() + " Lakhs</div>";
      console.log(status);
  });
}

function onPageLoad() {
  console.log( "document loaded" );
  var url = "http://127.0.0.1:5000/get_location_names";
  $.get(url,function(data, status) {
      console.log("got response for get_location_names request");
      if(data) {
          var locations = data.locations;
          var uiLocations = document.getElementById("uiLocations");
          $('#uiLocations').empty();
          for(var i in locations) {
              var opt = new Option(locations[i]);
              $('#uiLocations').append(opt);
          }
      }
  });
}

window.onload = onPageLoad;