import { displayCountriesMap } from "./map_countries.js";
import { displayContinentsMap } from "./map_continents.js";
import { initializeSlider } from "./slider.js";
import { initNationalData, displayNationalData } from "./national_data.js"; // REMOVED getCountryCode AND getDisplayName FROM HERE - GROK
import { getCountryCode, getDisplayName, columnMapping, formatNumber } from "./utils.js"; // IMPORT UTILS FUNCTIONS DIRECTLY - GROK

(async function main2() {
  /*==================================================
    Variables
    ==================================================
  */
  let nationalData = [];

  /*==================================================
    Fetching the elements
    ==================================================
  */
  const svgCountries = d3.select("#map-countries");
  const svgContinents = d3.select("#map-continents");
  const resetBtnCountries = d3.select("#reset-btn-countries");
  const infoBoxCountries = d3.select("#info-box-countries");
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
    Function calls and initialization of data
    ==================================================
  */
  // LOAD NATIONAL DATA FIRST - GROK
  try {
    nationalData = await d3.csv("data/WRP_national.csv");
    await initNationalData(nationalData, infoBoxCountries, slider); // FIXED TYPO FROM infoBox1 TO infoBoxCountries - GROK
  } catch (error) {
    console.error("Error loading data:", error);
  }

  const { zoomGroup, projection, paths } = await displayCountriesMap(svgCountries, width, height, nationalData); // PASS nationalData TO displayCountriesMap - GROK
  await displayContinentsMap(svgContinents, width, height);
  initializeSlider(slider, yearDisplay);

  /*==================================================
    Setting up event listeners
    ==================================================
  */
  // Add click event to zoom on country
  paths.on("click", function(event, d) {
    console.log("Country clicked:", d.properties.name || "Unknown Country"); // LOG CLICK EVENT - GROK
    zoomToCountry(event, d, infoBoxCountries, resetBtnCountries, zoomGroup, width, height, slider);
  });

  // Reset button functionality
  resetBtnCountries.on("click", function(event, d) {
    resetBtn(zoomGroup, resetBtnCountries, infoBoxCountries);
  });
})();

/*==================================================
    Functions
    ==================================================
  */
function zoomToCountry(event, d, infoBoxCountries, resetBtnCountries, zoomGroup, width, height, slider) {
  // ZOOM TO COUNTRY LOGIC - GROK
  console.log("Executing zoomToCountry for:", d.properties.name); // LOG FUNCTION ENTRY - GROK
  const pathElement = d3.select(event.currentTarget); // Use event.currentTarget
  const bbox = pathElement.node().getBBox(); // Get the SVG bounding box in pixel space
  console.log("Bounding box:", bbox); // LOG BOUNDING BOX - GROK

  const { x, y, width: bboxWidth, height: bboxHeight } = bbox;
  if (bboxWidth === 0 || bboxHeight === 0) {
    console.error("Invalid bounding box:", bbox); // LOG INVALID BBOX - GROK
    return;
  }

  const scale = Math.min(8, 0.9 / Math.max(bboxWidth / width, bboxHeight / height));
  const centerX = x + bboxWidth / 2;
  const centerY = y + bboxHeight / 2;
  const translate = [width / 2 - scale * centerX, height / 2 - scale * centerY];
  console.log("Translation:", translate); // LOG TRANSLATION - GROK

  // Apply transform to zoomGroup
  zoomGroup.transition()
    .duration(750)
    .attr("transform", `translate(${translate}) scale(${scale})`)
    .on("end", () => console.log("Zoom transition completed")); // LOG TRANSITION END - GROK

  // UPDATE INFO BOX WITH NATIONAL DATA - GROK
  const year = slider.node().value;
  console.log("Selected year:", year); // LOG SELECTED YEAR - GROK
  const countryName = d.properties.name || "Unknown Country"; // ASSUMES GeoJSON HAS name PROPERTY, ADJUST IF DIFFERENT - GROK
  console.log("Country name:", countryName); // LOG COUNTRY NAME - GROK
  const countryCode = getCountryCode(countryName, year); // USE IMPORTED FUNCTION - GROK
  console.log("Country code:", countryCode); // LOG COUNTRY CODE - GROK
  const displayName = getDisplayName(countryName, year); // USE IMPORTED FUNCTION - GROK
  console.log("Display name:", displayName); // LOG DISPLAY NAME - GROK
  displayNationalData(countryCode, displayName);

  // SHOW RESET BUTTON - GROK
  resetBtnCountries.style("display", "block");
}

function resetBtn(zoomGroup, resetBtnCountries, infoBoxCountries) {
  zoomGroup.transition()
      .duration(750)
      .attr("transform", ""); // Reset transform
  resetBtnCountries.style("display", "none");
  infoBoxCountries.text("Select a country");
}