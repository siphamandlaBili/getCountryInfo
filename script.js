'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////

const renderCountry = async ([data], className = '') => {
  try {
    const { flags, name, region, population, languages, currencies } = await data;

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
      </article>`;

    countriesContainer.insertAdjacentHTML('beforeend', html);
    countriesContainer.style.opacity = 1;
  } catch (error) {
    console.log(error);
    // Handle rendering error, e.g., show a friendly message to the user
  }
};

const getCountryAndNeighbour = async (country) => {
  try {
    // request for country
    const dataF =await fetch(`https://restcountries.com/v2/name/${country}`);
    const request = await dataF.json();
    renderCountry(request);

    // request for neighbour
    const neighbour = request[0].borders[0];
    const dataF2 = await fetch(`https://restcountries.com/v2/alpha/${neighbour}`);
    const request2 = await dataF2.json();
    renderCountry([request2], 'neighbour');
  } catch (error) {
    console.log(error);
    // Handle network error, e.g., show a message indicating the network issue
  }
};

btn.addEventListener('click', () => {
  getCountryAndNeighbour('yemen');
});
