const RequestHelper = require('../helpers/request_helper.js');
const PubSub = require('../helpers/pub_sub.js');

const CountriesList = function(element){
  this.element = element;
};

CountriesList.prototype.bindEvents = function () {
  PubSub.subscribe('all-countries-ready', (evt)=>{
    this.render(evt.detail);
  });

  this.element.addEventListener('change', (event)=>{
    const selectedCountry = event.target.value;
    PubSub.publish('selectedCountryIndex', selectedCountry);
  });

};

CountriesList.prototype.render = function (countries) {
  countries.forEach( (country, index)=>{
    const option = document.createElement('option');
    option.textContent = country;
    option.value = index;
    this.element.appendChild(option);
  });
};

module.exports = CountriesList;
