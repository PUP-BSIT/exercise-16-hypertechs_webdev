let searchButton = document.querySelector ("#btn_search");
let searchResult = document.querySelector ("#search_result");
let countryName = document.createElement ("p");
let countryCapital = document.createElement ("p");
let countryRegion = document.createElement ("p");
let countryLanguage = document.createElement ("p");
let countryCurrency = document.createElement ("p");
let countryPopulation = document.createElement ("p");
let searchFeedback = document.createElement ("p");

searchButton.addEventListener ("click", searchCountry);

function searchCountry () {
  let countryInput = document.querySelector ("#country_input").value;
  let chosenCountry = 0;

  searchResult.innerHTML = "";
  fetch (`https://restcountries.com/v3.1/name/${countryInput}`)
/*
  may not show result because sometimes official name doesn't work either
*/
  .then ((response) => {
    if (response.status === 404) {
      searchResult.innerHTML = "Country not found";
      return;
    }
    return response.json ()
  })
  .then ((data) => {
    if (data.length > 1) {
      console.log (data);
      let newPar = document.createElement ("p");
      let newList = document.createElement ("li");
      searchFeedback.innerHTML = `"${countryInput}" may refer to: `;
      searchResult.append (searchFeedback);
      searchResult.append (newList);
      for (let country in data) {
        let newListItem = document.createElement ("ul"); 
        newListItem.innerHTML = data[country].name.official ;
        newList.append (newListItem);
      }
      newPar.innerHTML = "Try to enter the country's official name";

      searchResult.append (newPar);
      return;
    } 

    console.log (data);
    countryName.innerHTML = "Official name: " + data[0].name.official;
    searchResult.append (countryName);
    let capitals = "";
    for (let capital in data[0].capital) {
      capitals = data[0].capital[capital] + ", ";
    } 
    countryCapital.innerHTML = "Capital/s: " + removeComma (capitals); 
    searchResult.append (countryCapital);

    countryRegion.innerHTML = "Region: " + data[0].region;
    searchResult.append (countryRegion);

    let languages = "";
    for (let language in data[0].languages) {
      languages = data[0].languages[language] + ", ";
    } 
    countryLanguage.innerHTML = "Language/s: " + removeComma (languages);
    searchResult.append (countryLanguage);

    let currencies = "";
    for (let currency in data[0].currencies) {
      currencies = data[0].currencies[currency].name + ", ";
    }
    countryCurrency = "Currency/s: " + removeComma (currencies);
    searchResult.append (countryCurrency);

    countryPopulation.innerHTML = "Population: " + 
      toNumeric (data[0].population);
    searchResult.append (countryPopulation);
});
}
  
function toNumeric (number) {
  return number.toLocaleString ('en-US', { style: 'decimal' });
}
function removeComma (s) {
  return s.substring(0, s.length - 2);
}
