import { initializeMap } from "./map.js";
import { initializeZoom } from "./zoom.js";
import { initializeSlider } from "./slider.js";
import { initRegionalData } from "./regionalData.js";

(async function main() {
  const svg = d3.select("#map");
  const resetBtn = d3.select("#reset-btn");
  const slider = d3.select("#year-slider");
  const yearDisplay = d3.select("#selected-year");
  const viewToggle = d3.select("#map-view-switch");
  const viewLabel = d3.select("#view-label");
  const infoBox = d3.select("#info-box");

  const width = window.innerWidth * 0.7;
  const height = window.innerHeight * 0.8;
  svg.attr("width", width).attr("height", height);

  const g = svg.append("g");

  const zoom = initializeZoom(svg, g, resetBtn, width, height);
  initializeSlider(slider, yearDisplay);

  let viewState = "countries";
  viewLabel.text("Countries");

  let regionalData = [];
  try {
    console.log("Loading WRP_regional.csv...");
    regionalData = await d3.csv("data/WRP_regional.csv");
    console.log("Regional data loaded:", regionalData.length, "rows");
    await initRegionalData(regionalData, infoBox, slider);
  } catch (error) {
    console.error("Error loading WRP_regional.csv:", error);
  }

  async function updateMap() {
    g.selectAll("*").remove();
    infoBox.text(viewState === "continents" ? "Select a continent" : "Select a country");
    try {
      console.log("Calling initializeMap...");
      await initializeMap(g, svg, width, height, zoom, resetBtn, viewState);
      console.log("initializeMap completed");
    } catch (error) {
      console.error("Error in initializeMap:", error);
    }
  }

  await updateMap();

  viewToggle.on("change", () => {
    viewState = viewToggle.property("checked") ? "countries" : "continents";
    viewLabel.text(viewState === "countries" ? "Countries" : "Continents");
    updateMap();
  });
})();