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
      const list = [];
      const randomCountries = list.map((i) => {
        const listLength = fromServer.length;
        const randomCountry = getRandomInt(listLength);
        const country = fromServer[randomCountry];
        list.append(country);
        return country;
      });
      console.log('Table')
      console.table(randomCountries)

      const $newol = $("<ol class='flex-inner'></ol>");
      $('form').prepend($newol);

      /*
      for (let i = 0; i < 9; i + 1) {
        const country = countries[Math.floor(Math.random() * countries.length)];
        randomCountries.append(country);
      }
      randomCountries.sort((decending) => {})
      for (let i = 0; i < length(randomCountries); i + 1) {
        $('.flex-inner').append('<li> randomCountries[i] </li>');
      } 
      */
      console.log(randomCountries);
      return generateList;
    })
    .catch((err) => console.log(err));
});