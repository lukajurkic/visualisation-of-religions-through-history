import { initializeMap } from "./map.js";
import { initializeZoom } from "./zoom.js";
import { initializeSlider } from "./slider.js";

(async function main() {
  const svg = d3.select("#map");
  const resetBtn = d3.select("#reset-btn");
  const slider = d3.select("#year-slider");
  const yearDisplay = d3.select("#selected-year");
  const viewToggle = d3.select("#map-view-switch");
  const viewLabel = d3.select("#view-label");

  const width = window.innerWidth;
  const height = window.innerHeight * 0.8;
  svg.attr("width", width).attr("height", height);

  const g = svg.append("g");

  const zoom = initializeZoom(svg, g, resetBtn, width, height);
  initializeSlider(slider, yearDisplay);

  // Initialize view state (default: countries)
  let viewState = "countries";

  // Function to update map based on view state
  async function updateMap() {
    g.selectAll("*").remove(); // Clear existing paths
    await initializeMap(g, svg, width, height, zoom, resetBtn, viewState);
  }

  // Initial map render
  await updateMap();

  // Handle toggle switch
  viewToggle.on("change", () => {
    viewState = viewToggle.property("checked") ? "continents" : "countries";
    viewLabel.text(viewState === "countries" ? "Countries" : "Continents");
    updateMap();
  });
})();