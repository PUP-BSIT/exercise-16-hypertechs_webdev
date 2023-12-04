// Common function to render comments
function renderComment(name, commentText, timestamp) {
  let commentList = document.getElementById("comment_list");
  let newComment = document.createElement("div");
  newComment.classList.add("comment-container");

  let userIcon = document.createElement("img");
  userIcon.src = "images/user_icon.jpg";
  userIcon.alt = "User Icon";
  userIcon.className = "user-icon";

  let commentContent = document.createElement("div");
  commentContent.classList.add("comment-content");

  let nameElement = document.createElement("strong");
  nameElement.textContent = name;

  // Add date and time
  let dateTimeElement = document.createElement("span");
  dateTimeElement.className = "comment-timestamp";
  dateTimeElement.setAttribute("data-timestamp", timestamp.toISOString());
  dateTimeElement.textContent = timestamp.toLocaleString(undefined, {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  });

  let commentElement = document.createElement("p");
  commentElement.textContent = commentText;

  commentContent.appendChild(nameElement);
  commentContent.appendChild(dateTimeElement);
  commentContent.appendChild(commentElement);

  newComment.appendChild(userIcon);
  newComment.appendChild(commentContent);

  commentList.prepend(newComment);
}

// Function to add a new comment
function addComment() {
  let name = document.getElementById("name").value;
  let commentText = document.getElementById("comment").value;

  if (!name.trim() || !commentText.trim()) {
    alert("Please fill out both fields.");
    return;
  }

  let timestamp = new Date();
  renderComment(name, commentText, timestamp);

  document.getElementById("name").value = "";
  document.getElementById("comment").value = "";
}

// Function to sort comments
function sortComments(order) {
  let commentList = document.getElementById("comment_list");
  let comments = Array.from(commentList.children);

  comments.sort((a, b) => {
    let timestampA = new Date(
      a.querySelector(".comment-timestamp").getAttribute("data-timestamp")
    );
    let timestampB = new Date(
      b.querySelector(".comment-timestamp").getAttribute("data-timestamp")
    );

    if (order === "asc") {
      return timestampA - timestampB;
    } else {
      return timestampB - timestampA;
    }
  });

  commentList.innerHTML = "";
  comments.forEach((comment) => commentList.appendChild(comment));
}

// Render the static comments by teammates
renderComment(
  "Mary Joy Danay",
  "Amazing! Your webpage is superb and dynamic.",
  new Date("2023-11-04T12:25:00Z")
);
renderComment(
  "Angel Rose Casabuena",
  "Wishing all the best!",
  new Date("2023-11-04T12:38:00Z")
);
renderComment(
  "Judy Ann Dupo",
  "Your goals, as shared here, are commendable!",
  new Date("2023-11-04T13:25:00Z")
);
renderComment(
  "Calib Serrano",
  "I also like to learn a music instrument like guitar.",
  new Date("2023-11-04T15:41:00Z")
);

// Hide sort icon when options are selected
document
  .getElementById("sort_dropdown")
  .addEventListener("change", function () {
    let selectedOption = this.value;

    if (selectedOption === "asc" || selectedOption === "desc") {
      this.classList.add("hide-icon");
    } else {
      this.classList.remove("hide-icon");
    }
  });


// Script for countries.html
async function searchCountries() {
  const search_input = document.getElementById("search_input").value.trim();

  if (search_input === "") {
    alert("Please enter a keyword.");
    return;
  }

  try {
    // First request to get country details
    const countryDetailsResponse = await fetch(
      `https://restcountries.com/v3.1/name/${search_input}`
    );
    const countryDetailsData = await countryDetailsResponse.json();

    if (countryDetailsData.length === 0) {
      alert("No country found with the provided keyword.");
      return;
    }

    const country = countryDetailsData[0];
    const region = country.region;

    // Second request to get other countries in the same region
    const regionCountriesResponse = await fetch(
      `https://restcountries.com/v3.1/region/${region}`
    );
    const regionCountriesData = await regionCountriesResponse.json();

    displayCountryDetails(country, regionCountriesData);
  } catch (error) {
    console.error("Error:", error);
    alert("An error occurred while fetching data.");
  }
}

