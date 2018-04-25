const CountryView = function () {
  this.countries = [];
}

CountryView.prototype.add = function (country) {
  this.countries.push(country);
};

CountryView.prototype.populateDropDown = function () {
  const countryDropdown = document.getElementById('country-selector');
  this.countries.forEach((country) => {
    const countryName = document.createElement('option');
    countryName.value = country.alpha3Code;
    countryName.textContent = country.name;
    countryDropdown.appendChild(countryName);
  });
};

CountryView.prototype.returnCountry = function (alpha3Code) {
  return this.countries.find((country) => {
    if (country.alpha3Code === alpha3Code) {
      return country;
    };
  });
};

module.exports = CountryView;
