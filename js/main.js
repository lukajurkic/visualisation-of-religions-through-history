import { displayCountriesMap } from "./map_countries.js";
import { displayContinentsMap } from "./map_continents.js";
import { displayMapDistribution } from "./map_distribution.js"; 
import { initializeSlider } from "./slider.js";
import { initNationalData, displayNationalData } from "./national_data.js";
import { initRegionalData, displayRegionalData } from "./regional_data.js";
import { getCountryCode, getDisplayName, regionMap, religionList } from "./utils.js";
import { drawGraph, resetGraph, initGraph } from "./national_graph.js"
import { drawRegionalGraph, resetRegionalGraph, initRegionalGraph } from "./regional_graph.js"
import { updateCountryColors } from "./distribution_data.js";

/*==================================================
    Global Variables
  ==================================================
*/
let selectedCountryCode = null;
let selectedCountryName = null;
let selectedReligionDistribution = null;
let selectedRegions = null;
let zoomedIn = false;
let dataDisplayed = false;

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
  const svgDistribution = d3.select("#map-countries-distribution");
  const resetBtnCountries = d3.select("#reset-btn-countries");
  const infoBoxCountries = d3.select("#info-box-countries");
  const infoBoxContinents = d3.select("#info-box-continents");
  const slider = d3.select("#year-slider");
  const yearDisplay = d3.select("#selected-year");
  const chartSvgCountries = d3.select("#graph-countries");
  const chartSvgContinents = d3.select("#graph-continents");
  const select = d3.select("#religion-select");
  const backToTopButton = document.getElementById('back-to-top');

  /*==================================================
    Size calculating
    ==================================================
  */
  const height = window.innerHeight * 0.6;
  const width = height * 1.8;
  const fullHeight = window.innerHeight*0.7;
  const fullWidth = height * 2.5;
  svgCountries.attr("width", width).attr("height", height);
  svgContinents.attr("width", width).attr("height", height);
  svgDistribution
  .attr("viewBox", `0 0 ${fullWidth} ${fullHeight}`)
  .attr("preserveAspectRatio", "xMidYMid meet");

  /*==================================================
    Initialization
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
  if(initGraph(nationalData)) { console.info("Graph initialized successfully");} 
  if(initRegionalGraph(regionalData)) { console.info("Graph initialized successfully");}
  else { console.error("Graph initialization failed");}
  select
    .selectAll("option")
    .data(religionList)
    .enter()
    .append("option")
    .attr("value", d => d)
    .text(d => d);
  select.property("value", "Select religion");
  resetMapColors();
  const tooltip = d3.select("body")
    .append("div")
    .attr("class", "tooltip");


  /*==================================================
    Function calls
    ==================================================
  */
  const { zoomGroup, projectionNational, nationalPaths } = await displayCountriesMap(svgCountries, width, height, infoBoxCountries);
  const { projectionRegional, regionalPaths } = await displayContinentsMap(svgContinents, width, height, infoBoxContinents);
  const { projectionDistribution, distributionPaths } = await displayMapDistribution(svgDistribution, fullWidth, fullHeight);
  initializeSlider(slider, yearDisplay, 1945, 2010);
  
  /*==================================================
    Setting up event listeners
    ==================================================
  */
  nationalPaths
    .on("click", function(event, d) {
      event.stopPropagation();
      processClickNationalEvent(event, d, tooltip, resetBtnCountries, zoomGroup, width, height, slider);
    })
    .on("mouseover", function (event, d) {
      if(!zoomedIn) {
        infoBoxCountries.text(d.properties.name || "Unknown Country");
      }
    })
    .on("mouseout", function (d) {
      if(!zoomedIn) {
        infoBoxCountries.text("Select a country");
      }
    });

  regionalPaths
    .on("click", function(event, d) {
      event.stopPropagation();
      const continentName = d.properties.CONTINENT || "Unknown Continent";
      const regions = regionMap[continentName] || continentName;
      dataDisplayed = true;
      selectedRegions = regions;
      displayRegionalData(regions, infoBoxContinents);
      drawRegionalGraph(regions, slider.node().value, tooltip);
    })
    .on("mouseover", function (event, d) {
      if(!dataDisplayed) {
        infoBoxContinents.text(d.properties.CONTINENT || "Unknown Continent");
      }
    })
    .on("mouseout", function (d) {
      if(!dataDisplayed) {
        infoBoxContinents.text("Select a continent");
      }
    });


  resetBtnCountries.on("click", function(event, d) {
    resetBtn(zoomGroup, resetBtnCountries, infoBoxCountries);
    resetGraph(chartSvgCountries)
  });

  svgCountries.on("click", function(event) {
    if (event.target.tagName === "svg" || event.target.classList.contains("zoom-group")) {
      resetBtn(zoomGroup, resetBtnCountries, infoBoxCountries);
      resetGraph(chartSvgCountries)
    }
  });

  svgContinents.on("click", function(event) {
    if (event.target.tagName === "svg") {
      selectedRegions = null;
      dataDisplayed = false;
      infoBoxContinents.text("Select a continent");
      resetRegionalGraph(chartSvgContinents)
    }
  });

   slider.on("input", function () {
    const year = this.value;
      yearDisplay.text("Year: " + year);
      if (selectedCountryCode && selectedCountryName) {
        drawGraph(selectedCountryCode, year, tooltip);
        displayNationalData(selectedCountryCode, selectedCountryName, year);
      } else if(selectedReligionDistribution) {
          updateCountryColors(nationalData, selectedReligionDistribution, slider.node().value);
      } else if(selectedRegions) {
          displayRegionalData(selectedRegions, infoBoxContinents);
          drawRegionalGraph(selectedRegions, slider.node().value, tooltip);
      } else{
        console.warn("NO COUNTRY SELECTED, SKIPPING GRAPH AND INFOBOX UPDATE");
      }
    });

    select.on("change", function() {
      const religionKey = this.value;
      console.log("Religion selected:", religionKey);
      if (religionKey && religionKey !== "Select religion") {
        selectedReligionDistribution = religionKey;
        updateCountryColors(nationalData, religionKey, slider.node().value, tooltip);
      } else {
        resetMapColors();
      }
    })

    window.addEventListener('scroll', function() {
      if (window.scrollY > 0) {
          backToTopButton.style.display = 'block';
      } else {
          backToTopButton.style.display = 'none';
      }
    });
    backToTopButton.addEventListener('click', function() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        backToTopButton.style.display = 'none';
    });
})();

