'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////


const renderCountry = (data,className = '') => {

  const { flags, name, region, languages, currencies, population } = data;

  let html = `
  <article class="country ${className}">
    <img class="country__img" src=${flags.png} />
    <div class="country__data">
      <h3 class="country__name">${name ? name : name.common}</h3>
      <h4 class="country__region">${region}</h4>
      <p class="country__row"><span>👫</span>${(+population / 100000).toFixed(1)} million</p>
      <p class="country__row"><span>🗣️</span>${languages[1] ? languages[1].name : languages[0].name}</p>
      <p class="country__row"><span>💰</span>${currencies[0].symbol}</p>
    </div>
  </article>`

  countriesContainer.insertAdjacentHTML('beforeend', html)
  countriesContainer.style.opacity = 1;
}

const getCountryAndNeighbour = (country) => {

  // get country 1 request
  const request = new XMLHttpRequest();
  request.open('GET', `https://restcountries.com/v2/name/${country}`);
  request.send();

  request.addEventListener('load', (data) => {
    const [obj] = JSON.parse(data.currentTarget.responseText);

    renderCountry(obj);

    // get country 2

    const neighbour = obj.borders?.[0];

    const request2 = new XMLHttpRequest();
    request2.open('GET', `https://restcountries.com/v2/alpha/${neighbour}`);
    request2.send();


    request2.addEventListener('load', (data) => {
      const obj1 = JSON.parse(data.currentTarget.responseText);
      renderCountry(obj1,'neighbour')

    })

  })
}



getCountryAndNeighbour('lesotho');
