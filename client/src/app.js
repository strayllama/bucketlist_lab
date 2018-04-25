const BlistView = require ('./views/bucketlist_view.js');
const CountryView = require ('./views/country_view.js');
const Request = require('./services/request.js');


const blistView = new BlistView();
const countryView = new CountryView();
const countryRequest = new Request('https://restcountries.eu/rest/v2/all');
const bListRequest = new Request('http://localhost:3000/api/blist');

const getBlistsRequestComplete = function (allItems) {
    allItems.forEach((item) => {
      blistView.addItem(item);
    });
};

const addItemRequestCompleted = function (addedItem) {
  blistView.addItem(addedItem);
};

const getCountriesRequestComplete = function (countries) {
  countries.forEach((country) => {
    countryView.add(country);
  });
  countryView.populateDropDown();
};


const onFormSubmit = function (event) {
  event.preventDefault();
  const countryAlpha3Code = event.target["country-selector"].value;
  console.log(countryAlpha3Code);
  const countryName = countryView.returnCountry(countryAlpha3Code).name;
  console.log(countryName);
  const countryActivity = event.target.activity.value;
  const newItem = {
    country: countryName,
    activity: countryActivity
  };
  bListRequest.post(addItemRequestCompleted, newItem)
};

const onClickDeleteAll = function () {
  console.log("DELETING ALLL!!");
}


const appStart = function () {
  bListRequest.get(getBlistsRequestComplete);
  countryRequest.get(getCountriesRequestComplete);

  const addBlistForm = document.getElementById('add-blist-form');
  addBlistForm.addEventListener('submit', onFormSubmit);

  const clearList = document.getElementById('delete-all');
  clearList.addEventListener('click', onClickDeleteAll);
};


document.addEventListener('DOMContentLoaded', appStart);
