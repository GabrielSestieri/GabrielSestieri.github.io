// You may wish to find an effective randomizer function on MDN.
function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

function range(int) {
  const arr = [];
  for (let i = 0; i < int; i += 1) {
    arr.push(i);
  }
  return arr;
}

function sortFunction(a, b, key) {
  if (a[key] < b[key]) {
    return -1;
  } if (a[key] > b[key]) {
    return 1;
  }
  return 0;
}

document.body.addEventListener('submit', async (evt) => {
  evt.preventDefault(); // this stops whatever the browser wanted to do itself.
  const form = $(evt.target).serializeArray(); // here we're using jQuery to serialize the form
  fetch('/api', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(form)
  })
    .then((fromServer) => fromServer.json())
    .then((fromServer) => {
      $(function() {
        // add input listeners
        google.maps.event.addDomListener(window, 'load', function () {
            var current_loc = new google.maps.places.Autocomplete(document.getElementById('current_loc'));
            var destinations = new google.maps.places.Autocomplete(document.getElementById('county'));
    
            google.maps.event.addListener(current_loc, 'place_changed', function () {
                var current_loc = current_loc.getPlace();
                var from_address = current_loc.formatted_address;
                $('#origin').val(from_address);
            });
    
            google.maps.event.addListener(to_places, 'place_changed', function () {
                var to_place = to_places.getPlace();
                var to_address = to_place.formatted_address;
                $('#destination').val(to_address);
            });

      const sortedCountries = randomCountries.sort((a, b) => sortFunction(b, a, 'name'));

      $('.flex-outer form .flex-inner').remove();
      $('.flex-outer form').prepend("<ol class='flex-inner'></ol>");

      const listContent = sortedCountries.map((country) => `<li> <input type="checkbox" id="${country.county}" name="name" value="${country.address}">`
        + `<label for="country.name">${country.county}</label></li>`);
      $('.flex-inner').append(listContent);
    })
    .catch((err) => console.log(err));
});
