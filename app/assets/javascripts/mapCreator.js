
var newTrailCoords = []
function trailCoords(lat, long){
  var coord = [lat, long]
  newTrailCoords.push(coord)
}

var poly;
var map;

function initialize() {
  var mapOptions = {
    zoom: 7,
    // Center the map on Chicago, USA.
    center: new google.maps.LatLng(10.000000, -87.624333)
  };

  map = new google.maps.Map(document.getElementById('map-trail'), mapOptions);

  var polyOptions = {
    strokeColor: '#000000',
    strokeOpacity: 1.0,
    strokeWeight: 3
  };
  poly = new google.maps.Polyline(polyOptions);
  poly.setMap(map);

  // Add a listener for the click event
  google.maps.event.addListener(map, 'click', addLatLng);


  $('.create-trail-button').on('click', function(){

  var newTrail = makeTrail()
  var currentUserId = $('.current-user-id').val()
  console.log(newTrail)
  $.ajax({
    url: '/trails',
    method: 'post',
    dataType: 'json',
    data: {trail: newTrail},
    success: function(data){
      console.log(data)
      // window.location.href='/trails/' + currentUserId
    }
  })
})
}

/**
 * Handles click events on a map, and adds a new point to the Polyline.
 * @param {google.maps.MouseEvent} event
 */
function addLatLng(event) {

  var path = poly.getPath();

  // Because path is an MVCArray, we can simply append a new coordinate
  // and it will automatically appear.
  path.push(event.latLng);
  lichard = event.latLng
  trailCoords(event.latLng['k'], event.latLng['A'])
  // Add a new marker at the new plotted point on the polyline.
  var marker = new google.maps.Marker({
    position: event.latLng,
    title: '#' + path.getLength(),
    map: map
  });
}

google.maps.event.addDomListener(window, 'load', initialize);

function makeTrail(){
  var object = {}
  object['trail'] = $('.create-trail-title').val()
  object['description'] = $('.create-trail-description').val()
  object['state'] = $('.create-trail-state').val()
  object['creator'] = $('.current-user-id').val()
  object['coords'] = newTrailCoords
  return object
}


