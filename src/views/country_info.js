const RequestHelper = require('../helpers/request_helper.js');
const PubSub = require('../helpers/pub_sub.js');

const CountryInfo = function(element) {
  this.element = element;
};

CountryInfo.prototype.bindEvents = function () {
  PubSub.subscribe('SelectedCountryInfo', (evt) => {
    console.log(evt.detail);
    this.render(evt.detail);
  });
};

CountryInfo.prototype.render = function (country) {
  const newHTML = `
    <img src=${country.flag} alt="Flag of ${country.name}">
    <h1>${country.name}</h1>
    <h3>Region: ${country.subregion}</h3>
    <h3>Languages:</h3>
  `;

  this.element.innerHTML = newHTML;

  const ul = document.createElement('ul');
  country.languages.forEach( (language) => {
    const li = document.createElement('li');
    li.textContent = language.name;
    ul.appendChild(li);
  });
  this.element.appendChild(ul);
};

module.exports = CountryInfo;
