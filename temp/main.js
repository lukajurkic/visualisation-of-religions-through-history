import { initializeMap } from "./map.js";
import { initializeZoom } from "./zoom.js";
import { initializeSlider } from "./slider.js";
import { initRegionalData } from "./regionalData.js";
import { initNationalData } from "./nationalData.js";
import { initializeMapSection1 } from "./mapSection1.js";

(async function main() {
  const svg1 = d3.select("#map");
  const svg2 = d3.select("#map-section1");
  const resetBtn1 = d3.select("#reset-btn"); // Original reset button
  const resetBtn2 = d3.select("#reset-btn-section1"); // New reset button for Section 1 map (add this to HTML if needed)
  const slider = d3.select("#year-slider");
  const yearDisplay = d3.select("#selected-year");
  const viewToggle = d3.select("#map-view-switch");
  const viewLabel = d3.select("#view-label");
  const infoBox1 = d3.select("#info-box");
  const infoBox2 = d3.select("#info-box-section1");

  const width1 = window.innerWidth * 0.7;
  const height1 = window.innerHeight * 0.8;
  svg1.attr("width", width1).attr("height", height1);

  const width2 = window.innerWidth * 0.5; // Smaller width for Section 1 map
  const height2 = window.innerHeight * 0.4; // Smaller height
  svg2.attr("width", width2).attr("height", height2);

  const g1 = svg1.append("g");
  const g2 = svg2.append("g");

  const zoom1 = initializeZoom(svg1, g1, resetBtn1, width1, height1);
  const zoom2 = initializeZoom(svg2, g2, resetBtn2, width2, height2);
  initializeSlider(slider, yearDisplay);

  let viewState = "countries";
  viewLabel.text("Countries");

  let regionalData = [];
  let nationalData = [];
  try {
    console.log("Loading WRP_regional.csv...");
    regionalData = await d3.csv("data/WRP_regional.csv");
    console.log("Regional data loaded:", regionalData.length, "rows");
    await initRegionalData(regionalData, infoBox1, slider);

    console.log("Loading WRP_national.csv...");
    nationalData = await d3.csv("data/WRP_national.csv");
    console.log("National data loaded:", nationalData.length, "rows");
    await initNationalData(nationalData, infoBox1, slider);
  } catch (error) {
    console.error("Error loading data:", error);
  }

  async function updateMap1() {
    g1.selectAll("*").remove();
    infoBox1.text("Select a country");
    try {
      console.log("Calling initializeMap...");
      const { updateMapColors } = await initializeMap(g1, svg1, width1, height1, zoom1, resetBtn1, viewState, nationalData, regionalData);
      console.log("initializeMap completed");

      d3.select("#religion-dropdown").on("change", function () {
        const religionKey = this.value || null;
        console.log("Religion selected:", religionKey);
        updateMapColors(religionKey);
      });
    } catch (error) {
      console.error("Error in initializeMap:", error);
    }
  }

  async function updateMap2() {
    g2.selectAll("*").remove();
    infoBox2.text("Select a country");
    try {
      console.log("Calling initializeMapSection1...");
      const { updateMapColors } = await initializeMapSection1(g2, svg2, width2, height2, zoom2, resetBtn2, nationalData, regionalData);
      console.log("initializeMapSection1 completed");
    } catch (error) {
      console.error("Error in initializeMapSection1:", error);
    }
  }

  await updateMap1();
  await updateMap2();

  viewToggle.on("change", () => {
    viewState = viewToggle.property("checked") ? "countries" : "continents";
    viewLabel.text(viewState === "countries" ? "Countries" : "Continents");
    updateMap1();
  });

  slider.on("input", () => {
    const year = slider.node().value;
    yearDisplay.text(`Year: ${year}`);
    // Update logic for both maps if needed
    updateMap1();
    updateMap2();
  });

  // Reset button handler (for both maps)
  resetBtn1.on("click", () => {
    svg1.transition().duration(750).call(zoom1.transform, d3.zoomIdentity);
    resetBtn1.style("display", "none");
  });
  resetBtn2.on("click", () => {
    svg2.transition().duration(750).call(zoom2.transform, d3.zoomIdentity);
    resetBtn2.style("display", "none");
  });
})();