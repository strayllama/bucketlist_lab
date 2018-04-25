/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./client/src/app.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./client/src/app.js":
/*!***************************!*\
  !*** ./client/src/app.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const BlistView = __webpack_require__ (/*! ./views/bucketlist_view.js */ \"./client/src/views/bucketlist_view.js\");\nconst CountryView = __webpack_require__ (/*! ./views/country_view.js */ \"./client/src/views/country_view.js\");\nconst Request = __webpack_require__(/*! ./services/request.js */ \"./client/src/services/request.js\");\n\n\nconst blistView = new BlistView();\nconst countryView = new CountryView();\nconst countryRequest = new Request('https://restcountries.eu/rest/v2/all');\nconst bListRequest = new Request('http://localhost:3000/api/blist');\n\nconst getBlistsRequestComplete = function (allItems) {\n    allItems.forEach((item) => {\n      blistView.addItem(item);\n    });\n};\n\nconst addItemRequestCompleted = function (addedItem) {\n  blistView.addItem(addedItem);\n};\n\nconst getCountriesRequestComplete = function (countries) {\n  countries.forEach((country) => {\n    countryView.add(country);\n  });\n  countryView.populateDropDown();\n};\n\n\nconst onFormSubmit = function (event) {\n  event.preventDefault();\n  const countryAlpha3Code = event.target[\"country-selector\"].value;\n  console.log(countryAlpha3Code);\n  const countryName = countryView.returnCountry(countryAlpha3Code).name;\n  console.log(countryName);\n  const countryActivity = event.target.activity.value;\n  const newItem = {\n    country: countryName,\n    activity: countryActivity\n  };\n  bListRequest.post(addItemRequestCompleted, newItem)\n};\n\nconst onClickDeleteAll = function () {\n  console.log(\"DELETING ALLL!!\");\n}\n\n\nconst appStart = function () {\n  bListRequest.get(getBlistsRequestComplete);\n  countryRequest.get(getCountriesRequestComplete);\n\n  const addBlistForm = document.getElementById('add-blist-form');\n  addBlistForm.addEventListener('submit', onFormSubmit);\n\n  const clearList = document.getElementById('delete-all');\n  clearList.addEventListener('click', onClickDeleteAll);\n};\n\n\ndocument.addEventListener('DOMContentLoaded', appStart);\n\n\n//# sourceURL=webpack:///./client/src/app.js?");

/***/ }),

/***/ "./client/src/services/request.js":
/*!****************************************!*\
  !*** ./client/src/services/request.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("const Request = function (url) {\n  this.url = url;\n};\n\nRequest.prototype.get = function (onComplete) {\n  const request = new XMLHttpRequest();\n  request.open('GET', this.url);\n\n  request.addEventListener('load', function () {\n    if (request.status !== 200) {\n      console.error(request.status);\n      return;\n    }\n    const responseBody = JSON.parse(request.responseText);\n    onComplete(responseBody);\n  });\n  request.send();\n};\n\nRequest.prototype.post = function (onComplete, payload) {\n  const request = new XMLHttpRequest();\n  request.open('POST', this.url);\n\n  request.setRequestHeader('Content-Type', 'application/json');\n\n  request.addEventListener('load', function () {\n    if (request.status !== 201) return;\n    const response = JSON.parse(request.responseText);\n    onComplete(response);\n  });\n  const jsonPayLoad = JSON.stringify(payload);\n  request.send(jsonPayLoad);\n};\n\nmodule.exports = Request;\n\n\n//# sourceURL=webpack:///./client/src/services/request.js?");

/***/ }),

/***/ "./client/src/views/bucketlist_view.js":
/*!*********************************************!*\
  !*** ./client/src/views/bucketlist_view.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("const BlistView = function () {\n  this.blists = [];\n}\n\nBlistView.prototype.addItem = function (item) {\n  this.blists.push(item);\n  this.render(item);\n};\n\nBlistView.prototype.render = function (item) {\n  const ul = document.getElementById('blist');\n  const li = document.createElement('li');\n  const text = document.createElement('p');\n  text.innerText = `${item.country} - ${item.activity}`;\n  li.appendChild(text);\n  ul.appendChild(li);\n};\n\nmodule.exports = BlistView;\n\n\n//# sourceURL=webpack:///./client/src/views/bucketlist_view.js?");

/***/ }),

/***/ "./client/src/views/country_view.js":
/*!******************************************!*\
  !*** ./client/src/views/country_view.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("const CountryView = function () {\n  this.countries = [];\n}\n\nCountryView.prototype.add = function (country) {\n  this.countries.push(country);\n};\n\nCountryView.prototype.populateDropDown = function () {\n  const countryDropdown = document.getElementById('country-selector');\n  this.countries.forEach((country) => {\n    const countryName = document.createElement('option');\n    countryName.value = country.alpha3Code;\n    countryName.textContent = country.name;\n    countryDropdown.appendChild(countryName);\n  });\n};\n\nCountryView.prototype.returnCountry = function (alpha3Code) {\n  return this.countries.find((country) => {\n    if (country.alpha3Code === alpha3Code) {\n      return country;\n    };\n  });\n};\n\nmodule.exports = CountryView;\n\n\n//# sourceURL=webpack:///./client/src/views/country_view.js?");

/***/ })

/******/ });