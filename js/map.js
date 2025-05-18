export async function initializeMap(g, svg, width, height, zoom, resetBtn, viewState) {
  let selectedContinent = null;
  let selectedCountry = null;

  // selecting which data will be loaded
  const geojsonFile = viewState === "continents" ? "data/world_map_continents.geojson" : "data/world_map.geo.json";

  // loading data
  let data;
  try {
    console.log("Loading GeoJSON file:", geojsonFile);
    data = await d3.json(geojsonFile);
    console.log("GeoJSON loaded:", data);
  } catch (error) {
    console.error("Failed to load GeoJSON:", error);
    throw error; // Re-throw to catch in main.js
  }

  const infoBox = d3.select("#info-box");

  // removing antarctica from continents
  const filteredFeatures = viewState === "continents"
    ? data.features.filter(f => f.properties.CONTINENT !== "Antarctica"): data.features;

  // loading map data for displaying
  const projection = d3.geoNaturalEarth1();
  projection.fitSize([width, height], { type: "FeatureCollection", features: filteredFeatures });
  const path = d3.geoPath().projection(projection);

  console.log("Rendering paths...");
  const paths = g.selectAll("path")
    .data(filteredFeatures)
    .join("path")
    .attr("class", viewState === "continents" ? "continent" : "country")
    .attr("d", path)
    .on("mouseover", function (event, d) {
      d3.select(this).attr("fill", "orange");
      if (!selectedContinent && !selectedCountry) {
        const name = d.properties.name || d.properties.CONTINENT || "Unknown";
        infoBox.text(name);
      }
    })
    .on("mouseout", function (event, d) {
      d3.select(this).attr("fill", "#eee");
      if (!selectedContinent && !selectedCountry) {
        infoBox.text(viewState === "continents" ? "Select a continent" : "Select a country");
      }
    })
    .on("click", function (event, d) {
      console.log(d.properties);
      event.stopPropagation();
      let name = d.properties.name || d.properties.CONTINENT || "Unknown";

      const regionMap = {
        "North America": "West. Hem",
        "South America": "West. Hem",
        "Asia": ["Asia", "Mideast"],
        "Australia": null,
        "Oceania": null,
      };
      const regions = regionMap[name] || name;

      if (viewState === "continents") {
        selectedContinent = name;
        selectedCountry = null;
        if (regions) {
          displayRegionalData(regions, name);
        } else {
          infoBox.text(`No data available for ${name}`);
        }
        resetBtn.style("display", "none");
      } else {
        selectedContinent = null;
        selectedCountry = name
        const countryCode = countryCodeMap[name] || name;
        if(countryCode) {
          displayNationalData(countryCode, name);
        } else {
          infoBox.text(`No data available for ${name}`);
        }
        
        const [[x0, y0], [x1, y1]] = path.bounds(d);
        const dx = x1 - x0;
        const dy = y1 - y0;
        const x = (x0 + x1) / 2;
        const y = (y0 + y1) / 2;
        const scale = Math.max(1, Math.min(8, 0.9 / Math.max(dx / width, dy / height)));
        const translate = [width / 2 - scale * x, height / 2 - scale * y];

        svg.transition()
          .duration(750)
          .call(
            zoom.transform,
            d3.zoomIdentity.translate(translate[0], translate[1]).scale(scale)
          );

        resetBtn.style("display", "inline-block");
      }
    });

  console.log("Paths rendered:", paths.size(), "elements");

  svg.on("click", function (event) {
    if (!d3.select(event.target).classed("continent") && !d3.select(event.target).classed("country")) {
      selectedContinent = null;
      selectedCountry = null;
      infoBox.text(viewState === "continents" ? "Select a continent" : "Select a country");
    }
  });
}

import { displayRegionalData } from './regionalData.js';
import { displayNationalData} from './nationalData.js';
import { countryCodeMap } from './utils.js';