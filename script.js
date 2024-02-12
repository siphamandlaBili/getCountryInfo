'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////



const getCountry =(country)=>{

// get data using xml request
const request = new XMLHttpRequest();
request.open('GET',`https://restcountries.com/v2/name/${country}`);
request.send();

request.addEventListener('load',(data)=>{
//  change to json format
  const [obj] = JSON.parse(data.currentTarget.responseText);
  const {flags,name,region,languages,currencies,population} = obj;
 
  
  const html = `
        <article class="country">
          <img class="country__img" src=${flags.png} />
          <div class="country__data">
            <h3 class="country__name">${name}</h3>
            <h4 class="country__region">${region}</h4>
            <p class="country__row"><span>👫</span>${(+population/100000).toFixed(1)} million</p>
            <p class="country__row"><span>🗣️</span>${languages[1]? languages[1].name: languages[0].name}</p>
            <p class="country__row"><span>💰</span>${currencies[0].symbol}</p>
          </div>
        </article>
        `
        
        countriesContainer.insertAdjacentHTML('beforeend',html)
        countriesContainer.style.opacity = 1;
})
}


getCountry('south africa');
getCountry('libya');