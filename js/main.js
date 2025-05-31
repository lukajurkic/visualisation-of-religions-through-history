import { displayCountriesMap } from "./map_countries.js";
import { displayContinentsMap } from "./map_continets.js";

(async function main2() {
  const svgCountries = d3.select("#map-countries");
  const svgContinents = d3.select("#map-continents");
  // const infoBox = d3.select("#info-box-section1");
  // const resetBtn = d3.select("#reset-btn-section1");

  const height = window.innerHeight * 0.8;
  const width = height * 2;
  svgCountries.attr("width", width).attr("height", height);
  svgContinents.attr("width", width).attr("height", height);

  // Display the map
  displayCountriesMap(svgCountries, width, height);
  displayContinentsMap(svgContinents, width, height);

  // Initial info box text
  // infoBox.text("Select a country");

  // Reset button functionality (placeholder since displayCountriesMap has no zoom)
  // resetBtn.on("click", () => {
  //   console.log("Reset button clicked, but no zoom functionality implemented yet.");
  //   resetBtn.style("display", "none");
  // });
})();