/*==================================================
  Functions
  ==================================================
*/
function processClickNationalEvent(event, d, tooltip, resetBtnCountries, zoomGroup, width, height, slider) {
  console.info("Clicked on country:", d.properties.name);
  const pathElement = d3.select(event.currentTarget);
  const bbox = pathElement.node().getBBox();

  const { x, y, width: bboxWidth, height: bboxHeight } = bbox;
  if (bboxWidth === 0 || bboxHeight === 0) {
    return;
  }

  const scale = Math.min(8, 0.9 / Math.max(bboxWidth / width, bboxHeight / height));
  const centerX = x + bboxWidth / 2;
  const centerY = y + bboxHeight / 2;
  const translate = [width / 2 - scale * centerX, height / 2 - scale * centerY];
  zoomGroup.transition()
    .duration(750)
    .attr("transform", `translate(${translate}) scale(${scale})`)
  const year = slider.node().value;
  const countryName = d.properties.name || "Unknown Country";
  const countryCode = getCountryCode(countryName, year);
  const displayName = getDisplayName(countryName, year);
  selectedCountryCode = countryCode;
  selectedCountryName = displayName;
  zoomedIn = true;
  displayNationalData(countryCode, displayName);
  drawGraph(countryCode, year, tooltip);
  resetBtnCountries.style("display", "block");
}

function resetBtn(zoomGroup, resetBtnCountries, infoBoxCountries) {
  zoomGroup.transition().duration(750).attr("transform", "");
  resetBtnCountries.style("display", "none");
  infoBoxCountries.text("Select a country");
  selectedCountryCode = null;
  selectedCountryName = null;
  zoomedIn = false;
}

function resetMapColors() {
  selectedReligionDistribution = null;
  d3.select("#map-countries-distribution").selectAll("path")
    .style("fill", "#eeeeee");
}