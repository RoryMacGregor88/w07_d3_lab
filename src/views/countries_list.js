const RequestHelper = require('../helpers/request_helper.js');
const PubSub = require('../helpers/pub_sub.js');

const CountriesList = function(searchDiv, searchBar, dropdown){
  this.div = searchDiv;
  this.search = searchBar;
  this.dropdown = dropdown;
};

CountriesList.prototype.bindEvents = function () {

  const selectedCountry = event.target.value;
  PubSub.publish('selectedCountryIndex', selectedCountry);

  this.search.addEventListener('focus', (event)=>{
    PubSub.publish('queryDropdown');
  });

  // this.search.addEventListener('blur', (event)=>{
  //   this.dropdown.innerHTML = '';
  // });


  PubSub.subscribe('PopulateCountryInfo', (evt)=>{
    this.dropdownRender(evt.detail);
  });

  this.search.addEventListener('input', (event)=>{
    PubSub.publish('queryByLetter', event.target.value)
  });

  this.dropdown.addEventListener('click', (event)=>{
    const selectedCountry = event.target.textContent;
    console.log(selectedCountry);
    PubSub.publish('selectedCountryName', selectedCountry);
    this.dropdown.innerHTML = '';

  });

};

CountriesList.prototype.dropdownRender = function (countries) {
  this.dropdown.innerHTML = '';
  countries.forEach( (country)=>{
    const li = document.createElement('li');
    li.textContent = country;
    this.dropdown.appendChild(li);
  });
};

CountriesList.prototype.search = function(value) {

}

module.exports = CountriesList;
