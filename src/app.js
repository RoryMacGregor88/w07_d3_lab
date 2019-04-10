const Countries = require('./models/countries.js');
const CountriesList = require('./views/countries_list.js');
const CountryInfo = require('./views/country_info.js');


document.addEventListener('DOMContentLoaded', () => {
  console.log('JavaScript Loaded');

  const countries = new Countries();
  countries.bindEvents();

  countriesSelector = document.querySelector('#countries')
  const countriesList = new CountriesList(countriesSelector);
  countriesList.bindEvents();

  countryDiv = document.querySelector('#country');
  const countryInfo = new CountryInfo(countryDiv);
  countryInfo.bindEvents();
});
