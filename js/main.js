import { displayCountriesMap } from "./map_countries.js";
import { displayContinentsMap } from "./map_continents.js";

(async function main2() {
  const svgCountries = d3.select("#map-countries");
  const svgContinents = d3.select("#map-continents");
  const resetBtnCountries = d3.select("#reset-btn-countries");
  const infoBoxCountries = d3.select("#info-box-countries");

  const height = window.innerHeight * 0.8;
  const width = height * 2;
  svgCountries.attr("width", width).attr("height", height);
  svgContinents.attr("width", width).attr("height", height);

  // Display the maps
  const { zoomGroup, projection, paths } = await displayCountriesMap(svgCountries, width, height);
  await displayContinentsMap(svgContinents, width, height);

  // Add click event to zoom on country
  paths.on("click", function(event, d) {
    zoomToCountry(event, d, infoBoxCountries, resetBtnCountries, zoomGroup, width, height);
  });
  // Reset button functionality
  resetBtnCountries.on("click", () => {
    console.log("Reset button clicked");
    zoomGroup.transition()
      .duration(750)
      .attr("transform", ""); // Reset transform
    resetBtnCountries.style("display", "none");
    infoBoxCountries.text("Select a country");
  });
})();

function zoomToCountry(event, d, infoBoxCountries, resetBtnCountries, zoomGroup, width, height) {
  // Your zoomToCountry function logic here
  const pathElement = d3.select(event.currentTarget); // Use event.currentTarget
    const bbox = pathElement.node().getBBox(); // Get the SVG bounding box in pixel space
    const { x, y, width: bboxWidth, height: bboxHeight } = bbox;
    const scale = Math.min(8, 0.9 / Math.max(bboxWidth / width, bboxHeight / height));
    const centerX = x + bboxWidth / 2;
    const centerY = y + bboxHeight / 2;
    const translate = [width / 2 - scale * centerX, height / 2 - scale * centerY];
    console.log("Translation:", translate);

    // Apply transform to zoomGroup
    zoomGroup.transition()
      .duration(750)
      .attr("transform", `translate(${translate}) scale(${scale})`)
      .on("end", () => console.log("Zoom transition completed"));

    // Update info box and show reset button
    infoBoxCountries.text(d.properties.name || "Unknown Country");
    resetBtnCountries.style("display", "block");
}