function displayCountryDetails(country, region_countries) {
  const countryDetailsContainer = document.getElementById("country_details");
  const regionCountriesContainer = document.getElementById("region_countries");

  countryDetailsContainer.style.textAlign = "left";
  regionCountriesContainer.style.textAlign = "left";

  countryDetailsContainer.style.width = "500px";
  regionCountriesContainer.style.width = "500px";

  countryDetailsContainer.innerHTML = "";
  regionCountriesContainer.innerHTML = "";

  const quickFactsDescription = document.createElement("p");
  quickFactsDescription.textContent = 
  `Here are some quick facts about ${country.name.common}:`;
  quickFactsDescription.style.paddingLeft = "40px";
  countryDetailsContainer.appendChild(quickFactsDescription);

  const detailsList = document.createElement("ul");
  detailsList.style.listStyleType = "none";

  const detailsToShow = [
    "capital",
    "population",
    "area",
    "languages",
    "currencies",
    "timezones",
    "flag",
    "status",
  ];
  detailsToShow.forEach((key) => {
    const detailItem = document.createElement("li");
    const detailName = document.createElement("span");
    detailName.textContent = key.charAt(0).toUpperCase() + key.slice(1) + ": ";
    detailName.style.fontWeight = "bold";
    detailItem.appendChild(detailName);

    const detailValue = document.createElement("span");
    if (key === "languages") {
      const languages = Object.values(country.languages).join(", ");
      detailValue.textContent = languages;
    } else if (key === "currencies") {
      const currencies = Object.values(country.currencies).map(
        (currency) =>
          `${currency.name.charAt(0).toUpperCase()}${currency.name.slice(1)}`
      );
      detailValue.textContent = currencies.join(", ");
    } else if (key === "population" || key === "area") {
      detailValue.textContent = country[key].toLocaleString();
      if (key === "area") {
        detailValue.textContent += " km²";
      }
    } else if (key === "status") {
      detailValue.textContent = country[key]
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
    } else {
      detailValue.textContent = country[key];
    }

    detailItem.appendChild(detailValue);
    detailsList.appendChild(detailItem);
    detailItem.style.marginBottom = "5px";
  });
  countryDetailsContainer.appendChild(detailsList);

  if (region_countries.length > 1) {
    region_countries.sort((a, b) => a.name.common.localeCompare(b.name.common));
    const regionDescriptionContainer = document.createElement("div");
    regionDescriptionContainer.style.width = "450px";
    regionDescriptionContainer.style.whiteSpace = "normal";
    regionDescriptionContainer.style.paddingLeft = "40px";

    const regionDescription = document.createElement("p");
    regionDescription.innerHTML = `The country of ${country.name.common} is
    located in <strong>${country.region}</strong>.
    Here are the other countries in this region:`;
    regionDescriptionContainer.appendChild(regionDescription);
    regionCountriesContainer.appendChild(regionDescriptionContainer);

    const regionCountriesList = document.createElement("div");
    regionCountriesList.style.display = "flex";
    regionCountriesList.style.flexWrap = "wrap";
    regionCountriesList.style.paddingLeft = "40px";

    region_countries.forEach((otherCountry) => {
      if (otherCountry.name.common !== country.name.common) {
        const otherCountryItem = document.createElement("div");
        otherCountryItem.style.width = "33%";
        otherCountryItem.textContent = otherCountry.name.common;
        otherCountryItem.style.marginBottom = "5px";
        regionCountriesList.appendChild(otherCountryItem);
      }
    });
    regionCountriesContainer.appendChild(regionCountriesList);
  } else {
    regionCountriesContainer.textContent =
      "No other countries in the same region.";
  }
}