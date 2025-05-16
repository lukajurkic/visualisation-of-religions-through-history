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

  const width = window.innerWidth * 0.7; // Adjust for sidebar (~70% of viewport)
  const height = window.innerHeight * 0.8;
  svg.attr("width", width).attr("height", height);

  const g = svg.append("g");

  const zoom = initializeZoom(svg, g, resetBtn, width, height);
  initializeSlider(slider, yearDisplay);

  let viewState = "countries";
  viewLabel.text("Countries");

  async function updateMap() {
    g.selectAll("*").remove();
    await initializeMap(g, svg, width, height, zoom, resetBtn, viewState);
  }

  await updateMap();

  viewToggle.on("change", () => {
    viewState = viewToggle.property("checked") ? "countries" : "continents";
    viewLabel.text(viewState === "countries" ? "Countries" : "Continents");
    updateMap();
  });
})();