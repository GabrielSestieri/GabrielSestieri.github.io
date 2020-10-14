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
      const arr = range(10);
      const randomCountries = arr.map((i) => {
        const indexArray = []
        const listLength = fromServer.length;
        const randomCountryIndex = getRandomInt(listLength);
        indexArray.push(randomCountryIndex)
        if (randomCountryIndex in indexArray) {
          const country = fromServer[(getRandomInt(listLength))];
        } else {
          const country = fromServer[randomCountryIndex];
          return country
        }
        return country;
      });

      const sortedCountries = randomCountries.sort((a, b) => sortFunction(b, a, 'name'));

      $('.flex-outer form .flex-inner').remove();
      $('.flex-outer form').prepend("<ol class='flex-inner'></ol>");

      const listContent = sortedCountries.map((country) => `<li><label for="country.name">${country.name}</label>`
        + `<input type="checkbox" id="${country.name}" name="name" value="${country.code}"></li>`);
      $('.flex-inner').append(listContent);
    })
    .catch((err) => console.log(err));
});
