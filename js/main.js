import { displayCountriesMap } from "./map_countries.js";

(async function main2() {
  // Select the SVG element for the Section 1 map
  const svg = d3.select("#map-section1");
  const infoBox = d3.select("#info-box-section1");
  const resetBtn = d3.select("#reset-btn-section1");

  // Set larger dimensions for the Section 1 map
  const height = window.innerHeight * 0.8; // Increased to 60% of viewport height
  const width = height * 1.5; // Proportional width (1.5:1 aspect ratio)
  svg.attr("width", width).attr("height", height);

  // Display the countries map
  displayCountriesMap(svg, width, height);

  // Initial info box text
  infoBox.text("Select a country");

  // Reset button functionality (placeholder since displayCountriesMap has no zoom)
  resetBtn.on("click", () => {
    console.log("Reset button clicked, but no zoom functionality implemented yet.");
    resetBtn.style("display", "none");
  });
})();