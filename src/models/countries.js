const RequestHelper = require('../helpers/request_helper.js');
const PubSub = require('../helpers/pub_sub.js');

const Countries = function() {
  this.data = null;
};

Countries.prototype.bindEvents = function () {
  this.getData();

  PubSub.subscribe('selectedCountryIndex', (evt) => {
    const countryInfo = this.data[evt.detail];
    PubSub.publish('SelectedCountryInfo', countryInfo);
  });
};

Countries.prototype.getData = function () {
  const requestHelper = new RequestHelper('https://restcountries.eu/rest/v2/all')
  requestHelper.get( (data)=>{
    this.data = data;
    PubSub.publish('all-countries-ready', this.mapNames() );
  });
};

Countries.prototype.mapNames = function () {
  return this.data.map( country => country.name);
};

module.exports = Countries;
