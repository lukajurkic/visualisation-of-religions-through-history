import { initializeMap } from "./map.js";
import { initializeZoom } from "./zoom.js";
import { initializeSlider } from "./slider.js";

(async function main() {
  const svg = d3.select("#map");
  const resetBtn = d3.select("#reset-btn");
  const slider = d3.select("#year-slider");
  const yearDisplay = d3.select("#selected-year");

  const width = window.innerWidth;
  const height = window.innerHeight * 0.8;
  svg.attr("width", width).attr("height", height);

  const g = svg.append("g"); // Group used for zoom transforms

  const zoom = initializeZoom(svg, g, resetBtn, width, height); // Pass g into zoom
  initializeSlider(slider, yearDisplay);

  await initializeMap(g, svg, width, height, zoom, resetBtn);
})();
