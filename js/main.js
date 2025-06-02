import { displayCountriesMap } from "./map_countries.js";
import { displayContinentsMap } from "./map_continents.js";
import { initializeSlider } from "./slider.js";
import { initNationalData, displayNationalData } from "./national_data.js";
import { initRegionalData, displayRegionalData } from "./regional_data.js";
import { getCountryCode, getDisplayName, regionMap, columnMapping, formatNumber } from "./utils.js";

(async function main() {
  /*==================================================
    Variables
    ==================================================
  */
  let nationalData = [];
  let regionalData = [];

  /*==================================================
    Fetching the elements
    ==================================================
  */
  const svgCountries = d3.select("#map-countries");
  const svgContinents = d3.select("#map-continents");
  const resetBtnCountries = d3.select("#reset-btn-countries");
  const infoBoxCountries = d3.select("#info-box-countries");
  const resetBtnContinents = d3.select("#reset-btn-continents");
  const infoBoxContinents = d3.select("#info-box-continents");
  const slider = d3.select("#year-slider");
  const yearDisplay = d3.select("#selected-year");

  /*==================================================
    Size calculating
    ==================================================
  */
  const height = window.innerHeight * 0.8;
  const width = height * 1.5;
  svgCountries.attr("width", width).attr("height", height);
  svgContinents.attr("width", width).attr("height", height);

  /*==================================================
    Data initialization
    ==================================================
  */
  try {
    nationalData = await d3.csv("data/WRP_national.csv");
    regionalData = await d3.csv("data/WRP_regional.csv");
    await initNationalData(nationalData, infoBoxCountries, slider);
    await initRegionalData(regionalData, infoBoxContinents, slider);
  } catch (error) {
    console.error("Error loading data:", error);
  }

  /*==================================================
    Function calls
    ==================================================
  */
  const { zoomGroup, projectionNational, nationalPaths } = await displayCountriesMap(svgCountries, width, height);
  const { projection, regionalPaths } = await displayContinentsMap(svgContinents, width, height, regionalData);
  initializeSlider(slider, yearDisplay);

  /*==================================================
    Setting up event listeners
    ==================================================
  */
  nationalPaths.on("click", function(event, d) {
    event.stopPropagation();
    zoomAndDisplayCountryData(event, d, infoBoxCountries, resetBtnCountries, zoomGroup, width, height, slider);
  });

  regionalPaths.on("click", function(event, d) {
    event.stopPropagation();
    const continentName = d.properties.CONTINENT || "Unknown Continent";
    const regions = regionMap[continentName] || continentName;
    displayRegionalData(regions, infoBoxContinents);
  });

  resetBtnCountries.on("click", function(event, d) {resetBtn(zoomGroup, resetBtnCountries, infoBoxCountries);});

  svgCountries.on("click", function(event) {
    if (event.target.tagName === "svg" || event.target.classList.contains("zoom-group")) {
      resetBtn(zoomGroup, resetBtnCountries, infoBoxCountries);
    }
  });

  svgContinents.on("click", function(event) {
    if (event.target.tagName === "svg") {
      resetBtn(svgContinents, resetBtnContinents, infoBoxContinents);
    }
  });

})();

  /*==================================================
    Functions
    ==================================================
  */
function zoomAndDisplayCountryData(event, d, infoBoxCountries, resetBtnCountries, zoomGroup, width, height, slider) {
  
  const pathElement = d3.select(event.currentTarget); // Use event.currentTarget
  const bbox = pathElement.node().getBBox(); // Get the SVG bounding box in pixel space

  const { x, y, width: bboxWidth, height: bboxHeight } = bbox;
  if (bboxWidth === 0 || bboxHeight === 0) {
    console.error("Invalid bounding box:", bbox); // LOG INVALID BBOX - GROK
    return;
  }

  const scale = Math.min(8, 0.9 / Math.max(bboxWidth / width, bboxHeight / height));
  const centerX = x + bboxWidth / 2;
  const centerY = y + bboxHeight / 2;
  const translate = [width / 2 - scale * centerX, height / 2 - scale * centerY];

  // Apply transform to zoomGroup
  zoomGroup.transition()
    .duration(750)
    .attr("transform", `translate(${translate}) scale(${scale})`)

  const year = slider.node().value;
  const countryName = d.properties.name || "Unknown Country";
  const countryCode = getCountryCode(countryName, year);
  const displayName = getDisplayName(countryName, year);
  displayNationalData(countryCode, displayName);

  resetBtnCountries.style("display", "block");
}

function resetBtn(zoomGroup, resetBtnCountries, infoBoxCountries) {
  zoomGroup.transition()
      .duration(750)
      .attr("transform", ""); // Reset transform
  resetBtnCountries.style("display", "none");
  infoBoxCountries.text("Select a country");
}