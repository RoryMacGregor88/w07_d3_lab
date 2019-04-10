const RequestHelper = require('../helpers/request_helper.js');
const PubSub = require('../helpers/pub_sub.js');

const Countries = function() {
  this.data = null;
};

Countries.prototype.bindEvents = function () {
  this.getData();

  PubSub.subscribe('queryDropdown', ()=>{
    PubSub.publish('PopulateCountryInfo', this.mapNames());
  });

  PubSub.subscribe('queryByLetter', (evt)=>{
    const filteredCountries = this.searchByLetter(evt.detail);
    PubSub.publish('PopulateCountryInfo', filteredCountries);
  });

  PubSub.subscribe('selectedCountryName', (evt)=>{
    const selectedCountry = this.data.find(country => country.name === evt.detail);
    PubSub.publish('SelectedCountryInfo', selectedCountry);
  });

};

Countries.prototype.getData = function () {
  const requestHelper = new RequestHelper('https://restcountries.eu/rest/v2/all')
  requestHelper.get( (data)=>{
    this.data = data;
  });
};

Countries.prototype.mapNames = function () {
  return this.data.map( country => country.name);
};

Countries.prototype.searchByLetter = function (letters) {
  const allNames = this.mapNames()
  return allNames.filter(name => name.toLowerCase().includes(letters.toLowerCase()) );
};

module.exports = Countries;
