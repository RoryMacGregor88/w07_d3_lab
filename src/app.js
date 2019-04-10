const Countries = require('./models/countries.js');
const CountriesList = require('./views/countries_list.js');
const CountryInfo = require('./views/country_info.js');


document.addEventListener('DOMContentLoaded', () => {
  console.log('JavaScript Loaded');

  const countries = new Countries();
  countries.bindEvents();

  const searchDiv = document.querySelector('#search-div')
  const searchBar = document.querySelector('#search-bar')
  const searchDropdown = document.querySelector('#dropdown')

  const countriesList = new CountriesList(searchDiv, searchBar, searchDropdown);
  countriesList.bindEvents();

  countryDiv = document.querySelector('#country');
  const countryInfo = new CountryInfo(countryDiv);
  countryInfo.bindEvents();
});
